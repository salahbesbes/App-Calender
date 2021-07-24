import { useCallback, useContext, useEffect } from 'react';
import db from '@react-native-firebase/firestore';
import { AppStateContext } from '../../stateProvider';
import { authAction } from '../stateManager/actions/auth-A';

export const useLandingScreen = () => {
  const { authContext } = useContext(AppStateContext);
  const [authState, authDispach] = authContext;
  const { user } = authState;

  const listenOnEvents = useCallback(async () => {
    try {
      console.log('--->> listen on events called ');

      const multileUnsub = [];
      console.log('length of groups', user.myGroups.length);
      user.myGroups.map(gr => {
        const singleUnsub = db()
          .doc(`users/${user.uid}`)
          .collection('groups')
          .doc(gr.uid)
          .collection('events')
          .onSnapshot(snapshot => {
            // handle Delete
            snapshot.docChanges().forEach(changeDoc => {
              if (changeDoc.type === 'removed') {
                authDispach(authAction.removeEvent(changeDoc.doc.id));
                authDispach(
                  authAction.removeEventGroup({
                    eventUid: changeDoc.doc.id,
                    groupUid: gr.uid,
                  }),
                );
              }
              console.log(
                'fired from foreachloop for deletion after update local',
              );
            });

            // handle Add / Update Event
            let allGroupEvents = snapshot.docs.map(eventDoc => {
              return {
                ...eventDoc.data(),
                uid: eventDoc.id,
              };
            });
            console.log(`allGroupEvents`, allGroupEvents.length);
            authDispach(authAction.addEvent(allGroupEvents));
            authDispach(
              authAction.addEventGroup({
                groupUid: gr.uid,
                events: allGroupEvents,
              }),
            );
            multileUnsub.push(singleUnsub);
          });
      });
      // return annnanimous function that execute the unsubscrition of each listner
      return () => {
        multileUnsub.forEach(unsub => {
          unsub();
        });
      };
    } catch (error) {
      console.log('from useGroupe listenOnGroups =>> error ', error.message);
    }
  }, [authDispach, user.uid]);

  // we create a profile listner using firebase methode onSapshot()
  const ListenOnProfileChanges = useCallback(() => {
    try {
      const unsubProfile = db()
        .doc(`users/${user.uid}`)
        .onSnapshot(snapshot => {
          const newProfile = snapshot.data();
          // every time this ckall back executes we update local state
          authDispach(
            authAction.updateUser({
              ...newProfile,
              // myGroups: user.myGroups,
              // friends: user.friends,
              // myEvents: user.myEvents,
            }),
          );
          console.log(
            'we detect a profile changes we updated local state profile',
          );
        });
      // we unsubscribe from the listner (firebase documentation)
      return unsubProfile;
    } catch (error) {
      console.log('use Home users listner error', error.message);
    }
  }, [authDispach, user.uid]);

  return { listenOnEvents, ListenOnProfileChanges };
};

import { useCallback, useContext, useEffect } from 'react';
import { AppStateContext } from '../../stateProvider';
import { authAction } from '../stateManager/actions/auth-A';
import db from '@react-native-firebase/firestore';

export const useHomeListner = () => {
  const { authContext } = useContext(AppStateContext);
  const [authState, authDispach] = authContext;
  const { user } = authState;

  const listenOnGroups = useCallback(async () => {
    try {
      authDispach(authAction.loading());
      const unsubGroup = db()
        .collection('groups')
        .where('members', 'array-contains', user.uid || null)
        .onSnapshot(snapshot => {
          let userGroups = snapshot.docs.map(playerDoc => {
            return { ...playerDoc.data(), uid: playerDoc.id };
          });
          // every time this ckall back executes we update local state
          authDispach(authAction.updateUser({ myGroups: userGroups }));
          console.log(
            'we detect a group changes we updated local state myGroupe',
          );
        });
      return unsubGroup;
    } catch (error) {
      console.log('from useGroupe listenOnGroups =>> error ', error.message);
    }
  }, [user.uid, authDispach]);

  const listenOnEvents = useCallback(async () => {
    try {
      console.log('--->> listen on events called ');
      let multileUnsub = [];
      user.myGroups.map(gr => {
        const singleUnsub = db()
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
      console.log('from useevent listenOn events =>> error ', error.message);
    }
  }, [authDispach, user.myGroups.length]);

  const listnerPublicEvents = useCallback(async () => {
    const unsubPubEvents = db()
      .collection('publicEvents')
      .onSnapshot(snapshot => {
        let allPubEvents = snapshot.docs.map(EventDoc => {
          return { ...EventDoc.data(), uid: EventDoc.id };
        });
        authDispach(authAction.addPublicEvent(allPubEvents));
      });
    return unsubPubEvents;
  }, [authDispach]);

  return {
    ...authState,
    authDispach,
    listenOnGroups,
    listnerPublicEvents,
    listenOnEvents,
  };
};

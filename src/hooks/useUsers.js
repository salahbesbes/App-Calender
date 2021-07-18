import { useCallback, useContext, useEffect } from 'react';
import db from '@react-native-firebase/firestore';
import { AppStateContext } from '../../stateProvider';
import { authAction } from '../stateManager/actions/auth-A';

export const useUsers = () => {
  const { authContext } = useContext(AppStateContext);
  const [authState, authDispach] = authContext;
  const { user } = authState;

  const listenOnUsers = useCallback(async setAllUsers => {
    try {
      const unsub = db()
        .collection('users')
        .onSnapshot(snapshot => {
          const newMembers = snapshot.docs.map(member => {
            return { uid: member.id, ...member.data() };
          });

          console.log('From useUsers callback new Members');
          setAllUsers(newMembers);
        });
      return unsub;
    } catch (error) {
      console.log('from useUsers =>> error ', error.message);
    }
  }, []);

  const ListenOnFriendsChanges = useCallback(() => {
    try {
      const unsubFriends = db()
        .doc(`users/${user.uid}`)
        .collection('friends')
        .onSnapshot(snapshot => {
          let playerFriends = snapshot.docs.map(playerDoc => {
            return { ...playerDoc.data(), uid: playerDoc.id };
          });
          // every time this ckall back executes we update local state
          authDispach(authAction.updateUser({ friends: playerFriends }));
          console.log(
            'we detect a friends changes we updated local state Friends',
          );
        });
      // we unsubscribe from the listner (firebase documentation)
      return unsubFriends;
    } catch (error) {
      console.log('useUser Friends listner error ==> ', error.message);
    }
  }, [authDispach, user.uid]);

  const listenOnGroups = useCallback(async () => {
    try {
      const unsubGroup = db()
        .doc(`users/${user.uid}`)
        .collection('groups')
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
  }, [authDispach, user.uid]);

  return {
    ...authState,
    ListenOnFriendsChanges,
    listenOnUsers,
    listenOnGroups,
  };
};

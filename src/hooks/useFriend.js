import { useCallback, useContext, useEffect } from 'react';
import db from '@react-native-firebase/firestore';
import { useProfile } from './useProfile';
import { authAction } from '../stateManager/actions/auth-A';

export const useFriend = () => {
  const { user, authDispach } = useProfile();

  const addFriend = useCallback(
    async friend => {
      try {
        const { myGroups, ...friendData } = friend;
        authDispach(authAction.loading());
        await db()
          .collection('users')
          .doc(user.uid)
          .collection('friends')
          .doc(friend.uid)
          .set(friendData);
        authDispach(authAction.success());

        console.log('add friend ', friend?.email);
      } catch (error) {
        console.log('from usefriends =>> error ', error.message);
      }
    },
    [user.uid, authDispach],
  );

  const removeFriend = useCallback(
    async friendId => {
      try {
        authDispach(authAction.loading());
        await db()
          .collection('users')
          .doc(user.uid)
          .collection('friends')
          .doc(friendId)
          .delete();
        console.log('removed friend ', friendId);
        authDispach(authAction.success());
      } catch (error) {
        console.log('from usefriends =>> error ', error.message);
      }
    },
    [authDispach, user.uid],
  );
  return { user, addFriend, removeFriend };
};

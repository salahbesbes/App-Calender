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

  const inviteFriendToGroups = useCallback(
    async ({ selectedGroups, friendUid }) => {
      try {
        const selectedGroupsUids = selectedGroups.map(el => el.uid);
        authDispach(authAction.loading());
        selectedGroupsUids.forEach(async grUid => {
          await db()
            .collection('groups')
            .doc(grUid)
            .update({
              members: db.FieldValue.arrayUnion(friendUid),
            });
          console.log(
            'we add  friend ',
            friendUid,
            'to the groups  ',
            selectedGroupsUids,
          );
        });
        authDispach(authAction.success());
      } catch (error) {
        console.log(
          'from usefriends inviteFriendToGroups =>> error ',
          error.message,
        );
      }
    },
    [authDispach],
  );
  return { user, addFriend, removeFriend, inviteFriendToGroups };
};

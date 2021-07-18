import React from 'react';
import { useCallback, useContext, useEffect } from 'react';
import db from '@react-native-firebase/firestore';
import { AppStateContext } from '../../stateProvider';
import { authAction } from '../stateManager/actions/auth-A';

const useGroup = () => {
  const { authContext } = useContext(AppStateContext);
  const [authState, authDispach] = authContext;
  const { user } = authState;

  const addGroup = useCallback(
    async groupData => {
      try {
        authDispach(authAction.loading());
        await db()
          .collection('users')
          .doc(user.uid)
          .collection('groups')
          .add(groupData);

        authDispach(authAction.success());
      } catch (error) {
        console.log('from useGroupe add =>> error ', error.message);
      }
    },
    [authDispach, user.uid],
  );

  const removeFriend = useCallback(
    async groupId => {
      try {
        authDispach(authAction.loading());
        await db()
          .collection('users')
          .doc(user.uid)
          .collection('groups')
          .doc(groupId)
          .delete();
        console.log('removed group ', groupId);
        authDispach(authAction.success());
      } catch (error) {
        console.log('from useGroup remove =>> error ', error.message);
      }
    },
    [authDispach, user.uid],
  );
  return { ...authState, addGroup, removeFriend, authDispach };
};

export default useGroup;

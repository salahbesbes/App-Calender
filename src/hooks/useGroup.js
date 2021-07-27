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
        // await db()
        //   .collection('users')
        //   .doc(user.uid)
        //   .collection('groups')
        //   .add(groupData);

        await db()
          .collection('groups')
          .add({ ...groupData, creatorUid: user.uid, members: [user.uid] });

        console.log('create group');
      } catch (error) {
        console.log('from useGroupe add =>> error ', error.message);
      }
    },
    [authDispach, user.uid],
  );

  const removeGroup = useCallback(
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

  const addPublicGroup = useCallback(
    async groupObj => {
      authDispach(authAction.loading());
      await db().collection('publicGroups').add(groupObj);
      console.log('created public group ');
      authDispach(authAction.success());
    },
    [authDispach],
  );

  return { ...authState, addGroup, removeGroup, addPublicGroup, authDispach };
};

export default useGroup;

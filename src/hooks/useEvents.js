import { useCallback, useContext, useEffect } from 'react';
import db from '@react-native-firebase/firestore';
import { AppStateContext } from '../../stateProvider';
import { authAction } from '../stateManager/actions/auth-A';

export const useEvents = () => {
  const { authContext } = useContext(AppStateContext);
  const [authState, authDispach] = authContext;
  const { user } = authState;

  const createEvents = useCallback(
    async newEvent => {
      try {
        authDispach(authAction.loading());
        await db()
          .collection('users')
          .doc(user.uid)
          .collection('groups')
          .doc(newEvent.groupUid)
          .collection('events')
          .add(newEvent);
        console.log('we created an events');
        authDispach(authAction.success());
      } catch (error) {
        console.log('from useGroupe add =>> error ', error.message);
      }
    },
    [user.uid, authDispach],
  );

  const updateEvents = useCallback(
    async eventObj => {
      try {
        authDispach(authAction.loading());
        eventObj.groups.map(async id => {
          await db()
            .collection('users')
            .doc(user.uid)
            .collection('groups')
            .doc(id)
            .collection('events')
            .doc(eventObj.uid)
            .update(eventObj);
        });
        console.log('we updated an events');
        authDispach(authAction.success());
      } catch (error) {
        console.log('from useGroupe update =>> error ', error.message);
      }
    },
    [user.uid, authDispach],
  );

  return { ...authState, authDispach, updateEvents, createEvents };
};

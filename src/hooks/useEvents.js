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

  const updateEvent = useCallback(
    async eventObj => {
      try {
        authDispach(authAction.loading());
        await db()
          .collection('users')
          .doc(user.uid)
          .collection('groups')
          .doc(eventObj.groupUid)
          .collection('events')
          .doc(eventObj.uid)
          .update(eventObj);
        console.log('we updated an events');
        authDispach(authAction.success());
      } catch (error) {
        console.log('from useEvent update =>> error ', error.message);
      }
    },
    [user.uid, authDispach],
  );
  const removeEvent = useCallback(
    async eventObj => {
      try {
        authDispach(authAction.loading());
        await db()
          .collection('users')
          .doc(user.uid)
          .collection('groups')
          .doc(eventObj.groupUid)
          .collection('events')
          .doc(eventObj.uid)
          .delete();
        console.log('we removed an event');
        authDispach(authAction.success());
      } catch (error) {
        console.log('from useEvent remove =>> error ', error.message);
      }
    },
    [user.uid, authDispach],
  );
  return { ...authState, authDispach, updateEvent, createEvents, removeEvent };
};

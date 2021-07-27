import { useCallback, useContext } from 'react';
import db from '@react-native-firebase/firestore';
import { AppStateContext } from '../../stateProvider';
import { authAction } from '../stateManager/actions/auth-A';

export const useEvents = () => {
  const { authContext } = useContext(AppStateContext);
  const [authState, authDispach] = authContext;

  const createEvents = useCallback(
    async newEvent => {
      try {
        authDispach(authAction.loading());
        await db()
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
    [authDispach],
  );

  const updateEvent = useCallback(
    async eventObj => {
      try {
        await db()
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
    [authDispach],
  );
  const removeEvent = useCallback(
    async eventObj => {
      try {
        authDispach(authAction.loading());
        await db()
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
    [authDispach],
  );

  const createPublicEvent = useCallback(
    async pubEventObj => {
      try {
        authDispach(authAction.loading());
        await db().collection('publicEvents').add(pubEventObj);
        console.log('we add public Event');

        authDispach(authAction.success());
      } catch (error) {
        console.log(
          'from useEvent  deletePublicEvent =>> error ',
          error.message,
        );
      }
    },
    [authDispach],
  );

  const updatePublicEvent = useCallback(
    async pubEventObj => {
      try {
        authDispach(authAction.loading());
        await db()
          .collection('publicEvents')
          .doc(pubEventObj.uid)
          .update(pubEventObj);

        console.log('we updated public Event');
        authDispach(authAction.success());
      } catch (error) {
        console.log(
          'from useEvent  deletePublicEvent =>> error ',
          error.message,
        );
      }
    },
    [authDispach],
  );

  const deletePublicEvent = useCallback(
    async eventUid => {
      try {
        authDispach(authAction.loading());
        await db().collection('publicEvents').doc(eventUid).delete();
        console.log('we deleted public Event');
        authDispach(authAction.success());
      } catch (error) {
        console.log(
          'from useEvent  deletePublicEvent =>> error ',
          error.message,
        );
      }
    },
    [authDispach],
  );

  return {
    ...authState,
    authDispach,
    updateEvent,
    createEvents,
    removeEvent,
    createPublicEvent,
    updatePublicEvent,
    deletePublicEvent,
  };
};

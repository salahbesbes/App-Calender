import { useCallback, useContext } from 'react';
import db from '@react-native-firebase/firestore';
import { AppStateContext } from '../../stateProvider';
import { authAction } from '../stateManager/actions/auth-A';

export const useProfile = () => {
  const { authContext } = useContext(AppStateContext);
  const [authState, authDispach] = authContext;
  const { user } = authState;
  // since we need sinIn to call it on Click events we returning it with the reducer state modified
  const updateProfile = useCallback(
    async newProfile => {
      authDispach(authAction.loading());
      try {
        // we update the doc of firebase
        await db().doc(`users/${user.uid}`).update(newProfile);
        authDispach(authAction.success());
      } catch (error) {
        authDispach(authAction.failure());
        console.log('useProfile error =>> ', error.message);
      }
    },
    [authDispach, user.uid],
  );
  return { updateProfile, ...authState, authDispach };
};

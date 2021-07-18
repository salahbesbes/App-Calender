import auth from '@react-native-firebase/auth';

import { useCallback, useContext } from 'react';
import { AppStateContext } from '../../stateProvider';

/// since we cant use useSignIn and useSignUp on the same component
/// we create this hooks so that we can use it any where

export const useSignOut = () => {
  // we are using the reducer here so we returning its value
  const { authContext } = useContext(AppStateContext);
  const [authState] = authContext; // distructuring
  const signOut = useCallback(async navigation => {
    try {
      await auth().signOut();
      console.log('User signed out!');
      return;
    } catch (error) {
      console.log('signout => ', error);
      return;
    }
  }, []);

  // since we need sinIn to call it on Click events we returning it with the reducer state modified
  return { signOut, ...authState };
};

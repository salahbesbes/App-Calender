import { useCallback, useContext } from 'react';
import auth from '@react-native-firebase/auth';

import { AppStateContext } from '../../stateProvider';
import { authAction } from '../stateManager/actions/auth-A';

const useSignIn = () => {
  // we are using the useContext here to get the current state aof the authContext
  // and get the dispatch methode : every time we use the dispatch methode it will apdate the
  // AppStateContext exactly the authContext
  const { authContext } = useContext(AppStateContext);
  const [authState, authDispatch] = authContext; // distructuring
  const signIn = useCallback(
    async ({ email, password }) => {
      authDispatch(authAction.loading());
      if (!email || email === '') {
        authDispatch(authAction.failure('email must not be empty'));
        return;
      }
      if (!password || password === '') {
        authDispatch(authAction.failure('email must not be empty'));
        return;
      }
      try {
        let res = await auth().signInWithEmailAndPassword(email, password);
        let user = res.user.toJSON();
        console.log('User signed in!', user?.email || 'user is not json');
        authAction.updateUser({ email: user.email, uid: user.uid });
        authDispatch(authAction.success());
        return 'success';
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.log('sign in err => ', error);
        authDispatch(authAction.failure(error.message));
        return;
      }
    },
    [authDispatch],
  );
  // since we need sinIn to call it on Click events we returning it with the authContext state modified
  return { ...authState, authDispatch, signIn };
};

export default useSignIn;

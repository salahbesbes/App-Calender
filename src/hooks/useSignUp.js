import { useCallback, useContext } from 'react';
import auth from '@react-native-firebase/auth';
import db from '@react-native-firebase/firestore';

import { AppStateContext } from '../../stateProvider';
import { authAction } from '../stateManager/actions/auth-A';

const useSignUp = () => {
  // we are using the useContext here to get the current state aof the authContext
  // and get the dispatch methode : every time we use the dispatch methode it will apdate the
  // AppStateContext exactly the authContext

  const { authContext } = useContext(AppStateContext);
  const [authState, authDispatch] = authContext;

  // login
  const signUp = useCallback(
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
        console.log('use Sign UP ');
        let res = await auth().createUserWithEmailAndPassword(email, password);
        let user = res.user.toJSON();
        let defaultProfile = {
          ...authState.user,
          email: user.email,
          uid: user.uid,
        };
        // when we create new account we are creting a new doc in users collection
        await db().collection('users').doc(user.uid).set(defaultProfile);
        authDispatch(authAction.success());
        console.log('User  created !');
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use! ');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.log('SIGN UP err => ', error);
        authDispatch(authAction.failure(error.message));
        return;
      }
    },
    [authDispatch, authState.user],
  );

  // since we need sinIn to call it on Click events we returning it with the authContext state modified
  return { signUp, ...authState };
};
export default useSignUp;

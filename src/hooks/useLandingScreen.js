import { useCallback, useContext, useEffect } from 'react';
import db from '@react-native-firebase/firestore';
import { AppStateContext } from '../../stateProvider';
import { authAction } from '../stateManager/actions/auth-A';

export const useLandingScreen = () => {
  const { authContext } = useContext(AppStateContext);
  const [authState, authDispach] = authContext;
  const { user } = authState;

  return {};
};

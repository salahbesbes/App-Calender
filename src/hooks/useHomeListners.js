import { useCallback, useContext, useEffect } from 'react';
import { AppStateContext } from '../../stateProvider';
import { authAction } from '../stateManager/actions/auth-A';
import db from '@react-native-firebase/firestore';

export const useHomeListner = () => {
  const { authContext } = useContext(AppStateContext);
  const [authState, authDispach] = authContext;
  const { user } = authState;

  // we create a profile listner using firebase methode onSapshot()
  const ListenOnProfileChanges = useCallback(() => {
    try {
      const unsubProfile = db()
        .doc(`users/${user.uid}`)
        .onSnapshot(snapshot => {
          const newProfile = snapshot.data();
          // every time this ckall back executes we update local state
          authDispach(authAction.updateUser(newProfile));
          console.log(
            'we detect a profile changes we updated local state profile',
          );
        });
      // we unsubscribe from the listner (firebase documentation)
      return unsubProfile;
    } catch (error) {
      console.log('use Home users listner error', error.message);
    }
  }, [authDispach, user.uid]);

  // every time the component rendrs we execute the profile listner checking for updates
  useEffect(() => {
    const unsubscribeProfile = ListenOnProfileChanges();
    return unsubscribeProfile;
  }, [ListenOnProfileChanges]);

  return { ...authState, authDispach };
};

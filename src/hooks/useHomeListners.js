import { useCallback, useContext, useEffect } from 'react';
import { AppStateContext } from '../../stateProvider';
import { authAction } from '../stateManager/actions/auth-A';
import db from '@react-native-firebase/firestore';

export const useHomeListner = () => {
  const { authContext } = useContext(AppStateContext);
  const [authState, authDispach] = authContext;
  const { user } = authState;

  const listenOnGroups = useCallback(async () => {
    try {
      const unsubGroup = db()
        .doc(`users/${user.uid}`)
        .collection('groups')
        .onSnapshot(snapshot => {
          let userGroups = snapshot.docs.map(playerDoc => {
            return { ...playerDoc.data(), uid: playerDoc.id };
          });
          // every time this ckall back executes we update local state
          authDispach(authAction.updateUser({ myGroups: userGroups }));
          console.log(
            'we detect a group changes we updated local state myGroupe',
          );
        });
      return unsubGroup;
    } catch (error) {
      console.log('from useGroupe listenOnGroups =>> error ', error.message);
    }
  }, [user.uid, authDispach]);

  return { ...authState, authDispach, listenOnGroups };
};

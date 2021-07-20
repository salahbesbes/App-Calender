import { useContext, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import db from '@react-native-firebase/firestore';

import { authAction } from '../stateManager/actions/auth-A';
import { AppStateContext } from '../../stateProvider';

export const useAuthUserChanges = ({ navigation }) => {
  const { authContext } = useContext(AppStateContext);
  const [authState, authDispach] = authContext;
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async userChanged => {
      console.log('on auth changed is executed');
      try {
        if (userChanged) {
          //* fetch player
          console.log('ok => userChanged.email', userChanged.email);
          let userDoc = await db()
            .collection('users')
            .doc(userChanged.uid)
            .get();
          let loggedUser = userDoc.data();

          //* fetch friends

          let friendsDocs = await db()
            .collection('users')
            .doc(userChanged.uid)
            .collection('friends')
            .get();

          let userFriends = friendsDocs.docs.map(friendDoc => {
            return { ...friendDoc.data(), uid: friendDoc.id };
          });

          //* fetch Groups

          let myGroupsDocs = await db()
            .collection('users')
            .doc(userChanged.uid)
            .collection('groups')
            .get();

          //* fetch all events ofeach group

          let myGroups = myGroupsDocs.docs.map(groupDoc => {
            return {
              ...groupDoc.data(),
              uid: groupDoc.id,
            };
          });

          //* update local state
          authDispach(
            authAction.updateUser({
              ...loggedUser,
              uid: userChanged.uid,
              friends: userFriends,
              myGroups,
            }),
          );

          navigation.navigate('HomeScreen');
        } else {
          console.log(`log out => userChanged.email`, userChanged);
          // * logout from firebase and empty the local state
          // navigation.navigate('SignInScreen');
          authDispach(authAction.logOut());
        }
      } catch (error) {
        console.log('routNav ERROR :>> ', error.message);
        authDispach(authAction.failure(error.message));
        return;
      }
    });
    return () => subscriber(); // unsubscribe on unmount
  }, [authDispach, navigation]);
  return { ...authState };
};

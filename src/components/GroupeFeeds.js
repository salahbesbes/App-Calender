import React, { useContext } from 'react';
import { ScrollView } from 'react-native';
import { AppStateContext } from '../../stateProvider';
import { useState } from 'react';
import { Overlay } from 'react-native-elements/dist/overlay/Overlay';
import { Button } from 'react-native-elements/dist/buttons/Button';
import CreateGroupeModal from './Modals/CreateGroupModel';
import GroupCard from './Cards/GroupCard';

const GroupeFeeds = ({ navigation }) => {
  const { authContext } = useContext(AppStateContext);
  const [authState, authDispatch] = authContext; // distructuring
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const { user } = authState;
  // console.log(`gr.event`, user.myGroups[0].events);

  return (
    <ScrollView>
      {/* <SignOutButton navigation={navigation} />

      <Button
        title={'go sign In'}
        onPress={() => {
          navigation.navigate('SignInScreen');
        }}
      /> */}

      <Button
        icon={{
          name: 'add',
          size: 25,
          color: 'white',
        }}
        containerStyle={{ backgroundColor: 'orange' }}
        title="Create"
        onPress={toggleOverlay}
      />
      {user?.myGroups?.map((groupObj, i) => (
        <GroupCard
          key={i}
          groupObj={groupObj}
          user={user}
          navigation={navigation}
        />
      ))}
      <Overlay
        presentationStyle="fullScreen"
        transparent={false}
        isVisible={visible}
        onBackdropPress={toggleOverlay}>
        <CreateGroupeModal />
      </Overlay>
    </ScrollView>
  );
};

export default GroupeFeeds;

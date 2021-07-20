import React, { useContext } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { AppStateContext } from '../../stateProvider';
import { useState } from 'react';
import { Overlay } from 'react-native-elements/dist/overlay/Overlay';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { Card } from 'react-native-elements';
import CreateGroupeModal from './Modals/CreateGroup';
import CreateEventModal from './Modals/CreateEventInGroup';

const GroupeFeeds = ({ navigation }) => {
  const { authContext } = useContext(AppStateContext);
  const [authState, authDispatch] = authContext; // distructuring
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const { user } = authState;
  console.log('group length ', user.myGroups.length);
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

      {user?.myGroups.map((groupObj, i) => (
        <UserCard key={i} groupObj={groupObj} navigation={navigation} />
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

const UserCard = ({ groupObj, navigation }) => {
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          toggleOverlay();
        }}>
        <Card>
          <Card.Title>{groupObj.name}</Card.Title>
          <Card.Divider />
          <Text style={{ marginBottom: 10 }}>{groupObj.description}</Text>
        </Card>
      </TouchableOpacity>
      <Overlay
        fullScreen
        transparent={false}
        isVisible={visible}
        onBackdropPress={toggleOverlay}>
        <CreateEventModal groupObj={groupObj} />
      </Overlay>
    </>
  );
};

export default GroupeFeeds;

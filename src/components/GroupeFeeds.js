import React, { useContext } from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { AppStateContext } from '../../stateProvider';
import SignOutButton from './SignOutButton';
import { useState } from 'react';
import { Overlay } from 'react-native-elements/dist/overlay/Overlay';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import { Input } from 'react-native-elements';
import { Card, Chip } from 'react-native-elements';
import { Switch } from 'react-native-elements/dist/switch/switch';
import { ButtonGroup } from 'react-native-elements/dist/buttons/ButtonGroup';
import useGroup from '../hooks/useGroup';
import { authAction } from '../stateManager/actions/auth-A';
const GroupeFeeds = ({ navigation }) => {
  const { authContext } = useContext(AppStateContext);
  const [authState, authDispatch] = authContext; // distructuring
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const { user } = authState;
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
        <UserCard key={i} groupObj={groupObj} />
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

const UserCard = ({ groupObj }) => {
  return (
    <View>
      <Chip title={groupObj.name} />
      <Chip title={groupObj.description} />
    </View>
  );
};

const CreateGroupeModal = ({ theme }) => {
  const [but] = useState(['public', 'Private']);
  const [selectedIndex, setselectedIndex] = useState(null);
  const [description, setDescription] = useState(null);
  const [name, setName] = useState(null);
  const { error, addGroup, authDispach } = useGroup();
  return (
    <View style={{ marginBottom: 5, width: 250 }}>
      <ButtonGroup
        onPress={setselectedIndex}
        selectedButtonStyle={{ backgroundColor: 'red' }}
        selectedIndex={selectedIndex}
        buttons={but}
        buttonContainerStyle={{ backgroundColor: 'lightgrey' }}
        textStyle={{ color: 'green' }}
      />
      <Input onChangeText={setName} label="Group Name" placeholder="..." />
      <Input
        onChangeText={setDescription}
        label="description"
        placeholder="..."
      />
      <Text style={{ color: 'red', marginBottom: 10, textAlign: 'center' }}>
        {error}
      </Text>
      <Button
        containerStyle={{ backgroundColor: 'orange' }}
        onPress={() => {
          if (selectedIndex == null) {
            authDispach(authAction.failure('pls select public or private'));
            return;
          }
          addGroup({
            private: selectedIndex === 1,
            name,
            description,
          });
        }}
        title="create"
        icon={{
          name: 'send',
          size: 15,
          color: 'white',
        }}
      />
    </View>
  );
};
export default GroupeFeeds;

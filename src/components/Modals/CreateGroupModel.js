import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { ButtonGroup } from 'react-native-elements/dist/buttons/ButtonGroup';
import { Input } from 'react-native-elements/dist/input/Input';
import useGroup from '../../hooks/useGroup';
import { authAction } from '../../stateManager/actions/auth-A';

const CreateGroupeModal = () => {
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
export default CreateGroupeModal;

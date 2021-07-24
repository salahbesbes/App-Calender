import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { Input } from 'react-native-elements/dist/input/Input';
import { useEvents } from '../../hooks/useEvents';

const UpdateEvent = ({ navigation, route }) => {
  // get the params sent
  const { eventObj } = route.params;

  const { updateEvent } = useEvents();

  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);

  //? {"date": "2021-07-23", "markedDates": {"2021-07-23": {"selected": true}}

  useEffect(() => {
    setName(eventObj.name);
    setDescription(eventObj.description);
  }, [eventObj]);

  return (
    <View style={{ marginTop: 20 }}>
      <Input
        value={name}
        onChangeText={setName}
        label="Event Name"
        placeholder="..."
      />
      <Input
        value={description}
        onChangeText={setDescription}
        label="description"
        placeholder="..."
      />

      <Button
        containerStyle={{ backgroundColor: 'orange' }}
        onPress={() => {
          const { uid, groupUid } = eventObj;
          updateEvent({
            groupUid,
            uid,
            name,
            description,
          });
        }}
        title="Update"
        icon={{
          name: 'send',
          size: 15,
          color: 'white',
        }}
      />
    </View>
  );
};

export default UpdateEvent;

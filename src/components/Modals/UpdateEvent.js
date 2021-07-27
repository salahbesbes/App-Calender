import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { Input } from 'react-native-elements/dist/input/Input';
import { useEvents } from '../../hooks/useEvents';
import SelectStartEndTime from '../utils/SelectStartEndTime';

const UpdateEvent = ({ navigation, route }) => {
  // get the params sent
  const { eventObj } = route.params;

  const { updateEvent, updatePublicEvent } = useEvents();

  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);

  //? {"date": "2021-07-23", "markedDates": {"2021-07-23": {"selected": true}}

  useEffect(() => {
    setName(eventObj.name);
    setDescription(eventObj.description);
  }, [eventObj]);
  const [date, setDate] = useState(new Date());

  const [startAt, setStartAt] = useState('00:00');
  const [endAt, setEndAt] = useState('00:00');

  useEffect(() => {
    setStartAt(eventObj.startAt);
    setEndAt(eventObj.endAt);
  }, [eventObj.endAt, eventObj.startAt]);

  // console.log(`startAt`, startAt);
  // console.log(`endAt`, endAt);
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

      <SelectStartEndTime
        startAt={startAt}
        endAt={endAt}
        setStartAt={setStartAt}
        setEndAt={setEndAt}
      />
      <Button
        containerStyle={{ backgroundColor: '#e9c46a' }}
        onPress={() => {
          const { uid, groupUid } = eventObj;
          eventObj.private
            ? updateEvent({
                groupUid,
                uid,
                name,
                description,
                startAt,
                endAt,
              })
            : updatePublicEvent({
                uid,
                name,
                description,
                startAt,
                endAt,
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

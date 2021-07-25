import React, { useEffect, useState } from 'react';
import { View, Platform } from 'react-native';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { Input } from 'react-native-elements/dist/input/Input';
import { useEvents } from '../../hooks/useEvents';
import TimeSelector from '../utils/TimeSelector';
import DateTimePicker from '@react-native-community/datetimepicker';

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

  const [showStartAt, setShowStartAt] = useState(false);
  const handleStratTime = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    event.type === 'set' &&
      setStartAt(`${currentDate.getHours()}:${currentDate.getMinutes()}`);
    setShowStartAt(false);
    // setDate(selectedDate);
  };

  const [showEndAt, setShowEndAt] = useState(false);
  const handleEndTime = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    event.type === 'set' &&
      setEndAt(`${currentDate.getHours()}:${currentDate.getMinutes()}`);
    setShowEndAt(false);
  };

  console.log(`startAt`, startAt);
  console.log(`endAt`, endAt);
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
      <View style={{ flexDirection: 'row' }}>
        <Button
          containerStyle={{ backgroundColor: 'red' }}
          onPress={setShowStartAt}
          title={startAt}
        />
        <Button
          containerStyle={{ backgroundColor: 'blue' }}
          onPress={setShowEndAt}
          title={endAt}
        />
      </View>
      {showStartAt && <TimeSelector date={date} onChange={handleStratTime} />}
      {showEndAt && <TimeSelector date={date} onChange={handleEndTime} />}
      <Button
        containerStyle={{ backgroundColor: 'orange' }}
        onPress={() => {
          const { uid, groupUid } = eventObj;
          eventObj.private
            ? updateEvent({
                groupUid,
                uid,
                name,
                description,
                showStartAt,
              })
            : updatePublicEvent({
                uid,
                name,
                description,
                showStartAt,
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

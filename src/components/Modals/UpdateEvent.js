import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Overlay } from 'react-native-elements/dist/overlay/Overlay';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { Calendar } from 'react-native-calendars';
import { Input } from 'react-native-elements/dist/input/Input';
import { useEvents } from '../../hooks/useEvents';
import { AppStateContext } from '../../../stateProvider';
import DropDown from '../../components/utils/Selector';

const UpdateEvent = ({ eventObj }) => {
  const { authContext } = useContext(AppStateContext);
  const [authState, authDispach] = authContext;
  const { user } = authState;

  const { updateEvents } = useEvents();

  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [selectedDateEvent, setSelectedDateEvent] = useState({});

  //? {"date": "2021-07-23", "markedDates": {"2021-07-23": {"selected": true}}
  const [selectedGroups, setSelectedGroups] = useState([]);
  useEffect(() => {
    setName(eventObj.name);
    setDescription(eventObj.description);
  }, [eventObj]);
  return (
    <View style={{ marginBottom: 5, width: 250 }}>
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

      <DropDown items={user.myGroups} setSelectedGroups={setSelectedGroups} />
      <Button
        containerStyle={{ backgroundColor: 'orange' }}
        onPress={() => {
          updateEvents({
            ...eventObj,
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

export default UpdateEvent;

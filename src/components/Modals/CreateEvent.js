import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Overlay } from 'react-native-elements/dist/overlay/Overlay';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { Calendar } from 'react-native-calendars';
import { Input } from 'react-native-elements/dist/input/Input';
import { useEvents } from '../../hooks/useEvents';
import { AppStateContext } from '../../../stateProvider';
import DropDown from '../../components/utils/Selector';

const CreateEvent = ({ allEventsGroups }) => {
  const { authContext } = useContext(AppStateContext);
  const [authState, authDispach] = authContext;
  const { user } = authState;

  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const { createEvents } = useEvents();
  const [events, setEvents] = useState({});
  const [selectedDateEvent, setSelectedDateEvent] = useState({});

  //? {"date": "2021-07-23", "markedDates": {"2021-07-23": {"selected": true}}
  const [selectedGroups, setSelectedGroups] = useState([]);

  useEffect(() => {
    const tempEvents = {};

    // extraction all markedDates from the groupeObj
    allEventsGroups
      .map(el => el.markedDates)
      .map(obj => {
        Object.assign(tempEvents, obj);
      });
    setEvents(tempEvents);
  }, [allEventsGroups]);

  return (
    <View style={{ flex: 1 }}>
      <Calendar
        current={'2021-07-18'}
        onDayPress={day => {
          toggleOverlay();
          setSelectedDateEvent(() => {
            // update the local var selectedDateEvent
            // if we select an event and/or select any date we update this var
            // as folow =>> we need the uid of group, date,
            const datePressed = day.dateString; // '2021-07-18
            return {
              date: day,
              markedDates: { [datePressed]: { selected: true } }, // persinst this to db
            };
          });
        }}
        // markingType={'multi-dot'}
        markedDates={events} // events are fetched from db and sent here
      />
      <Overlay
        fullScreen
        transparent={false}
        isVisible={visible}
        onBackdropPress={toggleOverlay}>
        <View style={{ marginBottom: 5, width: 250 }}>
          <Input onChangeText={setName} label="Event Name" placeholder="..." />
          <Input
            onChangeText={setDescription}
            label="description"
            placeholder="..."
          />

          <DropDown
            items={user.myGroups}
            setSelectedGroups={setSelectedGroups}
          />
          <Button
            containerStyle={{ backgroundColor: 'orange' }}
            onPress={() => {
              selectedGroups.map(gr => {
                createEvents({
                  ...selectedDateEvent,
                  createdBy: user.name,
                  creatorUid: user.uid,
                  groupName: gr.name,
                  groupUid: gr.uid,
                  groups: selectedGroups.map(group => group.uid),
                  name,
                  description,
                });
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
      </Overlay>
    </View>
  );
};
export default CreateEvent;

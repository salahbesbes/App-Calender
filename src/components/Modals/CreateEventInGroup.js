import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Overlay } from 'react-native-elements/dist/overlay/Overlay';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { Calendar } from 'react-native-calendars';
import { Card } from 'react-native-elements';
import { Input } from 'react-native-elements/dist/input/Input';
import useGroup from '../../hooks/useGroup';
import { v4 as uuidv4 } from 'uuid';
import { useEvents } from '../../hooks/useEvents';
import EventDescription from '../Cards/EventDescription';
import { AppStateContext } from '../../../stateProvider';
import SelectStartEndTime from '../utils/SelectStartEndTime';

const CreateEventForGroup = ({ groupObj }) => {
  const { authContext } = useContext(AppStateContext);
  const [authState, authDispach] = authContext;
  const { user } = authState;

  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const [events, setEvents] = useState({});
  useEffect(() => {
    const tempEvents = {};
    // extraction all markedDates from the groupeObj
    console.log(`groupObj.events`, groupObj.events?.length);
    groupObj.events
      ?.map(el => el.markedDates)
      .map(obj => {
        Object.assign(tempEvents, obj);
      });
    setEvents(tempEvents);
  }, [groupObj.events]);

  const [selectedDateEvent, setSelectedDateEvent] = useState({});

  //? groupObj.events ==> [{name:'event1', description:'descr', date='2021-07-23',markedDates={'2021-07-23': {selected: true}}]
  return (
    <View style={{ flex: 1 }}>
      <Calendar
        current={'2021-07-20'}
        onDayPress={day => {
          setSelectedDateEvent(() => {
            // update the local var selectedDateEvent
            // if we select an event and/or select any date we update this var
            // as folow =>> we need the uid of group, date,
            const datePressed = day.dateString; // '2021-07-18
            const foundEventsAtThisDaySelected =
              groupObj.events?.filter(
                el => el.date?.dateString === datePressed,
              ) || [];
            return {
              events: foundEventsAtThisDaySelected, // this can be empty
              date: day,
              groupUid: groupObj.uid,
              groupName: groupObj.name,
              createdBy: user.name,
              creatorUid: user.uid,
              private: true,
              markedDates: { [datePressed]: { selected: true } }, // persinst this to db
            };
          });
          toggleOverlay(); // open modal
        }}
        markingType={'multi-dot'}
        markedDates={events} // events are fetched from db and sent here
      />
      <Overlay
        fullScreen
        transparent={false}
        isVisible={visible}
        onBackdropPress={toggleOverlay}>
        <CreateEventModal
          daySelected={selectedDateEvent}
          setDaySelected={setSelectedDateEvent}
        />
      </Overlay>
    </View>
  );
};

const CreateEventModal = ({ daySelected, setDaySelected }) => {
  const { authContext } = useContext(AppStateContext);
  const [authState, authDispach] = authContext;
  const { loading } = authState;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const { createEvents } = useEvents();
  const [startAt, setStartAt] = useState('00:00');
  const [endAt, setEndAt] = useState('00:00');

  return (
    <ScrollView containerStyle={{ width: 250, justifyContent: 'center' }}>
      <Button
        title="create event"
        containerStyle={{ backgroundColor: '#e76f51' }}
        onPress={toggleOverlay}
      />
      <EventDescription daySelected={daySelected} />

      <Overlay
        presentationStyle="fullScreen"
        transparent={false}
        isVisible={visible}
        onBackdropPress={toggleOverlay}>
        <View style={{ width: 250 }}>
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
        </View>
        <SelectStartEndTime
          startAt={startAt}
          endAt={endAt}
          setStartAt={setStartAt}
          setEndAt={setEndAt}
        />
        <Button
          loading={loading}
          containerStyle={{ backgroundColor: 'orange' }}
          title="create"
          onPress={() => {
            const { events, ...others } = daySelected;
            const newEvent = {
              startAt,
              endAt,
              name,
              description,
              ...others,
            };
            // update local variable selectedDateEvent ==> its initilyy obj
            // update only the events attribute
            setDaySelected(prevState => {
              return { ...prevState, events: [...prevState.events, newEvent] };
            });

            // update fireBase
            createEvents(newEvent);
          }}
        />
      </Overlay>
    </ScrollView>
  );
};

export default CreateEventForGroup;

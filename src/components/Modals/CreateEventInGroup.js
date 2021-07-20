import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Overlay } from 'react-native-elements/dist/overlay/Overlay';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { Calendar } from 'react-native-calendars';
import { Card } from 'react-native-elements';
import { Input } from 'react-native-elements/dist/input/Input';
import useGroup from '../../hooks/useGroup';
import { v4 as uuidv4 } from 'uuid';

const CreateEvent = ({ groupObj }) => {
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const [events, setEvents] = useState({});
  useEffect(() => {
    const tempEvents = {};

    // extraction all markedDates from the groupeObj
    groupObj.events
      .map(el => el.markedDates)
      .map(obj => {
        Object.assign(tempEvents, obj);
      });
    setEvents(tempEvents);
  }, [groupObj]);

  const [selectedDateEvent, setSelectedDateEvent] = useState({});

  //? groupObj.events ==> [{name:'event1', description:'descr', date='2021-07-23',markedDates={'2021-07-23': {selected: true}}]
  return (
    <View style={{ flex: 1 }}>
      <Calendar
        current={'2021-07-18'}
        onDayPress={day => {
          setSelectedDateEvent(() => {
            // update the local var selectedDateEvent
            // if we select an event and/or select any date we update this var
            // as folow =>> we need the uid of group, date,
            const datePressed = day.dateString; // '2021-07-18
            const foundEventsAtThisDaySelected =
              groupObj.events.filter(
                el => el.date?.dateString === datePressed,
              ) || [];
            return {
              events: foundEventsAtThisDaySelected, // this can be empty
              date: day,
              uid: uuidv4(), // create an dentifier for the event
              groupUid: groupObj.uid,
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
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const { updateGroup } = useGroup();
  return (
    <ScrollView containerStyle={{ width: 250, justifyContent: 'center' }}>
      <Button
        title="create event"
        containerStyle={{ backgroundColor: 'orange' }}
        onPress={toggleOverlay}
      />
      <EventDescription daySelected={daySelected} />

      <Overlay
        fullScreen
        transparent={false}
        isVisible={visible}
        onBackdropPress={toggleOverlay}>
        <>
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
        </>
        <Button
          containerStyle={{ backgroundColor: 'orange' }}
          title="create"
          onPress={() => {
            const { events, ...others } = daySelected;
            const newEvent = {
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
            updateGroup(newEvent);
          }}
        />
      </Overlay>
    </ScrollView>
  );
};

const EventDescription = ({ daySelected }) => {
  return daySelected?.events?.length === 0 ? (
    <View>
      <Text> No Events </Text>
    </View>
  ) : (
    daySelected.events.map((el, i) => (
      <ScrollView key={i} contentContainerStyle={{}}>
        <Card>
          <Card.Title>{el.name}</Card.Title>
          <Card.Divider />
          <Text style={{ marginBottom: 10 }}>{el.description}</Text>
        </Card>
      </ScrollView>
    ))
  );
};

export default CreateEvent;

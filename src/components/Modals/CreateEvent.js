import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Overlay } from 'react-native-elements/dist/overlay/Overlay';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { Calendar } from 'react-native-calendars';
import { Card } from 'react-native-elements';
import { Input } from 'react-native-elements/dist/input/Input';
import useGroup from '../../hooks/useGroup';

const CreateEvent = ({ allEventsGroups }) => {
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const [events, setEvents] = useState({});

  //? {"date": "2021-07-23", "markedDates": {"2021-07-23": {"selected": true}}
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
          // setSelectedDateEvent(() => {
          // update the local var selectedDateEvent
          // if we select an event and/or select any date we update this var
          // as folow =>> we need the uid of group, date,
          // const datePressed = day.dateString; // '2021-07-18
          // const foundEventsAtThisDaySelected =
          //   groupObj.events.filter(el => el.date === datePressed) || [];
          // return {
          //   events: foundEventsAtThisDaySelected, // this can be empty
          //   date: datePressed,
          //   uid: groupObj.uid,
          //   markedDates: { [datePressed]: { selected: true } }, // persinst this to db
          // };
          // });
        }}
        // markingType={'multi-dot'}
        markedDates={events} // events are fetched from db and sent here
      />
      <Overlay
        fullScreen
        transparent={false}
        isVisible={visible}
        onBackdropPress={toggleOverlay}></Overlay>
    </View>
  );
};
export default CreateEvent;

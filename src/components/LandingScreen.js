import { Overlay } from 'react-native-elements';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Button } from 'react-native-elements/dist/buttons/Button';
import CreateEvent from './Modals/CreateEvent';
import { useLandingScreen } from '../hooks/useLandingScreen';
import { AppStateContext } from '../../stateProvider';
import EventCard from './Cards/EventCard';

// const savedEvents = [
//   {
//     name: 'Amy Farha',
//     groupName: 'group 1',
//     day: '26',
//     month: '07',
//     markedDates: { '2021-07-26': { selected: true, marked: true } },
//   },
//   {
//     name: 'Chris Jackson',
//     groupName: 'group 2',
//     day: '27',
//     month: '07',
//     markedDates: { '2021-07-27': { selected: true, marked: true } },
//   },
// ]

const LandingScreen = ({ navigation }) => {
  const { authContext } = useContext(AppStateContext);
  const [authState, authDispach] = authContext;
  const { allEvents } = authState;

  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const { listenOnEvents, ListenOnProfileChanges } = useLandingScreen();

  // every time the component rendrs we execute the profile listner checking for updates
  useEffect(() => {
    const unsubscribeProfile = ListenOnProfileChanges();
    return unsubscribeProfile;
  }, [ListenOnProfileChanges]);

  // useEffect(() => {
  //   const unsubscribeAllEvents = listenOnEvents();
  //   return unsubscribeAllEvents;
  // }, [listenOnEvents]);

  return (
    <>
      <Button
        containerStyle={{ backgroundColor: 'orange', marginVertical: 10 }}
        title="create an event"
        onPress={toggleOverlay}
      />

      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={allEvents}
        renderItem={({ item }) => (
          <EventCard navigation={navigation} eventObj={item} />
        )}
      />

      <Overlay
        fullScreen
        transparent={false}
        isVisible={visible}
        onBackdropPress={toggleOverlay}>
        <CreateEvent allEventsGroups={allEvents} />
      </Overlay>
    </>
  );
};

export default LandingScreen;

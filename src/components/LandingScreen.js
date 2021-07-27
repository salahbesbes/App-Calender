import { Overlay } from 'react-native-elements';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
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
  const { allEvents, publicEvents } = authState;
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const { ListenOnProfileChanges } = useLandingScreen();

  // every time the component rendrs we execute the profile listner checking for updates
  useEffect(() => {
    const unsubscribeProfile = ListenOnProfileChanges();
    return unsubscribeProfile;
  }, [ListenOnProfileChanges]);

  return (
    <>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Button
          containerStyle={{
            backgroundColor: '#2a9d8f',
            marginVertical: 10,
            flex: 1,
            marginHorizontal: 5,
          }}
          title="Private Events"
          onPress={() => {
            navigation.navigate('AllEvents');
          }}
        />
        <Button
          containerStyle={{
            flex: 1,
            backgroundColor: '#264653',
            marginVertical: 10,
            marginHorizontal: 5,
          }}
          title="create an event"
          onPress={toggleOverlay}
        />
      </View>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={publicEvents}
        renderItem={({ item }) => (
          <EventCard navigation={navigation} eventObj={item} />
        )}
      />

      <Overlay
        fullScreen
        transparent={false}
        isVisible={visible}
        onBackdropPress={toggleOverlay}>
        <CreateEvent allEvents={[...allEvents, ...publicEvents]} />
      </Overlay>
    </>
  );
};

export default LandingScreen;

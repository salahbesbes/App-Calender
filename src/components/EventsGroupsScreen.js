import React, { useContext, useState } from 'react';
import { FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import { Overlay } from 'react-native-elements/dist/overlay/Overlay';
import { AppStateContext } from '../../stateProvider';
import EventCard from './Cards/EventCard';
import CreateEvent from './Modals/CreateEvent';

const EventsGroupsScreen = ({ navigation }) => {
  const { authContext } = useContext(AppStateContext);
  const [authState, authDispach] = authContext;
  const { allEvents, publicEvents } = authState;

  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <>
      <Button
        buttonStyleStyle={{
          backgroundColor: '#e76f51',
          marginVertical: 10,
          marginHorizontal: 5,
        }}
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
        <CreateEvent allEvents={[...allEvents, ...publicEvents]} />
      </Overlay>
    </>
  );
};

export default EventsGroupsScreen;

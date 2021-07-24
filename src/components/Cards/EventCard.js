import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { Overlay } from 'react-native-elements/dist/overlay/Overlay';
import { AppStateContext } from '../../../stateProvider';
import { useEvents } from '../../hooks/useEvents';
import UpdateEvent from '../Modals/UpdateEvent';

const EventCard = ({ eventObj, navigation }) => {
  const { authContext } = useContext(AppStateContext);
  const [authState, authDispach] = authContext;
  const { user, allEvents } = authState;
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const { removeEvent } = useEvents();
  return (
    <>
      <ListItem bottomDivider onPress={() => {}}>
        <DateItem date={eventObj.date} />
        <ListItem.Content>
          <ListItem.Title>{eventObj.name}</ListItem.Title>
          <ListItem.Subtitle>{eventObj.groupName}</ListItem.Subtitle>
          <ListItem.Content>
            <Text> description: {eventObj.description}</Text>
            <Text> createdBy: {eventObj.createdBy}</Text>
          </ListItem.Content>
        </ListItem.Content>
        {user.uid === eventObj.creatorUid && (
          <>
            <TouchableOpacity
              onPress={() => {
                // passing eventObj as params to the Component
                navigation.navigate('UpdateEvent', { eventObj });
              }}
              style={styles.roundButton}>
              <Icon name="edit" type="Material" color="lightblue" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={toggleOverlay}
              style={styles.roundButton}>
              <Icon
                name="close"
                type="Material"
                color="red"
                onPress={() => {
                  const { uid, groupUid } = eventObj;
                  removeEvent({ uid, groupUid });
                }}
              />
            </TouchableOpacity>
          </>
        )}
      </ListItem>
      <Overlay fullScreen isVisible={visible} onBackdropPress={toggleOverlay}>
        <UpdateEvent eventObj={eventObj} />
      </Overlay>
    </>
  );
};
const DateItem = ({ date }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const selectedDate = new Date(date.dateString);

  const towDigit = str => {
    return parseInt(str, 10) > 9
      ? '' + parseInt(str, 10)
      : '0' + parseInt(str, 10);
  };

  return (
    <View style={{ width: 60, height: 60, backgroundColor: 'grey' }}>
      <Text style={{ textAlign: 'center', fontSize: 25 }}> {date.day} </Text>
      <Text style={{ textAlign: 'center', fontSize: 15 }}>
        {days[selectedDate.getDay()]} {towDigit(date.month)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mv: {
    paddingVertical: 5,
  },
  remove: {
    color: 'white',
    fontWeight: 'bold',
  },
  roundButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
});

export default EventCard;

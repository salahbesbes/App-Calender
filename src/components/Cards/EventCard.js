import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { Overlay } from 'react-native-elements/dist/overlay/Overlay';
import UpdateEvent from '../Modals/UpdateEvent';

const EventCard = ({ item, user }) => {
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <>
      <ListItem bottomDivider onPress={toggleOverlay}>
        <DateItem date={item.date} />
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.groupName}</ListItem.Subtitle>
          <ListItem.Content>
            <Text> description: {item.description}</Text>
            <Text> createdBy: {item.createdBy}</Text>
            <Text> itemuid: {item.uid}</Text>
          </ListItem.Content>
        </ListItem.Content>
        <Icon
          name="close"
          type="ionicon"
          color="red"
          onPress={async () => {}}
        />
      </ListItem>
      <Overlay
        fullScreen
        transparent={false}
        isVisible={visible}
        onBackdropPress={toggleOverlay}>
        <UpdateEvent eventObj={item} />
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
export default EventCard;

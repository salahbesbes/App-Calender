import { ListItem, Avatar, Overlay } from 'react-native-elements';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { Calendar } from 'react-native-calendars';
import CreateEvent from './Modals/CreateEvent';
import { useLandingScreen } from '../hooks/useLandingScreen';
import { AppStateContext } from '../../stateProvider';
import { v4 as uuidv4 } from 'uuid';
const savedEvents = [
  {
    name: 'Amy Farha',
    groupName: 'group 1',
    day: '26',
    month: '07',
    markedDates: { '2021-07-26': { selected: true, marked: true } },
  },
  {
    name: 'Chris Jackson',
    groupName: 'group 2',
    day: '27',
    month: '07',
    markedDates: { '2021-07-27': { selected: true, marked: true } },
  },
  {
    name: 'salah besbes',
    groupName: 'group 3',
    day: '28',
    month: '07',
    dotColor: 'red',
    markedDates: { '2021-07-28': { selected: true, marked: true } },
  },
  {
    name: 'ahmed besbes',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    groupName: 'group 4',
    day: '29',
    month: '07',
    markedDates: { '2021-07-29': { selected: true, marked: true } },
  },
];

const LandingScreen = () => {
  const { authContext } = useContext(AppStateContext);
  const [authState, authDispach] = authContext;
  const { user } = authState;

  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  return (
    <>
      <Button
        containerStyle={{ backgroundColor: 'orange', marginVertical: 10 }}
        title="create an event"
        onPress={toggleOverlay}
      />

      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={user.myEvents}
        renderItem={RenderItem}
      />

      <Overlay
        fullScreen
        transparent={false}
        isVisible={visible}
        onBackdropPress={toggleOverlay}>
        <CreateEvent allEventsGroups={user.myEvents} />
      </Overlay>
    </>
  );
};

const RenderItem = ({ item }) => {
  return (
    <ListItem bottomDivider>
      <DateItem date={item.date} />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.groupName}</ListItem.Subtitle>
        <ListItem.Content>
          <Text> description: {item.description}</Text>
        </ListItem.Content>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
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

export default LandingScreen;

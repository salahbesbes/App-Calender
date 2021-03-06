/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Overlay } from 'react-native-elements/dist/overlay/Overlay';
import { Button } from 'react-native-elements';
import { Calendar } from 'react-native-calendars';
import { Input } from 'react-native-elements/dist/input/Input';
import { useEvents } from '../../hooks/useEvents';
import { AppStateContext } from '../../../stateProvider';
import DropDown from '../../components/utils/Selector';
import { ButtonGroup } from 'react-native-elements/dist/buttons/ButtonGroup';
import SelectStartEndTime from '../utils/SelectStartEndTime';
import { useWeather } from '../utils/wheatherApi';
import { Badge, ListItem } from 'react-native-elements';

const CreateEvent = ({ allEvents }) => {
  const { authContext } = useContext(AppStateContext);
  const [authState, authDispach] = authContext;
  const { user } = authState;

  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const { createEvents, createPublicEvent, loading } = useEvents();
  const [events, setEvents] = useState({});

  const { handelWeatherApi } = useWeather();
  const [selectedDateEvent, setSelectedDateEvent] = useState([]);

  const [startAt, setStartAt] = useState('00:00');
  const [endAt, setEndAt] = useState('00:00');

  //? {"date": "2021-07-23", "markedDates": {"2021-07-23": {"selected": true}}
  const [selectedGroups, setSelectedGroups] = useState([]);

  const [data] = useState(['public', 'Private']);
  const [selectedIndex, setselectedIndex] = useState(null);

  const [sevenDaysWheather, setSevenDaysWheather] = useState([]);
  useEffect(() => {
    const tempEvents = {};

    // extraction all markedDates from the groupeObj
    allEvents
      ?.map(el => el.markedDates)
      .map(obj => {
        Object.assign(tempEvents, obj);
      });
    setEvents(tempEvents);
  }, [allEvents]);

  useEffect(() => {
    const fetchWeather = async () => {
      let castToArray = [];
      const weatherObj = await handelWeatherApi();
      for (const key in weatherObj) {
        const element = { date: key, ...weatherObj[key] };
        castToArray.push(element);
      }
      return castToArray;
    };
    fetchWeather().then(dailyTemp => setSevenDaysWheather(dailyTemp));
  }, [handelWeatherApi]);
  console.log(`sevenDaysWheather.length`, sevenDaysWheather.length);
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
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 10,
          paddingVertical: 10,
        }}>
        <Text style={{ fontSize: 25, color: '#b5838d', fontWeight: 'bold' }}>
          Temprature for 7 Days Ahead
        </Text>
      </View>
      <ScrollView>
        {sevenDaysWheather.map((el, i) => (
          <ListItem key={i} bottomDivider>
            <ListItem.Content
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <ListItem.Title style={{ fontSize: 25 }}>
                {el.date}
              </ListItem.Title>
              <ListItem.Content>
                <View style={{ flexDirection: 'row', marginLeft: 30 }}>
                  <Button
                    title={`Day:${(el?.day - 273).toFixed(1)}`}
                    buttonStyle={{
                      backgroundColor: '#cb997e',
                      marginHorizontal: 5,
                    }}
                  />
                  <Button
                    buttonStyle={{
                      backgroundColor: '#ddbea9',
                      marginHorizontal: 5,
                    }}
                    title={`Eve:${(el?.eve - 273).toFixed(1)}`}
                  />
                </View>

                {/* <Text> {`day : ${(el.day - 273.15).toFixed(0)}`} </Text>
                  <Text> {`eve : ${(el.eve - 273.15).toFixed(0)}`} </Text> */}
              </ListItem.Content>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
      <Overlay
        presentationStyle="fullScreen"
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
          <ButtonGroup
            onPress={setselectedIndex}
            selectedButtonStyle={{ backgroundColor: '#ffb703' }}
            selectedIndex={selectedIndex}
            buttons={data}
            buttonContainerStyle={{ backgroundColor: 'lightgrey' }}
            textStyle={{ color: 'green' }}
          />
          <SelectStartEndTime
            startAt={startAt}
            endAt={endAt}
            setStartAt={setStartAt}
            setEndAt={setEndAt}
          />
          {selectedIndex === 1 && (
            <>
              <DropDown
                items={user.myGroups}
                setSelectedGroups={setSelectedGroups}
              />
            </>
          )}
          <Button
            containerStyle={{ backgroundColor: '#dda15e' }}
            onPress={() => {
              selectedIndex === 1
                ? selectedGroups.map(gr => {
                    createEvents({
                      ...selectedDateEvent,
                      createdBy: user.name,
                      creatorUid: user.uid,
                      groupName: gr.name,
                      groupUid: gr.uid,
                      private: true,
                      startAt,
                      endAt,
                      name,
                      description,
                    });
                  })
                : createPublicEvent({
                    ...selectedDateEvent,
                    createdBy: user.name,
                    creatorUid: user.uid,
                    private: false,
                    startAt,
                    endAt,
                    name,
                    description,
                  });
            }}
            title="create"
            loading={loading}
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

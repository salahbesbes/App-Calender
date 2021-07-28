import React, { useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements/dist/buttons/Button';
import TimeSelector from './TimeSelector';

const SelectStartEndTime = ({ setStartAt, setEndAt, startAt, endAt }) => {
  const [date, setDate] = useState(new Date());
  const [showStartAt, setShowStartAt] = useState(false);

  const towDigit = str => {
    return parseInt(str, 10) > 9
      ? '' + parseInt(str, 10)
      : '0' + parseInt(str, 10);
  };

  const handleStratTime = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    event.type === 'set' &&
      setStartAt(
        `${towDigit(currentDate.getHours().toString())}:${towDigit(
          currentDate.getMinutes().toString(),
        )}`,
      );
    setShowStartAt(false);
  };

  const [showEndAt, setShowEndAt] = useState(false);
  const handleEndTime = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    event.type === 'set' &&
      setEndAt(
        `${towDigit(currentDate.getHours().toString())}:${towDigit(
          currentDate.getMinutes().toString(),
        )}`,
      );
    setShowEndAt(false);
  };

  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <Button
          containerStyle={{
            backgroundColor: '#f4a261',
            width: 100,
            flex: 1,
            // minHeight: 35,
            marginVertical: 10,
            marginHorizontal: 5,
          }}
          onPress={setShowStartAt}
          title={`start: ${startAt}`}
        />
        <Button
          containerStyle={{
            backgroundColor: '#e76f51',
            width: 100,
            flex: 1,
            // minHeight: 35,
            marginVertical: 10,
            marginHorizontal: 5,
          }}
          onPress={setShowEndAt}
          title={`end: ${endAt}`}
        />
      </View>
      {showStartAt && <TimeSelector date={date} onChange={handleStratTime} />}
      {showEndAt && <TimeSelector date={date} onChange={handleEndTime} />}
    </View>
  );
};

export default SelectStartEndTime;

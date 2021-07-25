import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

const TimeSelector = ({ date, onChange }) => {
  return (
    <DateTimePicker
      testID="dateTimePicker"
      value={new Date()}
      mode={'time'}
      is24Hour={true}
      display="default"
      onChange={onChange}
    />
  );
};
export default TimeSelector;

import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Card } from 'react-native-elements';

const EventDescription = ({ daySelected }) => {
  return daySelected?.events?.length === 0 ? (
    <View>
      <Text> No Events </Text>
    </View>
  ) : (
    daySelected.events.map((el, i) => (
      <ScrollView key={i} contentContainerStyle={{}}>
        <Card>
          <Card.Title>{el.name}</Card.Title>
          <Card.Divider />
          <Text style={{ marginBottom: 10 }}>{el.description}</Text>
        </Card>
      </ScrollView>
    ))
  );
};
export default EventDescription;

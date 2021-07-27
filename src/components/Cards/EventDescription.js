import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Card } from 'react-native-elements';

const EventDescription = ({ daySelected }) => {
  return daySelected?.events?.length === 0 ? (
    <View
      style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
      <Text> No Events To Display</Text>
    </View>
  ) : (
    daySelected.events.map((el, i) => (
      <ScrollView key={i} contentContainerStyle={{}}>
        <Card>
          <Card.Title>EventName: {el.name}</Card.Title>
          <Card.Divider />
          <Text style={{ marginBottom: 10 }}>createdBy: {el.createdBy}</Text>
          <Text style={{ marginBottom: 10 }}>date: {el.date?.dateString}</Text>
          <Text style={{ marginBottom: 10 }}>
            startAt: {el.startAt || 'undefined'}
          </Text>
          <Text style={{ marginBottom: 10 }}>
            endAt: {el.endAt || 'undefined'}
          </Text>
          <Text style={{ marginBottom: 10 }}>
            description: {el.description}
          </Text>
        </Card>
      </ScrollView>
    ))
  );
};
export default EventDescription;

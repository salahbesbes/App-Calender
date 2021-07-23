import React, { useContext, useState } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { Card, Overlay } from 'react-native-elements';
import CreateEventForGroup from '../Modals/CreateEventInGroup';

const GroupCard = ({ groupObj, navigation }) => {
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          toggleOverlay();
        }}>
        <Card>
          <Card.Title>{groupObj.name}</Card.Title>
          <Card.Divider />
          <Text style={{ marginBottom: 10 }}>{groupObj.description}</Text>
        </Card>
      </TouchableOpacity>
      <Overlay
        fullScreen
        transparent={false}
        isVisible={visible}
        onBackdropPress={toggleOverlay}>
        <CreateEventForGroup groupObj={groupObj} />
      </Overlay>
    </>
  );
};

export default GroupCard;

import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppStateContext } from '../../stateProvider';
import SignOutButton from './SignOutButton';

const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={label}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.button]}>
            <Text
              style={[
                styles.textStyle,
                {
                  color: isFocused ? 'white' : '#22A826',
                },
              ]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const ProfileNavigation = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <SignOutButton navigation={navigation} />,
    });
  }, [navigation]);

  const { authContext } = useContext(AppStateContext);
  const [userState, userDispatch] = authContext;
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="Profile">
        {props => (
          <View>
            <Text> Profile </Text>
          </View>
        )}
      </Tab.Screen>
      <Tab.Screen name="Friends">
        {props => (
          <View>
            <Text> friends </Text>
          </View>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
export default ProfileNavigation;

const styles = StyleSheet.create({
  textStyle: { fontSize: 15, fontWeight: 'bold' },
  button: {
    borderRightWidth: 1,
    borderColor: 'grey',
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#286D11',
  },
});

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
//@ts-check

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Utils from './scripts/utils';
import Constants from './res/values/constants';
import {Provider} from 'react-redux';
import Store from './scripts/redux/store';
import {useReduxDevToolsExtension} from '@react-navigation/devtools';
const Tab = createBottomTabNavigator();
function setTabs() {
  let arr = Utils.constructTabNames('english');
  const items = [];
  arr.forEach((e) => {
    items.push(
      <Tab.Screen
        key={Math.random()}
        name={e.name}
        component={e.comp}
        options={{
          title: e.title,
        }}
      />,
    );
  });
  return items;
}

const App = () => {
  const navRef = React.useRef();
  useReduxDevToolsExtension(navRef);

  return (
    <Provider store={Store}>
      <NavigationContainer ref={navRef} theme={Constants.MyTheme}>
        <Tab.Navigator
          initialRouteName={'Home'}
          tabBarOptions={{
            labelStyle: {
              fontSize: 16,
            },
            activeTintColor: '#333333',
            inactiveTintColor: 'gray',
          }}
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) =>
              Utils.setTabIcons(route.name, focused, color, size),
          })}>
          {setTabs()}
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

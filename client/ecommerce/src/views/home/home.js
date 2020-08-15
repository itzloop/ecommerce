//@ts-check

import React from 'react';
import {View, Text, Button} from 'react-native';
import Utils from '../../scripts/utils';
const Home = () => {
  return (
    <View>
      <Text>This is the Home page</Text>
      <Button
        title="click me"
        onPress={() => {
          loading().next().value.then(console.log);
        }}></Button>
    </View>
  );
};

function* loading() {
  yield Utils.getData('settings', true).then((val) => {
    return val;
  });
}

export default Home;

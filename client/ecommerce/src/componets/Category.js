// @ts-check

import React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import Colors from '../res/values/colors';
const Category = ({item}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{item.description}</Text>
      <Pressable onPress={() => showProducts(item.name)}>
        <Text style={styles.seeAllText}>See All</Text>
      </Pressable>
    </View>
  );
};

const showProducts = (category) => {
  console.log(category);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 30,
    marginTop: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  text: {
    fontWeight: 'bold',
    paddingLeft: 20,
  },
  seeAllText: {
    color: Colors.COLOR_BLUE,
    paddingRight: 20,
  },
});

export default Category;

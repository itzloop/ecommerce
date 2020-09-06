//@ts-check
import React from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import Colors from '../res/values/colors';

const Product = ({item, colnum, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      style={{...styles.container, width: 100 / colnum + '%'}}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={
            item.thumbnail
              ? {uri: item.thumbnail}
              : require('../res/images/sample.jpg')
          }
        />
      </View>
      <Text style={styles.name}>{item.name}</Text>
      {item.discount != 0 ? (
        <Discount
          style={styles.discount}
          price={item.price}
          discount={item.discount}
        />
      ) : (
        <Text style={styles.price}>{item.price}</Text>
      )}
    </Pressable>
  );
};

const Discount = ({style, price, discount}) => {
  const discountPrice = price * (1 - discount);

  return (
    <View style={styles.discountPrecentage}>
      <Text style={styles.discountPrice}>{discountPrice}</Text>
      <Text style={styles.realPrice}>{price}</Text>
      <Text style={styles.discountPrecentageText}>%{discount * 100}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 256,
    width: 256,
  },
  image: {
    width: '100%',
    resizeMode: 'contain',
  },
  name: {
    alignSelf: 'flex-start',
    paddingLeft: '10%',
    paddingTop: '20%',
  },
  price: {
    width: '100%',
    paddingTop: '10%',
    paddingBottom: '10%',
    paddingLeft: '10%',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  discountPrice: {
    paddingTop: '10%',
    paddingLeft: '10%',
    fontWeight: 'bold',
  },
  realPrice: {
    paddingLeft: '10%',
    color: Colors.COLOR_GRAY_DARK,
    textDecorationLine: 'line-through',
  },
  discount: {},
  discountPrecentage: {
    flex: 1,
    width: '100%',
  },
  discountPrecentageText: {
    position: 'absolute',
    top: '50%',
    right: '10%',
    backgroundColor: Colors.COLOR_RED,
    color: Colors.COLOR_WHITE,
    borderRadius: 30,
    textAlign: 'center',
    width: 40,
  },
});

export default Product;

import {ToastAndroid} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import AsyncStorage from '@react-native-community/async-storage';
import Constants from '../res/values/constants';
import Home from '../views/home/home';
import Categories from '../views/categories/categories';
import Profile from '../views/profile/index';
import Cart from '../views/cart/cart';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';

export default class Utils {
  static async paste() {
    const text = await Clipboard.getString();
    return text;
  }

  static async copy(text) {
    Clipboard.setString(text);
    ToastAndroid.show('Copied!', ToastAndroid.SHORT);
  }

  static async *initializeData() {
    try {
      for (key in Constants.defaultData) {
        await storeData(key, defaultData[key]);
        yield key;
      }
    } catch (e) {
      console.log(e);
    }
  }

  static async storeData(key, value) {
    try {
      let val;
      if (typeof value === 'object') val = JSON.stringify(value);
      else val = value;
      await AsyncStorage.setItem(key, val);
    } catch (e) {
      console.log(e);
    }
  }

  static async getData(key, isObject) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null
        ? isObject
          ? JSON.parse(jsonValue)
          : jsonValue
        : null;
    } catch (e) {
      return e;
    }
  }

  static setTabIcons(name, focused, color, size) {
    let ltrTabNames = Constants.languages.english.strings.tabNames;

    switch (name) {
      case ltrTabNames.home:
        return (
          <Ionicons
            name={focused ? 'home' : 'home-outline'}
            size={size}
            color={color}
          />
        );
      case ltrTabNames.categories:
        return (
          <Ionicons
            name={focused ? 'grid' : 'grid-outline'}
            size={size}
            color={color}
          />
        );
      case ltrTabNames.cart:
        return (
          <Ionicons
            name={focused ? 'cart' : 'cart-outline'}
            size={size}
            color={color}
          />
        );
      case ltrTabNames.profile:
        return (
          <Ionicons
            name={focused ? 'person' : 'person-outline'}
            size={size}
            color={color}
          />
        );
    }
  }

  /**
   * @param {string} language
   */
  static constructTabNames(language) {
    let lang = Constants.languages[language];
    if (lang) {
      let titles = lang.strings.tabTitles;
      let names = lang.strings.tabNames;
      let arr = [
        {
          name: names.profile,
          title: titles.profile,
          comp: Profile,
        },
        {
          name: names.cart,
          title: titles.cart,
          comp: Cart,
        },
        {
          name: names.categories,
          title: titles.categories,
          comp: Categories,
        },
        {
          name: names.home,
          title: titles.home,
          comp: Home,
        },
      ];

      return lang.dir === 'rtl' ? arr : arr.reverse();
    }
  }
}

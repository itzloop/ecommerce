//@ts-check

import Strings from './strings';
import Colors from './colors';
import {DefaultTheme} from '@react-navigation/native';
export default class Constants {
  static storageKeys = {
    settings: 'settings',
    auth: 'auth',
  };

  static languages = {
    farsi: {
      dir: 'rtl',
      name: 'fa',
      strings: Strings.farsi,
    },
    english: {
      dir: 'ltr',
      name: 'en',
      strings: Strings.english,
    },
  };

  static defaultData = {
    settings: {
      language: 'farsi',
    },
  };

  static MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: Colors.COLOR_BACKGROUND,
      border: Colors.COLOR_GRAY_DARK,
    },
  };
}

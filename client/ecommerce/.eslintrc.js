module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['import'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        alias: {
          _values: './src/res/values',
          _scripts: './src/scripts',
        },
      },
    },
  },
};

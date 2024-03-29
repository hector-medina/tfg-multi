const config = {
    preset: 'jest-expo',
    transformIgnorePatterns: [
        'node_modules/(?!((jest-)?react-native(-.*)?|@rneui/?|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|react-redux|@react-native-async-storage/async-storage)',      ],
      transform: {
        '^.+\\.[jt]sx?$': 'babel-jest',
      },
};
module.exports = config;
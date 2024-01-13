const config = {
    preset: 'jest-expo',
    transformIgnorePatterns: [
      'node_modules/(?!((jest-)?react-native(-.*)?|@react-native(-community)?|@rneui)/)'
    ],
      transform: {
        '^.+\\.[jt]sx?$': 'babel-jest',
      },
};
module.exports = config;
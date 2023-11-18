/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const App = () => {
  const [data, setData] = React.useState('');
  // const [workStatus, setWorkStatus] = React.useState('ON');
  const workFunction = () => {
    console.log('hello');
  };

  const gettingPosition = setInterval(() => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(
          'native func',
          position.coords.latitude,
          position.coords.longitude,
        );
        setData(position.coords.longitude);
      },

      error => {
        console.error(error.code, error.message);
      },
      // {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, 3000);

  const setPositionToSate = () => {
    gettingPosition;
  };

  React.useEffect(() => {
    setPositionToSate();
  }, [data]);

  setTimeout(() => {
    clearInterval(gettingPosition); // Stop the interval
    // setWorkStatus('OFF');
  }, 10000);

  // setInterval(() => workFunction(), 3000);
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View>
        <Text>{data}</Text>
        {/* <Text>{workStatus}</Text> */}
      </View>
    </View>
  );
};

export default App;

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
const App = () => {
  const [data, setData] = React.useState({x: 0, y: 0});
  const [isWorks, setIsWorks] = React.useState(false);
  const [watchTimeout, setWatchTimeout] = React.useState(null);

  React.useEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        console.log(
          'native func',
          position.coords.latitude,
          position.coords.longitude,
        );
        setData({x: position.coords.latitude, y: position.coords.longitude});
      },
      error => {
        console.error(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );

    return () => {
      Geolocation.clearWatch(watchId);
      if (watchTimeout) {
        clearTimeout(watchTimeout);
      }
    };
  }, []);

  React.useEffect(() => {
    if (data.x !== 0 || data.y !== 0) {
      if (watchTimeout) {
        clearTimeout(watchTimeout);
      }
      const timeout = setTimeout(() => {
        setIsWorks(true);
      }, 5000);
      setWatchTimeout(timeout);
      console.log('>>>>>>>>', timeout);
    }
  }, [data]);

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View>
        {data && (
          <Text style={{fontSize: 24}}>
           {` Latitude: ${data.x},
            Longitude: ${data.y}`}
          </Text>
        )}
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: isWorks ? 'green' : 'red',
          }}
        />
      </View>
    </View>
  );
};

export default App;

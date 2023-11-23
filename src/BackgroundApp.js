import React, {useEffect} from 'react';
import BackgroundFetch from 'react-native-background-fetch';
import {View, StyleSheet, Button, Alert} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export const BackgroundApp = () => {
  const [data, setData] = React.useState({x: 0, y: 0});
  console.log('DATA---ON COMPONENT--->', data);

  Geolocation.watchPosition(
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

  useEffect(() => {
    // Настройка фоновой задачи при монтировании компонента
    console.log('DATA---ON useEffect--->', data);

    BackgroundFetch.configure(
      {
        minimumFetchInterval: 15, // Минимальный интервал в минутах
        stopOnTerminate: false, // Позволяет фоновой задаче работать после закрытия приложения
        startOnBoot: true, // Запуск приложения после перезагрузки устройства
      },
      () => {
        // Код, который будет выполняться в фоновом режиме
        console.log('Background task is running...', data);
        // Alert.alert(`${data} --`);
        // Выполнение определенных задач
        // Например, отправка запросов на сервер и обновление данных
        BackgroundFetch.finish();
      },
      error => {
        console.log('Background Fetch failed to start:', error);
      },
    );

    return () => {
      // Очистка при размонтировании компонента, если это необходимо
      BackgroundFetch.stop();
    };
  }, []);

  return (
    // Ваш UI или можно даже не отображать ничего для фоновой задачи
    <></>
  );
};

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }



function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  async function getWeather () {
    try {
      const response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=59.90&lon=30.26&lang=ru&appid=d4ef21df72b68f08effe99dce8a6be38&units=metric',);
      const json = await response.json();
      setWeather({weather:json.weather[0], main: json.main, name: json.name});
    } catch (error) {
      console.error(error);
    }
  };
  
  type Weather = {
    weather : {
      "id": number,
      "main": string,
      "description": string,
      "icon": string,
    },
    main: {
      temp: number,
      feels_like: number,
      temp_min: number,
      temp_max: number,
      pressure: number,
      humidity: number,
      sea_level: number,
      grnd_level: number,
    },
    name: string,
  };
  
  const [weather, setWeather] = useState<Weather>({
    weather: {
      id: 0,
      main: '',
      description: '',
      icon: ''
    },
    main: {
      temp: 298.48,
      feels_like: 298.74,
      temp_min: 297.56,
      temp_max: 300.05,
      pressure: 1015,
      humidity: 64,
      sea_level: 1015,
      grnd_level: 933
    },
    name: '',
  });
  
  useEffect(() => {
    getWeather();
    console.log(weather);
  }, []);
  
  function WeatherDegrees () {
    return (
      <>
        <Text style={styles.degrees}>{weather.main.temp > 0 ? '+' + Math.ceil(weather.main.temp) + '°C'  : Math.ceil(weather.main.temp)}</Text>
        <Text style={styles.inputWeather}>{weather.weather.description}</Text>
      </>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Welcome to WeatherApp</Text>
      <Text style={styles.city}>{weather.name}</Text>
      <View style={styles.container}>
        <WeatherDegrees />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'royalblue',
    marginTop: 32,
    paddingHorizontal: 24,
    marginStart: 10,
  },
  h1: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'sandybrown',
  },
  city: {
    marginTop: 10,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'sandybrown',
  },
  degrees: {
    fontSize: 50,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  inputWeather: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
});

export default App;

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

type SectionProps = PropsWithChildren<{
  title: string;
}>;

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
    // const response = await fetch(api_url);
  
    // return await response.json();
    try {
      const response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=59.90&lon=30.26&lang=ru&appid=d4ef21df72b68f08effe99dce8a6be38',);
      const json = await response.json();
      setWeather(json.weather[0]);
    } catch (error) {
      console.error(error);
    }
  };
  
  type Weather = {
    "id": number,
    "main": string,
    "description": string,
    "icon": string,
  };
  
  const [weather, setWeather] = useState<Weather>({
    "id": 0,
    "main": '',
    "description": '',
    "icon": '',
  });
  
  useEffect(() => {
    getWeather();
  }, []);
  
  function WeatherDegrees () {
    return (
      <>
        <Text style={styles.inputWeather}>{weather.description}</Text>
        <Text>Хуй</Text>
      </>
    );
  }

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <WeatherDegrees  />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: '#a77fb5',
    marginTop: 32,
    paddingHorizontal: 24,
  },
  inputWeather: {
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default App;

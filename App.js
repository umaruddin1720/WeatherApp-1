//import liraries   

import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import axios from 'axios';

// create a component
const App = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const api = {
    key: '7d4e7862679ba5cf0cdc848e8de678ae',
    baseUrl: 'https://api.openweathermap.org/data/2.5/',
  };

  const fetchDataHandler = useCallback(() => {
    setLoading(true);
    setInput('');
    axios({
      method: 'GET',
      url: `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${api.key}`,
    })
      .then(res => {
        console.log('response', res?.data);
        setData(res?.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [api.key, input]);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backGroundImage}
        source={{
          uri: 'https://thumbs.dreamstime.com/b/blue-sky-clouds-natural-background-92316401.jpg',
        }}>
        <TextInput
          style={styles.inputText}
          placeholder="Enter place here..."
          value={input}
          onChangeText={text => setInput(text)}
          onSubmitEditing={fetchDataHandler}
        />
        {loading && (
          <View>
            <ActivityIndicator size={40} color={'red'} />
          </View>
        )}

        {data && (
          <View style={styles.infoView}>
            <Text
              style={
                styles.countryText
              }>{`${data?.name}, ${data?.sys?.country}`}</Text>
            <Text style={styles.DateText}>
              {new Date().toLocaleDateString()}
            </Text>
            <View style={styles.tempData}>
              <Text style={styles.minMaxTemp}>{`Min ${Math.round(
                data?.main?.temp_min,
              )} °C`}</Text>
              <Text style={styles.minMaxTemp}>{`Max ${Math.round(
                data?.main?.temp_max,
              )} °C`}</Text>
              <Text
                style={
                  styles.minMaxTemp
                }>{`humidity ${data?.main?.humidity}`}</Text>
              <Text
                style={
                  styles.minMaxTemp
                }>{`Weather ${data?.weather?.[0]?.main}`}</Text>
            </View>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backGroundImage: {
    flex: 1,
  },
  inputText: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    margin: 20,
  },
  infoView: {
    alignItems: 'center',
  },
  countryText: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
  },
  DateText: {
    color: 'white',
    fontSize: 20,
  },
  tempData: {
    marginTop: 20,
  },
  minMaxTemp: {
    color: 'white',
    fontSize: 30,
  },
});

//make this component available to the app
export default App;

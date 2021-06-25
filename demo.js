import Voice from '@react-native-community/voice';
import React, { useEffect, useState } from 'react';
import {
  Text,
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

export default function TextToSpeech() {


  const [isLoading, setLoading] = useState(false)
  const [result, setResult] = useState('')

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechEnd = onSpeechEnd;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);


  function onSpeechStart(e) {
    // console.log('onSpeechStart: ', e);
  };

  const onSpeechVolumeChanged = (e) => {
    // console.log('onSpeechVolumeChanged: ', e);
  };

  function onSpeechEnd(e) {
    setLoading(false)
    // console.log("on speec end", isLoading)
  }

  function onSpeechPartialResults(e) {
    console.log('onSpeechPartialResults: ', e.value[0]);
    setResult(e.value[0])
  };

  const _startRecognizing = async () => {
    setLoading(true)
    try {
      await Voice.start('en-Us');
    } catch (e) {
      console.log(e);
    }
  };

  const _stopRecognizing = async () => {
    //Stops listening for speech
    try {
      await Voice.stop();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>

        <Text style={styles.speechText}>Speech Recoginition</Text>
        <View style={styles.textInputStyle}>
          <TextInput
            value={result}
            style={{ flex: 1 }}
            placeholder="your text"
            onChangeText={text => setResult(text)}
          />
          {!isLoading ? <TouchableHighlight
            onPress={_startRecognizing}
            style={{ marginVertical: 20 }}>
            <Image
              style={styles.mice}
              source={{
                uri:
                  'https://raw.githubusercontent.com/AboutReact/sampleresource/master/microphone.png',
              }}
            />
          </TouchableHighlight>
            : <ActivityIndicator color="red" size="large" />
          }
        </View>


      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  mice: {
    width: 25,
    height: 25,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 24,
    backgroundColor: '#F5FCFF',
  },

  textInputStyle: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 16,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 2,
  },
  speechText: {
    marginBottom: 36,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 26
  }
});

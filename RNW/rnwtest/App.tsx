import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
    <View
      style={{
        backgroundColor: '#0f0f0f',
        height: '100%',
        width: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          paddingHorizontal: 89,
          width: '100%',
          display: 'flex',
          marginVertical: 20,
        }}>
        <Text
          style={{
            fontSize: 16,
            color: '#fff',
            textAlign: 'center',
            marginBottom: 12,
          }}>
          Deepfake Detection App
        </Text>

        <View style={{display: 'flex', gap: 20}}>
          <TextInput
            placeholder="Email"
            style={{
              backgroundColor: '#121212',
              borderWidth: 2,
              borderColor: '#222',
              borderRadius: 12,
              textAlignVertical: 'center',
              lineHeight: 0,
              fontSize: 16,
              color: 'white'
            }}
          />
          <TextInput
            placeholder="Password"
            style={{
              backgroundColor: '#121212',
              borderWidth: 2,
              borderColor: '#222',
              borderRadius: 12,
              textAlignVertical: 'center',
              lineHeight: 0,
              fontSize: 16,
              color: 'white',
              paddingHorizontal: 10
            }}
          />
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: '#121212',
            height: 52,
            borderRadius: 12,
            paddingLeft: 12,
            marginTop: 12,
            borderWidth: 1,
            justifyContent: 'center',
          }}>
            <Text style={{textAlign: 'center', color: 'white'}}>Sign In</Text>
        </TouchableOpacity>
        <Text style={{ color: '#808080' }}>Not a Member ? Sign up instead</Text>
      </View>
    </View>
    </SafeAreaView>
  );
}

export default App;

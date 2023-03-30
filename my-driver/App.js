import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapScreen from './MapScreen';
import 'react-native-url-polyfill/auto';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


 function Apps() {
  const [userId, setUserId] = useState(null);
  const [modalVisible, setModalVisible] = useState(true);

  const handleSaveUserId = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Modal visible={modalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Enter User ID</Text>
          <TextInput style={styles.input} onChangeText={setUserId} value={userId} />
          <TouchableOpacity style={styles.button} onPress={handleSaveUserId}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {userId && <MapScreen userId={userId} />}
    </View>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="App" component={Apps} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
  button: {
    backgroundColor: '#0066cc',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

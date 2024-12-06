import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal'; // Correct import for react-native-modal
import { Picker } from '@react-native-picker/picker';

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [Name, setName] = useState('');
  const [age, setAge] = useState('');
  const [birth, setBirth] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('male');
  const [Address, setAddress] = useState('');
  const [number, setNumber] = useState('');

  // handleSave function to send data to the database
  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost/insert.php
`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `name=${Name}&age=${age}&birth=${birth}&email=${email}&gender=${gender}&address=${Address}&number=${number}`,
      });

      const data = await response.text(); // Get the response from the server
      console.log('Server Response:', data);

      // Optionally reset the form fields after submission
      setName('');
      setAge('');
      setBirth('');
      setEmail('');
      setGender('male');
      setAddress('');
      setNumber('');

      // Close the modal
      setIsModalVisible(false);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.openButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.buttonText}>Open Form</Text>
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)} // Close modal when tapped outside
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>User Form</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter Name"
            value={Name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter Age"
            value={age}
            keyboardType="numeric"
            onChangeText={setAge}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter Birthdate"
            value={birth}
            onChangeText={setBirth}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter Email Address"
            value={email}
            onChangeText={setEmail}
          />

          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={styles.input}
          >
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>

          <TextInput
            style={styles.input}
            placeholder="Enter Address"
            value={Address}
            onChangeText={setAddress}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter Mobile Number"
            value={number}
            keyboardType="numeric"
            onChangeText={setNumber}
          />

          <Button title="Save" onPress={handleSave} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  openButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});

export default App;

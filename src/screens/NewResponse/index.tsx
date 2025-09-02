import { Theme, useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const NewResponseScreen: React.FC = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const theme: Theme = useTheme();

  const handleSubmit = () => {
    console.log('Submitted:', { title, message });
    // You can hook API call here
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={[styles.label, { color: theme.colors.text }]}>Title</Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.dark ? theme.colors.card : '#f8f8f8ff',
            color: theme.colors.text,
          },
        ]}
        value={title}
        onChangeText={setTitle}
      />

      <Text style={[styles.label, { color: theme.colors.text }]}>Message</Text>
      <TextInput
        style={[
          styles.input,
          styles.textArea,
          {
            backgroundColor: theme.dark ? theme.colors.card : '#f8f8f8ff',
            color: theme.colors.text,
          },
        ]}
        value={message}
        onChangeText={setMessage}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewResponseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // backgroundColor:,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 6,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#111827',

    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#1185E6',
    borderRadius: 24,
    alignSelf: 'flex-end',
    paddingVertical: 7,
    paddingHorizontal: 25,
  },
  buttonText: {
    color: '#fff',
    // fontWeight: '600',
    fontSize: 16,
  },
});

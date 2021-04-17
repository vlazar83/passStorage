import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import * as SecureStore from "expo-secure-store";

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    alert("🔐 Here's your value 🔐 \n" + result);
  } else {
    alert("No values stored under that key.");
  }
}

function AddNewPasswordScreen({ navigation, route }) {
  const [key, onChangeKey] = React.useState("PasswordKey");
  const [value, onChangeValue] = React.useState("sampleData");

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Save an item, and grab it later!</Text>

      <Button
        title="Save this key/value pair"
        onPress={() => {
          save(key, value);
          onChangeKey("Your key here");
          onChangeValue("Your value here");
        }}
      />

      <Text style={styles.paragraph}>🔐 Enter your key 🔐</Text>
      <TextInput
        style={styles.textInput}
        onSubmitEditing={(event) => {
          getValueFor(event.nativeEvent.text);
        }}
        placeholder="Enter the key for the value you want to get"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

module.exports = AddNewPasswordScreen;

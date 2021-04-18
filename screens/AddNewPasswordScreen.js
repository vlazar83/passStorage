import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import * as SecureStore from "expo-secure-store";
import PasswordRecordFactory from "../model/PasswordRecord.js";
import KEY_FOR_ARRAY_OF_UUIDS from "../utils/constants.js";

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
  const [enteredPassword, onChangePassword] = React.useState("");
  const [enteredUserName, onChangeUserName] = React.useState("");
  const [enteredDisplayName, onChangeDisplayName] = React.useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Enter the display name</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={onChangeDisplayName}
        value={enteredDisplayName}
        placeholder="Your display name comes here."
      />

      <Text style={styles.paragraph}>Enter your user name</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={onChangeUserName}
        value={enteredUserName}
        placeholder="Your user name comes here."
      />

      <Text style={styles.paragraph}>🔐 Enter your password 🔐</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={onChangePassword}
        value={enteredPassword}
        placeholder="Your password comes here."
      />

      <Button
        style={styles.button}
        title="Save this Password"
        onPress={() => {
          var newRecord = PasswordRecordFactory(
            enteredDisplayName,
            enteredUserName,
            enteredPassword
          );
          console.log("EnteredPassword: " + enteredPassword);
          const passwordToBeSaved = {
            id: newRecord.id,
            displayName: newRecord.displayName,
            userID: newRecord.userID,
            password: newRecord.password,
          };
          console.log("EnteredData: " + JSON.stringify(passwordToBeSaved));
          save(newRecord.id, JSON.stringify(passwordToBeSaved));
          alert("Password saved in SecureStore");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E8EAED",
    alignItems: "center",
    justifyContent: "center",
  },
  paragraph: {
    backgroundColor: "#E8EAED",
    alignItems: "flex-start",
    justifyContent: "center",
    fontSize: 16,
    fontWeight: "bold",
    paddingTop: 15,
  },
  textInput: {
    paddingTop: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    paddingTop: 100,
    backgroundColor: "#f9c2ff",
    alignItems: "center",
    justifyContent: "center",
  },
});

module.exports = AddNewPasswordScreen;

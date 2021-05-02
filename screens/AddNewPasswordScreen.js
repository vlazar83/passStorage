import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import PasswordRecordFactory from "../model/PasswordRecord.js";
import KEY_FOR_ARRAY_OF_UUIDS from "../utils/constants.js";
import stateHolder from "..//StateHolder.js";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button, Divider } from "react-native-elements";
import Toast from "react-native-toast-message";

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

class AddNewPasswordScreen extends React.Component {
  state = {
    displayName: "",
    username: "",
    password: "",
  };
  handleDisplayName = (text) => {
    this.setState({ displayName: text });
  };
  handleUsername = (text) => {
    this.setState({ username: text });
  };
  handlePassword = (text) => {
    this.setState({ password: text });
  };

  async loadRecordsIntoPasswordRecordsArray() {
    promises = [];
    console.log("Array before foreach:" + stateHolder.state.uuidArray);
    stateHolder.state.uuidArray.forEach((element) => {
      console.log(element);
      promises.push(SecureStore.getItemAsync(element));
    });

    Promise.all(promises).then((responses) => {
      responses.forEach((element) => {
        console.log(element);
        stateHolder.state.passwordRecordsArray.push({
          id: JSON.parse(element).id + Math.random().toString(36).substring(7),
          displayName: JSON.parse(element).displayName,
          userID: JSON.parse(element).userID,
          password: JSON.parse(element).password,
        });
      });
    });
  }

  async loadRecords() {
    try {
      let arrayInStringFormat = await SecureStore.getItemAsync(
        KEY_FOR_ARRAY_OF_UUIDS
      );
      stateHolder.state.uuidArray = JSON.parse(arrayInStringFormat);
      console.log("responseUUIDs1: ", stateHolder.state.uuidArray);
    } catch (error) {
      console.log(error);
    }
    this.loadRecordsIntoPasswordRecordsArray();
  }

  componentWillUnmount() {
    stateHolder.state.passwordRecordsArray = [];
    this.loadRecords();
  }

  render() {
    return (
      <View style={styles.container}>
        <Divider style={{ backgroundColor: "blue" }} />
        <Text style={styles.paragraph}>Enter the display name</Text>
        <Input
          onChangeText={this.handleDisplayName}
          placeholder="Display Name"
          leftIcon={{ type: "font-awesome", name: "list-alt", size: 36 }}
        />
        <Text style={styles.paragraph}>Enter your user name</Text>
        <Input
          onChangeText={this.handleUsername}
          placeholder="User Name"
          leftIcon={<Icon type="font-awesome" name="user-circle" size={36} />}
        />
        <Text style={styles.paragraph}>🔐 Enter your password 🔐</Text>
        <Input
          placeholder="Password"
          onChangeText={this.handlePassword}
          leftIcon={{ type: "font-awesome", name: "key", size: 36 }}
        />
        <Divider style={{ backgroundColor: "blue" }} />
        <Button
          icon={<Icon name="save" size={36} color="black" />}
          title=" Save Password"
          type="clear"
          onPress={() => {
            if (
              this.state.displayName != "" &&
              this.state.username != "" &&
              this.state.password != ""
            ) {
              var newRecord = PasswordRecordFactory(
                this.state.displayName,
                this.state.username,
                this.state.password
              );
              console.log("EnteredPassword: " + this.state.password);
              const passwordToBeSaved = {
                id: newRecord.id,
                displayName: newRecord.displayName,
                userID: newRecord.userID,
                password: newRecord.password,
              };
              console.log("EnteredData: " + JSON.stringify(passwordToBeSaved));

              Promise.all([
                SecureStore.setItemAsync(
                  newRecord.id,
                  JSON.stringify(passwordToBeSaved)
                ),
                SecureStore.getItemAsync(KEY_FOR_ARRAY_OF_UUIDS),
              ])
                .then((responses) => {
                  // here we receive an array of responses ! For us the second response is important!
                  console.log(responses);
                  if (responses[1]) {
                    // if it was not empty
                    var array = JSON.parse(responses[1]);
                    array.push(newRecord.id);
                    save(KEY_FOR_ARRAY_OF_UUIDS, JSON.stringify(array));
                  } else {
                    // if it was empty
                    var array = [newRecord.id];
                    save(KEY_FOR_ARRAY_OF_UUIDS, JSON.stringify(array));
                  }
                })
                .catch((error) => console.log(`Error in executing ${error}`));

              save(newRecord.id, JSON.stringify(passwordToBeSaved));
              //alert("Password saved in SecureStore");
              Toast.show({
                text1: "Success",
                text2: "Password saved in SecureStore",
                position: "bottom",
                bottomOffset: 40,
                type: "success",
              });
            } else {
              //alert("Fill all fields first!");
              Toast.show({
                text1: "Missing input",
                text2: "Fill all fields first!",
                position: "bottom",
                bottomOffset: 40,
                type: "info",
              });
            }
          }}
        />
      </View>
    );
  }
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
    fontSize: 24,
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

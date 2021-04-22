import React from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import stateHolder from "..//StateHolder.js";
import KEY_FOR_ARRAY_OF_UUIDS from "../utils/constants.js";
import * as SecureStore from "expo-secure-store";

class HomeScreen extends React.Component {
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

  componentDidMount() {
    this.loadRecords();
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require("./../assets/vault.png")} />
        <Text>Storage for your passwords</Text>
        <Button
          title="Let's get started"
          onPress={() => {
            stateHolder.state.uuidArray = [4, 5];
            this.props.navigation.navigate("PasswordListScreen");
            console.log(stateHolder.state.uuidArray);
            console.log(stateHolder.state.passwordRecordsArray);
          }}
        />
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

module.exports = HomeScreen;

import React from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as SecureStore from "expo-secure-store";
import KEY_FOR_ARRAY_OF_UUIDS from "../utils/constants.js";
import save from "../utils/secureStoreUtils.js";

function initializeArrayOfUUIDs() {
  console.log("Initialize Array of UUIDs");
  var array = [];
  save(KEY_FOR_ARRAY_OF_UUIDS, JSON.stringify(array));
}

async function getArrayOfUUIDs() {
  let result = await SecureStore.getItemAsync(KEY_FOR_ARRAY_OF_UUIDS);
  console.log("getArrayOfUUIDs result " + result);
  if (result) {
    console.log("getArrayOfUUIDs returns:" + JSON.parse(result));
    //return JSON.parse(result);
  } else {
    initializeArrayOfUUIDs();
  }
}

function HomeScreen({ navigation, route }) {
  getArrayOfUUIDs();
  return (
    <View style={styles.container}>
      <Image source={require("./../assets/vault.png")} />
      <Text>Storage for your passwords</Text>
      <Button
        title="Let's get started"
        onPress={() => {
          navigation.navigate("PasswordListScreen");
        }}
      />
      <StatusBar style="auto" />
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

module.exports = HomeScreen;

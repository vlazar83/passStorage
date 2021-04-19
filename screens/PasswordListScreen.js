import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { FloatingAction } from "react-native-floating-action";
import PasswordRecordFactory from "../model/PasswordRecord.js";
import FloatingActionButtonsActions from "../model/FloatingActionButtons.js";
import KEY_FOR_ARRAY_OF_UUIDS from "../utils/constants.js";
import * as SecureStore from "expo-secure-store";

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.displayName}</Text>
  </TouchableOpacity>
);

const DATA = [
  //PasswordRecordFactory("First Password", "MyUser", "Pass1"),
  //PasswordRecordFactory("Second Password", "MyUser2", "Pass2"),
];

var uuidArray = [];
var promises = [];
var responseUUIDs;
var firstObject;

function addToData() {
  return new Promise(() => {
    DATA.push({
      id: JSON.parse(firstObject).id + Math.random().toString(36).substring(7),
      displayName: JSON.parse(firstObject).displayName,
      userID: JSON.parse(firstObject).userID,
      password: JSON.parse(firstObject).password,
    });
  });
}

async function loadRecords() {
  try {
    responseUUIDs = await SecureStore.getItemAsync(KEY_FOR_ARRAY_OF_UUIDS);
    firstObject = await SecureStore.getItemAsync(JSON.parse(responseUUIDs)[0]);
    let returnValue = await addToData();
    console.log("DATA: ", DATA);
    console.log("responseUUIDs: ", responseUUIDs);
    console.log("firstObject: ", firstObject);
  } catch (error) {
    console.log(error);
  }
}

function PasswordListScreen({ route, navigation }) {
  const [selectedId, setSelectedId] = useState(null);
  const [refresh, setRefresh] = useState(false);
  loadRecords();

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id);
          navigation.navigate("PasswordRecordDetailsScreen", {
            key: item.id,
          });
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <View style={styles.containerForDetails}>
      <View style={styles.passwordRecordWrapper}>
        <Text style={styles.sectionTitle}>Saved Passwords</Text>
        <Button
          title="Refresh"
          onPress={() => {
            setRefresh(!refresh);
          }}
        />
      </View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={this.state}
      />
      <FloatingAction
        actions={FloatingActionButtonsActions}
        onPressItem={(name) => {
          console.log(`selected button: ${name}`);
          if (name == "add_new_password") {
            navigation.navigate("AddNewPasswordScreen");
          } else if (name == "add_new_password_from_picture") {
            navigation.navigate("AddNewPasswordScreenFromPicture");
          }
        }}
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
  passwordRecordWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  containerForDetails: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

module.exports = PasswordListScreen;

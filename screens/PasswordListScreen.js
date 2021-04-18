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

function loadRecords() {
  var uuidArray = [];
  var promises = [];

  let promise2 = new Promise(function (resolve, reject) {
    uuidArray.forEach(function (item, index) {
      console.log(item, index);
      promises.push(SecureStore.getItemAsync(item));
      console.log("Promises:" + promises);
    });
  });

  SecureStore.getItemAsync(KEY_FOR_ARRAY_OF_UUIDS)
    .then((response) => {
      uuidArray = JSON.parse(response);
      console.log("uuidArray:" + uuidArray);
      return promise2;
    })
    .then(
      Promise.all(promises)
        .then((responses) => {
          console.log("Responses:" + responses);
          responses.forEach(function (item, index) {
            DATA.push({
              id: item.id,
              displayName: response.displayName,
              userID: response.userID,
              password: response.password,
            });
          });
        })
        .catch((error) => console.log(`Error in executing ${error}`))
    );
}

function PasswordListScreen({ route, navigation }) {
  const [selectedId, setSelectedId] = useState(null);
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
      </View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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

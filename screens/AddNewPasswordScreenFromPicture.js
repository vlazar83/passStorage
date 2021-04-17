import React from "react";
import { StyleSheet, Text, View } from "react-native";

function AddNewPasswordScreenFromPicture({ navigation, route }) {
  return (
    <View style={styles.container}>
      <Text>Add new password from Picture</Text>
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

module.exports = AddNewPasswordScreenFromPicture;

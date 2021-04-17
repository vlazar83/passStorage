import React from "react";
import { StyleSheet, Text, View } from "react-native";

function PasswordRecordDetailsScreen({ navigation, route }) {
  return (
    <View style={styles.container}>
      <Text>Your password details are the following:</Text>
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

module.exports = PasswordRecordDetailsScreen;

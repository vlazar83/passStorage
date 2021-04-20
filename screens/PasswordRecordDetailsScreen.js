import React from "react";
import { StyleSheet, Text, View } from "react-native";

class PasswordRecordDetailsScreen extends React.Component {
  render() {
    const { key } = this.props.route.params;
    return (
      <View style={styles.container}>
        <Text>Your password details are the following:</Text>
        <Text>itemId: {JSON.stringify(key)}</Text>
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

module.exports = PasswordRecordDetailsScreen;

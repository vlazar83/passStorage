import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";

class PasswordRecordDetailsScreen extends React.Component {
  render() {
    const { key } = this.props.route.params;
    return (
      <View style={styles.container}>
        <View style={styles.displayName}>
          <Text>Your password details are the following:</Text>
          <Text>itemId: {JSON.stringify(key)}</Text>
        </View>
        <View style={styles.userName}>
          <Input placeholder="BASIC INPUT" />
        </View>
        <View style={styles.password}>
          <Text style={styles.text}>Item 3</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  displayName: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  userName: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  password: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});

module.exports = PasswordRecordDetailsScreen;

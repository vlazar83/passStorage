import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";
import Toast from "react-native-toast-message";
import Clipboard from "expo-clipboard";

class PasswordRecordDetailsScreen extends React.Component {
  state = {
    displayName: "",
    userID: "",
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

  render() {
    const { id } = this.props.route.params;
    const { displayName } = this.props.route.params;
    const { userID } = this.props.route.params;
    const { password } = this.props.route.params;
    return (
      <View style={styles.container}>
        <View style={styles.displayName}>
          <Text>Your password details are the following:</Text>
          <Text>itemId: {JSON.stringify(id)}</Text>
          <Text>displayName: {JSON.stringify(displayName)}</Text>
          <Text>userID: {JSON.stringify(userID)}</Text>
          <Text>password: {JSON.stringify(password)}</Text>
          <Input
            placeholder={displayName}
            label="displayName"
            onChangeText={this.handleDisplayName}
          />
        </View>
        <View style={styles.fieldName}>
          <View style={styles.fieldNameTitle}>
            <Input
              placeholder={userID}
              label="userName"
              onChangeText={this.handleUsername}
            />
          </View>
          <View style={styles.fieldNameButton}>
            <Button
              onPress={() => {
                Clipboard.setString("hello world");
                Toast.show({
                  text1: "Copied",
                  text2: "UserName copied to clipboard",
                  position: "bottom",
                  bottomOffset: 40,
                  type: "info",
                });
              }}
              icon={
                <Icon
                  name="clone"
                  type="font-awesome"
                  size={15}
                  color="black"
                  underlayColor="white"
                />
              }
            />
          </View>
        </View>
        <View style={styles.fieldName}>
          <View style={styles.fieldNameTitle}>
            <Input
              placeholder="password"
              label="password"
              onChangeText={this.handlePassword}
            />
          </View>
          <View style={styles.fieldNameButton}>
            <Button
              onPress={() => {
                Clipboard.setString("hello world");
                Toast.show({
                  text1: "Copied",
                  text2: "UserName copied to clipboard",
                  position: "bottom",
                  bottomOffset: 40,
                  type: "info",
                });
              }}
              icon={
                <Icon
                  name="clone"
                  type="font-awesome"
                  size={15}
                  color="black"
                  underlayColor="white"
                />
              }
            />
          </View>
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
  fieldName: {
    flex: 1,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
  },
  fieldNameTitle: {
    flex: 6,
    backgroundColor: "#ffffff",
  },
  fieldNameButton: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 10,
  },
});

module.exports = PasswordRecordDetailsScreen;

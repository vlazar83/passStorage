import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";
import Toast from "react-native-toast-message";
import Clipboard from "expo-clipboard";

class PasswordRecordDetailsScreen extends React.Component {
  state = {
    id: this.props.route.params.id,
    displayName: this.props.route.params.displayName,
    userID: this.props.route.params.userID,
    password: this.props.route.params.password,
  };
  handleDisplayName = (text) => {
    this.setState({ displayName: text });
  };
  handleUsername = (text) => {
    this.setState({ userID: text });
  };
  handlePassword = (text) => {
    this.setState({ password: text });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.displayName}>
          <Text>Your password details are the following:</Text>
          <Text>itemId: {this.state.id}</Text>
          <Text>displayName: {this.state.displayName}</Text>
          <Text>userID: {this.state.userID}</Text>
          <Text>password: {this.state.password}</Text>
          <Input
            placeholder={this.state.displayName}
            label="displayName"
            onChangeText={this.handleDisplayName}
            defaultValue={this.state.displayName}
          />
        </View>
        <View style={styles.fieldName}>
          <View style={styles.fieldNameTitle}>
            <Input
              placeholder={this.state.userID}
              label="userName"
              onChangeText={this.handleUsername}
              defaultValue={this.state.userID}
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
              placeholder={this.state.password}
              label="password"
              onChangeText={this.handlePassword}
              defaultValue={this.state.password}
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

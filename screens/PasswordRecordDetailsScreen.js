import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "react-native-elements";
import Toast from "react-native-toast-message";

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
          <View style={styles.userNameTitle}>
            <Input placeholder="userName" label="userName" />
          </View>
          <View style={styles.userNameButton}>
            <Button
              onPress={() => {
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
        <View style={styles.password}>
          <Input placeholder="password" label="password" />
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
    flexDirection: "row",
    alignItems: "center",
  },
  userNameTitle: {
    flex: 6,
    backgroundColor: "#ffffff",
  },
  userNameButton: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 10,
  },
  password: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});

module.exports = PasswordRecordDetailsScreen;

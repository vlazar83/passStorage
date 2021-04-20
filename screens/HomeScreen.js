import React from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import stateHolder from "..//StateHolder.js";

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require("./../assets/vault.png")} />
        <Text>Storage for your passwords</Text>
        <Button
          title="Let's get started"
          onPress={() => {
            stateHolder.state.uuidArray = [4, 5];
            this.props.navigation.navigate("PasswordListScreen");
            console.log(stateHolder.state.uuidArray);
            console.log(stateHolder.state.passwordRecordsArray);
          }}
        />
        <StatusBar style="auto" />
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

module.exports = HomeScreen;

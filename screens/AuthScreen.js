import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as LocalAuthentication from "expo-local-authentication";

class AuthScreen extends React.Component {
  state = {
    hasHardware: false,
    supportedAuthTypes: "",
    isEnrolled: false,
    isAuthenticated: false,
  };

  async handleAuthentication() {
    try {
      this.state.hasHardware = await LocalAuthentication.hasHardwareAsync();
      console.log("Do we have a hardware for auth?: " + this.state.hasHardware);
    } catch (error) {
      console.log(error);
    }

    try {
      this.state.supportedAuthTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
      console.log(
        "What types of auths are supported?: " + this.state.supportedAuthTypes
      );
    } catch (error) {
      console.log(error);
    }

    try {
      this.state.isEnrolled = await LocalAuthentication.isEnrolledAsync();
      console.log("isEnrolled?: " + this.state.isEnrolled);
    } catch (error) {
      console.log(error);
    }

    try {
      this.state.isAuthenticated = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate yourself!",
        cancelLabel: "Not this time",
        fallbackLabel: "fallbackLabel",
      });
      console.log("isAuthenticated?: " + this.state.isAuthenticated);
      console.log(
        "isAuthenticated for sure?: " + this.state.isAuthenticated.success
      );

      if (this.state.isAuthenticated.success) {
        this.props.navigation.navigate("Home");
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.handleAuthentication();
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require("./../assets/vault.png")} />
        <StatusBar style="auto" />
        <Button
          title="Retry Authentication"
          onPress={() => {
            this.handleAuthentication();
          }}
        />
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

module.exports = AuthScreen;

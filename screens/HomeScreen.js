import React from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { StatusBar } from "expo-status-bar";

function HomeScreen({ navigation, route }) {
  return (
    <View style={styles.container}>
      <Image source={require("./../assets/vault.png")} />
      <Text>Storage for your passwords</Text>
      <Button
        title="Let's get started"
        onPress={() => {
          navigation.navigate("PasswordListScreen");
        }}
      />
      <StatusBar style="auto" />
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

module.exports = HomeScreen;

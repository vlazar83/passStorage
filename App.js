import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PasswordRecordsList from "./data/data.js";
import PasswordRecord from "./components/PasswordRecord.js";

function HomeScreen({ navigation, route }) {
  return (
    <View style={styles.container}>
      <Image source={require("./assets/vault.png")} />
      <Text>Storage for your passwords</Text>
      <Button
        title="Let's get started"
        onPress={() => navigation.navigate("Details")}
      />
      <StatusBar style="auto" />
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  //return PasswordRecordsList();
  return (
    <View style={styles.containerForDetails}>
      <View style={styles.passwordRecordWrapper}>
        <Text style={styles.sectionTitle}>Saved Passwords</Text>
        <ScrollView>
          <View style={styles.item}>
            <PasswordRecord text={"Password 1"} />
            <PasswordRecord text={"Password 2"} />
            <PasswordRecord text={"Password 3"} />
            <PasswordRecord text={"Password 1"} />
            <PasswordRecord text={"Password 2"} />
            <PasswordRecord text={"Password 3"} />
            <PasswordRecord text={"Password 1"} />
            <PasswordRecord text={"Password 2"} />
            <PasswordRecord text={"Password 3"} />
            <PasswordRecord text={"Password 1"} />
            <PasswordRecord text={"Password 2"} />
            <PasswordRecord text={"Password 3"} />
            <PasswordRecord text={"Password 1"} />
            <PasswordRecord text={"Password 2"} />
            <PasswordRecord text={"Password 3"} />
            <PasswordRecord text={"Password 1"} />
            <PasswordRecord text={"Password 2"} />
            <PasswordRecord text={"Password 3"} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Welcome",
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: "Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  passwordRecordWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  containerForDetails: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
});

import "react-native-gesture-handler";
import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthScreen from "./screens/AuthScreen.js";
import HomeScreen from "./screens/HomeScreen.js";
import PasswordListScreen from "./screens/PasswordListScreen.js";
import PasswordRecordDetailsScreen from "./screens/PasswordRecordDetailsScreen.js";
import AddNewPasswordScreen from "./screens/AddNewPasswordScreen.js";
import AddNewPasswordScreenFromPicture from "./screens/AddNewPasswordScreenFromPicture.js";

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
          name="Authentication"
          component={AuthScreen}
          options={{
            title: "AuthScreen",
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Welcome",
            headerLeft: null,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="PasswordListScreen"
          component={PasswordListScreen}
          options={{
            title: "List of Passwords",
            headerLeft: null,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="PasswordRecordDetailsScreen"
          component={PasswordRecordDetailsScreen}
          options={{ title: "Password Details" }}
        />
        <Stack.Screen
          name="AddNewPasswordScreen"
          component={AddNewPasswordScreen}
          options={{ title: "New Password" }}
        />
        <Stack.Screen
          name="AddNewPasswordScreenFromPicture"
          component={AddNewPasswordScreenFromPicture}
          options={{ title: "New Password From Picture" }}
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
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

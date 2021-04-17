import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { FloatingAction } from "react-native-floating-action";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PasswordRecordFactory from "./model/PasswordRecord.js";
import FloatingActionButtonsActions from "./model/FloatingActionButtons.js";

const DATA = [
  PasswordRecordFactory("First Password", "First Item"),
  PasswordRecordFactory("Second Password", "Second Item"),
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.name}</Text>
  </TouchableOpacity>
);

function HomeScreen({ navigation, route }) {
  return (
    <View style={styles.container}>
      <Image source={require("./assets/vault.png")} />
      <Text>Storage for your passwords</Text>
      <Button
        title="Let's get started"
        onPress={() => navigation.navigate("PasswordListScreen")}
      />
      <StatusBar style="auto" />
    </View>
  );
}

function PasswordRecordDetailsScreen({ navigation, route }) {
  return (
    <View style={styles.container}>
      <Text>Your password details are the following:</Text>
    </View>
  );
}

function AddNewPasswordScreen({ navigation, route }) {
  return (
    <View style={styles.container}>
      <Text>Add new password</Text>
    </View>
  );
}

function PasswordListScreen({ route, navigation }) {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id);
          navigation.navigate("PasswordRecordDetailsScreen");
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <View style={styles.containerForDetails}>
      <View style={styles.passwordRecordWrapper}>
        <Text style={styles.sectionTitle}>Saved Passwords</Text>
      </View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <FloatingAction
        actions={FloatingActionButtonsActions}
        onPressItem={(name) => {
          console.log(`selected button: ${name}`);
          navigation.navigate("AddNewPasswordScreen");
        }}
      />
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
          name="PasswordListScreen"
          component={PasswordListScreen}
          options={{ title: "List of Passwords" }}
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

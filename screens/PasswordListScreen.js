import React, { useState, useEffect } from "react";
import { ListItem, Avatar, SearchBar } from "react-native-elements";
import { StyleSheet, Text, View, Image, Button, FlatList } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import FloatingActionButtonsActions from "../model/FloatingActionButtons.js";
import stateHolder from "..//StateHolder.js";

function PasswordListScreen({ route, navigation }) {
  const [selectedId, setSelectedId] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState(stateHolder.state.passwordRecordsArray);
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState(
    stateHolder.state.passwordRecordsArray
  );
  var state = { refreshing: false };

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = data.filter(function (item) {
        const itemData = item.id ? item.id.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(data);
      setSearch(text);
    }
  };

  const renderItem = ({ item }) => (
    <ListItem
      onPress={() => {
        setSelectedId(item.id);
        navigation.navigate("PasswordRecordDetailsScreen", {
          key: item.id,
        });
      }}
      bottomDivider
    >
      <Avatar rounded source={require("../assets/key-variant.png")} />
      <ListItem.Content>
        <ListItem.Title>{item.id}</ListItem.Title>
        <ListItem.Subtitle>{item.displayName}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );

  const handleRefresh = () => {
    state = { refreshing: true };
    setData(stateHolder.state.passwordRecordsArray);
    setFilteredDataSource(stateHolder.state.passwordRecordsArray);
    state = { refreshing: false };
  };

  useEffect(() => {
    // Interval to update count
    const interval = setInterval(() => {
      setData(stateHolder.state.passwordRecordsArray);
    }, 1000);

    // Subscribe for the focus Listener
    const unsubscribe = navigation.addListener("focus", () => {
      setData(stateHolder.state.passwordRecordsArray);
    });

    navigation.addListener("beforeRemove", (e) => {
      // Prevent default behavior of leaving the screen
      e.preventDefault();
    });

    return () => {
      // Clear setInterval in case of screen unmount
      clearTimeout(interval);
      // Unsubscribe for the focus Listener
      unsubscribe;
    };
  }, [navigation]);

  return (
    <View style={styles.containerForDetails}>
      <SearchBar
        round
        placeholder="Type Here..."
        onChangeText={(text) => searchFilterFunction(text)}
        onClear={(text) => searchFilterFunction("")}
        value={search}
      />
      <FlatList
        data={filteredDataSource}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshing={state.refreshing}
        onRefresh={handleRefresh}
      />
      <FloatingAction
        actions={FloatingActionButtonsActions}
        onPressItem={(name) => {
          console.log(`selected button: ${name}`);
          if (name == "add_new_password") {
            navigation.navigate("AddNewPasswordScreen");
          } else if (name == "add_new_password_from_picture") {
            navigation.navigate("AddNewPasswordScreenFromPicture");
          }
        }}
      />
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

module.exports = PasswordListScreen;

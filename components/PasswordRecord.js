import React from "react";

import { StyleSheet, Text, View } from "react-native";

const PasswordRecord = (props) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 20,
    height: 20,
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
    backgroundColor: "#55BCF6",
  },
  itemText: {
    fontSize: 16,
  },
});

module.exports = PasswordRecord;

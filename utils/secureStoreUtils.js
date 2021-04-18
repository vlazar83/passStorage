import * as SecureStore from "expo-secure-store";
import React from "react";
import KEY_FOR_ARRAY_OF_UUIDS from "../utils/constants.js";

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    alert("🔐 Here's your value 🔐 \n" + result);
  } else {
    alert("No values stored under that key.");
  }
}

async function addRecordToArrayOfUUIDs(newItem) {
  let result = await SecureStore.getItemAsync(KEY_FOR_ARRAY_OF_UUIDS);
  if (result) {
    var array = JSON.parse(result);
    array.push(newItem);
    //return array;
    save(KEY_FOR_ARRAY_OF_UUIDS, JSON.stringify(array));
  } else {
    alert("No values stored under that key.");
  }
}

function initializeArrayOfUUIDs() {
  console.log("Initialize Array of UUIDs");
  var array = [""];
  save(KEY_FOR_ARRAY_OF_UUIDS, JSON.stringify(array));
}

async function getArrayOfUUIDs() {
  let result = await SecureStore.getItemAsync(KEY_FOR_ARRAY_OF_UUIDS);
  console.log("getArrayOfUUIDs result " + result);
  if (result) {
    console.log("getArrayOfUUIDs returns:" + JSON.parse(result));
  } else {
    initializeArrayOfUUIDs();
  }
}

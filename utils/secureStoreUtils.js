import * as SecureStore from "expo-secure-store";
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

async function getArrayOfUUIDs() {
  let result = await SecureStore.getItemAsync(KEY_FOR_ARRAY_OF_UUIDS);
  if (result) {
    console.log(JSON.parse(result));
    return JSON.parse(result);
  } else {
    initializeArrayOfUUIDs();
  }
}

async function addRecordToArrayOfUUIDs(newItem) {
  let result = await SecureStore.getItemAsync(KEY_FOR_ARRAY_OF_UUIDS);
  if (result) {
    var array = JSON.parse(result);
    array.push(newItem);
    return array;
  } else {
    alert("No values stored under that key.");
  }
}

function initializeArrayOfUUIDs() {
  var array = [];
  save(KEY_FOR_ARRAY_OF_UUIDS, JSON.stringify(array));
}

module.exports = getArrayOfUUIDs;

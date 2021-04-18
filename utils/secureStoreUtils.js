import * as SecureStore from "expo-secure-store";
import KEY_FOR_ARRAY_OF_UUIDS from "../utils/constants.js";

function getArrayOfUUIDs() {
    let result = await SecureStore.getItemAsync(KEY_FOR_ARRAY_OF_UUIDS);
    if (result) {
        console.log(JSON.parse(result));
        return(SON.parse(result));
    } else {
        alert("No values stored under that key.");
    }
}

function addRecordToArrayOfUUIDs(newItem) {
    let result = await SecureStore.getItemAsync(KEY_FOR_ARRAY_OF_UUIDS);
    if (result) {
        var array = JSON.parse(result);
        array.push(newItem);
        return(array);
    } else {
        alert("No values stored under that key.");
    }
}
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Button,
  Animated,
  Easing,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import stateHolder from "..//StateHolder.js";
import KEY_FOR_ARRAY_OF_UUIDS from "../utils/constants.js";
import * as SecureStore from "expo-secure-store";
import LottieView from "lottie-react-native";

class HomeScreen extends React.Component {
  state = {
    duration: 3000,
    isPlaying: true,
    isInverse: false,
    loop: true,
    sliderPosition: new Animated.Value(0),
    progress: 0,
  };

  async loadRecordsIntoPasswordRecordsArray() {
    promises = [];
    console.log("Array before foreach:" + stateHolder.state.uuidArray);
    stateHolder.state.uuidArray.forEach((element) => {
      console.log(element);
      promises.push(SecureStore.getItemAsync(element));
    });

    Promise.all(promises).then((responses) => {
      responses.forEach((element) => {
        console.log(element);
        stateHolder.state.passwordRecordsArray.push({
          id: JSON.parse(element).id + Math.random().toString(36).substring(7),
          displayName: JSON.parse(element).displayName,
          userID: JSON.parse(element).userID,
          password: JSON.parse(element).password,
        });
      });
    });
  }

  async loadRecords() {
    try {
      let arrayInStringFormat = await SecureStore.getItemAsync(
        KEY_FOR_ARRAY_OF_UUIDS
      );
      stateHolder.state.uuidArray = JSON.parse(arrayInStringFormat);
      console.log("responseUUIDs1: ", stateHolder.state.uuidArray);
    } catch (error) {
      console.log(error);
    }
    this.loadRecordsIntoPasswordRecordsArray();
  }

  componentDidMount() {
    this.loadRecords();
    //this.animation.play();
  }

  resetAnimation = () => {
    this.animation.reset();
    this.animation.play();
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <LottieView
          ref={(animation) => {
            this.animation = animation;
          }}
          style={{
            width: 400,
            height: 400,
            backgroundColor: "#f4511e",
          }}
          source={require("../assets/lottie-safe.json")}
          speed={1.5}
          progress={this.state.sliderPosition}
          enableMergePathsAndroidForKitKatAndAbove
          // OR find more Lottie files @ https://lottiefiles.com/featured
          // Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
        />
        <Button
          title="Let's get started"
          onPress={() => {
            Animated.timing(this.state.sliderPosition, {
              toValue: 1,
              duration: this.state.duration,
              easing: Easing.linear,
              useNativeDriver: true,
            }).start(({ finished }) => {
              if (finished) {
                this.setState({ isPlaying: false });
                this.props.navigation.navigate("PasswordListScreen");
                console.log(stateHolder.state.uuidArray);
                console.log(stateHolder.state.passwordRecordsArray);
              }
            });
          }}
        />
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4511e",
    alignItems: "center",
    justifyContent: "center",
  },
});

module.exports = HomeScreen;

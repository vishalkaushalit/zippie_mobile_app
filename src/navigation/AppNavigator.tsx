import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../screens/Splash/SplashScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import OTPVerificationScreen from "../screens/Auth/OTPVerificationScreen";
import HomeScreen from "../screens/Home/HomeScreen";

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  OTPVerification: {
    phoneNumber: string;
  };
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />

      <Stack.Screen name="Login" component={LoginScreen} />

      <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />

      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

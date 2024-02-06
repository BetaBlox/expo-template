import { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { View } from "react-native";
import Toast, { ErrorToast, SuccessToast } from "react-native-toast-message";
import { Typography } from "@/config/typography";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import Router from "./Router";

// Slow down the splash screen a few seconds so people can see it
SplashScreen.preventAutoHideAsync();

export default function App() {
  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}
      onLayout={onLayoutRootView}
    >
      <AuthProvider>
        <Router />
      </AuthProvider>

      {/* 
          Render the Toast component in your app's entry file, as the 
          LAST CHILD in the View hierarchy (along with any other components 
          that might be rendered there):
        */}
      <Toast
        position="bottom"
        config={{
          success: (props) => (
            <SuccessToast
              {...props}
              text1Style={Typography.toastHeading}
              text2Style={Typography.toastBody}
            />
          ),
          error: (props) => (
            <ErrorToast
              {...props}
              text1Style={Typography.toastHeading}
              text2Style={Typography.toastBody}
            />
          ),
        }}
      />
    </View>
  );
}

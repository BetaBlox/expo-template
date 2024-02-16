import { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config"; // Optional if you want to use default theme
import { View } from "react-native";
import Toast, { ErrorToast, SuccessToast } from "react-native-toast-message";
import { AuthProvider } from "@/hooks/useAuth";
import Router from "./Router";

// Slow down the splash screen a few seconds so people can see it
SplashScreen.preventAutoHideAsync();

export default function App() {
  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  return (
    <GluestackUIProvider config={config}>
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
            success: (props) => <SuccessToast {...props} />,
            error: (props) => <ErrorToast {...props} />,
          }}
        />
      </View>
    </GluestackUIProvider>
  );
}

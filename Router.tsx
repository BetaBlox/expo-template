import { useEffect } from "react";
import Feather from "react-native-vector-icons/Feather";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, Text, View } from "react-native";
import AuthStack from "@/stacks/AuthStack";
import { useAuth } from "@/hooks/useAuth";
import * as SplashScreen from "expo-splash-screen";
import * as Location from "expo-location";
import HomeScreen from "@/screens/HomeScreen";
import FeatureScreen from "@/screens/FeatureScreen";
import NotificationsScreen from "@/screens/NotificationsScreen";
import ProfileScreen from "@/screens/ProfileScreen";

const Tab = createBottomTabNavigator();
const Tabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size = 25 }) => {
        if (route.name === "HomeTab") {
          return <Feather name="home" color={color} size={size} />;
        } else if (route.name === "FeatureTab") {
          return <Feather name="list" color={color} size={size} />;
        } else if (route.name === "NotificationTab") {
          return <Feather name="bell" color={color} size={size} />;
        } else if (route.name === "ProfileTab") {
          return <Feather name="user" color={color} size={size} />;
        }
      },
    })}
  >
    <Tab.Screen
      name="HomeTab"
      component={HomeScreen}
      options={{
        title: "Home",
      }}
    />
    <Tab.Screen
      name="FeatureTab"
      component={FeatureScreen}
      options={{
        title: "Feature 1",
      }}
    />
    <Tab.Screen
      name="NotificationTab"
      component={NotificationsScreen}
      options={{
        title: "Notifications",
      }}
    />
    <Tab.Screen
      name="ProfileTab"
      component={ProfileScreen}
      options={{
        title: "Notifications",
      }}
    />
  </Tab.Navigator>
);

export default function Router() {
  const { user, isLoaded, loadUserFromSession } = useAuth();

  useEffect(() => {
    loadUserFromSession();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      console.log("hiding splash screen now");
      SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  let navStack = null;
  if (user) {
    navStack = <Tabs />;
    // } else if (user && user.isOnboardingComplete === false) {
    //   navStack = <OnboardingStack />;
  } else {
    navStack = <AuthStack />;
  }

  return <NavigationContainer>{navStack}</NavigationContainer>;
}

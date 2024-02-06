import { createStackNavigator } from "@react-navigation/stack";
import RegisterScreen from "@/screens/RegisterScreen";
import LoginScreen from "@/screens/LoginScreen";
import ForgotPasswordScreen from "@/screens/ForgotPasswordScreen";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Register">
      <Stack.Screen
        name="Register"
        options={{
          headerShown: false,
        }}
        component={RegisterScreen}
      />
      <Stack.Screen
        name="Login"
        options={{
          headerTitle: "",
        }}
        component={LoginScreen}
      />
      <Stack.Screen
        name="ForgotPassword"
        options={{
          headerTitle: "",
        }}
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  );
}

import Button from "@/components/Button";
import { Spacing } from "@/config/spacing";
import { Typography } from "@/config/typography";
import { useAuth } from "@/hooks/useAuth";
import FullScreenLayout from "@/layouts/FullScreenLayout";
import Api from "@/services/Api";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Toast from "react-native-toast-message";

export default function RegisterScreen({ navigation }) {
  const { loadUserFromSession } = useAuth();
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    const payload = {
      email: "john@betablox.com",
      password: "password",
    };

    setLoading(true);
    try {
      await Api.auth.register(payload);
      await loadUserFromSession();
    } catch (error: any) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Unable to create account",
      });
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <FullScreenLayout
      contentStyle={{
        alignItems: "center",
        justifyContent: "flex-end",
        paddingTop: Spacing.lg,
        paddingBottom: Spacing.lg,
        paddingLeft: Spacing.lg,
        paddingRight: Spacing.lg,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={Typography.jumbo}>Expo Template</Text>
        <Text
          style={[
            Typography.body,
            {
              textAlign: "center",
            },
          ]}
        >
          This is a template app created with React Native and Expo
        </Text>
      </View>
      <Button
        text="Sign Up with Email"
        iconName="mail"
        onPress={signUp}
        loading={loading}
      />
      <Pressable onPress={() => goToLogin()}>
        <Text
          style={[
            Typography.body,
            {
              marginTop: Spacing.lg,
            },
          ]}
        >
          Already have an account? Sign In.
        </Text>
      </Pressable>
    </FullScreenLayout>
  );
}

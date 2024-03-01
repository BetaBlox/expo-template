import { useAuth } from "@/hooks/useAuth";
import FullScreenLayout from "@/layouts/FullScreenLayout";
import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  CalendarDaysIcon,
  HStack,
  Heading,
  Icon,
  MailIcon,
  Pressable,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { useState } from "react";
import Toast from "react-native-toast-message";

export default function RegisterScreen({ navigation }) {
  const { signup, loadFromStorage } = useAuth();
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    const payload = {
      email: "john@betablox.com",
      password: "password",
    };

    setLoading(true);

    try {
      await signup(payload);
      await loadFromStorage();
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
    <FullScreenLayout>
      <Box justifyContent="space-between" flex={1}>
        <VStack space="md">
          <Heading size="2xl" textAlign="center">
            Expo Template
          </Heading>
          <Text textAlign="center">
            This is a template app created with React Native and Expo
          </Text>
        </VStack>

        <VStack space="md">
          <Button onPress={signUp} size="lg">
            <HStack space="md" alignItems="center">
              <ButtonIcon as={MailIcon} />
              <ButtonText>Sign Up With Email</ButtonText>
            </HStack>
          </Button>
          <Pressable onPress={() => goToLogin()}>
            <Text textAlign="center">Already have an account? Sign In.</Text>
          </Pressable>
        </VStack>
      </Box>
    </FullScreenLayout>
  );
}

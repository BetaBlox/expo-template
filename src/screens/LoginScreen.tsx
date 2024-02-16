import { View } from "react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import TextField, {
  AutoComplete,
  InputMode,
  AutoCapitalize,
} from "@/components/TextField";
import { useAuth } from "@/hooks/useAuth";
import Toast from "react-native-toast-message";
import Api from "@/services/Api";
import ScrollViewLayout from "@/layouts/ScrollViewLayout";
import {
  Heading,
  Text,
  Pressable,
  Button,
  ButtonText,
  VStack,
  AlertCircleIcon,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
} from "@gluestack-ui/themed";

type FormData = {
  email: string;
  password: string;
};
export default function LoginScreen({ navigation }) {
  const { loadUserFromSession } = useAuth();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const login = async (data: FormData) => {
    setLoading(true);
    try {
      await Api.auth.signInWithEmailAndPassword(data.email, data.password);
      await loadUserFromSession();
    } catch (error: any) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: "Unable to sign in",
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const goToForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  return (
    <ScrollViewLayout>
      <Heading size="2xl" textAlign="center" marginBottom="$4">
        Login
      </Heading>

      <VStack space="md" marginBottom="$10">
        <Controller
          control={control}
          rules={{
            required: { value: true, message: "Email is required" },
          }}
          name="email"
          render={({ field, fieldState, formState }) => {
            return (
              <FormControl
                size="md"
                isInvalid={fieldState.invalid}
                isRequired={true}
              >
                <FormControlLabel mb="$1">
                  <FormControlLabelText>Email</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    placeholder="Email"
                    defaultValue={field.value}
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                    keyboardType="email-address"
                    autoComplete="email"
                  />
                </Input>
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    {fieldState.error?.message}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
            );
          }}
        />
        <Controller
          control={control}
          rules={{
            required: { value: true, message: "Password is required" },
          }}
          name="password"
          render={({ field, fieldState, formState }) => {
            return (
              <FormControl
                size="md"
                isInvalid={fieldState.invalid}
                isRequired={true}
              >
                <FormControlLabel mb="$1">
                  <FormControlLabelText>Password</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    type="password"
                    placeholder="Password"
                    defaultValue={field.value}
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                  />
                </Input>
                <FormControlHelper>
                  <FormControlHelperText>Keep it secret!</FormControlHelperText>
                </FormControlHelper>
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>
                    {fieldState.error?.message}
                  </FormControlErrorText>
                </FormControlError>
              </FormControl>
            );
          }}
        />
      </VStack>

      <VStack space="md">
        <Button onPress={handleSubmit(login)}>
          <ButtonText>Submit</ButtonText>
        </Button>
        <Pressable onPress={() => goToForgotPassword()}>
          <Text textAlign="center">Forgot password?</Text>
        </Pressable>
      </VStack>
    </ScrollViewLayout>
  );
}

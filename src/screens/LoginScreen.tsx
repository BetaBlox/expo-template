import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import Toast from "react-native-toast-message";
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
  const { signin, loadFromStorage } = useAuth();
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

    const res = await signin(data.email, data.password);

    if (res.ok) {
      await loadFromStorage();
    } else {
      const json = await res.json();
      console.error(json);
      Toast.show({
        type: "error",
        text1: json.message,
      });
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

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ScrollViewLayout from "@/layouts/ScrollViewLayout";
import {
  AlertCircleIcon,
  Box,
  Button,
  ButtonText,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  Heading,
  Input,
  InputField,
} from "@gluestack-ui/themed";

type FormData = {
  email: string;
  password: string;
};
export default function ForgotPasswordScreen({ navigation }) {
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

  const sendPasswordResetEmail = async (data: FormData) => {
    // setLoading(true);
    // try {
    //   await Api.auth.sendPasswordResetEmail(data.email);
    //   setScreenMode(SCREEN_MODE.RESET);
    // } catch (error: any) {
    //   console.error(error);
    //   Toast.show({
    //     type: "error",
    //     text1: "Error",
    //     text2: error.message,
    //   });
    // } finally {
    //   setLoading(false);
    // }
  };

  const changePassword = async (data: FormData) => {
    // setLoading(true);
    // try {
    //   await Api.auth.resetPassword(data.email, data.password, verificationCode);
    //   navigation.goBack();
    // } catch (error: any) {
    //   console.error(error);
    //   Toast.show({
    //     type: "error",
    //     text1: "Error",
    //     text2: error.message,
    //   });
    // } finally {
    //   setLoading(false);
    // }
  };

  // const goToForgotPassword = () => {
  //   navigation.navigate("ForgotPassword");
  // };

  return (
    <ScrollViewLayout>
      <Heading size="2xl" textAlign="center" marginBottom="$4">
        Reset Password
      </Heading>
      <Box marginBottom={"$10"}>
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
      </Box>
      <Button onPress={handleSubmit(sendPasswordResetEmail)}>
        <ButtonText>Send Code</ButtonText>
      </Button>
    </ScrollViewLayout>
  );
}

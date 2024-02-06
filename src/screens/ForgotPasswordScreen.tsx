import Button from "@/components/Button";
import { Spacing } from "@/config/spacing";
import { Typography } from "@/config/typography";
import { Pressable, Text, View } from "react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import TextField, {
  AutoComplete,
  InputMode,
  AutoCapitalize,
} from "@/components/TextField";
import { Color } from "@/config/color";
import ScrollViewLayout from "@/layouts/ScrollViewLayout";

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
      <Text style={Typography.jumbo}>Reset Password</Text>
      <View
        style={{
          width: "100%",
        }}
      >
        <Controller
          control={control}
          rules={{
            required: { value: true, message: "Email is required" },
          }}
          name="email"
          render={({ field, fieldState, formState }) => {
            return (
              <TextField
                placeholder="Email"
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                autoComplete={AutoComplete.EMAIL}
                inputMode={InputMode.EMAIL}
                autoCapitalize={AutoCapitalize.NONE}
              />
            );
          }}
        />
      </View>
      <Button
        text="Send Code"
        onPress={handleSubmit(sendPasswordResetEmail)}
        loading={loading}
      />
    </ScrollViewLayout>
  );
}

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
import { useAuth } from "@/hooks/useAuth";
import Toast from "react-native-toast-message";
import Api from "@/services/Api";
import ScrollViewLayout from "@/layouts/ScrollViewLayout";

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
      <Text style={Typography.jumbo}>Login</Text>
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
        <Controller
          control={control}
          rules={{
            required: { value: true, message: "Password is required" },
          }}
          name="password"
          render={({ field, fieldState, formState }) => {
            return (
              <TextField
                placeholder="Password"
                value={field.value}
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                autoCapitalize={AutoCapitalize.NONE}
                secureTextEntry
              />
            );
          }}
        />
      </View>
      <Button text="Sign In" onPress={handleSubmit(login)} loading={loading} />
      <Pressable onPress={() => goToForgotPassword()}>
        <Text
          style={[
            Typography.body,
            {
              marginTop: Spacing.lg,
            },
          ]}
        >
          Forgot password?
        </Text>
      </Pressable>
    </ScrollViewLayout>
  );
}

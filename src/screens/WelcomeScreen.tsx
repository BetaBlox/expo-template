import Button from "@/components/Button";
import { Text } from "react-native";
import { Typography } from "@/config/typography";
import ScrollViewLayout from "@/layouts/ScrollViewLayout";

export default function WelcomeScreen({ navigation }) {
  return (
    <ScrollViewLayout>
      <Text style={Typography.jumbo}>Welcome Screen</Text>
      <Button
        text="Get Started"
        onPress={() => {
          navigation.navigate("ForgotPassword");
        }}
      />
    </ScrollViewLayout>
  );
}

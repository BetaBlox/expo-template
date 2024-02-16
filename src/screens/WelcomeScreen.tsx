import ScrollViewLayout from "@/layouts/ScrollViewLayout";
import { Button, ButtonText, Heading } from "@gluestack-ui/themed";

export default function WelcomeScreen({ navigation }) {
  return (
    <ScrollViewLayout>
      <Heading>Welcome Screen</Heading>
      <Button
        onPress={() => {
          navigation.navigate("ForgotPassword");
        }}
      >
        <ButtonText>Get Started</ButtonText>
      </Button>
    </ScrollViewLayout>
  );
}

import { Text } from "react-native";
import ScrollViewLayout from "@/layouts/ScrollViewLayout";
import { useAuth } from "@/hooks/useAuth";
import { Button, ButtonText, Center, Heading } from "@gluestack-ui/themed";

export default function ProfileScreen() {
  const { user, signout } = useAuth();

  return (
    <ScrollViewLayout>
      <Center>
        <Heading size="2xl">Profile Screen</Heading>
        <Text>{JSON.stringify(user, null, 4)}</Text>
        <Button
          onPress={() => {
            signout();
          }}
          marginTop={"$4"}
        >
          <ButtonText>Logout</ButtonText>
        </Button>
      </Center>
    </ScrollViewLayout>
  );
}

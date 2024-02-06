import { Text, View } from "react-native";
import { Typography } from "@/config/typography";
import ScrollViewLayout from "@/layouts/ScrollViewLayout";
import Api from "@/services/Api";
import Button from "@/components/Button";
import { Color } from "@/config/color";
import { Spacing } from "@/config/spacing";
import { useAuth } from "@/hooks/useAuth";

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  return (
    <ScrollViewLayout>
      <View
        style={{
          flex: 1,
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text style={Typography.jumbo}>Profile Screen</Text>
        <Text>{JSON.stringify(user, null, 4)}</Text>
        <Button
          text="Logout"
          onPress={() => {
            signOut();
          }}
          containerStyle={{
            marginTop: Spacing.xl,
            backgroundColor: Color.secondary,
          }}
        />
      </View>
    </ScrollViewLayout>
  );
}

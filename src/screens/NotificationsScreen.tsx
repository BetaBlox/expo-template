import { Text, View } from "react-native";
import { Typography } from "@/config/typography";
import ScrollViewLayout from "@/layouts/ScrollViewLayout";

export default function NotificationsScreen() {
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
        <Text style={Typography.jumbo}>Notifications Screen</Text>
      </View>
    </ScrollViewLayout>
  );
}

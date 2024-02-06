import { Text, View } from "react-native";
import { Typography } from "@/config/typography";
import ScrollViewLayout from "@/layouts/ScrollViewLayout";

export default function HomeScreen() {
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
        <Text style={Typography.jumbo}>Home Screen</Text>
      </View>
    </ScrollViewLayout>
  );
}

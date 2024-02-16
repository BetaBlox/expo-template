import { Color } from "@/config/color";
import { Box } from "@gluestack-ui/themed";
import { SafeAreaView } from "react-native";

export default function FullScreenLayout({
  children,
  backgroundColor = Color.white,
}: {
  children: any;
  backgroundColor?: string;
}) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor,
      }}
    >
      <Box flex={1} padding="$4">
        {children}
      </Box>
    </SafeAreaView>
  );
}

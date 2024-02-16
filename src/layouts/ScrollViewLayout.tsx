import { Box } from "@gluestack-ui/themed";
import { SafeAreaView, ScrollView } from "react-native";

export default function ScrollViewLayout({ children }: { children: any }) {
  return (
    <SafeAreaView>
      <ScrollView alwaysBounceVertical={false}>
        <Box padding="$4">{children}</Box>

        {/* Bottom spacer to offset scrolling around the tab bar */}
        <Box height={100} />
      </ScrollView>
    </SafeAreaView>
  );
}

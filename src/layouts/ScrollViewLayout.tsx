import { Spacing } from "@/config/spacing";
import { SafeAreaView, ScrollView, View } from "react-native";

export default function ScrollViewLayout({
  children,
  containerStyle = {},
  contentStyle = {},
  backgroundColor,
}: {
  children: any;
  containerStyle?: object;
  contentStyle?: object;
  backgroundColor?: string;
}) {
  return (
    <SafeAreaView
      style={{
        ...containerStyle,
        backgroundColor,
      }}
    >
      <ScrollView alwaysBounceVertical={false}>
        <View
          style={{
            padding: Spacing.md,
            ...contentStyle,
          }}
        >
          {children}
        </View>

        {/* Bottom spacer to offset scrolling around the tab bar */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

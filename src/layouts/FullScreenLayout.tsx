import { Color } from "@/config/color";
import { Spacing } from "@/config/spacing";
import { Image, SafeAreaView, View, useWindowDimensions } from "react-native";

export default function FullScreenLayout({
  children,
  backgroundColor = Color.white,
  backgroundImage = null,
  containerStyle = {},
  contentStyle = {},
}: {
  children: any;
  backgroundColor?: string;
  backgroundImage?: any;
  containerStyle?: object;
  contentStyle?: object;
}) {
  const { height, width } = useWindowDimensions();

  return (
    <>
      {backgroundImage && (
        <View
          style={{
            position: "absolute",
            zIndex: -10,
          }}
        >
          <View
            style={{
              position: "absolute",
              zIndex: 10,
              width,
              height,
              backgroundColor: Color.black,
              opacity: 0.2,
            }}
          />
          <Image
            source={backgroundImage}
            style={{
              position: "absolute",
              zIndex: 5,
              width,
              height,
              resizeMode: "cover",
            }}
          />
        </View>
      )}
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: backgroundImage
            ? Color.transparent
            : backgroundColor,
          ...containerStyle,
        }}
      >
        <View
          style={{
            flex: 1,
            paddingTop: Spacing.md,
            paddingBottom: Spacing.md,
            paddingLeft: Spacing.md,
            paddingRight: Spacing.md,
            ...contentStyle,
          }}
        >
          {children}
        </View>
      </SafeAreaView>
    </>
  );
}

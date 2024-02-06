import { Color } from "@/config/color";
import { Spacing } from "@/config/spacing";
import { Typography } from "@/config/typography";
import { Text, Pressable, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";

interface Props {
  text: string;
  onPress: () => void;
  iconName?: string;
  containerStyle?: object;
  loading?: boolean;
  disabled?: boolean;
}
export default function Button({
  text,
  onPress,
  iconName,
  containerStyle = {},
  loading = false,
  disabled = false,
}: Props) {
  const handlePress = () => {
    if (disabled) {
      return;
    }

    onPress();
  };

  return (
    <View
      style={{
        borderRadius: 5,
        backgroundColor: Color.primary,
        ...containerStyle,
      }}
    >
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: Spacing.md,
          paddingHorizontal: Spacing.md,
          justifyContent: "center",
          gap: Spacing.sm,
        }}
        onPress={handlePress}
      >
        {loading ? (
          <Text>...</Text>
        ) : (
          <>
            {iconName && (
              <Feather name={iconName} color={Color.white} size={24} />
            )}
            <Text
              style={{
                color: Color.white,
                fontSize: 16,
              }}
            >
              {text}
            </Text>
          </>
        )}
      </Pressable>
    </View>
  );
}

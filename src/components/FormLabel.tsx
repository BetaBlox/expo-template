import { Typography } from "@/config/typography";
import { Text } from "react-native";

interface Props {
  children: string | JSX.Element;
}
export default function FormLabel({ children }: Props) {
  return <Text style={Typography.formLabel}>{children}</Text>;
}

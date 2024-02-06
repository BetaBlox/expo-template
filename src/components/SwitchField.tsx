import { Color } from "@/config/color";
import React from "react";
import { Switch } from "react-native";

const DEFAULT_BACKGROUND_COLOR = "#333";

interface Props {
  value: boolean;
  onChange: (value: boolean) => void;
}
export default function SwitchField({ value, onChange }: Props) {
  return (
    <Switch
      trackColor={{ false: DEFAULT_BACKGROUND_COLOR, true: Color.primary }}
      thumbColor={Color.white}
      ios_backgroundColor={DEFAULT_BACKGROUND_COLOR}
      onValueChange={onChange}
      value={value}
    />
  );
}

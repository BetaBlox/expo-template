import { Color } from "@/config/color";
import { Spacing } from "@/config/spacing";
import { StyleSheet, TextInput } from "react-native";

export enum Formatter {
  STRING = "string",
  NUMBER = "number",
}

// @see - https://reactnative.dev/docs/textinput#autocomplete
export enum AutoComplete {
  ADDITIONAL_NAME = "additional-name",
  ADDRESS_LINE1 = "address-line1",
  ADDRESS_LINE2 = "address-line2",
  CC_NUMBER = "cc-number",
  COUNTRY = "country",
  CURRENT_PASSWORD = "current-password",
  EMAIL = "email",
  FAMILY_NAME = "family-name",
  GIVEN_NAME = "given-name",
  HONORIFIC_PREFIX = "honorific-prefix",
  HONORIFIC_SUFFIX = "honorific-suffix",
  NAME = "name",
  NEW_PASSWORD = "new-password",
  OFF = "off",
  ONE_TIME_CODE = "one-time-code",
  POSTAL_CODE = "postal-code",
  STREET_ADDRESS = "street-address",
  TEL = "tel",
  USERNAME = "username",
}
// @see - https://reactnative.dev/docs/textinput#inputmode
// overrides keyboard type
export enum InputMode {
  NONE = "none",
  TEXT = "text",
  DECIMAL = "decimal",
  NUMERIC = "numeric",
  TEL = "tel",
  SERACH = "search",
  EMAIL = "email",
  URL = "url",
}
// @see - https://reactnative.dev/docs/textinput#keyboardtype
export enum KeyboardType {
  DEFAULT = "default",
  NUMBER_PAD = "number-pad",
  DECIMALE_PAD = "decimal-pad",
  NUMERIC = "numeric",
  EMAIL = "email-address",
  PHONE = "phone-pad",
  URL = "url",
}

// @see -https://reactnative.dev/docs/textinput#autocapitalize
export enum AutoCapitalize {
  CHARACTERS = "characters", // all characters.
  WORDS = "words", // first letter of each word.
  SENTENCES = "sentences", // first letter of each sentence (default).
  NONE = "none", // don't auto capitalize anything.
}

interface Props {
  value: any;
  onChangeText: (value: any) => void;
  onBlur: () => void;
  formatter?: Formatter;
  autoComplete?: AutoComplete;
  inputMode?: InputMode;
  // keyboardType?: KeyboardType;
  placeholder?: string;
  autoCapitalize?: AutoCapitalize;
  secureTextEntry?: boolean;
  required?: boolean;
}
export default function TextField({
  value,
  onChangeText,
  onBlur,
  formatter = Formatter.STRING,
  autoComplete = AutoComplete.OFF,
  inputMode = InputMode.TEXT,
  // keyboardType = KeyboardType.DEFAULT,
  placeholder = "",
  autoCapitalize = AutoCapitalize.SENTENCES,
  secureTextEntry = false,
  required = false,
}: Props) {
  // const handleChangeText = (newValue: string) => {
  //   switch (formatter) {
  //     case Formatter.NUMBER:
  //       return onChange(Number(newValue));
  //     default:
  //       return onChange(newValue);
  //   }
  // };

  return (
    <TextInput
      style={styles.text}
      value={value}
      onBlur={onBlur}
      onChangeText={onChangeText}
      autoComplete={autoComplete}
      inputMode={inputMode}
      // keyboardType={keyboardType}
      multiline={false}
      cursorColor={Color.primary}
      editable={true}
      autoCapitalize={autoCapitalize}
      placeholder={placeholder}
      placeholderTextColor={"#999"}
      secureTextEntry={secureTextEntry}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: "#000",
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 5,
    fontFamily: "Arial",
    padding: Spacing.md,
    flexGrow: 1,
    marginBottom: Spacing.md,
    backgroundColor: Color.white,
  },
});

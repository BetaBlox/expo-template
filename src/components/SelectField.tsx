import { Color } from "@/config/color";
import { Spacing } from "@/config/spacing";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Button from "./Button";

export type SelectOption = {
  label: string;
  value: string;
};

interface Props {
  value: any;
  text?: string;
  options: SelectOption[];
  onChange: (value: any) => void;
  onBlur: () => void;
  placeholder?: string;
}
export default function SelectField({
  value,
  text,
  options,
  onChange,
  onBlur,
  placeholder = "",
}: Props) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View
      style={{
        flexGrow: 1,
      }}
    >
      <Pressable onPress={() => setModalVisible(true)}>
        {text ? (
          <Text style={styles.text}>{text}</Text>
        ) : (
          <Text style={styles.placeholder}>{placeholder}</Text>
        )}
      </Pressable>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setModalVisible(false)}
        />
        <View
          style={{
            backgroundColor: Color.white,
            padding: Spacing.md,
          }}
        >
          <Picker
            style={styles.picker}
            selectedValue={value}
            onValueChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            itemStyle={styles.item}
          >
            {options.map((option) => (
              <Picker.Item
                key={option.value}
                label={option.label}
                value={option.value}
              />
            ))}
          </Picker>
          <View
            style={{
              marginTop: Spacing.sm,
              marginBottom: Spacing.lg,
            }}
          >
            <Button
              onPress={() => {
                // Let users default select the first option without having to always change
                if (!value) {
                  onChange(options[0].value);
                }

                setModalVisible(false);
              }}
              text="Save"
              gradientColors={["#333"]}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: "#333",
    fontFamily: "Arial",
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
  },
  placeholder: {
    fontSize: 16,
    color: "#999",
    fontFamily: "Arial",
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
  },
  item: {
    fontFamily: "Arial",
  },
  picker: {
    backgroundColor: Color.white,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});

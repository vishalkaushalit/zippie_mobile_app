import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../styles";

type Props = { value: string; onChangeText: (value: string) => void };

export default function SearchBar({ value, onChangeText }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>⌕</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search restaurants or dishes"
        placeholderTextColor="#908AA0"
        returnKeyType="search"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 54,
    marginHorizontal: 20,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: { color: colors.text, fontSize: 25, marginRight: 10 },
  input: { flex: 1, color: colors.text, fontSize: 15, paddingVertical: 0 },
});

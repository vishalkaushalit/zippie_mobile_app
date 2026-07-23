import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../styles";

type Props = { userName: string; location: string };

export default function Header({ userName, location }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.copy}>
        <Text style={styles.greeting}>Hello, {userName} 👋</Text>
        <Text style={styles.location} numberOfLines={1}>
          📍 {location}
        </Text>
      </View>
      <Pressable style={styles.avatar} accessibilityLabel="Open profile">
        <Text style={styles.avatarText}>{userName.charAt(0)}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", padding: 20 },
  copy: { flex: 1 },
  greeting: { color: colors.text, fontSize: 24, fontWeight: "700" },
  location: { color: colors.muted, fontSize: 14, marginTop: 5 },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#E9DCFF",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: colors.primary, fontSize: 18, fontWeight: "700" },
});

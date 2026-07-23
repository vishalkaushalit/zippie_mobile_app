import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function DiscountBadge({ label }: { label: string }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    left: 12,
    top: 12,
    backgroundColor: "#6C28E8",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  text: { color: "#FFFFFF", fontSize: 12, fontWeight: "700" },
});

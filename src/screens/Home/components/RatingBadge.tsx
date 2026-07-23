import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function RatingBadge({ rating }: { rating: number }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>★ {rating.toFixed(1)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  text: { color: "#211532", fontSize: 12, fontWeight: "700" },
});

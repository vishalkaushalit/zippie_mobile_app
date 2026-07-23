import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function OfferBanner() {
  return (
    <View style={styles.container}>
      <View style={styles.copy}>
        <Text style={styles.eyebrow}>Zippie special</Text>
        <Text style={styles.title}>Free delivery on your first order</Text>
      </View>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Order now</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 22,
    padding: 18,
    borderRadius: 20,
    backgroundColor: "#24113F",
    flexDirection: "row",
    alignItems: "center",
  },
  copy: { flex: 1, paddingRight: 12 },
  eyebrow: {
    color: "#CDAEFF",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
  },
  buttonText: { color: "#5620B7", fontSize: 12, fontWeight: "700" },
});

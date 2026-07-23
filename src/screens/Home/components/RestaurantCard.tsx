import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import type { Restaurant } from "../../../data/restaurants";
import { colors } from "../styles";
import DiscountBadge from "./DiscountBadge";
import RatingBadge from "./RatingBadge";

export default function RestaurantCard({
  restaurant,
}: {
  restaurant: Restaurant;
}) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View>
        <Image source={{ uri: restaurant.imageUrl }} style={styles.image} />
        {restaurant.discount && <DiscountBadge label={restaurant.discount} />}
        <View style={styles.rating}>
          <RatingBadge rating={restaurant.rating} />
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Text style={styles.cuisines} numberOfLines={1}>
          {restaurant.cuisines.join(" • ")}
        </Text>
        <View style={styles.metaRow}>
          <Text style={styles.meta}>🕒 {restaurant.deliveryMinutes} min</Text>
          <Text style={styles.meta}>•</Text>
          <Text style={styles.meta}>{restaurant.deliveryFee}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    borderRadius: 22,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: { opacity: 0.8 },
  image: { width: "100%", height: 170, backgroundColor: "#E8E2EF" },
  rating: { position: "absolute", right: 12, top: 12 },
  body: { padding: 15 },
  name: { color: colors.text, fontSize: 18, fontWeight: "700" },
  cuisines: { color: colors.muted, fontSize: 13, marginTop: 5 },
  metaRow: { flexDirection: "row", gap: 8, marginTop: 10 },
  meta: { color: colors.muted, fontSize: 12, fontWeight: "500" },
});

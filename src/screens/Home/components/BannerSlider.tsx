import React from "react";
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import type { Banner } from "../../../data/banners";

export default function BannerSlider({ banners }: { banners: Banner[] }) {
  return (
    <FlatList
      horizontal
      data={banners}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
      snapToInterval={300}
      decelerationRate="fast"
      renderItem={({ item }) => (
        <ImageBackground
          source={{ uri: item.imageUrl }}
          imageStyle={styles.image}
          style={styles.banner}
        >
          <View style={styles.overlay} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </ImageBackground>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: 20, paddingTop: 20, gap: 12 },
  banner: {
    width: 288,
    height: 150,
    padding: 20,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  image: { borderRadius: 22 },
  overlay: {
    ...StyleSheet.absoluteFill,
    borderRadius: 22,
    backgroundColor: "rgba(25, 10, 50, 0.42)",
  },
  title: { color: "#FFFFFF", fontSize: 21, fontWeight: "800" },
  subtitle: { color: "#FFFFFF", fontSize: 13, marginTop: 4 },
});

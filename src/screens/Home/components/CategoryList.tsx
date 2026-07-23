import React from "react";
import { FlatList, Pressable, StyleSheet, Text } from "react-native";
import type { Category } from "../../../data/categories";
import { colors } from "../styles";

type Props = {
  categories: Category[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export default function CategoryList({
  categories,
  selectedId,
  onSelect,
}: Props) {
  return (
    <FlatList
      horizontal
      data={categories}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => {
        const selected = item.id === selectedId;
        return (
          <Pressable
            onPress={() => onSelect(item.id)}
            style={[styles.item, selected && styles.selectedItem]}
          >
            <Text style={styles.emoji}>{item.emoji}</Text>
            <Text style={[styles.label, selected && styles.selectedLabel]}>
              {item.name}
            </Text>
          </Pressable>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: 20, gap: 12 },
  item: {
    minWidth: 76,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: "center",
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedItem: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  emoji: { fontSize: 25 },
  label: { color: colors.text, fontSize: 12, fontWeight: "600", marginTop: 6 },
  selectedLabel: { color: "#FFFFFF" },
});

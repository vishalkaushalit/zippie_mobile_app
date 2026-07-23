import React from "react";
import { ScrollView, Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../styles";

type Props = {
  filters: string[];
  selectedFilter: string;
  onSelect: (filter: string) => void;
};

export default function FilterChips({
  filters,
  selectedFilter,
  onSelect,
}: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
    >
      {filters.map((filter) => {
        const selected = filter === selectedFilter;
        return (
          <Pressable
            key={filter}
            onPress={() => onSelect(filter)}
            style={[styles.chip, selected && styles.selectedChip]}
          >
            <Text style={[styles.text, selected && styles.selectedText]}>
              {filter}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: 20, paddingTop: 22, gap: 10 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedChip: { backgroundColor: "#EADDFF", borderColor: "#CDB1FA" },
  text: { color: colors.muted, fontSize: 13, fontWeight: "600" },
  selectedText: { color: colors.primary },
});

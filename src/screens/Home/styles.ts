import { StyleSheet } from "react-native";

export const colors = {
  background: "#F8F5FF",
  primary: "#6C28E8",
  text: "#201532",
  muted: "#74708A",
  surface: "#FFFFFF",
  border: "#EAE3F4",
};

export const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: 36 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 14,
  },
  sectionTitle: { color: colors.text, fontSize: 20, fontWeight: "700" },
  sectionAction: { color: colors.primary, fontSize: 13, fontWeight: "600" },
  restaurantList: { paddingHorizontal: 20, gap: 16 },
  emptyText: { color: colors.muted, textAlign: "center", paddingVertical: 40 },
});

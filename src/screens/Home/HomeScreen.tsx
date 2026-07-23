import React, { useMemo, useState } from "react";
import { ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { banners } from "../../data/banners";
import { categories } from "../../data/categories";
import { restaurants } from "../../data/restaurants";
import BannerSlider from "./components/BannerSlider";
import CategoryList from "./components/CategoryList";
import FilterChips from "./components/FilterChips";
import Header from "./components/Header";
import OfferBanner from "./components/OfferBanner";
import RestaurantCard from "./components/RestaurantCard";
import SearchBar from "./components/SearchBar";
import { styles } from "./styles";

const filters = ["All", "Fast delivery", "Top rated", "Offers"];

export default function HomeScreen() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const visibleRestaurants = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return restaurants.filter((restaurant) => {
      const matchesQuery =
        !normalizedQuery ||
        restaurant.name.toLowerCase().includes(normalizedQuery) ||
        restaurant.cuisines.some((cuisine) =>
          cuisine.toLowerCase().includes(normalizedQuery)
        );
      const matchesCategory =
        selectedCategory === "all" ||
        restaurant.categoryId === selectedCategory;
      const matchesFilter =
        selectedFilter === "All" ||
        (selectedFilter === "Fast delivery" &&
          restaurant.deliveryMinutes <= 25) ||
        (selectedFilter === "Top rated" && restaurant.rating >= 4.5) ||
        (selectedFilter === "Offers" && Boolean(restaurant.discount));

      return matchesQuery && matchesCategory && matchesFilter;
    });
  }, [query, selectedCategory, selectedFilter]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F5FF" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Header userName="Alex" location="Victoria Island, Lagos" />
        <SearchBar value={query} onChangeText={setQuery} />
        <BannerSlider banners={banners} />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>What are you craving?</Text>
        </View>
        <CategoryList
          categories={categories}
          selectedId={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <FilterChips
          filters={filters}
          selectedFilter={selectedFilter}
          onSelect={setSelectedFilter}
        />
        <OfferBanner />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular near you</Text>
          <Text style={styles.sectionAction}>
            {visibleRestaurants.length} places
          </Text>
        </View>

        <View style={styles.restaurantList}>
          {visibleRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
          {visibleRestaurants.length === 0 && (
            <Text style={styles.emptyText}>
              No restaurants match your search.
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

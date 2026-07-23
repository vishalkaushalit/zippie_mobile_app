export type Restaurant = {
  id: string;
  name: string;
  categoryId: string;
  cuisines: string[];
  imageUrl: string;
  rating: number;
  deliveryMinutes: number;
  deliveryFee: string;
  discount?: string;
};

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "The Lagos Kitchen",
    categoryId: "african",
    cuisines: ["Nigerian", "Grills"],
    imageUrl:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900",
    rating: 4.8,
    deliveryMinutes: 20,
    deliveryFee: "Free delivery",
    discount: "20% OFF",
  },
  {
    id: "2",
    name: "Urban Burger Co.",
    categoryId: "burgers",
    cuisines: ["Burgers", "American"],
    imageUrl:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900",
    rating: 4.6,
    deliveryMinutes: 25,
    deliveryFee: "₦800 delivery",
  },
  {
    id: "3",
    name: "Firewood Pizza",
    categoryId: "pizza",
    cuisines: ["Pizza", "Italian"],
    imageUrl:
      "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=900",
    rating: 4.4,
    deliveryMinutes: 35,
    deliveryFee: "₦600 delivery",
    discount: "BUY 1 GET 1",
  },
];

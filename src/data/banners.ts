export type Banner = {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
};

export const banners: Banner[] = [
  {
    id: "1",
    title: "Big flavor, fast delivery",
    subtitle: "Up to 30% off selected restaurants",
    imageUrl:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900",
  },
  {
    id: "2",
    title: "Lunch sorted",
    subtitle: "Fresh meals delivered from 20 minutes",
    imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?w=900",
  },
];

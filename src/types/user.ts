/**
 * User related types
 */

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends User {
  bio?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

export interface UserPreferences {
  notifications: boolean;
  emailNotifications: boolean;
  darkMode: boolean;
  language: string;
  timezone: string;
}

export interface UserSettings extends UserPreferences {
  privacy: 'public' | 'private' | 'friends';
  twoFactorEnabled: boolean;
}

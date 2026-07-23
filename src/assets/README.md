# Asset Files

This directory contains static assets for the application:

- **images/**: Store image assets (PNG, JPG, etc.)
- **icons/**: Store icon assets and icon sets
- **fonts/**: Store custom font files
- **animations/**: Store animation files (Lottie JSON, etc.)

## Usage

Import assets directly in your components:

```tsx
import { Image } from 'react-native';

export const MyComponent = () => (
  <Image
    source={require('@/assets/images/logo.png')}
    style={{ width: 100, height: 100 }}
  />
);
```

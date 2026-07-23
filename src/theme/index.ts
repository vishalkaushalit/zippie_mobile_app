export const theme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5AC8FA',
    background: '#F5F5F5',
    surface: '#FFFFFF',
    text: '#333333',
    textSecondary: '#666666',
    border: '#E0E0E0',
    error: '#FF3B30',
    success: '#34C759',
    warning: '#FF9500',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    fontSizeSmall: 12,
    fontSizeBase: 14,
    fontSizeLarge: 16,
    fontSizeXL: 20,
    fontWeightRegular: '400' as const,
    fontWeightMedium: '600' as const,
    fontWeightBold: '700' as const,
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
  },
};

export default theme;

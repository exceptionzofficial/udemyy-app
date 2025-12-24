// Udemy Clone Theme Configuration
// Based on actual Udemy app color scheme

export const colors = {
    // Primary Colors
    primary: '#A435F0',        // Udemy Purple
    primaryDark: '#5624D0',    // Dark Purple
    primaryLight: '#C77DFF',   // Light Purple

    // Accent Colors
    accent: '#EC5252',         // Sale/Discount Red
    success: '#1E6055',        // Success Green
    warning: '#F3CA5F',        // Warning Yellow

    // Background Colors
    background: '#FFFFFF',
    backgroundDark: '#1C1D1F',
    backgroundGray: '#F7F9FA',
    cardBackground: '#FFFFFF',

    // Text Colors
    textPrimary: '#1C1D1F',
    textSecondary: '#6A6F73',
    textLight: '#FFFFFF',
    textMuted: '#8C8C8C',

    // Border Colors
    border: '#D1D7DC',
    borderLight: '#E4E8EB',

    // Rating Colors
    rating: '#E59819',
    ratingBackground: '#ECEB98',

    // Status Colors
    online: '#4DAA57',
    offline: '#6A6F73',

    // Other
    overlay: 'rgba(0, 0, 0, 0.6)',
    shadow: 'rgba(0, 0, 0, 0.1)',
};

export const fonts = {
    regular: 'Roboto-Regular',
    medium: 'Roboto-Medium',
    bold: 'Roboto-Bold',
    light: 'Roboto-Light',
};

export const fontSizes = {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 22,
    xxxl: 28,
    title: 32,
};

export const spacing = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
};

export const borderRadius = {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    round: 50,
};

export const shadows = {
    light: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    medium: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
    },
    heavy: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 6,
    },
};

export default {
    colors,
    fonts,
    fontSizes,
    spacing,
    borderRadius,
    shadows,
};

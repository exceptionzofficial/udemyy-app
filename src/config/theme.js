// Genii Books Theme Configuration
// Teal/Turquoise color scheme for educational app

export const colors = {
    // Primary Colors (Teal)
    primary: '#1ABC9C',           // Main teal
    primaryDark: '#16A085',       // Dark teal
    primaryLight: '#48C9B0',      // Light teal

    // Secondary Colors (Yellow)
    secondary: '#F1C40F',         // Yellow accent
    secondaryDark: '#D4AC0D',     // Dark yellow
    secondaryLight: '#F7DC6F',    // Light yellow

    // Accent Colors
    accent: '#E91E63',            // Pink for alerts/badges
    success: '#27AE60',           // Green for success
    warning: '#F39C12',           // Orange for warnings
    error: '#E74C3C',             // Red for errors

    // Background Colors
    background: '#FFFFFF',
    backgroundDark: '#2C3E50',
    backgroundGray: '#ECF0F1',
    backgroundLight: '#F8F9FA',
    cardBackground: '#FFFFFF',

    // Text Colors
    textPrimary: '#2C3E50',       // Dark blue-gray
    textSecondary: '#7F8C8D',     // Gray
    textLight: '#FFFFFF',
    textMuted: '#95A5A6',

    // Border Colors
    border: '#BDC3C7',
    borderLight: '#ECF0F1',

    // Class-specific Colors
    class10: '#3498DB',           // Blue
    class11: '#9B59B6',           // Purple
    class12: '#E67E22',           // Orange
    classNeet: '#1ABC9C',         // Teal

    // Status Colors
    subscribed: '#27AE60',
    locked: '#E74C3C',
    free: '#3498DB',

    // Other
    overlay: 'rgba(0, 0, 0, 0.6)',
    shadow: 'rgba(0, 0, 0, 0.1)',
};

export const fonts = {
    regular: 'System',
    medium: 'System',
    bold: 'System',
    light: 'System',
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
    xxl: 24,
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

// Class options for registration
export const classOptions = [
    { id: '10', label: 'Class 10', color: colors.class10, icon: 'school-outline' },
    { id: '11', label: 'Class 11', color: colors.class11, icon: 'book-education-outline' },
    { id: '12', label: 'Class 12', color: colors.class12, icon: 'certificate-outline' },
    { id: 'neet', label: 'NEET', color: colors.classNeet, icon: 'medical-bag' },
];

export default {
    colors,
    fonts,
    fontSizes,
    spacing,
    borderRadius,
    shadows,
    classOptions,
};

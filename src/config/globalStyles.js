import { StyleSheet } from 'react-native';
import { colors, fonts, fontSizes, spacing, borderRadius, shadows } from './theme';

// Global styles used throughout the app
export const globalStyles = StyleSheet.create({
    // Containers
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    containerDark: {
        flex: 1,
        backgroundColor: colors.backgroundDark,
    },
    containerGray: {
        flex: 1,
        backgroundColor: colors.backgroundGray,
    },

    // Cards
    card: {
        backgroundColor: colors.cardBackground,
        borderRadius: borderRadius.md,
        padding: spacing.lg,
        ...shadows.light,
    },
    cardPressed: {
        backgroundColor: colors.backgroundGray,
    },

    // Typography
    heading1: {
        fontSize: fontSizes.title,
        fontWeight: 'bold',
        color: colors.textPrimary,
        letterSpacing: -0.5,
    },
    heading2: {
        fontSize: fontSizes.xxxl,
        fontWeight: 'bold',
        color: colors.textPrimary,
    },
    heading3: {
        fontSize: fontSizes.xxl,
        fontWeight: '600',
        color: colors.textPrimary,
    },
    heading4: {
        fontSize: fontSizes.xl,
        fontWeight: '600',
        color: colors.textPrimary,
    },
    bodyLarge: {
        fontSize: fontSizes.lg,
        color: colors.textPrimary,
        lineHeight: 24,
    },
    body: {
        fontSize: fontSizes.md,
        color: colors.textPrimary,
        lineHeight: 20,
    },
    bodySmall: {
        fontSize: fontSizes.sm,
        color: colors.textSecondary,
        lineHeight: 18,
    },
    caption: {
        fontSize: fontSizes.xs,
        color: colors.textMuted,
    },

    // Buttons
    buttonPrimary: {
        backgroundColor: colors.primary,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
        borderRadius: borderRadius.sm,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonPrimaryText: {
        color: colors.textLight,
        fontSize: fontSizes.lg,
        fontWeight: '600',
    },
    buttonSecondary: {
        backgroundColor: 'transparent',
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
        borderRadius: borderRadius.sm,
        borderWidth: 1,
        borderColor: colors.textPrimary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonSecondaryText: {
        color: colors.textPrimary,
        fontSize: fontSizes.lg,
        fontWeight: '600',
    },

    // Inputs
    input: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: borderRadius.sm,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        fontSize: fontSizes.lg,
        color: colors.textPrimary,
        backgroundColor: colors.background,
    },
    inputFocused: {
        borderColor: colors.textPrimary,
        borderWidth: 2,
    },
    inputError: {
        borderColor: colors.accent,
    },
    inputLabel: {
        fontSize: fontSizes.sm,
        fontWeight: '600',
        color: colors.textPrimary,
        marginBottom: spacing.xs,
    },

    // Rows and Lists
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    // Dividers
    divider: {
        height: 1,
        backgroundColor: colors.borderLight,
        marginVertical: spacing.lg,
    },

    // Badges
    badge: {
        backgroundColor: colors.primary,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.sm,
    },
    badgeText: {
        color: colors.textLight,
        fontSize: fontSizes.xs,
        fontWeight: '600',
    },
    badgeSale: {
        backgroundColor: colors.accent,
    },
    badgeBestseller: {
        backgroundColor: colors.ratingBackground,
    },
    badgeBestsellerText: {
        color: colors.backgroundDark,
    },

    // Price
    priceOriginal: {
        fontSize: fontSizes.md,
        color: colors.textMuted,
        textDecorationLine: 'line-through',
    },
    priceCurrent: {
        fontSize: fontSizes.xxl,
        fontWeight: 'bold',
        color: colors.textPrimary,
    },

    // Shadows
    shadowLight: shadows.light,
    shadowMedium: shadows.medium,
    shadowHeavy: shadows.heavy,
});

export default globalStyles;

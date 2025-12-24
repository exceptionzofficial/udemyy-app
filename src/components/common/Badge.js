import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fontSizes, spacing, borderRadius } from '../../config/theme';

const Badge = ({
    text,
    variant = 'default', // default, bestseller, new, sale, hot
    size = 'medium', // small, medium
    style,
}) => {
    const getContainerStyle = () => {
        const baseStyle = [styles.container, styles[`container_${size}`]];

        switch (variant) {
            case 'bestseller':
                baseStyle.push(styles.bestseller);
                break;
            case 'new':
                baseStyle.push(styles.new);
                break;
            case 'sale':
                baseStyle.push(styles.sale);
                break;
            case 'hot':
                baseStyle.push(styles.hot);
                break;
            default:
                baseStyle.push(styles.default);
        }

        return baseStyle;
    };

    const getTextStyle = () => {
        const baseStyle = [styles.text, styles[`text_${size}`]];

        if (variant === 'bestseller') {
            baseStyle.push(styles.textDark);
        } else {
            baseStyle.push(styles.textLight);
        }

        return baseStyle;
    };

    return (
        <View style={[...getContainerStyle(), style]}>
            <Text style={getTextStyle()}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: borderRadius.sm,
        alignSelf: 'flex-start',
    },
    container_small: {
        paddingHorizontal: spacing.xs,
        paddingVertical: 2,
    },
    container_medium: {
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
    },
    default: {
        backgroundColor: colors.primary,
    },
    bestseller: {
        backgroundColor: colors.ratingBackground,
    },
    new: {
        backgroundColor: colors.success,
    },
    sale: {
        backgroundColor: colors.accent,
    },
    hot: {
        backgroundColor: '#FF6B35',
    },
    text: {
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    text_small: {
        fontSize: fontSizes.xs - 2,
    },
    text_medium: {
        fontSize: fontSizes.xs,
    },
    textLight: {
        color: colors.textLight,
    },
    textDark: {
        color: colors.backgroundDark,
    },
});

export default Badge;

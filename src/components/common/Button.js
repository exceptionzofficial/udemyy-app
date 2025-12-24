import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { colors, fontSizes, spacing, borderRadius } from '../../config/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Button = ({
    title,
    onPress,
    variant = 'primary', // primary, secondary, outline, text
    size = 'medium', // small, medium, large
    icon,
    iconPosition = 'left',
    loading = false,
    disabled = false,
    fullWidth = false,
    style,
    textStyle,
}) => {
    const getButtonStyle = () => {
        const baseStyle = [styles.button, styles[`button_${size}`]];

        switch (variant) {
            case 'primary':
                baseStyle.push(styles.buttonPrimary);
                break;
            case 'secondary':
                baseStyle.push(styles.buttonSecondary);
                break;
            case 'outline':
                baseStyle.push(styles.buttonOutline);
                break;
            case 'text':
                baseStyle.push(styles.buttonText);
                break;
        }

        if (disabled || loading) {
            baseStyle.push(styles.buttonDisabled);
        }

        if (fullWidth) {
            baseStyle.push(styles.buttonFullWidth);
        }

        return baseStyle;
    };

    const getTextStyle = () => {
        const baseStyle = [styles.text, styles[`text_${size}`]];

        switch (variant) {
            case 'primary':
                baseStyle.push(styles.textPrimary);
                break;
            case 'secondary':
                baseStyle.push(styles.textSecondary);
                break;
            case 'outline':
            case 'text':
                baseStyle.push(styles.textOutline);
                break;
        }

        if (disabled) {
            baseStyle.push(styles.textDisabled);
        }

        return baseStyle;
    };

    const getIconColor = () => {
        if (disabled) return colors.textMuted;
        switch (variant) {
            case 'primary':
                return colors.textLight;
            case 'secondary':
                return colors.textLight;
            default:
                return colors.primary;
        }
    };

    return (
        <TouchableOpacity
            style={[...getButtonStyle(), style]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'primary' ? colors.textLight : colors.primary} />
            ) : (
                <View style={styles.content}>
                    {icon && iconPosition === 'left' && (
                        <Icon name={icon} size={size === 'small' ? 16 : 20} color={getIconColor()} style={styles.iconLeft} />
                    )}
                    <Text style={[...getTextStyle(), textStyle]}>{title}</Text>
                    {icon && iconPosition === 'right' && (
                        <Icon name={icon} size={size === 'small' ? 16 : 20} color={getIconColor()} style={styles.iconRight} />
                    )}
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: borderRadius.sm,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_small: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
    },
    button_medium: {
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xl,
    },
    button_large: {
        paddingVertical: spacing.lg,
        paddingHorizontal: spacing.xxl,
    },
    buttonPrimary: {
        backgroundColor: colors.primary,
    },
    buttonSecondary: {
        backgroundColor: colors.primaryDark,
    },
    buttonOutline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.textPrimary,
    },
    buttonText: {
        backgroundColor: 'transparent',
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    buttonFullWidth: {
        width: '100%',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontWeight: '700',
    },
    text_small: {
        fontSize: fontSizes.sm,
    },
    text_medium: {
        fontSize: fontSizes.md,
    },
    text_large: {
        fontSize: fontSizes.lg,
    },
    textPrimary: {
        color: colors.textLight,
    },
    textSecondary: {
        color: colors.textLight,
    },
    textOutline: {
        color: colors.textPrimary,
    },
    textDisabled: {
        color: colors.textMuted,
    },
    iconLeft: {
        marginRight: spacing.sm,
    },
    iconRight: {
        marginLeft: spacing.sm,
    },
});

export default Button;

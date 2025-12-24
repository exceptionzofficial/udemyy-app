import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, fontSizes, spacing, borderRadius } from '../../config/theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Input = ({
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry = false,
    keyboardType = 'default',
    autoCapitalize = 'none',
    error,
    helper,
    leftIcon,
    rightIcon,
    onRightIconPress,
    multiline = false,
    numberOfLines = 1,
    editable = true,
    style,
    inputStyle,
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const getContainerStyle = () => {
        const baseStyle = [styles.container];
        if (isFocused) baseStyle.push(styles.containerFocused);
        if (error) baseStyle.push(styles.containerError);
        if (!editable) baseStyle.push(styles.containerDisabled);
        return baseStyle;
    };

    return (
        <View style={[styles.wrapper, style]}>
            {label && <Text style={styles.label}>{label}</Text>}

            <View style={getContainerStyle()}>
                {leftIcon && (
                    <Icon name={leftIcon} size={20} color={colors.textSecondary} style={styles.leftIcon} />
                )}

                <TextInput
                    style={[
                        styles.input,
                        multiline && styles.inputMultiline,
                        leftIcon && styles.inputWithLeftIcon,
                        inputStyle,
                    ]}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={colors.textMuted}
                    secureTextEntry={secureTextEntry && !showPassword}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    editable={editable}
                />

                {secureTextEntry && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.rightIcon}>
                        <Icon
                            name={showPassword ? 'eye-off' : 'eye'}
                            size={20}
                            color={colors.textSecondary}
                        />
                    </TouchableOpacity>
                )}

                {rightIcon && !secureTextEntry && (
                    <TouchableOpacity onPress={onRightIconPress} style={styles.rightIcon} disabled={!onRightIconPress}>
                        <Icon name={rightIcon} size={20} color={colors.textSecondary} />
                    </TouchableOpacity>
                )}
            </View>

            {error && <Text style={styles.error}>{error}</Text>}
            {helper && !error && <Text style={styles.helper}>{helper}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: spacing.lg,
    },
    label: {
        fontSize: fontSizes.sm,
        fontWeight: '700',
        color: colors.textPrimary,
        marginBottom: spacing.xs,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: borderRadius.sm,
        backgroundColor: colors.background,
    },
    containerFocused: {
        borderColor: colors.textPrimary,
        borderWidth: 2,
    },
    containerError: {
        borderColor: colors.accent,
        borderWidth: 2,
    },
    containerDisabled: {
        backgroundColor: colors.backgroundGray,
        opacity: 0.7,
    },
    input: {
        flex: 1,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        fontSize: fontSizes.lg,
        color: colors.textPrimary,
    },
    inputMultiline: {
        textAlignVertical: 'top',
        minHeight: 100,
    },
    inputWithLeftIcon: {
        paddingLeft: 0,
    },
    leftIcon: {
        marginLeft: spacing.lg,
        marginRight: spacing.sm,
    },
    rightIcon: {
        padding: spacing.md,
    },
    error: {
        fontSize: fontSizes.sm,
        color: colors.accent,
        marginTop: spacing.xs,
    },
    helper: {
        fontSize: fontSizes.sm,
        color: colors.textSecondary,
        marginTop: spacing.xs,
    },
});

export default Input;

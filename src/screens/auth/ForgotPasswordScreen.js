import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LottieView from 'lottie-react-native';
import { colors, fontSizes, spacing, borderRadius } from '../../config/theme';
import { Button, Input } from '../../components/common';

const ForgotPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleResetPassword = async () => {
        if (!email) {
            setError('Email is required');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email');
            return;
        }

        setLoading(true);
        setError('');

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 1500);
    };

    if (success) {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

                <View style={styles.successContainer}>
                    <View style={styles.successIcon}>
                        <Icon name="email-check-outline" size={80} color={colors.primary} />
                    </View>

                    <Text style={styles.successTitle}>Check your email</Text>
                    <Text style={styles.successText}>
                        We've sent password reset instructions to{'\n'}
                        <Text style={styles.emailHighlight}>{email}</Text>
                    </Text>

                    <Button
                        title="Back to Login"
                        onPress={() => navigation.navigate('Login')}
                        fullWidth
                        style={styles.backButton}
                    />

                    <TouchableOpacity onPress={() => setSuccess(false)} style={styles.resendContainer}>
                        <Text style={styles.resendText}>Didn't receive email? </Text>
                        <Text style={styles.resendLink}>Resend</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={colors.primaryDark} />

            {/* Header */}
            <LinearGradient
                colors={[colors.primaryDark, colors.primary]}
                style={styles.header}
            >
                <TouchableOpacity
                    style={styles.backButtonHeader}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="arrow-left" size={24} color={colors.textLight} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Forgot Password</Text>
                <Text style={styles.headerSubtitle}>
                    Enter your email and we'll send you instructions to reset your password
                </Text>
            </LinearGradient>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.formContainer}
            >
                <View style={styles.content}>
                    <View style={styles.iconContainer}>
                        <Icon name="lock-reset" size={60} color={colors.primary} />
                    </View>

                    <Input
                        label="Email Address"
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text);
                            setError('');
                        }}
                        placeholder="Enter your registered email"
                        keyboardType="email-address"
                        leftIcon="email-outline"
                        error={error}
                    />

                    <Button
                        title="Reset Password"
                        onPress={handleResetPassword}
                        loading={loading}
                        fullWidth
                        style={styles.resetButton}
                    />

                    <TouchableOpacity
                        style={styles.loginLink}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Icon name="arrow-left" size={16} color={colors.primary} />
                        <Text style={styles.loginLinkText}>Back to Login</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingTop: 50,
        paddingBottom: 30,
        paddingHorizontal: spacing.lg,
    },
    backButtonHeader: {
        marginBottom: spacing.md,
    },
    headerTitle: {
        fontSize: fontSizes.xxxl,
        fontWeight: '700',
        color: colors.textLight,
    },
    headerSubtitle: {
        fontSize: fontSizes.md,
        color: colors.textLight,
        opacity: 0.9,
        marginTop: spacing.sm,
        lineHeight: 22,
    },
    formContainer: {
        flex: 1,
    },
    content: {
        padding: spacing.xl,
        paddingTop: spacing.xxxl,
    },
    iconContainer: {
        alignItems: 'center',
        marginBottom: spacing.xxl,
    },
    resetButton: {
        marginTop: spacing.lg,
    },
    loginLink: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: spacing.xxl,
    },
    loginLinkText: {
        color: colors.primary,
        fontSize: fontSizes.md,
        fontWeight: '600',
        marginLeft: spacing.sm,
    },
    // Success State
    successContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.xl,
    },
    successIcon: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: colors.backgroundGray,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.xxl,
    },
    successTitle: {
        fontSize: fontSizes.xxxl,
        fontWeight: '700',
        color: colors.textPrimary,
        marginBottom: spacing.md,
    },
    successText: {
        fontSize: fontSizes.md,
        color: colors.textSecondary,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: spacing.xxl,
    },
    emailHighlight: {
        color: colors.textPrimary,
        fontWeight: '600',
    },
    backButton: {
        width: '100%',
    },
    resendContainer: {
        flexDirection: 'row',
        marginTop: spacing.xxl,
    },
    resendText: {
        color: colors.textSecondary,
        fontSize: fontSizes.md,
    },
    resendLink: {
        color: colors.primary,
        fontSize: fontSizes.md,
        fontWeight: '600',
    },
});

export default ForgotPasswordScreen;

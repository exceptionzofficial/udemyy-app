import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, fontSizes, spacing, borderRadius } from '../../config/theme';
import { Button, Input } from '../../components/common';

const ForgotPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [error, setError] = useState('');

    const handleResetPassword = async () => {
        if (!email.trim()) {
            setError('Email is required');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Invalid email format');
            return;
        }

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setEmailSent(true);
        }, 1500);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={colors.primaryDark} />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <LinearGradient
                        colors={[colors.primaryDark, colors.primary]}
                        style={styles.header}
                    >
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                        >
                            <Icon name="arrow-left" size={24} color={colors.textLight} />
                        </TouchableOpacity>

                        <Image
                            source={require('../../assets/logo.jpeg')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <Text style={styles.appName}>Genii Books</Text>
                    </LinearGradient>

                    {emailSent ? (
                        /* Success State */
                        <View style={styles.content}>
                            <View style={styles.successIcon}>
                                <Icon name="email-check-outline" size={60} color={colors.primary} />
                            </View>
                            <Text style={styles.successTitle}>Check Your Email</Text>
                            <Text style={styles.successText}>
                                We've sent password reset instructions to:
                            </Text>
                            <Text style={styles.emailText}>{email}</Text>
                            <Text style={styles.successNote}>
                                If you don't see the email, check your spam folder.
                            </Text>

                            <Button
                                title="Back to Login"
                                onPress={() => navigation.navigate('Login')}
                                fullWidth
                                style={styles.button}
                            />

                            <TouchableOpacity
                                style={styles.resendLink}
                                onPress={() => setEmailSent(false)}
                            >
                                <Text style={styles.resendText}>Didn't receive? Try again</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        /* Form State */
                        <View style={styles.content}>
                            <Text style={styles.title}>Forgot Password?</Text>
                            <Text style={styles.subtitle}>
                                Enter your email address and we'll send you instructions to reset your password.
                            </Text>

                            <Input
                                label="Email Address"
                                value={email}
                                onChangeText={(v) => {
                                    setEmail(v);
                                    if (error) setError('');
                                }}
                                placeholder="Enter your email"
                                keyboardType="email-address"
                                leftIcon="email-outline"
                                error={error}
                            />

                            <Button
                                title="Send Reset Link"
                                onPress={handleResetPassword}
                                loading={loading}
                                fullWidth
                                style={styles.button}
                            />

                            <TouchableOpacity
                                style={styles.backLink}
                                onPress={() => navigation.navigate('Login')}
                            >
                                <Icon name="arrow-left" size={18} color={colors.primary} />
                                <Text style={styles.backLinkText}>Back to Login</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    header: {
        paddingTop: 50,
        paddingBottom: 30,
        alignItems: 'center',
        borderBottomLeftRadius: borderRadius.xxl,
        borderBottomRightRadius: borderRadius.xxl,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: spacing.lg,
        padding: spacing.sm,
    },
    logo: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: colors.textLight,
    },
    appName: {
        fontSize: fontSizes.xxl,
        fontWeight: '700',
        color: colors.textLight,
        marginTop: spacing.sm,
    },
    content: {
        flex: 1,
        padding: spacing.xl,
        paddingTop: spacing.xxxl,
    },
    title: {
        fontSize: fontSizes.xxxl,
        fontWeight: '700',
        color: colors.textPrimary,
        marginBottom: spacing.sm,
    },
    subtitle: {
        fontSize: fontSizes.md,
        color: colors.textSecondary,
        lineHeight: 22,
        marginBottom: spacing.xxl,
    },
    button: {
        marginTop: spacing.lg,
    },
    backLink: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: spacing.xxl,
    },
    backLinkText: {
        fontSize: fontSizes.md,
        color: colors.primary,
        fontWeight: '500',
        marginLeft: spacing.xs,
    },

    // Success State
    successIcon: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: colors.primary + '15',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: spacing.xxl,
    },
    successTitle: {
        fontSize: fontSizes.xxxl,
        fontWeight: '700',
        color: colors.textPrimary,
        textAlign: 'center',
        marginBottom: spacing.md,
    },
    successText: {
        fontSize: fontSizes.md,
        color: colors.textSecondary,
        textAlign: 'center',
    },
    emailText: {
        fontSize: fontSizes.md,
        fontWeight: '600',
        color: colors.primary,
        textAlign: 'center',
        marginTop: spacing.sm,
        marginBottom: spacing.lg,
    },
    successNote: {
        fontSize: fontSizes.sm,
        color: colors.textMuted,
        textAlign: 'center',
        marginBottom: spacing.xxl,
    },
    resendLink: {
        alignItems: 'center',
        marginTop: spacing.xl,
    },
    resendText: {
        fontSize: fontSizes.md,
        color: colors.primary,
        fontWeight: '500',
    },
});

export default ForgotPasswordScreen;

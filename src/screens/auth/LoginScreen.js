import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    StatusBar,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, fontSizes, spacing, borderRadius } from '../../config/theme';
import { Button, Input } from '../../components/common';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format';
        if (!password.trim()) newErrors.password = 'Password is required';
        else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async () => {
        if (!validate()) return;

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            navigation.replace('MainTabs');
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
                    {/* Header with Logo */}
                    <LinearGradient
                        colors={[colors.primaryDark, colors.primary]}
                        style={styles.header}
                    >
                        <Image
                            source={require('../../assets/logo.jpeg')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <Text style={styles.appName}>Genii Books</Text>
                        <Text style={styles.tagline}>Make Learning Simple</Text>
                    </LinearGradient>

                    {/* Login Form */}
                    <View style={styles.formContainer}>
                        <Text style={styles.welcomeText}>Welcome Back!</Text>
                        <Text style={styles.subtitle}>Sign in to continue learning</Text>

                        <Input
                            label="Email"
                            value={email}
                            onChangeText={(v) => {
                                setEmail(v);
                                if (errors.email) setErrors(prev => ({ ...prev, email: null }));
                            }}
                            placeholder="Enter your email"
                            keyboardType="email-address"
                            leftIcon="email-outline"
                            error={errors.email}
                        />

                        <Input
                            label="Password"
                            value={password}
                            onChangeText={(v) => {
                                setPassword(v);
                                if (errors.password) setErrors(prev => ({ ...prev, password: null }));
                            }}
                            placeholder="Enter your password"
                            secureTextEntry
                            leftIcon="lock-outline"
                            error={errors.password}
                        />

                        <TouchableOpacity
                            style={styles.forgotButton}
                            onPress={() => navigation.navigate('ForgotPassword')}
                        >
                            <Text style={styles.forgotText}>Forgot Password?</Text>
                        </TouchableOpacity>

                        <Button
                            title="Log In"
                            onPress={handleLogin}
                            loading={loading}
                            fullWidth
                            style={styles.loginButton}
                        />

                        {/* Sign Up Link */}
                        <View style={styles.signupContainer}>
                            <Text style={styles.signupText}>New to Genii Books? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                                <Text style={styles.signupLink}>Create Account</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
        paddingTop: 60,
        paddingBottom: 40,
        alignItems: 'center',
        borderBottomLeftRadius: borderRadius.xxl,
        borderBottomRightRadius: borderRadius.xxl,
    },
    logo: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: colors.textLight,
    },
    appName: {
        fontSize: fontSizes.title,
        fontWeight: '700',
        color: colors.textLight,
        marginTop: spacing.md,
    },
    tagline: {
        fontSize: fontSizes.md,
        color: colors.textLight,
        opacity: 0.9,
        marginTop: spacing.xs,
    },
    formContainer: {
        flex: 1,
        padding: spacing.xl,
        paddingTop: spacing.xxl,
    },
    welcomeText: {
        fontSize: fontSizes.xxxl,
        fontWeight: '700',
        color: colors.textPrimary,
    },
    subtitle: {
        fontSize: fontSizes.md,
        color: colors.textSecondary,
        marginTop: spacing.xs,
        marginBottom: spacing.xxl,
    },
    forgotButton: {
        alignSelf: 'flex-end',
        marginBottom: spacing.lg,
    },
    forgotText: {
        fontSize: fontSizes.sm,
        color: colors.primary,
        fontWeight: '500',
    },
    loginButton: {
        marginTop: spacing.sm,
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 'auto',
        paddingTop: spacing.xxl,
    },
    signupText: {
        fontSize: fontSizes.md,
        color: colors.textSecondary,
    },
    signupLink: {
        fontSize: fontSizes.md,
        color: colors.primary,
        fontWeight: '600',
    },
});

export default LoginScreen;

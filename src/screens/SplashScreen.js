import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    StatusBar,
    Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, fontSizes, spacing } from '../config/theme';

const SplashScreen = ({ navigation }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;
    const textFadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Logo animation
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 20,
                friction: 7,
                useNativeDriver: true,
            }),
        ]).start();

        // Text animation (delayed)
        setTimeout(() => {
            Animated.timing(textFadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }).start();
        }, 400);

        // Navigate to main app after 2.5 seconds
        const timer = setTimeout(() => {
            navigation.replace('Login');
        }, 2500);

        return () => clearTimeout(timer);
    }, [navigation, fadeAnim, scaleAnim, textFadeAnim]);

    return (
        <LinearGradient
            colors={[colors.primaryDark, colors.primary, colors.primaryLight]}
            style={styles.container}
        >
            <StatusBar barStyle="light-content" backgroundColor={colors.primaryDark} />

            <View style={styles.content}>
                {/* Animated Logo */}
                <Animated.View
                    style={[
                        styles.logoContainer,
                        {
                            opacity: fadeAnim,
                            transform: [{ scale: scaleAnim }],
                        },
                    ]}
                >
                    <Image
                        source={require('../assets/logo.jpeg')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </Animated.View>

                {/* Animated Text */}
                <Animated.View style={{ opacity: textFadeAnim }}>
                    <Text style={styles.appName}>Genii Books</Text>
                    <Text style={styles.tagline}>Make Learning Simple</Text>
                </Animated.View>
            </View>

            {/* Bottom Text */}
            <Animated.Text style={[styles.bottomText, { opacity: textFadeAnim }]}>
                For 10th, 11th, 12th & NEET Students
            </Animated.Text>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
    },
    logoContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: colors.textLight,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
        marginBottom: spacing.xl,
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    appName: {
        fontSize: fontSizes.title + 4,
        fontWeight: '700',
        color: colors.textLight,
        textAlign: 'center',
    },
    tagline: {
        fontSize: fontSizes.lg,
        color: colors.textLight,
        opacity: 0.9,
        textAlign: 'center',
        marginTop: spacing.sm,
    },
    bottomText: {
        position: 'absolute',
        bottom: 50,
        fontSize: fontSizes.md,
        color: colors.textLight,
        opacity: 0.8,
    },
});

export default SplashScreen;

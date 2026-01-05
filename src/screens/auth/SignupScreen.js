import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, fontSizes, spacing, borderRadius, classOptions } from '../../config/theme';
import { Button, Input } from '../../components/common';

const SignupScreen = ({ navigation }) => {
    const [step, setStep] = useState(1); // 1: Class selection, 2: Details form
    const [selectedClass, setSelectedClass] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // Form fields
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        whatsapp: '',
        school: '',       // For 10/11/12
        institution: '',  // For NEET
        pincode: '',
    });

    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: null }));
        }
    };

    const validateStep2 = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';

        if (!formData.password.trim()) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

        if (!formData.confirmPassword.trim()) newErrors.confirmPassword = 'Please confirm your password';
        else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

        if (!formData.whatsapp.trim()) newErrors.whatsapp = 'WhatsApp number is required';
        else if (!/^\+?[0-9]{10,12}$/.test(formData.whatsapp.replace(/\s/g, '')))
            newErrors.whatsapp = 'Invalid phone number';

        if (selectedClass === 'neet') {
            if (!formData.institution.trim()) newErrors.institution = 'Institution name is required';
        } else {
            if (!formData.school.trim()) newErrors.school = 'School name is required';
        }

        if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
        else if (!/^[0-9]{6}$/.test(formData.pincode)) newErrors.pincode = 'Invalid pincode (6 digits)';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleClassSelect = (classId) => {
        setSelectedClass(classId);
        setStep(2);
    };

    const handleSignup = async () => {
        if (!validateStep2()) return;

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            navigation.replace('MainTabs');
        }, 1500);
    };

    const renderClassSelection = () => (
        <View style={styles.classContainer}>
            <Text style={styles.stepTitle}>Select Your Class</Text>
            <Text style={styles.stepSubtitle}>
                Choose your current class or exam preparation
            </Text>

            <View style={styles.classGrid}>
                {classOptions.map((option) => (
                    <TouchableOpacity
                        key={option.id}
                        style={styles.classCard}
                        onPress={() => handleClassSelect(option.id)}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={[option.color, option.color + 'CC']}
                            style={styles.classCardGradient}
                        >
                            <Icon name={option.icon} size={48} color={colors.textLight} />
                            <Text style={styles.classLabel}>{option.label}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginLink}>Log in</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderDetailsForm = () => (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.formContainer}
        >
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Selected Class Badge */}
                <TouchableOpacity style={styles.selectedClassBadge} onPress={() => setStep(1)}>
                    <Icon name="arrow-left" size={18} color={colors.primary} />
                    <Text style={styles.selectedClassText}>
                        {classOptions.find(c => c.id === selectedClass)?.label}
                    </Text>
                    <Text style={styles.changeText}>Change</Text>
                </TouchableOpacity>

                <Text style={styles.formTitle}>Create Your Account</Text>

                <Input
                    label="Full Name"
                    value={formData.name}
                    onChangeText={(v) => updateField('name', v)}
                    placeholder="Enter your full name"
                    leftIcon="account-outline"
                    autoCapitalize="words"
                    error={errors.name}
                />

                <Input
                    label="Email Address"
                    value={formData.email}
                    onChangeText={(v) => updateField('email', v)}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    leftIcon="email-outline"
                    error={errors.email}
                />

                <Input
                    label="Password"
                    value={formData.password}
                    onChangeText={(v) => updateField('password', v)}
                    placeholder="Create a password (min 6 characters)"
                    secureTextEntry
                    leftIcon="lock-outline"
                    error={errors.password}
                />

                <Input
                    label="Confirm Password"
                    value={formData.confirmPassword}
                    onChangeText={(v) => updateField('confirmPassword', v)}
                    placeholder="Confirm your password"
                    secureTextEntry
                    leftIcon="lock-check-outline"
                    error={errors.confirmPassword}
                />

                <Input
                    label="WhatsApp Number"
                    value={formData.whatsapp}
                    onChangeText={(v) => updateField('whatsapp', v)}
                    placeholder="+91 9876543210"
                    keyboardType="phone-pad"
                    leftIcon="whatsapp"
                    error={errors.whatsapp}
                />

                {selectedClass === 'neet' ? (
                    <Input
                        label="Institution / Coaching Name"
                        value={formData.institution}
                        onChangeText={(v) => updateField('institution', v)}
                        placeholder="Enter your institution name"
                        leftIcon="school-outline"
                        error={errors.institution}
                    />
                ) : (
                    <Input
                        label="School Name"
                        value={formData.school}
                        onChangeText={(v) => updateField('school', v)}
                        placeholder="Enter your school name"
                        leftIcon="school-outline"
                        error={errors.school}
                    />
                )}

                <Input
                    label={selectedClass === 'neet' ? 'Pincode' : 'School Pincode'}
                    value={formData.pincode}
                    onChangeText={(v) => updateField('pincode', v)}
                    placeholder="Enter 6-digit pincode"
                    keyboardType="numeric"
                    leftIcon="map-marker-outline"
                    error={errors.pincode}
                />

                <Button
                    title="Create Account"
                    onPress={handleSignup}
                    loading={loading}
                    fullWidth
                    style={styles.signupButton}
                />

                <Text style={styles.termsText}>
                    By signing up, you agree to our{' '}
                    <Text style={styles.termsLink}>Terms of Service</Text>
                    {' '}and{' '}
                    <Text style={styles.termsLink}>Privacy Policy</Text>
                </Text>
            </ScrollView>
        </KeyboardAvoidingView>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={colors.primaryDark} />

            {/* Header */}
            <LinearGradient
                colors={[colors.primaryDark, colors.primary]}
                style={styles.header}
            >
                {step === 2 && (
                    <TouchableOpacity style={styles.backButton} onPress={() => setStep(1)}>
                        <Icon name="arrow-left" size={24} color={colors.textLight} />
                    </TouchableOpacity>
                )}

                <Image
                    source={require('../../assets/logo.jpeg')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.headerTitle}>Genii Books</Text>
                <Text style={styles.headerSubtitle}>Make Learning Simple</Text>
            </LinearGradient>

            {step === 1 ? renderClassSelection() : renderDetailsForm()}
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
        alignItems: 'center',
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
    },
    headerTitle: {
        fontSize: fontSizes.xxxl,
        fontWeight: '700',
        color: colors.textLight,
        marginTop: spacing.sm,
    },
    headerSubtitle: {
        fontSize: fontSizes.md,
        color: colors.textLight,
        opacity: 0.9,
    },

    // Class Selection
    classContainer: {
        flex: 1,
        padding: spacing.xl,
    },
    stepTitle: {
        fontSize: fontSizes.xxl,
        fontWeight: '700',
        color: colors.textPrimary,
        textAlign: 'center',
    },
    stepSubtitle: {
        fontSize: fontSizes.md,
        color: colors.textSecondary,
        textAlign: 'center',
        marginTop: spacing.sm,
        marginBottom: spacing.xxl,
    },
    classGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    classCard: {
        width: '48%',
        marginBottom: spacing.lg,
        borderRadius: borderRadius.lg,
        overflow: 'hidden',
    },
    classCardGradient: {
        padding: spacing.xl,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 140,
    },
    classLabel: {
        fontSize: fontSizes.xl,
        fontWeight: '700',
        color: colors.textLight,
        marginTop: spacing.md,
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 'auto',
        paddingTop: spacing.xxl,
    },
    loginText: {
        fontSize: fontSizes.md,
        color: colors.textSecondary,
    },
    loginLink: {
        fontSize: fontSizes.md,
        color: colors.primary,
        fontWeight: '600',
    },

    // Details Form
    formContainer: {
        flex: 1,
    },
    scrollContent: {
        padding: spacing.xl,
        paddingBottom: 40,
    },
    selectedClassBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.backgroundGray,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: borderRadius.round,
        alignSelf: 'flex-start',
        marginBottom: spacing.lg,
    },
    selectedClassText: {
        fontSize: fontSizes.md,
        fontWeight: '600',
        color: colors.textPrimary,
        marginLeft: spacing.sm,
    },
    changeText: {
        fontSize: fontSizes.sm,
        color: colors.primary,
        marginLeft: spacing.sm,
    },
    formTitle: {
        fontSize: fontSizes.xxl,
        fontWeight: '700',
        color: colors.textPrimary,
        marginBottom: spacing.xl,
    },
    signupButton: {
        marginTop: spacing.lg,
    },
    termsText: {
        fontSize: fontSizes.sm,
        color: colors.textSecondary,
        textAlign: 'center',
        marginTop: spacing.xl,
        lineHeight: 20,
    },
    termsLink: {
        color: colors.primary,
        fontWeight: '600',
    },
});

export default SignupScreen;

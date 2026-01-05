import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { colors, fontSizes, spacing, borderRadius, shadows, classOptions } from '../../config/theme';
import { mockSubscriptionPlans, mockUser } from '../../data/mockData';
import Button from '../../components/common/Button';

const SubscriptionScreen = ({ navigation }) => {
    const [user] = useState(mockUser);
    const userClassInfo = classOptions.find(c => c.id === user.class);
    const plan = mockSubscriptionPlans.find(p => p.targetClass === user.class);

    const handleSubscribe = () => {
        navigation.navigate('Payment', { plan });
    };

    const formatPrice = (price) => '₹' + price.toLocaleString('en-IN');

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={colors.primaryDark} />

            {/* Header */}
            <LinearGradient
                colors={[colors.primaryDark, colors.primary]}
                style={styles.header}
            >
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={24} color={colors.textLight} />
                </TouchableOpacity>

                <Icon name="crown" size={60} color={colors.secondary} style={styles.crownIcon} />
                <Text style={styles.headerTitle}>Upgrade to Premium</Text>
                <Text style={styles.headerSubtitle}>
                    Unlock all {userClassInfo?.label} materials
                </Text>
            </LinearGradient>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Plan Card */}
                <View style={styles.planCard}>
                    <View style={styles.planHeader}>
                        <View>
                            <Text style={styles.planName}>{plan?.name}</Text>
                            <Text style={styles.planDuration}>Valid for {plan?.duration}</Text>
                        </View>
                        <View style={styles.priceContainer}>
                            <Text style={styles.priceSymbol}>₹</Text>
                            <Text style={styles.priceValue}>{plan?.price}</Text>
                        </View>
                    </View>

                    <View style={styles.featuresContainer}>
                        {plan?.features.map((feature, index) => (
                            <View key={index} style={styles.featureItem}>
                                <Icon name="check-circle" size={20} color={colors.success} />
                                <Text style={styles.featureText}>{feature}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* What You Get */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>What You Get</Text>

                    <View style={styles.benefitCard}>
                        <View style={styles.benefitIcon}>
                            <Icon name="download" size={28} color={colors.primary} />
                        </View>
                        <View style={styles.benefitContent}>
                            <Text style={styles.benefitTitle}>Offline Downloads</Text>
                            <Text style={styles.benefitText}>
                                Download PDFs and videos to access offline anytime
                            </Text>
                        </View>
                    </View>

                    <View style={styles.benefitCard}>
                        <View style={styles.benefitIcon}>
                            <Icon name="infinity" size={28} color={colors.primary} />
                        </View>
                        <View style={styles.benefitContent}>
                            <Text style={styles.benefitTitle}>Unlimited Access</Text>
                            <Text style={styles.benefitText}>
                                Access all {userClassInfo?.label} content for the entire year
                            </Text>
                        </View>
                    </View>

                    <View style={styles.benefitCard}>
                        <View style={styles.benefitIcon}>
                            <Icon name="update" size={28} color={colors.primary} />
                        </View>
                        <View style={styles.benefitContent}>
                            <Text style={styles.benefitTitle}>New Content Updates</Text>
                            <Text style={styles.benefitText}>
                                Get access to all new materials added during your subscription
                            </Text>
                        </View>
                    </View>

                    <View style={styles.benefitCard}>
                        <View style={styles.benefitIcon}>
                            <Icon name="headset" size={28} color={colors.primary} />
                        </View>
                        <View style={styles.benefitContent}>
                            <Text style={styles.benefitTitle}>Priority Support</Text>
                            <Text style={styles.benefitText}>
                                Get quick help from our support team on WhatsApp
                            </Text>
                        </View>
                    </View>
                </View>

                {/* FAQ */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Frequently Asked</Text>

                    <View style={styles.faqItem}>
                        <Text style={styles.faqQuestion}>How long is the subscription valid?</Text>
                        <Text style={styles.faqAnswer}>
                            Your subscription is valid for 1 year from the date of purchase.
                        </Text>
                    </View>

                    <View style={styles.faqItem}>
                        <Text style={styles.faqQuestion}>Can I cancel my subscription?</Text>
                        <Text style={styles.faqAnswer}>
                            Since this is a digital product, refunds are subject to our refund policy. Contact support for assistance.
                        </Text>
                    </View>

                    <View style={styles.faqItem}>
                        <Text style={styles.faqQuestion}>Can I switch to a different class?</Text>
                        <Text style={styles.faqAnswer}>
                            Yes, contact support to upgrade or change your class subscription.
                        </Text>
                    </View>
                </View>

                <View style={styles.bottomPadding} />
            </ScrollView>

            {/* Subscribe Button */}
            <View style={styles.footer}>
                <View style={styles.footerPrice}>
                    <Text style={styles.footerPriceLabel}>Total</Text>
                    <Text style={styles.footerPriceValue}>{formatPrice(plan?.price || 0)}</Text>
                </View>
                <Button
                    title="Subscribe Now"
                    onPress={handleSubscribe}
                    style={styles.subscribeButton}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundGray,
    },
    header: {
        paddingTop: 50,
        paddingBottom: spacing.xxl,
        paddingHorizontal: spacing.lg,
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: spacing.lg,
        padding: spacing.sm,
    },
    crownIcon: {
        marginBottom: spacing.md,
    },
    headerTitle: {
        fontSize: fontSizes.xxxl,
        fontWeight: '700',
        color: colors.textLight,
        textAlign: 'center',
    },
    headerSubtitle: {
        fontSize: fontSizes.md,
        color: colors.textLight,
        opacity: 0.9,
        textAlign: 'center',
        marginTop: spacing.xs,
    },
    content: {
        flex: 1,
    },
    planCard: {
        backgroundColor: colors.background,
        margin: spacing.lg,
        borderRadius: borderRadius.lg,
        padding: spacing.xl,
        ...shadows.medium,
        borderWidth: 2,
        borderColor: colors.primary,
    },
    planHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: spacing.lg,
        paddingBottom: spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLight,
    },
    planName: {
        fontSize: fontSizes.xxl,
        fontWeight: '700',
        color: colors.textPrimary,
    },
    planDuration: {
        fontSize: fontSizes.md,
        color: colors.textSecondary,
        marginTop: spacing.xs,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    priceSymbol: {
        fontSize: fontSizes.lg,
        fontWeight: '600',
        color: colors.primary,
        marginTop: spacing.xs,
    },
    priceValue: {
        fontSize: fontSizes.title,
        fontWeight: '700',
        color: colors.primary,
    },
    featuresContainer: {
        marginTop: spacing.sm,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    featureText: {
        fontSize: fontSizes.md,
        color: colors.textPrimary,
        marginLeft: spacing.md,
    },
    section: {
        padding: spacing.lg,
    },
    sectionTitle: {
        fontSize: fontSizes.xl,
        fontWeight: '700',
        color: colors.textPrimary,
        marginBottom: spacing.lg,
    },
    benefitCard: {
        flexDirection: 'row',
        backgroundColor: colors.background,
        padding: spacing.lg,
        borderRadius: borderRadius.md,
        marginBottom: spacing.md,
        ...shadows.light,
    },
    benefitIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.backgroundGray,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.lg,
    },
    benefitContent: {
        flex: 1,
    },
    benefitTitle: {
        fontSize: fontSizes.md,
        fontWeight: '600',
        color: colors.textPrimary,
        marginBottom: 4,
    },
    benefitText: {
        fontSize: fontSizes.sm,
        color: colors.textSecondary,
        lineHeight: 20,
    },
    faqItem: {
        backgroundColor: colors.background,
        padding: spacing.lg,
        borderRadius: borderRadius.md,
        marginBottom: spacing.md,
    },
    faqQuestion: {
        fontSize: fontSizes.md,
        fontWeight: '600',
        color: colors.textPrimary,
        marginBottom: spacing.sm,
    },
    faqAnswer: {
        fontSize: fontSizes.sm,
        color: colors.textSecondary,
        lineHeight: 20,
    },
    bottomPadding: {
        height: 100,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.lg,
        backgroundColor: colors.background,
        borderTopWidth: 1,
        borderTopColor: colors.borderLight,
        ...shadows.medium,
    },
    footerPrice: {
        flex: 1,
    },
    footerPriceLabel: {
        fontSize: fontSizes.sm,
        color: colors.textSecondary,
    },
    footerPriceValue: {
        fontSize: fontSizes.xxl,
        fontWeight: '700',
        color: colors.primary,
    },
    subscribeButton: {
        paddingHorizontal: spacing.xxl,
    },
});

export default SubscriptionScreen;

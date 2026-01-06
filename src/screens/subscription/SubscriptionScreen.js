import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { colors, fontSizes, spacing, borderRadius, shadows } from '../../config/theme';
import { subscriptionPlans, pricing } from '../../data/mockData';
import Button from '../../components/common/Button';

const SubscriptionScreen = ({ navigation, route }) => {
    const selectedPlanId = route.params?.selectedPlan;
    const [activePlan, setActivePlan] = useState(selectedPlanId || 'all_content');

    const handleSubscribe = (plan) => {
        navigation.navigate('Payment', {
            type: 'subscription',
            plan: plan
        });
    };

    const formatPrice = (price) => 'Rs.' + price?.toLocaleString('en-IN');

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
                <Text style={styles.headerTitle}>Choose Your Plan</Text>
                <Text style={styles.headerSubtitle}>Get unlimited access to study materials</Text>
            </LinearGradient>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Individual Pricing Info */}
                <View style={styles.infoCard}>
                    <View style={styles.infoIcon}>
                        <Icon name="information" size={20} color={colors.primary} />
                    </View>
                    <View style={styles.infoContent}>
                        <Text style={styles.infoTitle}>Individual Purchase</Text>
                        <Text style={styles.infoText}>
                            Buy individual PDFs for Rs.{pricing.singlePdf} each and Videos for Rs.{pricing.singleVideo} each from the home screen.
                        </Text>
                    </View>
                </View>

                {/* Subscription Plans */}
                <View style={styles.plansSection}>
                    {subscriptionPlans.map((plan) => {
                        const isSelected = activePlan === plan.id;

                        return (
                            <TouchableOpacity
                                key={plan.id}
                                style={[styles.planCard, isSelected && styles.planCardSelected]}
                                onPress={() => setActivePlan(plan.id)}
                                activeOpacity={0.8}
                            >
                                {plan.popular && (
                                    <View style={styles.popularBadge}>
                                        <Text style={styles.popularText}>BEST VALUE</Text>
                                    </View>
                                )}

                                <View style={styles.planHeader}>
                                    <View style={[styles.planIcon, { backgroundColor: plan.color + '20' }]}>
                                        <Icon name={plan.icon} size={28} color={plan.color} />
                                    </View>

                                    <View style={styles.planInfo}>
                                        <Text style={styles.planName}>{plan.name}</Text>
                                        <Text style={styles.planDuration}>{plan.duration}</Text>
                                    </View>

                                    <View style={styles.planPricing}>
                                        <Text style={styles.planPrice}>{formatPrice(plan.price)}</Text>
                                    </View>
                                </View>

                                <View style={styles.planFeatures}>
                                    {plan.features.map((feature, index) => (
                                        <View key={index} style={styles.featureItem}>
                                            <Icon name="check-circle" size={16} color={colors.success} />
                                            <Text style={styles.featureText}>{feature}</Text>
                                        </View>
                                    ))}
                                </View>

                                {isSelected && (
                                    <View style={styles.selectedIndicator}>
                                        <Icon name="check-circle" size={20} color={colors.primary} />
                                    </View>
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* FAQ */}
                <View style={styles.faqSection}>
                    <Text style={styles.sectionTitle}>Frequently Asked</Text>

                    <View style={styles.faqItem}>
                        <Text style={styles.faqQuestion}>What's the difference between subscription and individual purchase?</Text>
                        <Text style={styles.faqAnswer}>
                            Subscription gives you access to ALL content of that type. Individual purchase lets you buy specific materials at Rs.{pricing.singlePdf}/PDF or Rs.{pricing.singleVideo}/video.
                        </Text>
                    </View>

                    <View style={styles.faqItem}>
                        <Text style={styles.faqQuestion}>How long is the subscription valid?</Text>
                        <Text style={styles.faqAnswer}>
                            All subscriptions are valid for 1 year. Individual purchases give lifetime access.
                        </Text>
                    </View>

                    <View style={styles.faqItem}>
                        <Text style={styles.faqQuestion}>Can I download content?</Text>
                        <Text style={styles.faqAnswer}>
                            For security reasons, content is view-only within the app. This protects the creators' work.
                        </Text>
                    </View>
                </View>

                <View style={styles.bottomPadding} />
            </ScrollView>

            {/* Subscribe Button */}
            <View style={styles.footer}>
                <View style={styles.footerInfo}>
                    <Text style={styles.footerPlanName}>
                        {subscriptionPlans.find(p => p.id === activePlan)?.name}
                    </Text>
                    <Text style={styles.footerPrice}>
                        {formatPrice(subscriptionPlans.find(p => p.id === activePlan)?.price)}
                    </Text>
                </View>
                <Button
                    title="Subscribe Now"
                    onPress={() => handleSubscribe(subscriptionPlans.find(p => p.id === activePlan))}
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

    // Info Card
    infoCard: {
        flexDirection: 'row',
        backgroundColor: 'rgba(26, 188, 156, 0.1)',
        marginHorizontal: spacing.lg,
        marginTop: spacing.lg,
        padding: spacing.lg,
        borderRadius: borderRadius.lg,
        borderWidth: 1,
        borderColor: colors.primary,
    },
    infoIcon: {
        marginRight: spacing.md,
    },
    infoContent: {
        flex: 1,
    },
    infoTitle: {
        fontSize: fontSizes.md,
        fontWeight: '600',
        color: colors.primary,
        marginBottom: 4,
    },
    infoText: {
        fontSize: fontSizes.sm,
        color: colors.textSecondary,
        lineHeight: 18,
    },

    // Plans Section
    plansSection: {
        padding: spacing.lg,
        gap: spacing.md,
    },
    sectionTitle: {
        fontSize: fontSizes.lg,
        fontWeight: '700',
        color: colors.textPrimary,
        marginBottom: spacing.md,
    },
    planCard: {
        backgroundColor: colors.background,
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        borderWidth: 2,
        borderColor: colors.borderLight,
        position: 'relative',
        marginBottom: spacing.md,
        ...shadows.light,
    },
    planCardSelected: {
        borderColor: colors.primary,
    },
    popularBadge: {
        position: 'absolute',
        top: -12,
        right: spacing.lg,
        backgroundColor: colors.secondary,
        paddingHorizontal: spacing.md,
        paddingVertical: 4,
        borderRadius: borderRadius.sm,
    },
    popularText: {
        fontSize: fontSizes.xs,
        fontWeight: '700',
        color: colors.textPrimary,
    },
    planHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    planIcon: {
        width: 50,
        height: 50,
        borderRadius: borderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
    planInfo: {
        flex: 1,
        marginLeft: spacing.md,
    },
    planName: {
        fontSize: fontSizes.lg,
        fontWeight: '700',
        color: colors.textPrimary,
    },
    planDuration: {
        fontSize: fontSizes.sm,
        color: colors.textSecondary,
    },
    planPricing: {
        alignItems: 'flex-end',
    },
    planPrice: {
        fontSize: fontSizes.xxl,
        fontWeight: '700',
        color: colors.primary,
    },
    planFeatures: {
        paddingTop: spacing.md,
        borderTopWidth: 1,
        borderTopColor: colors.borderLight,
        marginTop: spacing.sm,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    featureText: {
        fontSize: fontSizes.sm,
        color: colors.textSecondary,
        marginLeft: spacing.sm,
    },
    selectedIndicator: {
        position: 'absolute',
        top: spacing.md,
        right: spacing.md,
    },

    // FAQ Section
    faqSection: {
        padding: spacing.lg,
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
    footerInfo: {
        flex: 1,
    },
    footerPlanName: {
        fontSize: fontSizes.sm,
        color: colors.textSecondary,
    },
    footerPrice: {
        fontSize: fontSizes.xxl,
        fontWeight: '700',
        color: colors.primary,
    },
    subscribeButton: {
        paddingHorizontal: spacing.xxl,
    },
});

export default SubscriptionScreen;

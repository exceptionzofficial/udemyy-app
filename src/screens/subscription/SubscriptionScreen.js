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
import { mockSubscriptionPlans } from '../../data/mockData';
import Button from '../../components/common/Button';

const SubscriptionScreen = ({ navigation }) => {
    const [selectedPlan, setSelectedPlan] = useState(mockSubscriptionPlans[1]);
    const [billingPeriod, setBillingPeriod] = useState('monthly');

    const handleSubscribe = () => {
        navigation.navigate('Payment', { plan: selectedPlan });
    };

    const getPlanPrice = (plan) => {
        if (billingPeriod === 'yearly') {
            return Math.floor(plan.price * 10); // 2 months free
        }
        return plan.price;
    };

    const formatPrice = (price) => '₹' + price.toLocaleString('en-IN');

    const renderFeature = (feature, included) => (
        <View key={feature} style={styles.featureItem}>
            <Icon
                name={included ? 'check' : 'close'}
                size={18}
                color={included ? colors.success : colors.textMuted}
            />
            <Text style={[styles.featureText, !included && styles.featureTextDisabled]}>
                {feature}
            </Text>
        </View>
    );

    const renderPlanCard = (plan) => {
        const isSelected = selectedPlan?.id === plan.id;
        const price = getPlanPrice(plan);

        return (
            <TouchableOpacity
                key={plan.id}
                style={[styles.planCard, isSelected && styles.planCardSelected]}
                onPress={() => setSelectedPlan(plan)}
                activeOpacity={0.8}
            >
                {plan.isPopular && (
                    <View style={styles.popularBadge}>
                        <Text style={styles.popularText}>MOST POPULAR</Text>
                    </View>
                )}

                <View style={styles.planHeader}>
                    <View style={[styles.radioButton, isSelected && styles.radioButtonSelected]}>
                        {isSelected && <View style={styles.radioButtonInner} />}
                    </View>
                    <View style={styles.planInfo}>
                        <Text style={styles.planName}>{plan.name}</Text>
                        <View style={styles.priceRow}>
                            {price > 0 ? (
                                <>
                                    <Text style={styles.planPrice}>{formatPrice(price)}</Text>
                                    <Text style={styles.planPeriod}>/{billingPeriod === 'yearly' ? 'year' : 'month'}</Text>
                                </>
                            ) : (
                                <Text style={styles.planPrice}>Free</Text>
                            )}
                        </View>
                    </View>
                </View>

                <View style={styles.featuresContainer}>
                    {plan.features.map((feature) => renderFeature(feature, true))}
                </View>
            </TouchableOpacity>
        );
    };

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

                <Icon name="crown" size={50} color={colors.warning} style={styles.crownIcon} />
                <Text style={styles.headerTitle}>Unlock everything</Text>
                <Text style={styles.headerSubtitle}>
                    Get unlimited access to all courses with a subscription
                </Text>
            </LinearGradient>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Billing Period Toggle */}
                <View style={styles.toggleContainer}>
                    <TouchableOpacity
                        style={[styles.toggleOption, billingPeriod === 'monthly' && styles.toggleOptionActive]}
                        onPress={() => setBillingPeriod('monthly')}
                    >
                        <Text style={[styles.toggleText, billingPeriod === 'monthly' && styles.toggleTextActive]}>
                            Monthly
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.toggleOption, billingPeriod === 'yearly' && styles.toggleOptionActive]}
                        onPress={() => setBillingPeriod('yearly')}
                    >
                        <Text style={[styles.toggleText, billingPeriod === 'yearly' && styles.toggleTextActive]}>
                            Yearly
                        </Text>
                        <View style={styles.saveBadge}>
                            <Text style={styles.saveText}>Save 17%</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Plans */}
                <View style={styles.plansContainer}>
                    {mockSubscriptionPlans.map(renderPlanCard)}
                </View>

                {/* Benefits */}
                <View style={styles.benefitsSection}>
                    <Text style={styles.benefitsTitle}>Why subscribe?</Text>

                    <View style={styles.benefitItem}>
                        <View style={styles.benefitIcon}>
                            <Icon name="infinity" size={24} color={colors.primary} />
                        </View>
                        <View style={styles.benefitContent}>
                            <Text style={styles.benefitHeading}>Unlimited access</Text>
                            <Text style={styles.benefitText}>
                                Access all courses in our library, including new courses added monthly
                            </Text>
                        </View>
                    </View>

                    <View style={styles.benefitItem}>
                        <View style={styles.benefitIcon}>
                            <Icon name="download" size={24} color={colors.primary} />
                        </View>
                        <View style={styles.benefitContent}>
                            <Text style={styles.benefitHeading}>Offline viewing</Text>
                            <Text style={styles.benefitText}>
                                Download courses and learn anywhere, even without internet
                            </Text>
                        </View>
                    </View>

                    <View style={styles.benefitItem}>
                        <View style={styles.benefitIcon}>
                            <Icon name="certificate" size={24} color={colors.primary} />
                        </View>
                        <View style={styles.benefitContent}>
                            <Text style={styles.benefitHeading}>Certificates</Text>
                            <Text style={styles.benefitText}>
                                Earn certificates of completion for every course you finish
                            </Text>
                        </View>
                    </View>

                    <View style={styles.benefitItem}>
                        <View style={styles.benefitIcon}>
                            <Icon name="cancel" size={24} color={colors.primary} />
                        </View>
                        <View style={styles.benefitContent}>
                            <Text style={styles.benefitHeading}>Cancel anytime</Text>
                            <Text style={styles.benefitText}>
                                No commitments, cancel your subscription whenever you want
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.bottomPadding} />
            </ScrollView>

            {/* Subscribe Button */}
            {selectedPlan && selectedPlan.price > 0 && (
                <View style={styles.footer}>
                    <View style={styles.footerInfo}>
                        <Text style={styles.footerPlan}>{selectedPlan.name}</Text>
                        <Text style={styles.footerPrice}>
                            {formatPrice(getPlanPrice(selectedPlan))}/{billingPeriod === 'yearly' ? 'year' : 'month'}
                        </Text>
                    </View>
                    <Button
                        title="Subscribe Now"
                        onPress={handleSubscribe}
                        style={styles.subscribeButton}
                    />
                </View>
            )}
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
        marginTop: spacing.sm,
    },
    content: {
        flex: 1,
    },
    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: colors.background,
        margin: spacing.lg,
        borderRadius: borderRadius.round,
        padding: 4,
    },
    toggleOption: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.md,
        borderRadius: borderRadius.round,
    },
    toggleOptionActive: {
        backgroundColor: colors.primaryDark,
    },
    toggleText: {
        fontSize: fontSizes.md,
        fontWeight: '600',
        color: colors.textSecondary,
    },
    toggleTextActive: {
        color: colors.textLight,
    },
    saveBadge: {
        backgroundColor: colors.success,
        paddingHorizontal: spacing.sm,
        paddingVertical: 2,
        borderRadius: borderRadius.round,
        marginLeft: spacing.sm,
    },
    saveText: {
        fontSize: fontSizes.xs,
        fontWeight: '600',
        color: colors.textLight,
    },
    plansContainer: {
        paddingHorizontal: spacing.lg,
    },
    planCard: {
        backgroundColor: colors.background,
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        marginBottom: spacing.md,
        borderWidth: 2,
        borderColor: 'transparent',
        ...shadows.light,
    },
    planCardSelected: {
        borderColor: colors.primary,
    },
    popularBadge: {
        position: 'absolute',
        top: -1,
        right: spacing.lg,
        backgroundColor: colors.primary,
        paddingHorizontal: spacing.md,
        paddingVertical: 4,
        borderBottomLeftRadius: borderRadius.sm,
        borderBottomRightRadius: borderRadius.sm,
    },
    popularText: {
        fontSize: fontSizes.xs,
        fontWeight: '700',
        color: colors.textLight,
    },
    planHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    radioButton: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    radioButtonSelected: {
        borderColor: colors.primary,
    },
    radioButtonInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: colors.primary,
    },
    planInfo: {
        flex: 1,
    },
    planName: {
        fontSize: fontSizes.lg,
        fontWeight: '700',
        color: colors.textPrimary,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginTop: 2,
    },
    planPrice: {
        fontSize: fontSizes.xxl,
        fontWeight: '700',
        color: colors.textPrimary,
    },
    planPeriod: {
        fontSize: fontSizes.md,
        color: colors.textSecondary,
        marginLeft: 2,
    },
    featuresContainer: {
        marginTop: spacing.sm,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: spacing.sm,
    },
    featureText: {
        fontSize: fontSizes.sm,
        color: colors.textSecondary,
        marginLeft: spacing.sm,
        flex: 1,
    },
    featureTextDisabled: {
        color: colors.textMuted,
        textDecorationLine: 'line-through',
    },
    benefitsSection: {
        padding: spacing.lg,
        marginTop: spacing.md,
    },
    benefitsTitle: {
        fontSize: fontSizes.xxl,
        fontWeight: '700',
        color: colors.textPrimary,
        marginBottom: spacing.lg,
    },
    benefitItem: {
        flexDirection: 'row',
        marginBottom: spacing.lg,
    },
    benefitIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: colors.backgroundGray,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    benefitContent: {
        flex: 1,
    },
    benefitHeading: {
        fontSize: fontSizes.md,
        fontWeight: '600',
        color: colors.textPrimary,
        marginBottom: 2,
    },
    benefitText: {
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
    footerPlan: {
        fontSize: fontSizes.md,
        fontWeight: '600',
        color: colors.textPrimary,
    },
    footerPrice: {
        fontSize: fontSizes.sm,
        color: colors.textSecondary,
    },
    subscribeButton: {
        paddingHorizontal: spacing.xxl,
    },
});

export default SubscriptionScreen;

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
import { colors, fontSizes, spacing, borderRadius, shadows } from '../../config/theme';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const PaymentScreen = ({ navigation, route }) => {
    const { type, content, plan, price: passedPrice } = route.params || {};
    const [paymentMethod, setPaymentMethod] = useState('upi');
    const [loading, setLoading] = useState(false);

    // Determine what we're purchasing
    const isSinglePurchase = type === 'single';
    const itemName = isSinglePurchase
        ? content?.title || 'Content'
        : plan?.name || 'Subscription Plan';
    const price = passedPrice || plan?.price || content?.price || 0;

    const formatPrice = (p) => 'Rs.' + (p || 0).toLocaleString('en-IN');

    const paymentMethods = [
        { id: 'upi', label: 'UPI', icon: 'cellphone' },
        { id: 'card', label: 'Credit/Debit Card', icon: 'credit-card-outline' },
        { id: 'netbanking', label: 'Net Banking', icon: 'bank-outline' },
    ];

    const handlePayment = async () => {
        setLoading(true);
        // Simulate payment processing
        setTimeout(() => {
            setLoading(false);
            // Navigate back to home with success message
            navigation.navigate('MainTabs');
        }, 2000);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={24} color={colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Checkout</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Order Summary */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Order Summary</Text>
                    <View style={styles.orderCard}>
                        <View style={styles.orderItem}>
                            <View style={styles.orderInfo}>
                                <Icon
                                    name={isSinglePurchase
                                        ? (content?.type === 'pdf' ? 'file-document' : 'play-circle')
                                        : 'crown'
                                    }
                                    size={20}
                                    color={colors.primary}
                                />
                                <Text style={styles.orderLabel} numberOfLines={2}>
                                    {itemName}
                                </Text>
                            </View>
                            <Text style={styles.orderPrice}>{formatPrice(price)}</Text>
                        </View>

                        {!isSinglePurchase && (
                            <Text style={styles.durationText}>Valid for 1 Year</Text>
                        )}

                        <View style={styles.divider} />

                        <View style={styles.orderItem}>
                            <Text style={styles.totalLabel}>Total</Text>
                            <Text style={styles.totalPrice}>{formatPrice(price)}</Text>
                        </View>
                    </View>
                </View>

                {/* Payment Method */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Payment Method</Text>
                    {paymentMethods.map((method) => (
                        <TouchableOpacity
                            key={method.id}
                            style={[
                                styles.paymentOption,
                                paymentMethod === method.id && styles.paymentOptionActive,
                            ]}
                            onPress={() => setPaymentMethod(method.id)}
                        >
                            <View style={styles.paymentLeft}>
                                <View style={[styles.radioButton, paymentMethod === method.id && styles.radioButtonSelected]}>
                                    {paymentMethod === method.id && <View style={styles.radioButtonInner} />}
                                </View>
                                <Icon name={method.icon} size={24} color={colors.textPrimary} style={styles.paymentIcon} />
                                <Text style={styles.paymentLabel}>{method.label}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* UPI */}
                {paymentMethod === 'upi' && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>UPI Details</Text>
                        <Input
                            label="UPI ID"
                            placeholder="yourname@upi"
                            leftIcon="at"
                        />
                        <View style={styles.upiApps}>
                            <Text style={styles.upiLabel}>Or pay using</Text>
                            <View style={styles.upiAppRow}>
                                {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map((app) => (
                                    <TouchableOpacity key={app} style={styles.upiApp}>
                                        <View style={styles.upiAppIcon}>
                                            <Icon name="cellphone" size={20} color={colors.primary} />
                                        </View>
                                        <Text style={styles.upiAppName}>{app}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>
                )}

                {/* Card Details */}
                {paymentMethod === 'card' && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Card Details</Text>
                        <Input
                            label="Card Number"
                            placeholder="1234 5678 9012 3456"
                            keyboardType="numeric"
                            leftIcon="credit-card-outline"
                        />
                        <View style={styles.row}>
                            <View style={styles.halfInput}>
                                <Input
                                    label="Expiry Date"
                                    placeholder="MM/YY"
                                    keyboardType="numeric"
                                />
                            </View>
                            <View style={styles.halfInput}>
                                <Input
                                    label="CVV"
                                    placeholder="123"
                                    keyboardType="numeric"
                                    secureTextEntry
                                />
                            </View>
                        </View>
                    </View>
                )}

                {/* Security Note */}
                <View style={styles.securityNote}>
                    <Icon name="shield-check" size={20} color={colors.success} />
                    <Text style={styles.securityText}>
                        Your payment information is secure. We use encryption to protect your data.
                    </Text>
                </View>

                <View style={styles.bottomPadding} />
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <Button
                    title={`Pay ${formatPrice(price)}`}
                    onPress={handlePayment}
                    loading={loading}
                    fullWidth
                />
                <Text style={styles.termsText}>
                    By completing this purchase, you agree to our{' '}
                    <Text style={styles.termsLink}>Terms of Service</Text>
                </Text>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 50,
        paddingBottom: spacing.lg,
        paddingHorizontal: spacing.lg,
        backgroundColor: colors.background,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLight,
    },
    backButton: {
        padding: spacing.sm,
        marginLeft: -spacing.sm,
    },
    headerTitle: {
        fontSize: fontSizes.xl,
        fontWeight: '700',
        color: colors.textPrimary,
    },
    placeholder: {
        width: 40,
    },
    content: {
        flex: 1,
    },
    section: {
        backgroundColor: colors.background,
        marginTop: spacing.md,
        padding: spacing.lg,
    },
    sectionTitle: {
        fontSize: fontSizes.lg,
        fontWeight: '700',
        color: colors.textPrimary,
        marginBottom: spacing.md,
    },
    orderCard: {
        backgroundColor: colors.backgroundGray,
        borderRadius: borderRadius.md,
        padding: spacing.lg,
    },
    orderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    orderInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: spacing.md,
    },
    orderLabel: {
        fontSize: fontSizes.md,
        color: colors.textPrimary,
        marginLeft: spacing.sm,
        flex: 1,
    },
    orderPrice: {
        fontSize: fontSizes.md,
        color: colors.textPrimary,
        fontWeight: '500',
    },
    durationText: {
        fontSize: fontSizes.sm,
        color: colors.textMuted,
        marginLeft: 28,
    },
    divider: {
        height: 1,
        backgroundColor: colors.border,
        marginVertical: spacing.md,
    },
    totalLabel: {
        fontSize: fontSizes.lg,
        fontWeight: '700',
        color: colors.textPrimary,
    },
    totalPrice: {
        fontSize: fontSizes.lg,
        fontWeight: '700',
        color: colors.primary,
    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLight,
    },
    paymentOptionActive: {
        backgroundColor: colors.backgroundGray,
        marginHorizontal: -spacing.lg,
        paddingHorizontal: spacing.lg,
    },
    paymentLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.border,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioButtonSelected: {
        borderColor: colors.primary,
    },
    radioButtonInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: colors.primary,
    },
    paymentIcon: {
        marginLeft: spacing.md,
    },
    paymentLabel: {
        fontSize: fontSizes.md,
        color: colors.textPrimary,
        marginLeft: spacing.md,
    },
    row: {
        flexDirection: 'row',
    },
    halfInput: {
        flex: 1,
        marginRight: spacing.md,
    },
    upiApps: {
        marginTop: spacing.md,
    },
    upiLabel: {
        fontSize: fontSizes.sm,
        color: colors.textSecondary,
        marginBottom: spacing.md,
    },
    upiAppRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    upiApp: {
        alignItems: 'center',
    },
    upiAppIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.backgroundGray,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.xs,
    },
    upiAppName: {
        fontSize: fontSizes.xs,
        color: colors.textSecondary,
    },
    securityNote: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.lg,
        marginTop: spacing.md,
    },
    securityText: {
        flex: 1,
        fontSize: fontSizes.sm,
        color: colors.textSecondary,
        marginLeft: spacing.sm,
    },
    bottomPadding: {
        height: 120,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: spacing.lg,
        backgroundColor: colors.background,
        borderTopWidth: 1,
        borderTopColor: colors.borderLight,
        ...shadows.medium,
    },
    termsText: {
        fontSize: fontSizes.xs,
        color: colors.textSecondary,
        textAlign: 'center',
        marginTop: spacing.md,
    },
    termsLink: {
        color: colors.primary,
    },
});

export default PaymentScreen;

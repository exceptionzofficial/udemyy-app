import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    StatusBar,
    Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { colors, fontSizes, spacing, borderRadius, shadows, classOptions } from '../../config/theme';
import { mockUser } from '../../data/mockData';

const AccountScreen = ({ navigation }) => {
    const [user] = useState(mockUser);
    const [pushNotifications, setPushNotifications] = useState(true);
    const userClassInfo = classOptions.find(c => c.id === user.class);

    const isSubscribed = user.subscription?.active;

    const menuItems = [
        {
            section: 'Account',
            items: [
                { icon: 'account-outline', label: 'Edit Profile', onPress: () => { } },
                {
                    icon: 'crown-outline',
                    label: 'My Subscription',
                    onPress: () => navigation.navigate('Subscription'),
                    badge: isSubscribed ? 'ACTIVE' : null,
                    badgeColor: isSubscribed ? colors.success : colors.error,
                },
                { icon: 'download-outline', label: 'Downloads', onPress: () => { } },
            ],
        },
        {
            section: 'Support',
            items: [
                { icon: 'whatsapp', label: 'WhatsApp Support', onPress: () => { } },
                { icon: 'help-circle-outline', label: 'Help & FAQ', onPress: () => { } },
                { icon: 'information-outline', label: 'About Genii Books', onPress: () => { } },
            ],
        },
        {
            section: 'Legal',
            items: [
                { icon: 'file-document-outline', label: 'Terms & Conditions', onPress: () => { } },
                { icon: 'shield-check-outline', label: 'Privacy Policy', onPress: () => { } },
                { icon: 'credit-card-refund-outline', label: 'Refund Policy', onPress: () => { } },
            ],
        },
    ];

    const handleLogout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={colors.primaryDark} />

            {/* Header with Profile */}
            <LinearGradient
                colors={[colors.primaryDark, colors.primary]}
                style={styles.header}
            >
                <View style={styles.profileContainer}>
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatarText}>
                            {user.name.charAt(0).toUpperCase()}
                        </Text>
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={styles.userName}>{user.name}</Text>
                        <Text style={styles.userEmail}>{user.email}</Text>
                        <View style={styles.classBadge}>
                            <Icon name={userClassInfo?.icon} size={14} color={colors.textLight} />
                            <Text style={styles.classText}>{userClassInfo?.label}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.editButton}>
                        <Icon name="pencil" size={20} color={colors.textLight} />
                    </TouchableOpacity>
                </View>

                {/* Subscription Status */}
                {isSubscribed && (
                    <View style={styles.subscriptionBadge}>
                        <Icon name="crown" size={16} color={colors.secondary} />
                        <Text style={styles.subscriptionText}>Premium Active</Text>
                        <Text style={styles.expiryText}>Until {user.subscription.expiryDate}</Text>
                    </View>
                )}
            </LinearGradient>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Notification Toggle */}
                <View style={styles.settingsSection}>
                    <View style={styles.settingItem}>
                        <View style={styles.settingLeft}>
                            <Icon name="bell-ring-outline" size={22} color={colors.primary} />
                            <Text style={styles.settingLabel}>Push Notifications</Text>
                        </View>
                        <Switch
                            value={pushNotifications}
                            onValueChange={setPushNotifications}
                            trackColor={{ false: colors.border, true: colors.primaryLight }}
                            thumbColor={pushNotifications ? colors.primary : colors.textMuted}
                        />
                    </View>
                </View>

                {/* Menu Sections */}
                {menuItems.map((section) => (
                    <View key={section.section} style={styles.menuSection}>
                        <Text style={styles.sectionTitle}>{section.section}</Text>
                        {section.items.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.menuItem}
                                onPress={item.onPress}
                            >
                                <View style={styles.menuLeft}>
                                    <Icon name={item.icon} size={22} color={colors.primary} />
                                    <Text style={styles.menuLabel}>{item.label}</Text>
                                </View>
                                <View style={styles.menuRight}>
                                    {item.badge && (
                                        <View style={[styles.menuBadge, { backgroundColor: item.badgeColor }]}>
                                            <Text style={styles.menuBadgeText}>{item.badge}</Text>
                                        </View>
                                    )}
                                    <Icon name="chevron-right" size={22} color={colors.textMuted} />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Icon name="logout" size={22} color={colors.error} />
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>

                {/* App Version */}
                <View style={styles.versionContainer}>
                    <Image
                        source={require('../../assets/logo.jpeg')}
                        style={styles.logoSmall}
                        resizeMode="contain"
                    />
                    <Text style={styles.versionText}>Genii Books v1.0.0</Text>
                </View>

                <View style={styles.bottomPadding} />
            </ScrollView>
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
        paddingBottom: spacing.xl,
        paddingHorizontal: spacing.lg,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        fontSize: fontSizes.xxxl,
        fontWeight: '700',
        color: colors.textPrimary,
    },
    profileInfo: {
        flex: 1,
        marginLeft: spacing.lg,
    },
    userName: {
        fontSize: fontSizes.xxl,
        fontWeight: '700',
        color: colors.textLight,
    },
    userEmail: {
        fontSize: fontSizes.sm,
        color: colors.textLight,
        opacity: 0.8,
        marginTop: 2,
    },
    classBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingVertical: 4,
        paddingHorizontal: spacing.sm,
        borderRadius: borderRadius.sm,
        alignSelf: 'flex-start',
        marginTop: spacing.sm,
    },
    classText: {
        fontSize: fontSizes.xs,
        color: colors.textLight,
        fontWeight: '600',
        marginLeft: 4,
    },
    editButton: {
        padding: spacing.sm,
    },
    subscriptionBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.15)',
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: borderRadius.round,
        alignSelf: 'flex-start',
        marginTop: spacing.md,
    },
    subscriptionText: {
        fontSize: fontSizes.sm,
        fontWeight: '600',
        color: colors.textLight,
        marginLeft: spacing.xs,
    },
    expiryText: {
        fontSize: fontSizes.sm,
        color: colors.textLight,
        opacity: 0.8,
        marginLeft: spacing.sm,
    },
    settingsSection: {
        backgroundColor: colors.background,
        marginTop: spacing.lg,
        marginHorizontal: spacing.lg,
        borderRadius: borderRadius.lg,
        ...shadows.light,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: spacing.lg,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingLabel: {
        fontSize: fontSizes.md,
        color: colors.textPrimary,
        marginLeft: spacing.md,
    },
    menuSection: {
        marginTop: spacing.lg,
    },
    sectionTitle: {
        fontSize: fontSizes.sm,
        fontWeight: '600',
        color: colors.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.sm,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.background,
        paddingVertical: spacing.lg,
        paddingHorizontal: spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLight,
    },
    menuLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuLabel: {
        fontSize: fontSizes.md,
        color: colors.textPrimary,
        marginLeft: spacing.md,
    },
    menuRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuBadge: {
        paddingHorizontal: spacing.sm,
        paddingVertical: 2,
        borderRadius: borderRadius.sm,
        marginRight: spacing.sm,
    },
    menuBadgeText: {
        fontSize: fontSizes.xs,
        fontWeight: '700',
        color: colors.textLight,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background,
        marginHorizontal: spacing.lg,
        marginTop: spacing.xxl,
        paddingVertical: spacing.lg,
        borderRadius: borderRadius.lg,
        ...shadows.light,
    },
    logoutText: {
        fontSize: fontSizes.md,
        fontWeight: '600',
        color: colors.error,
        marginLeft: spacing.sm,
    },
    versionContainer: {
        alignItems: 'center',
        marginTop: spacing.xxl,
    },
    logoSmall: {
        width: 40,
        height: 40,
        borderRadius: 20,
        opacity: 0.5,
    },
    versionText: {
        fontSize: fontSizes.sm,
        color: colors.textMuted,
        marginTop: spacing.sm,
    },
    bottomPadding: {
        height: 100,
    },
});

export default AccountScreen;

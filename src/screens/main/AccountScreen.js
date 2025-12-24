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
import { colors, fontSizes, spacing, borderRadius, shadows } from '../../config/theme';
import { mockUser } from '../../data/mockData';

const AccountScreen = ({ navigation }) => {
    const [pushNotifications, setPushNotifications] = useState(true);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    const user = mockUser;

    const menuItems = [
        {
            section: 'Account',
            items: [
                { icon: 'account-outline', label: 'Edit Profile', onPress: () => { } },
                { icon: 'credit-card-outline', label: 'Payment Methods', onPress: () => { } },
                { icon: 'crown-outline', label: 'Subscription', onPress: () => navigation.navigate('Subscription'), badge: user.isSubscribed ? 'PRO' : null },
                { icon: 'download-outline', label: 'Download Settings', onPress: () => { } },
            ],
        },
        {
            section: 'Learning',
            items: [
                { icon: 'certificate-outline', label: 'Certificates', onPress: () => { } },
                { icon: 'history', label: 'Learning History', onPress: () => { } },
                { icon: 'bell-outline', label: 'Reminders', onPress: () => { } },
            ],
        },
        {
            section: 'Support',
            items: [
                { icon: 'help-circle-outline', label: 'Help Center', onPress: () => { } },
                { icon: 'message-text-outline', label: 'Contact Support', onPress: () => { } },
                { icon: 'file-document-outline', label: 'Terms & Policies', onPress: () => { } },
            ],
        },
    ];

    const handleLogout = () => {
        // Logout logic
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
                    <Image
                        source={{ uri: user.avatar }}
                        style={styles.avatar}
                    />
                    <View style={styles.profileInfo}>
                        <Text style={styles.userName}>{user.name}</Text>
                        <Text style={styles.userEmail}>{user.email}</Text>
                    </View>
                    <TouchableOpacity style={styles.editButton}>
                        <Icon name="pencil" size={20} color={colors.textLight} />
                    </TouchableOpacity>
                </View>

                {/* Subscription Badge */}
                {user.isSubscribed && (
                    <View style={styles.subscriptionBadge}>
                        <Icon name="crown" size={16} color={colors.warning} />
                        <Text style={styles.subscriptionText}>
                            {user.subscriptionType} member until {user.subscriptionExpiry}
                        </Text>
                    </View>
                )}
            </LinearGradient>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Stats */}
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>{user.enrolledCourses.length}</Text>
                        <Text style={styles.statLabel}>Courses</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>12</Text>
                        <Text style={styles.statLabel}>Hours Learned</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>2</Text>
                        <Text style={styles.statLabel}>Certificates</Text>
                    </View>
                </View>

                {/* Settings Toggles */}
                <View style={styles.settingsSection}>
                    <Text style={styles.sectionTitle}>Preferences</Text>

                    <View style={styles.settingItem}>
                        <View style={styles.settingLeft}>
                            <Icon name="bell-ring-outline" size={22} color={colors.textPrimary} />
                            <Text style={styles.settingLabel}>Push Notifications</Text>
                        </View>
                        <Switch
                            value={pushNotifications}
                            onValueChange={setPushNotifications}
                            trackColor={{ false: colors.border, true: colors.primaryLight }}
                            thumbColor={pushNotifications ? colors.primary : colors.textMuted}
                        />
                    </View>

                    <View style={styles.settingItem}>
                        <View style={styles.settingLeft}>
                            <Icon name="email-outline" size={22} color={colors.textPrimary} />
                            <Text style={styles.settingLabel}>Email Notifications</Text>
                        </View>
                        <Switch
                            value={emailNotifications}
                            onValueChange={setEmailNotifications}
                            trackColor={{ false: colors.border, true: colors.primaryLight }}
                            thumbColor={emailNotifications ? colors.primary : colors.textMuted}
                        />
                    </View>

                    <View style={styles.settingItem}>
                        <View style={styles.settingLeft}>
                            <Icon name="weather-night" size={22} color={colors.textPrimary} />
                            <Text style={styles.settingLabel}>Dark Mode</Text>
                        </View>
                        <Switch
                            value={darkMode}
                            onValueChange={setDarkMode}
                            trackColor={{ false: colors.border, true: colors.primaryLight }}
                            thumbColor={darkMode ? colors.primary : colors.textMuted}
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
                                    <Icon name={item.icon} size={22} color={colors.textPrimary} />
                                    <Text style={styles.menuLabel}>{item.label}</Text>
                                </View>
                                <View style={styles.menuRight}>
                                    {item.badge && (
                                        <View style={styles.menuBadge}>
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
                    <Icon name="logout" size={22} color={colors.accent} />
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>

                {/* App Version */}
                <Text style={styles.versionText}>Version 1.0.0</Text>

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
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 3,
        borderColor: colors.textLight,
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
    editButton: {
        padding: spacing.sm,
    },
    subscriptionBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: borderRadius.round,
        alignSelf: 'flex-start',
        marginTop: spacing.md,
    },
    subscriptionText: {
        fontSize: fontSizes.sm,
        color: colors.textLight,
        marginLeft: spacing.xs,
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: colors.background,
        marginHorizontal: spacing.lg,
        marginTop: -spacing.lg,
        borderRadius: borderRadius.lg,
        paddingVertical: spacing.lg,
        ...shadows.medium,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statNumber: {
        fontSize: fontSizes.xxxl,
        fontWeight: '700',
        color: colors.primary,
    },
    statLabel: {
        fontSize: fontSizes.sm,
        color: colors.textSecondary,
        marginTop: 4,
    },
    statDivider: {
        width: 1,
        backgroundColor: colors.borderLight,
    },
    settingsSection: {
        backgroundColor: colors.background,
        marginTop: spacing.lg,
        paddingVertical: spacing.md,
    },
    sectionTitle: {
        fontSize: fontSizes.sm,
        fontWeight: '600',
        color: colors.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLight,
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
        backgroundColor: colors.background,
        marginTop: spacing.lg,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        backgroundColor: colors.primary,
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
        marginTop: spacing.lg,
        paddingVertical: spacing.lg,
    },
    logoutText: {
        fontSize: fontSizes.md,
        fontWeight: '600',
        color: colors.accent,
        marginLeft: spacing.sm,
    },
    versionText: {
        fontSize: fontSizes.sm,
        color: colors.textMuted,
        textAlign: 'center',
        marginTop: spacing.lg,
    },
    bottomPadding: {
        height: 100,
    },
});

export default AccountScreen;

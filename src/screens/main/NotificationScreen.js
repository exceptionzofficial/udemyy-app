import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontSizes, spacing, borderRadius, shadows } from '../../config/theme';
import { mockNotifications } from '../../data/mockData';

const NotificationScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [notifications, setNotifications] = useState(mockNotifications);

    const markAsRead = (id) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const getTimeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        return dateString;
    };

    const getNotificationIcon = (title) => {
        if (title.toLowerCase().includes('video')) return 'play-circle';
        if (title.toLowerCase().includes('pdf') || title.toLowerCase().includes('notes')) return 'file-document';
        if (title.toLowerCase().includes('offer') || title.toLowerCase().includes('discount')) return 'tag';
        return 'bell';
    };

    const getNotificationColor = (title) => {
        if (title.toLowerCase().includes('video')) return '#3498DB';
        if (title.toLowerCase().includes('pdf') || title.toLowerCase().includes('notes')) return '#E74C3C';
        if (title.toLowerCase().includes('offer') || title.toLowerCase().includes('discount')) return '#F39C12';
        return colors.primary;
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    const renderNotificationItem = ({ item }) => {
        const iconName = getNotificationIcon(item.title);
        const iconColor = getNotificationColor(item.title);

        return (
            <TouchableOpacity
                style={[styles.notificationCard, !item.read && styles.unreadCard]}
                onPress={() => markAsRead(item.id)}
                activeOpacity={0.8}
            >
                <View style={[styles.iconContainer, { backgroundColor: iconColor + '20' }]}>
                    <Icon name={iconName} size={24} color={iconColor} />
                </View>

                <View style={styles.contentContainer}>
                    <View style={styles.headerRow}>
                        <Text style={styles.notificationTitle} numberOfLines={1}>
                            {item.title}
                        </Text>
                        {!item.read && <View style={styles.unreadDot} />}
                    </View>

                    <Text style={styles.notificationMessage} numberOfLines={2}>
                        {item.message}
                    </Text>

                    <Text style={styles.timeText}>{getTimeAgo(item.createdAt)}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
                <Icon name="bell-off-outline" size={60} color={colors.textMuted} />
            </View>
            <Text style={styles.emptyTitle}>No Notifications</Text>
            <Text style={styles.emptyText}>
                You're all caught up! We'll notify you when there's something new.
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={colors.primaryDark} />

            {/* Header */}
            <LinearGradient
                colors={[colors.primaryDark, colors.primary]}
                style={[styles.header, { paddingTop: insets.top + spacing.md }]}
            >
                <View style={styles.headerContent}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <Icon name="arrow-left" size={24} color={colors.textLight} />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>Notifications</Text>

                    {unreadCount > 0 && (
                        <TouchableOpacity onPress={markAllAsRead} style={styles.markAllBtn}>
                            <Text style={styles.markAllText}>Mark all read</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {unreadCount > 0 && (
                    <View style={styles.unreadBadge}>
                        <Text style={styles.unreadBadgeText}>
                            {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
                        </Text>
                    </View>
                )}
            </LinearGradient>

            {/* Notifications List */}
            <FlatList
                data={notifications}
                renderItem={renderNotificationItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={[
                    styles.listContent,
                    notifications.length === 0 && styles.emptyListContent,
                ]}
                ListEmptyComponent={renderEmptyState}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundGray,
    },
    header: {
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.lg,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backBtn: {
        padding: spacing.sm,
        marginLeft: -spacing.sm,
    },
    headerTitle: {
        flex: 1,
        fontSize: fontSizes.xxl,
        fontWeight: '700',
        color: colors.textLight,
        marginLeft: spacing.sm,
    },
    markAllBtn: {
        padding: spacing.sm,
    },
    markAllText: {
        fontSize: fontSizes.sm,
        color: colors.textLight,
        fontWeight: '500',
    },
    unreadBadge: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingVertical: 4,
        paddingHorizontal: spacing.md,
        borderRadius: borderRadius.sm,
        marginTop: spacing.sm,
        marginLeft: spacing.xxl + spacing.sm,
    },
    unreadBadgeText: {
        fontSize: fontSizes.sm,
        color: colors.textLight,
    },
    listContent: {
        padding: spacing.lg,
    },
    emptyListContent: {
        flex: 1,
    },
    notificationCard: {
        flexDirection: 'row',
        backgroundColor: colors.background,
        padding: spacing.lg,
        borderRadius: borderRadius.lg,
        ...shadows.light,
    },
    unreadCard: {
        borderLeftWidth: 3,
        borderLeftColor: colors.primary,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    contentContainer: {
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    notificationTitle: {
        fontSize: fontSizes.md,
        fontWeight: '600',
        color: colors.textPrimary,
        flex: 1,
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.primary,
        marginLeft: spacing.sm,
    },
    notificationMessage: {
        fontSize: fontSizes.sm,
        color: colors.textSecondary,
        marginTop: spacing.xs,
        lineHeight: 18,
    },
    timeText: {
        fontSize: fontSizes.xs,
        color: colors.textMuted,
        marginTop: spacing.sm,
    },
    separator: {
        height: spacing.md,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.xxxl,
    },
    emptyIcon: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.xxl,
        ...shadows.light,
    },
    emptyTitle: {
        fontSize: fontSizes.xxl,
        fontWeight: '700',
        color: colors.textPrimary,
        marginBottom: spacing.md,
    },
    emptyText: {
        fontSize: fontSizes.md,
        color: colors.textSecondary,
        textAlign: 'center',
        lineHeight: 22,
    },
});

export default NotificationScreen;

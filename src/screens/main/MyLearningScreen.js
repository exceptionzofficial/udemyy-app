import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontSizes, spacing, borderRadius, shadows, classOptions } from '../../config/theme';
import { mockUser, mockContent } from '../../data/mockData';

const MyLearningScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [user] = useState(mockUser);
    const [activeTab, setActiveTab] = useState('all');
    const userClassInfo = classOptions.find(c => c.id === user.class);

    const isSubscribed = user.subscription?.active;

    // Filter content based on user's class and subscription
    const accessibleContent = mockContent.filter(c =>
        c.targetClass.includes(user.class) && (c.isFree || isSubscribed)
    );

    // Add mock progress data
    const contentWithProgress = accessibleContent.map((item, index) => ({
        ...item,
        progress: index === 0 ? 75 : index === 1 ? 30 : 0,
        lastAccessed: index === 0 ? '2 hours ago' : index === 1 ? 'Yesterday' : null,
        isDownloaded: index === 0,
    }));

    const filteredContent = activeTab === 'downloaded'
        ? contentWithProgress.filter(c => c.isDownloaded)
        : activeTab === 'inProgress'
            ? contentWithProgress.filter(c => c.progress > 0 && c.progress < 100)
            : contentWithProgress;

    const tabs = [
        { id: 'all', label: 'All' },
        { id: 'inProgress', label: 'In Progress' },
        { id: 'downloaded', label: 'Downloaded' },
    ];

    const renderContentItem = ({ item }) => (
        <TouchableOpacity
            style={styles.contentCard}
            onPress={() => navigation.navigate('VideoPlayer', { content: item })}
            activeOpacity={0.8}
        >
            <View style={styles.thumbnailContainer}>
                <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
                <View style={[styles.typeBadge, item.type === 'pdf' ? styles.pdfBadge : styles.videoBadge]}>
                    <Icon
                        name={item.type === 'pdf' ? 'file-document' : 'play-circle'}
                        size={12}
                        color={colors.textLight}
                    />
                </View>
                {item.isDownloaded && (
                    <View style={styles.downloadedBadge}>
                        <Icon name="check-circle" size={14} color={colors.success} />
                    </View>
                )}
            </View>

            <View style={styles.contentInfo}>
                <Text style={styles.contentTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.contentSubject}>{item.subject}</Text>

                {item.progress > 0 && (
                    <View style={styles.progressContainer}>
                        <View style={styles.progressBar}>
                            <View style={[styles.progressFill, { width: `${item.progress}%` }]} />
                        </View>
                        <Text style={styles.progressText}>{item.progress}%</Text>
                    </View>
                )}

                {item.lastAccessed && (
                    <Text style={styles.lastAccessed}>Last: {item.lastAccessed}</Text>
                )}
            </View>

            <TouchableOpacity style={styles.playButton}>
                <Icon name="play" size={24} color={colors.primary} />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
                <Icon name="book-open-page-variant-outline" size={60} color={colors.textMuted} />
            </View>
            <Text style={styles.emptyTitle}>
                {!isSubscribed ? 'Subscribe to Start Learning' : 'No Content Yet'}
            </Text>
            <Text style={styles.emptyText}>
                {!isSubscribed
                    ? 'Get unlimited access to all materials with a premium subscription'
                    : 'Start exploring courses to begin your learning journey'
                }
            </Text>
            <TouchableOpacity
                style={styles.ctaButton}
                onPress={() => navigation.navigate(isSubscribed ? 'Featured' : 'Subscription')}
            >
                <Text style={styles.ctaButtonText}>
                    {isSubscribed ? 'Explore Content' : 'View Plans'}
                </Text>
            </TouchableOpacity>
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
                <Text style={styles.headerTitle}>My Learning</Text>
                <View style={styles.classBadge}>
                    <Icon name={userClassInfo?.icon} size={14} color={colors.textLight} />
                    <Text style={styles.classText}>{userClassInfo?.label}</Text>
                </View>
            </LinearGradient>

            {/* Tabs */}
            <View style={styles.tabsContainer}>
                {tabs.map((tab) => (
                    <TouchableOpacity
                        key={tab.id}
                        style={[styles.tab, activeTab === tab.id && styles.tabActive]}
                        onPress={() => setActiveTab(tab.id)}
                    >
                        <Text style={[styles.tabText, activeTab === tab.id && styles.tabTextActive]}>
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Content List */}
            <FlatList
                data={filteredContent}
                renderItem={renderContentItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={[
                    styles.listContent,
                    filteredContent.length === 0 && styles.emptyListContent,
                ]}
                ListEmptyComponent={renderEmptyState}
                showsVerticalScrollIndicator={false}
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
    headerTitle: {
        fontSize: fontSizes.xxxl,
        fontWeight: '700',
        color: colors.textLight,
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
        fontSize: fontSizes.sm,
        color: colors.textLight,
        fontWeight: '600',
        marginLeft: 4,
    },
    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: colors.background,
        paddingHorizontal: spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLight,
    },
    tab: {
        paddingVertical: spacing.md,
        marginRight: spacing.xxl,
    },
    tabActive: {
        borderBottomWidth: 2,
        borderBottomColor: colors.primary,
    },
    tabText: {
        fontSize: fontSizes.md,
        color: colors.textSecondary,
    },
    tabTextActive: {
        color: colors.primary,
        fontWeight: '600',
    },
    listContent: {
        padding: spacing.lg,
        paddingBottom: 100,
    },
    emptyListContent: {
        flex: 1,
    },
    contentCard: {
        flexDirection: 'row',
        backgroundColor: colors.background,
        borderRadius: borderRadius.lg,
        overflow: 'hidden',
        marginBottom: spacing.md,
        ...shadows.light,
    },
    thumbnailContainer: {
        position: 'relative',
    },
    thumbnail: {
        width: 100,
        height: 80,
        backgroundColor: colors.backgroundGray,
    },
    typeBadge: {
        position: 'absolute',
        top: spacing.xs,
        left: spacing.xs,
        padding: 4,
        borderRadius: borderRadius.sm,
    },
    pdfBadge: {
        backgroundColor: colors.error,
    },
    videoBadge: {
        backgroundColor: colors.primary,
    },
    downloadedBadge: {
        position: 'absolute',
        bottom: spacing.xs,
        right: spacing.xs,
        backgroundColor: colors.background,
        borderRadius: 10,
    },
    contentInfo: {
        flex: 1,
        padding: spacing.md,
        justifyContent: 'center',
    },
    contentTitle: {
        fontSize: fontSizes.md,
        fontWeight: '600',
        color: colors.textPrimary,
        lineHeight: 18,
    },
    contentSubject: {
        fontSize: fontSizes.xs,
        color: colors.textSecondary,
        marginTop: 2,
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: spacing.sm,
    },
    progressBar: {
        flex: 1,
        height: 4,
        backgroundColor: colors.borderLight,
        borderRadius: 2,
        marginRight: spacing.sm,
    },
    progressFill: {
        height: '100%',
        backgroundColor: colors.primary,
        borderRadius: 2,
    },
    progressText: {
        fontSize: fontSizes.xs,
        color: colors.primary,
        fontWeight: '600',
    },
    lastAccessed: {
        fontSize: fontSizes.xs,
        color: colors.textMuted,
        marginTop: spacing.xs,
    },
    playButton: {
        alignSelf: 'center',
        padding: spacing.md,
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
        textAlign: 'center',
    },
    emptyText: {
        fontSize: fontSizes.md,
        color: colors.textSecondary,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: spacing.xxl,
    },
    ctaButton: {
        backgroundColor: colors.primary,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xxl,
        borderRadius: borderRadius.md,
    },
    ctaButtonText: {
        color: colors.textLight,
        fontSize: fontSizes.md,
        fontWeight: '600',
    },
});

export default MyLearningScreen;

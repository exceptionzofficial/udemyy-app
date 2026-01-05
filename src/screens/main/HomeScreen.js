import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    StatusBar,
    FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontSizes, spacing, borderRadius, shadows, classOptions } from '../../config/theme';
import { mockUser, mockSubjects, mockContent } from '../../data/mockData';

const HomeScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [user] = useState(mockUser);
    const [subjects] = useState(mockSubjects[user.class] || []);
    const [content] = useState(mockContent.filter(c => c.targetClass.includes(user.class)));
    const [selectedSubject, setSelectedSubject] = useState(null);

    const isSubscribed = user.subscription?.active;
    const userClassInfo = classOptions.find(c => c.id === user.class);

    const filteredContent = selectedSubject
        ? content.filter(c => c.subject === selectedSubject)
        : content;

    const formatPrice = (price) => price === 0 ? 'FREE' : '₹' + price;

    const handleContentPress = (item) => {
        if (item.isFree || isSubscribed) {
            navigation.navigate('VideoPlayer', { content: item });
        } else {
            navigation.navigate('Subscription');
        }
    };

    const renderSubjectItem = (subject) => (
        <TouchableOpacity
            key={subject.id}
            style={[
                styles.subjectChip,
                selectedSubject === subject.name && { backgroundColor: subject.color },
            ]}
            onPress={() => setSelectedSubject(selectedSubject === subject.name ? null : subject.name)}
        >
            <Icon
                name={subject.icon}
                size={18}
                color={selectedSubject === subject.name ? colors.textLight : subject.color}
            />
            <Text style={[
                styles.subjectText,
                selectedSubject === subject.name && styles.subjectTextActive,
            ]}>
                {subject.name}
            </Text>
        </TouchableOpacity>
    );

    const renderContentCard = ({ item }) => (
        <TouchableOpacity
            style={styles.contentCard}
            onPress={() => handleContentPress(item)}
            activeOpacity={0.8}
        >
            <View style={styles.thumbnailContainer}>
                <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />

                {/* Content Type Badge */}
                <View style={[styles.typeBadge, item.type === 'pdf' ? styles.pdfBadge : styles.videoBadge]}>
                    <Icon
                        name={item.type === 'pdf' ? 'file-document' : 'play-circle'}
                        size={14}
                        color={colors.textLight}
                    />
                    <Text style={styles.typeText}>{item.type.toUpperCase()}</Text>
                </View>

                {/* Lock Overlay */}
                {!item.isFree && !isSubscribed && (
                    <View style={styles.lockOverlay}>
                        <Icon name="lock" size={32} color={colors.textLight} />
                    </View>
                )}

                {/* Free Badge */}
                {item.isFree && (
                    <View style={styles.freeBadge}>
                        <Text style={styles.freeText}>FREE</Text>
                    </View>
                )}
            </View>

            <View style={styles.contentInfo}>
                <Text style={styles.contentTitle} numberOfLines={2}>{item.title}</Text>

                <View style={styles.metaRow}>
                    <View style={styles.metaItem}>
                        <Icon name="star" size={14} color={colors.secondary} />
                        <Text style={styles.metaText}>{item.rating}</Text>
                    </View>

                    {item.type === 'pdf' ? (
                        <View style={styles.metaItem}>
                            <Icon name="file-document-outline" size={14} color={colors.textSecondary} />
                            <Text style={styles.metaText}>{item.pages} pages</Text>
                        </View>
                    ) : (
                        <View style={styles.metaItem}>
                            <Icon name="clock-outline" size={14} color={colors.textSecondary} />
                            <Text style={styles.metaText}>{item.duration}</Text>
                        </View>
                    )}
                </View>

                <View style={styles.priceRow}>
                    <Text style={[styles.price, item.isFree && styles.priceGreen]}>
                        {formatPrice(item.price)}
                    </Text>
                    {!item.isFree && !isSubscribed && (
                        <View style={styles.subscribeHint}>
                            <Icon name="crown" size={12} color={colors.secondary} />
                            <Text style={styles.subscribeHintText}>Subscribe to unlock</Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={colors.primaryDark} />

            {/* Header */}
            <LinearGradient
                colors={[colors.primaryDark, colors.primary]}
                style={[styles.header, { paddingTop: insets.top + spacing.md }]}
            >
                <View style={styles.headerTop}>
                    <View style={styles.headerLeft}>
                        <Image
                            source={require('../../assets/logo.jpeg')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <View>
                            <Text style={styles.appName}>Genii Books</Text>
                            <View style={styles.classBadge}>
                                <Text style={styles.classText}>{userClassInfo?.label}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.headerRight}>
                        <TouchableOpacity style={styles.headerIcon}>
                            <Icon name="bell-outline" size={24} color={colors.textLight} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Subscription Status */}
                {isSubscribed ? (
                    <View style={styles.subscriptionBanner}>
                        <Icon name="crown" size={18} color={colors.secondary} />
                        <Text style={styles.subscriptionText}>Premium Active</Text>
                        <Text style={styles.expiryText}>Expires: {user.subscription.expiryDate}</Text>
                    </View>
                ) : (
                    <TouchableOpacity
                        style={styles.upgradeBanner}
                        onPress={() => navigation.navigate('Subscription')}
                    >
                        <View style={styles.upgradeLeft}>
                            <Icon name="rocket-launch" size={20} color={colors.secondary} />
                            <Text style={styles.upgradeText}>Upgrade to Premium</Text>
                        </View>
                        <Text style={styles.upgradePrice}>Unlock All Content →</Text>
                    </TouchableOpacity>
                )}
            </LinearGradient>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                {/* Subjects Filter */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Subjects</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.subjectsRow}
                    >
                        {subjects.map(renderSubjectItem)}
                    </ScrollView>
                </View>

                {/* Content Grid */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        {selectedSubject ? `${selectedSubject} Materials` : 'All Materials'}
                    </Text>

                    <FlatList
                        data={filteredContent}
                        renderItem={renderContentCard}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                        scrollEnabled={false}
                        columnWrapperStyle={styles.contentRow}
                        ListEmptyComponent={
                            <View style={styles.emptyState}>
                                <Icon name="book-open-variant" size={48} color={colors.textMuted} />
                                <Text style={styles.emptyText}>No content available</Text>
                            </View>
                        }
                    />
                </View>
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
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.lg,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        marginRight: spacing.md,
    },
    appName: {
        fontSize: fontSizes.xl,
        fontWeight: '700',
        color: colors.textLight,
    },
    classBadge: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: spacing.sm,
        paddingVertical: 2,
        borderRadius: borderRadius.sm,
        marginTop: 2,
    },
    classText: {
        fontSize: fontSizes.xs,
        color: colors.textLight,
        fontWeight: '600',
    },
    headerRight: {
        flexDirection: 'row',
    },
    headerIcon: {
        padding: spacing.sm,
    },
    subscriptionBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.15)',
        padding: spacing.md,
        borderRadius: borderRadius.md,
        marginTop: spacing.md,
    },
    subscriptionText: {
        fontSize: fontSizes.md,
        fontWeight: '600',
        color: colors.textLight,
        marginLeft: spacing.sm,
        flex: 1,
    },
    expiryText: {
        fontSize: fontSizes.sm,
        color: colors.textLight,
        opacity: 0.8,
    },
    upgradeBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.secondary,
        padding: spacing.md,
        borderRadius: borderRadius.md,
        marginTop: spacing.md,
    },
    upgradeLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    upgradeText: {
        fontSize: fontSizes.md,
        fontWeight: '700',
        color: colors.textPrimary,
        marginLeft: spacing.sm,
    },
    upgradePrice: {
        fontSize: fontSizes.sm,
        fontWeight: '600',
        color: colors.textPrimary,
    },
    content: {
        flex: 1,
    },
    section: {
        marginTop: spacing.lg,
    },
    sectionTitle: {
        fontSize: fontSizes.xl,
        fontWeight: '700',
        color: colors.textPrimary,
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.md,
    },
    subjectsRow: {
        paddingHorizontal: spacing.lg,
    },
    subjectChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: borderRadius.round,
        marginRight: spacing.sm,
        ...shadows.light,
    },
    subjectText: {
        fontSize: fontSizes.sm,
        fontWeight: '500',
        color: colors.textPrimary,
        marginLeft: spacing.xs,
    },
    subjectTextActive: {
        color: colors.textLight,
    },
    contentRow: {
        paddingHorizontal: spacing.lg,
        justifyContent: 'space-between',
        marginBottom: spacing.md,
    },
    contentCard: {
        width: '48%',
        backgroundColor: colors.background,
        borderRadius: borderRadius.lg,
        overflow: 'hidden',
        ...shadows.light,
    },
    thumbnailContainer: {
        position: 'relative',
    },
    thumbnail: {
        width: '100%',
        height: 100,
        backgroundColor: colors.backgroundGray,
    },
    typeBadge: {
        position: 'absolute',
        top: spacing.sm,
        left: spacing.sm,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 2,
        paddingHorizontal: spacing.sm,
        borderRadius: borderRadius.sm,
    },
    pdfBadge: {
        backgroundColor: colors.error,
    },
    videoBadge: {
        backgroundColor: colors.primary,
    },
    typeText: {
        fontSize: fontSizes.xs,
        fontWeight: '600',
        color: colors.textLight,
        marginLeft: 2,
    },
    lockOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    freeBadge: {
        position: 'absolute',
        top: spacing.sm,
        right: spacing.sm,
        backgroundColor: colors.success,
        paddingVertical: 2,
        paddingHorizontal: spacing.sm,
        borderRadius: borderRadius.sm,
    },
    freeText: {
        fontSize: fontSizes.xs,
        fontWeight: '700',
        color: colors.textLight,
    },
    contentInfo: {
        padding: spacing.md,
    },
    contentTitle: {
        fontSize: fontSizes.sm,
        fontWeight: '600',
        color: colors.textPrimary,
        lineHeight: 18,
    },
    metaRow: {
        flexDirection: 'row',
        marginTop: spacing.sm,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    metaText: {
        fontSize: fontSizes.xs,
        color: colors.textSecondary,
        marginLeft: 2,
    },
    priceRow: {
        marginTop: spacing.sm,
    },
    price: {
        fontSize: fontSizes.md,
        fontWeight: '700',
        color: colors.textPrimary,
    },
    priceGreen: {
        color: colors.success,
    },
    subscribeHint: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    subscribeHintText: {
        fontSize: fontSizes.xs,
        color: colors.secondary,
        marginLeft: 2,
    },
    emptyState: {
        alignItems: 'center',
        padding: spacing.xxxl,
    },
    emptyText: {
        fontSize: fontSizes.md,
        color: colors.textMuted,
        marginTop: spacing.md,
    },
});

export default HomeScreen;

import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    StatusBar,
    Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontSizes, spacing, borderRadius, shadows, classOptions } from '../../config/theme';
import {
    mockUser,
    mockContent,
    boardTypes,
    contentTypes,
    subjectFilters,
    hasAccess,
    getContentPrice,
    pricing,
    subscriptionPlans
} from '../../data/mockData';

const HomeScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [user] = useState(mockUser);

    // Filter states
    const [selectedBoard, setSelectedBoard] = useState('all');
    const [selectedContentType, setSelectedContentType] = useState('all');
    const [selectedSubject, setSelectedSubject] = useState('all');

    // Filter dropdown visibility
    const [showBoardFilter, setShowBoardFilter] = useState(false);
    const [showTypeFilter, setShowTypeFilter] = useState(false);
    const [showSubjectFilter, setShowSubjectFilter] = useState(false);

    // Content detail modal
    const [selectedContent, setSelectedContent] = useState(null);
    const [showContentModal, setShowContentModal] = useState(false);

    const userClassInfo = classOptions.find(c => c.id === user.class);

    // Filter content based on selections
    const filteredContent = mockContent.filter(item => {
        const matchesBoard = selectedBoard === 'all' || item.board === selectedBoard;
        const matchesType = selectedContentType === 'all' || item.type === selectedContentType;
        const matchesSubject = selectedSubject === 'all' || item.subject === selectedSubject;
        const matchesClass = item.targetClass.includes(user.class);
        return matchesBoard && matchesType && matchesSubject && matchesClass;
    });

    const handleContentPress = (item) => {
        setSelectedContent(item);
        setShowContentModal(true);
    };

    const handleBuyContent = (item) => {
        setShowContentModal(false);
        navigation.navigate('Payment', {
            type: 'single',
            content: item,
            price: getContentPrice(item.type)
        });
    };

    const handleSubscribe = (plan) => {
        navigation.navigate('Subscription', { selectedPlan: plan?.id });
    };

    const getFilterLabel = (filters, selectedId) => {
        const filter = filters.find(f => f.id === selectedId);
        return filter?.label || 'Select';
    };

    const renderFilterDropdown = (title, options, selectedValue, onSelect, isOpen, setIsOpen) => (
        <View style={styles.filterContainer}>
            <Text style={styles.filterLabel}>{title}</Text>
            <TouchableOpacity
                style={styles.filterButton}
                onPress={() => setIsOpen(!isOpen)}
            >
                <Text style={styles.filterButtonText}>
                    {getFilterLabel(options, selectedValue)}
                </Text>
                <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} size={20} color={colors.textSecondary} />
            </TouchableOpacity>

            {isOpen && (
                <View style={styles.filterDropdown}>
                    {options.map((option) => (
                        <TouchableOpacity
                            key={option.id}
                            style={[
                                styles.filterOption,
                                selectedValue === option.id && styles.filterOptionActive
                            ]}
                            onPress={() => {
                                onSelect(option.id);
                                setIsOpen(false);
                            }}
                        >
                            <Text style={[
                                styles.filterOptionText,
                                selectedValue === option.id && styles.filterOptionTextActive
                            ]}>
                                {option.label}
                            </Text>
                            {selectedValue === option.id && (
                                <Icon name="check" size={18} color={colors.primary} />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );

    const renderSubscriptionBanner = () => (
        <TouchableOpacity
            style={styles.subscriptionBanner}
            onPress={() => handleSubscribe()}
        >
            <LinearGradient
                colors={[colors.primaryDark, colors.primary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.bannerGradient}
            >
                <View style={styles.bannerContent}>
                    <Icon name="crown" size={28} color={colors.secondary} />
                    <View style={styles.bannerText}>
                        <Text style={styles.bannerTitle}>Get Unlimited Access</Text>
                        <Text style={styles.bannerSubtitle}>
                            All PDFs from Rs.{pricing.allPdfs} | All Videos from Rs.{pricing.allVideos}
                        </Text>
                    </View>
                </View>
                <Icon name="chevron-right" size={24} color={colors.textLight} />
            </LinearGradient>
        </TouchableOpacity>
    );

    const renderContentCard = (item) => {
        const isLocked = !hasAccess(user, item);
        const price = getContentPrice(item.type);

        return (
            <TouchableOpacity
                key={item.id}
                style={styles.contentCard}
                onPress={() => handleContentPress(item)}
                activeOpacity={0.8}
            >
                <View style={styles.thumbnailContainer}>
                    <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />

                    {/* Type Badge */}
                    <View style={[styles.typeBadge, item.type === 'pdf' ? styles.pdfBadge : styles.videoBadge]}>
                        <Icon
                            name={item.type === 'pdf' ? 'file-document' : 'play-circle'}
                            size={12}
                            color={colors.textLight}
                        />
                        <Text style={styles.typeBadgeText}>{item.type.toUpperCase()}</Text>
                    </View>

                    {/* Free or Price Badge */}
                    {item.isFree ? (
                        <View style={styles.freeBadge}>
                            <Text style={styles.freeBadgeText}>FREE</Text>
                        </View>
                    ) : isLocked && (
                        <View style={styles.priceBadge}>
                            <Text style={styles.priceBadgeText}>Rs.{price}</Text>
                        </View>
                    )}

                    {/* Lock Overlay */}
                    {isLocked && !item.isFree && (
                        <View style={styles.lockOverlay}>
                            <Icon name="lock" size={24} color={colors.textLight} />
                        </View>
                    )}
                </View>

                <View style={styles.contentInfo}>
                    <Text style={styles.contentTitle} numberOfLines={2}>{item.title}</Text>
                    <View style={styles.contentMeta}>
                        <Text style={styles.boardText}>{item.board === 'state' ? 'State' : 'CBSE'}</Text>
                        <View style={styles.ratingContainer}>
                            <Icon name="star" size={12} color={colors.secondary} />
                            <Text style={styles.ratingText}>{item.rating}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const renderContentModal = () => {
        if (!selectedContent) return null;

        const isLocked = !hasAccess(user, selectedContent);
        const price = getContentPrice(selectedContent.type);

        return (
            <Modal
                visible={showContentModal}
                transparent
                animationType="slide"
                onRequestClose={() => setShowContentModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {/* Header */}
                        <View style={styles.modalHeader}>
                            <TouchableOpacity onPress={() => setShowContentModal(false)}>
                                <Icon name="close" size={24} color={colors.textPrimary} />
                            </TouchableOpacity>
                        </View>

                        {/* Thumbnail */}
                        <Image source={{ uri: selectedContent.thumbnail }} style={styles.modalThumbnail} />

                        {/* Info */}
                        <View style={styles.modalInfo}>
                            <View style={[styles.typeBadge, selectedContent.type === 'pdf' ? styles.pdfBadge : styles.videoBadge, { alignSelf: 'flex-start' }]}>
                                <Icon name={selectedContent.type === 'pdf' ? 'file-document' : 'play-circle'} size={14} color={colors.textLight} />
                                <Text style={styles.typeBadgeText}>{selectedContent.type.toUpperCase()}</Text>
                            </View>

                            <Text style={styles.modalTitle}>{selectedContent.title}</Text>

                            <View style={styles.modalMetaRow}>
                                <Text style={styles.modalMetaText}>
                                    {selectedContent.board === 'state' ? 'State Board' : 'CBSE'}
                                </Text>
                                <Text style={styles.modalMetaDot}>|</Text>
                                <Text style={styles.modalMetaText}>{selectedContent.subject}</Text>
                                <Text style={styles.modalMetaDot}>|</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icon name="star" size={14} color={colors.secondary} />
                                    <Text style={styles.modalMetaText}> {selectedContent.rating}</Text>
                                </View>
                            </View>

                            <Text style={styles.modalDetail}>
                                {selectedContent.type === 'pdf'
                                    ? `${selectedContent.pages} pages`
                                    : `Duration: ${selectedContent.duration}`}
                            </Text>
                        </View>

                        {/* Actions */}
                        <View style={styles.modalActions}>
                            {selectedContent.isFree ? (
                                <TouchableOpacity
                                    style={styles.openButton}
                                    onPress={() => {
                                        setShowContentModal(false);
                                        // Navigate to correct screen based on type
                                        const screen = selectedContent.type === 'pdf' ? 'PDFViewer' : 'VideoPlayer';
                                        navigation.navigate(screen, { content: selectedContent });
                                    }}
                                >
                                    <Icon name={selectedContent.type === 'pdf' ? 'file-eye' : 'play'} size={20} color={colors.textLight} />
                                    <Text style={styles.openButtonText}>Open {selectedContent.type === 'pdf' ? 'PDF' : 'Video'}</Text>
                                </TouchableOpacity>
                            ) : isLocked ? (
                                <>
                                    <TouchableOpacity
                                        style={styles.buyButton}
                                        onPress={() => handleBuyContent(selectedContent)}
                                    >
                                        <Icon name="cart" size={20} color={colors.textLight} />
                                        <Text style={styles.buyButtonText}>Buy for Rs.{price}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.subscribeButton}
                                        onPress={() => {
                                            setShowContentModal(false);
                                            handleSubscribe();
                                        }}
                                    >
                                        <Text style={styles.subscribeButtonText}>
                                            Or get All {selectedContent.type === 'pdf' ? 'PDFs' : 'Videos'} for Rs.{selectedContent.type === 'pdf' ? pricing.allPdfs : pricing.allVideos}
                                        </Text>
                                    </TouchableOpacity>
                                </>
                            ) : (
                                <TouchableOpacity
                                    style={styles.openButton}
                                    onPress={() => {
                                        setShowContentModal(false);
                                        // Navigate to correct screen based on type
                                        const screen = selectedContent.type === 'pdf' ? 'PDFViewer' : 'VideoPlayer';
                                        navigation.navigate(screen, { content: selectedContent });
                                    }}
                                >
                                    <Icon name={selectedContent.type === 'pdf' ? 'file-eye' : 'play'} size={20} color={colors.textLight} />
                                    <Text style={styles.openButtonText}>Open {selectedContent.type === 'pdf' ? 'PDF' : 'Video'}</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={colors.primaryDark} />

            {/* Header */}
            <LinearGradient
                colors={[colors.primaryDark, colors.primary]}
                style={[styles.header, { paddingTop: insets.top + spacing.md }]}
            >
                <View style={styles.headerTop}>
                    <View>
                        <Text style={styles.greeting}>Hello, {user.name.split(' ')[0]}</Text>
                        <View style={styles.classBadge}>
                            <Text style={styles.classText}>{userClassInfo?.label}</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.notificationBtn}
                        onPress={() => navigation.navigate('Notification')}
                    >
                        <Icon name="bell-outline" size={24} color={colors.textLight} />
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Subscription Banner */}
                {renderSubscriptionBanner()}

                {/* Filters Section */}
                <View style={styles.filtersSection}>
                    <Text style={styles.sectionTitle}>
                        <Icon name="filter-variant" size={18} color={colors.textPrimary} /> Filters
                    </Text>

                    <View style={styles.filtersRow}>
                        {renderFilterDropdown('Board', boardTypes, selectedBoard, setSelectedBoard, showBoardFilter, setShowBoardFilter)}
                        {renderFilterDropdown('Type', contentTypes, selectedContentType, setSelectedContentType, showTypeFilter, setShowTypeFilter)}
                        {renderFilterDropdown('Subject', subjectFilters, selectedSubject, setSelectedSubject, showSubjectFilter, setShowSubjectFilter)}
                    </View>
                </View>

                {/* Content Section */}
                <View style={styles.contentSection}>
                    <Text style={styles.sectionTitle}>
                        {filteredContent.length} Materials Found
                    </Text>

                    {filteredContent.length > 0 ? (
                        <View style={styles.contentGrid}>
                            {filteredContent.map(renderContentCard)}
                        </View>
                    ) : (
                        <View style={styles.emptyState}>
                            <Icon name="file-search-outline" size={60} color={colors.textMuted} />
                            <Text style={styles.emptyText}>No content matches your filters</Text>
                            <Text style={styles.emptySubtext}>Try adjusting your filter selections</Text>
                        </View>
                    )}
                </View>

                <View style={styles.bottomPadding} />
            </ScrollView>

            {/* Content Detail Modal */}
            {renderContentModal()}
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
        alignItems: 'flex-start',
    },
    greeting: {
        fontSize: fontSizes.xxl,
        fontWeight: '700',
        color: colors.textLight,
    },
    classBadge: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingVertical: 4,
        paddingHorizontal: spacing.sm,
        borderRadius: borderRadius.sm,
        marginTop: spacing.sm,
    },
    classText: {
        fontSize: fontSizes.sm,
        color: colors.textLight,
        fontWeight: '600',
    },
    notificationBtn: {
        padding: spacing.sm,
    },
    content: {
        flex: 1,
    },

    // Subscription Banner
    subscriptionBanner: {
        marginHorizontal: spacing.lg,
        marginTop: spacing.lg,
        borderRadius: borderRadius.lg,
        overflow: 'hidden',
        ...shadows.medium,
    },
    bannerGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.lg,
    },
    bannerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    bannerText: {
        marginLeft: spacing.md,
        flex: 1,
    },
    bannerTitle: {
        fontSize: fontSizes.lg,
        fontWeight: '700',
        color: colors.textLight,
    },
    bannerSubtitle: {
        fontSize: fontSizes.sm,
        color: colors.textLight,
        opacity: 0.9,
        marginTop: 2,
    },

    // Filters
    filtersSection: {
        padding: spacing.lg,
        zIndex: 100,
    },
    sectionTitle: {
        fontSize: fontSizes.lg,
        fontWeight: '700',
        color: colors.textPrimary,
        marginBottom: spacing.md,
    },
    filtersRow: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    filterContainer: {
        flex: 1,
        position: 'relative',
        zIndex: 10,
    },
    filterLabel: {
        fontSize: fontSizes.xs,
        color: colors.textSecondary,
        marginBottom: 4,
    },
    filterButton: {
        backgroundColor: colors.background,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.md,
        borderWidth: 1,
        borderColor: colors.borderLight,
    },
    filterButtonText: {
        fontSize: fontSizes.sm,
        color: colors.textPrimary,
        flex: 1,
    },
    filterDropdown: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        backgroundColor: colors.background,
        borderRadius: borderRadius.md,
        marginTop: 4,
        ...shadows.medium,
        zIndex: 1000,
    },
    filterOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLight,
    },
    filterOptionActive: {
        backgroundColor: 'rgba(26, 188, 156, 0.1)',
    },
    filterOptionText: {
        fontSize: fontSizes.sm,
        color: colors.textPrimary,
    },
    filterOptionTextActive: {
        color: colors.primary,
        fontWeight: '600',
    },

    // Content Section
    contentSection: {
        paddingHorizontal: spacing.lg,
    },
    contentGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -spacing.xs,
    },
    contentCard: {
        width: '50%',
        padding: spacing.xs,
    },
    thumbnailContainer: {
        position: 'relative',
        height: 100,
        backgroundColor: colors.background,
        borderTopLeftRadius: borderRadius.lg,
        borderTopRightRadius: borderRadius.lg,
        overflow: 'hidden',
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.backgroundGray,
    },
    typeBadge: {
        position: 'absolute',
        top: spacing.xs,
        left: spacing.xs,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 2,
        paddingHorizontal: spacing.sm,
        borderRadius: borderRadius.sm,
        gap: 4,
    },
    pdfBadge: {
        backgroundColor: '#E74C3C',
    },
    videoBadge: {
        backgroundColor: '#3498DB',
    },
    typeBadgeText: {
        fontSize: 10,
        fontWeight: '700',
        color: colors.textLight,
    },
    freeBadge: {
        position: 'absolute',
        top: spacing.xs,
        right: spacing.xs,
        backgroundColor: colors.success,
        paddingVertical: 2,
        paddingHorizontal: spacing.sm,
        borderRadius: borderRadius.sm,
    },
    freeBadgeText: {
        fontSize: 10,
        fontWeight: '700',
        color: colors.textLight,
    },
    priceBadge: {
        position: 'absolute',
        top: spacing.xs,
        right: spacing.xs,
        backgroundColor: colors.secondary,
        paddingVertical: 2,
        paddingHorizontal: spacing.sm,
        borderRadius: borderRadius.sm,
    },
    priceBadgeText: {
        fontSize: 10,
        fontWeight: '700',
        color: colors.textPrimary,
    },
    lockOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentInfo: {
        backgroundColor: colors.background,
        padding: spacing.md,
        borderBottomLeftRadius: borderRadius.lg,
        borderBottomRightRadius: borderRadius.lg,
    },
    contentTitle: {
        fontSize: fontSizes.sm,
        fontWeight: '600',
        color: colors.textPrimary,
        lineHeight: 18,
        minHeight: 36,
    },
    contentMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: spacing.xs,
    },
    boardText: {
        fontSize: fontSizes.xs,
        color: colors.textSecondary,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: fontSizes.xs,
        color: colors.textSecondary,
        marginLeft: 2,
    },

    // Empty State
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.xxxl,
    },
    emptyText: {
        fontSize: fontSizes.lg,
        fontWeight: '600',
        color: colors.textMuted,
        marginTop: spacing.md,
    },
    emptySubtext: {
        fontSize: fontSizes.sm,
        color: colors.textMuted,
        marginTop: spacing.xs,
    },

    // Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: colors.background,
        borderTopLeftRadius: borderRadius.xl,
        borderTopRightRadius: borderRadius.xl,
        paddingBottom: spacing.xxl,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: spacing.lg,
    },
    modalThumbnail: {
        width: '100%',
        height: 180,
        backgroundColor: colors.backgroundGray,
    },
    modalInfo: {
        padding: spacing.lg,
    },
    modalTitle: {
        fontSize: fontSizes.xl,
        fontWeight: '700',
        color: colors.textPrimary,
        marginTop: spacing.md,
    },
    modalMetaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: spacing.sm,
        flexWrap: 'wrap',
    },
    modalMetaText: {
        fontSize: fontSizes.sm,
        color: colors.textSecondary,
    },
    modalMetaDot: {
        marginHorizontal: spacing.sm,
        color: colors.textMuted,
    },
    modalDetail: {
        fontSize: fontSizes.sm,
        color: colors.textMuted,
        marginTop: spacing.sm,
    },
    modalActions: {
        padding: spacing.lg,
        gap: spacing.md,
    },
    buyButton: {
        backgroundColor: colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.lg,
        borderRadius: borderRadius.lg,
        gap: spacing.sm,
    },
    buyButtonText: {
        fontSize: fontSizes.lg,
        fontWeight: '700',
        color: colors.textLight,
    },
    openButton: {
        backgroundColor: colors.success,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.lg,
        borderRadius: borderRadius.lg,
        gap: spacing.sm,
    },
    openButtonText: {
        fontSize: fontSizes.lg,
        fontWeight: '700',
        color: colors.textLight,
    },
    subscribeButton: {
        alignItems: 'center',
        paddingVertical: spacing.md,
    },
    subscribeButtonText: {
        fontSize: fontSizes.sm,
        color: colors.primary,
        fontWeight: '600',
    },

    bottomPadding: {
        height: 100,
    },
});

export default HomeScreen;

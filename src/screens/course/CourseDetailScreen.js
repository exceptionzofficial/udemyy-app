import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    StatusBar,
    Dimensions,
    Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { colors, fontSizes, spacing, borderRadius, shadows } from '../../config/theme';
import RatingStars from '../../components/common/RatingStars';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';

const { width, height } = Dimensions.get('window');

const CourseDetailScreen = ({ navigation, route }) => {
    const { course, enrolled = false } = route.params;
    const [activeTab, setActiveTab] = useState('overview');
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [expandedSections, setExpandedSections] = useState(
        course.sections?.map(s => s.id) || []
    );
    const scrollY = useRef(new Animated.Value(0)).current;

    const formatPrice = (price) => '₹' + price.toLocaleString('en-IN');

    const formatStudents = (count) => {
        if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
        if (count >= 1000) return (count / 1000).toFixed(0) + 'K';
        return count.toString();
    };

    const toggleSection = (sectionId) => {
        setExpandedSections(prev =>
            prev.includes(sectionId)
                ? prev.filter(id => id !== sectionId)
                : [...prev, sectionId]
        );
    };

    const handleBuyNow = () => {
        navigation.navigate('Payment', { course });
    };

    const handleStartLearning = () => {
        navigation.navigate('VideoPlayer', { course });
    };

    const renderLecture = (lecture, isLocked) => (
        <TouchableOpacity
            key={lecture.id}
            style={styles.lectureItem}
            onPress={() => {
                if (!isLocked || lecture.isPreview) {
                    navigation.navigate('VideoPlayer', { course, lecture });
                }
            }}
            disabled={isLocked && !lecture.isPreview}
        >
            <View style={styles.lectureLeft}>
                <Icon
                    name={lecture.type === 'pdf' ? 'file-document-outline' : 'play-circle-outline'}
                    size={20}
                    color={isLocked && !lecture.isPreview ? colors.textMuted : colors.primary}
                />
                <View style={styles.lectureInfo}>
                    <Text
                        style={[
                            styles.lectureTitle,
                            isLocked && !lecture.isPreview && styles.lectureLocked
                        ]}
                        numberOfLines={2}
                    >
                        {lecture.title}
                    </Text>
                    <Text style={styles.lectureDuration}>
                        {lecture.type === 'pdf' ? 'PDF' : lecture.duration}
                    </Text>
                </View>
            </View>

            {lecture.isPreview ? (
                <View style={styles.previewBadge}>
                    <Text style={styles.previewText}>Preview</Text>
                </View>
            ) : isLocked ? (
                <Icon name="lock" size={18} color={colors.textMuted} />
            ) : (
                <Icon name="check-circle" size={18} color={colors.success} />
            )}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            {/* Header Image */}
            <View style={styles.headerContainer}>
                <Image source={{ uri: course.thumbnail }} style={styles.headerImage} />
                <LinearGradient
                    colors={['rgba(0,0,0,0.6)', 'transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.headerGradient}
                >
                    <View style={styles.headerTop}>
                        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                            <Icon name="arrow-left" size={24} color={colors.textLight} />
                        </TouchableOpacity>
                        <View style={styles.headerActions}>
                            <TouchableOpacity style={styles.headerAction}>
                                <Icon name="share-variant" size={22} color={colors.textLight} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.headerAction}
                                onPress={() => setIsWishlisted(!isWishlisted)}
                            >
                                <Icon
                                    name={isWishlisted ? 'heart' : 'heart-outline'}
                                    size={22}
                                    color={isWishlisted ? colors.accent : colors.textLight}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.playButton}>
                        <Icon name="play" size={30} color={colors.textLight} />
                        <Text style={styles.playText}>Preview this course</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}
            >
                {/* Course Info */}
                <View style={styles.courseInfo}>
                    {course.isBestseller && (
                        <Badge text="Bestseller" variant="bestseller" style={styles.badge} />
                    )}

                    <Text style={styles.courseTitle}>{course.title}</Text>
                    <Text style={styles.courseDescription}>{course.description}</Text>

                    <View style={styles.ratingRow}>
                        <Text style={styles.ratingValue}>{course.rating}</Text>
                        <RatingStars rating={course.rating} size="small" showValue={false} />
                        <Text style={styles.ratingCount}>({course.reviewsCount.toLocaleString()} ratings)</Text>
                        <Text style={styles.studentCount}>{formatStudents(course.studentsCount)} students</Text>
                    </View>

                    <Text style={styles.instructorText}>
                        Created by <Text style={styles.instructorName}>{course.instructor}</Text>
                    </Text>

                    <View style={styles.metaRow}>
                        <View style={styles.metaItem}>
                            <Icon name="update" size={16} color={colors.textSecondary} />
                            <Text style={styles.metaText}>Updated {course.updatedAt}</Text>
                        </View>
                        <View style={styles.metaItem}>
                            <Icon name="earth" size={16} color={colors.textSecondary} />
                            <Text style={styles.metaText}>{course.language}</Text>
                        </View>
                    </View>
                </View>

                {/* Tabs */}
                <View style={styles.tabsContainer}>
                    {['overview', 'curriculum', 'reviews'].map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.tab, activeTab === tab && styles.tabActive]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <View style={styles.tabContent}>
                        <Text style={styles.sectionTitle}>What you'll learn</Text>
                        {course.whatYouWillLearn?.map((item, index) => (
                            <View key={index} style={styles.learnItem}>
                                <Icon name="check" size={18} color={colors.success} />
                                <Text style={styles.learnText}>{item}</Text>
                            </View>
                        ))}

                        <Text style={[styles.sectionTitle, { marginTop: spacing.xl }]}>This course includes</Text>
                        <View style={styles.includesGrid}>
                            <View style={styles.includeItem}>
                                <Icon name="play-circle-outline" size={20} color={colors.textSecondary} />
                                <Text style={styles.includeText}>{course.duration} video</Text>
                            </View>
                            <View style={styles.includeItem}>
                                <Icon name="file-document-outline" size={20} color={colors.textSecondary} />
                                <Text style={styles.includeText}>Downloadable resources</Text>
                            </View>
                            <View style={styles.includeItem}>
                                <Icon name="infinity" size={20} color={colors.textSecondary} />
                                <Text style={styles.includeText}>Full lifetime access</Text>
                            </View>
                            <View style={styles.includeItem}>
                                <Icon name="cellphone" size={20} color={colors.textSecondary} />
                                <Text style={styles.includeText}>Access on mobile</Text>
                            </View>
                            <View style={styles.includeItem}>
                                <Icon name="certificate-outline" size={20} color={colors.textSecondary} />
                                <Text style={styles.includeText}>Certificate of completion</Text>
                            </View>
                        </View>

                        <Text style={[styles.sectionTitle, { marginTop: spacing.xl }]}>Requirements</Text>
                        {course.requirements?.map((item, index) => (
                            <View key={index} style={styles.requirementItem}>
                                <Icon name="circle-small" size={20} color={colors.textSecondary} />
                                <Text style={styles.requirementText}>{item}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {activeTab === 'curriculum' && (
                    <View style={styles.tabContent}>
                        <View style={styles.curriculumHeader}>
                            <Text style={styles.curriculumInfo}>
                                {course.sections?.length || 0} sections • {course.lecturesCount} lectures • {course.duration}
                            </Text>
                        </View>

                        {course.sections?.map((section) => (
                            <View key={section.id} style={styles.sectionContainer}>
                                <TouchableOpacity
                                    style={styles.sectionHeader}
                                    onPress={() => toggleSection(section.id)}
                                >
                                    <View style={styles.sectionLeft}>
                                        <Icon
                                            name={expandedSections.includes(section.id) ? 'chevron-up' : 'chevron-down'}
                                            size={20}
                                            color={colors.textPrimary}
                                        />
                                        <Text style={styles.sectionTitle2}>{section.title}</Text>
                                    </View>
                                    <Text style={styles.sectionLectures}>
                                        {section.lectures?.length} lectures
                                    </Text>
                                </TouchableOpacity>

                                {expandedSections.includes(section.id) && (
                                    <View style={styles.lecturesContainer}>
                                        {section.lectures?.map((lecture) => renderLecture(lecture, !enrolled))}
                                    </View>
                                )}
                            </View>
                        ))}
                    </View>
                )}

                {activeTab === 'reviews' && (
                    <View style={styles.tabContent}>
                        <View style={styles.reviewsHeader}>
                            <Text style={styles.ratingBig}>{course.rating}</Text>
                            <View style={styles.reviewsInfo}>
                                <RatingStars rating={course.rating} size="large" showValue={false} />
                                <Text style={styles.reviewsCount}>
                                    {course.reviewsCount.toLocaleString()} reviews
                                </Text>
                            </View>
                        </View>

                        {/* Sample Reviews */}
                        {[1, 2, 3].map((i) => (
                            <View key={i} style={styles.reviewCard}>
                                <View style={styles.reviewerInfo}>
                                    <View style={styles.reviewerAvatar}>
                                        <Text style={styles.reviewerInitial}>J</Text>
                                    </View>
                                    <View>
                                        <Text style={styles.reviewerName}>John Smith</Text>
                                        <RatingStars rating={5} size="small" showValue={false} />
                                    </View>
                                    <Text style={styles.reviewDate}>2 weeks ago</Text>
                                </View>
                                <Text style={styles.reviewText}>
                                    Excellent course! The instructor explains everything clearly and the projects are very practical. Highly recommended for anyone starting their coding journey.
                                </Text>
                            </View>
                        ))}
                    </View>
                )}

                <View style={styles.bottomPadding} />
            </ScrollView>

            {/* Bottom Buy Bar */}
            <View style={styles.bottomBar}>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>{formatPrice(course.price)}</Text>
                    {course.originalPrice > course.price && (
                        <Text style={styles.originalPrice}>{formatPrice(course.originalPrice)}</Text>
                    )}
                </View>
                <Button
                    title={enrolled ? 'Start Learning' : 'Buy Now'}
                    onPress={enrolled ? handleStartLearning : handleBuyNow}
                    style={styles.buyButton}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    headerContainer: {
        height: 220,
        position: 'relative',
    },
    headerImage: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.backgroundGray,
    },
    headerGradient: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'space-between',
        padding: spacing.lg,
        paddingTop: 50,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerActions: {
        flexDirection: 'row',
    },
    headerAction: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: spacing.sm,
    },
    playButton: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
        borderRadius: borderRadius.round,
    },
    playText: {
        color: colors.textLight,
        fontSize: fontSizes.md,
        marginLeft: spacing.sm,
    },
    scrollView: {
        flex: 1,
    },
    courseInfo: {
        padding: spacing.lg,
    },
    badge: {
        marginBottom: spacing.sm,
    },
    courseTitle: {
        fontSize: fontSizes.xxl,
        fontWeight: '700',
        color: colors.textPrimary,
        lineHeight: 28,
    },
    courseDescription: {
        fontSize: fontSizes.md,
        color: colors.textSecondary,
        marginTop: spacing.sm,
        lineHeight: 22,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: spacing.md,
        flexWrap: 'wrap',
    },
    ratingValue: {
        fontSize: fontSizes.md,
        fontWeight: '700',
        color: colors.rating,
        marginRight: 4,
    },
    ratingCount: {
        fontSize: fontSizes.sm,
        color: colors.textSecondary,
        marginLeft: spacing.xs,
    },
    studentCount: {
        fontSize: fontSizes.sm,
        color: colors.textSecondary,
        marginLeft: spacing.md,
    },
    instructorText: {
        fontSize: fontSizes.sm,
        color: colors.textSecondary,
        marginTop: spacing.sm,
    },
    instructorName: {
        color: colors.primary,
        fontWeight: '600',
    },
    metaRow: {
        flexDirection: 'row',
        marginTop: spacing.md,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: spacing.lg,
    },
    metaText: {
        fontSize: fontSizes.sm,
        color: colors.textSecondary,
        marginLeft: spacing.xs,
    },
    tabsContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLight,
        paddingHorizontal: spacing.lg,
    },
    tab: {
        paddingVertical: spacing.md,
        marginRight: spacing.xxl,
    },
    tabActive: {
        borderBottomWidth: 2,
        borderBottomColor: colors.textPrimary,
    },
    tabText: {
        fontSize: fontSizes.md,
        color: colors.textSecondary,
    },
    tabTextActive: {
        color: colors.textPrimary,
        fontWeight: '600',
    },
    tabContent: {
        padding: spacing.lg,
    },
    sectionTitle: {
        fontSize: fontSizes.xl,
        fontWeight: '700',
        color: colors.textPrimary,
        marginBottom: spacing.md,
    },
    learnItem: {
        flexDirection: 'row',
        marginBottom: spacing.sm,
    },
    learnText: {
        flex: 1,
        fontSize: fontSizes.md,
        color: colors.textPrimary,
        marginLeft: spacing.md,
        lineHeight: 22,
    },
    includesGrid: {
        marginTop: spacing.sm,
    },
    includeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    includeText: {
        fontSize: fontSizes.md,
        color: colors.textSecondary,
        marginLeft: spacing.md,
    },
    requirementItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: spacing.sm,
    },
    requirementText: {
        flex: 1,
        fontSize: fontSizes.md,
        color: colors.textSecondary,
        marginLeft: spacing.sm,
    },
    curriculumHeader: {
        marginBottom: spacing.md,
    },
    curriculumInfo: {
        fontSize: fontSizes.sm,
        color: colors.textSecondary,
    },
    sectionContainer: {
        marginBottom: spacing.sm,
        backgroundColor: colors.backgroundGray,
        borderRadius: borderRadius.sm,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing.md,
    },
    sectionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    sectionTitle2: {
        fontSize: fontSizes.md,
        fontWeight: '600',
        color: colors.textPrimary,
        marginLeft: spacing.sm,
        flex: 1,
    },
    sectionLectures: {
        fontSize: fontSizes.sm,
        color: colors.textSecondary,
    },
    lecturesContainer: {
        paddingHorizontal: spacing.md,
        paddingBottom: spacing.md,
    },
    lectureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: spacing.md,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    lectureLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    lectureInfo: {
        flex: 1,
        marginLeft: spacing.md,
    },
    lectureTitle: {
        fontSize: fontSizes.md,
        color: colors.textPrimary,
    },
    lectureLocked: {
        color: colors.textMuted,
    },
    lectureDuration: {
        fontSize: fontSizes.xs,
        color: colors.textSecondary,
        marginTop: 2,
    },
    previewBadge: {
        backgroundColor: colors.primaryLight,
        paddingHorizontal: spacing.sm,
        paddingVertical: 2,
        borderRadius: borderRadius.sm,
    },
    previewText: {
        fontSize: fontSizes.xs,
        color: colors.primary,
        fontWeight: '600',
    },
    reviewsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    ratingBig: {
        fontSize: 48,
        fontWeight: '700',
        color: colors.rating,
        marginRight: spacing.lg,
    },
    reviewsInfo: {
        flex: 1,
    },
    reviewsCount: {
        fontSize: fontSizes.sm,
        color: colors.textSecondary,
        marginTop: spacing.xs,
    },
    reviewCard: {
        backgroundColor: colors.backgroundGray,
        padding: spacing.lg,
        borderRadius: borderRadius.md,
        marginBottom: spacing.md,
    },
    reviewerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    reviewerAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    reviewerInitial: {
        fontSize: fontSizes.lg,
        fontWeight: '600',
        color: colors.textLight,
    },
    reviewerName: {
        fontSize: fontSizes.md,
        fontWeight: '600',
        color: colors.textPrimary,
    },
    reviewDate: {
        fontSize: fontSizes.xs,
        color: colors.textMuted,
        marginLeft: 'auto',
    },
    reviewText: {
        fontSize: fontSizes.md,
        color: colors.textSecondary,
        lineHeight: 22,
    },
    bottomPadding: {
        height: 100,
    },
    bottomBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        borderTopWidth: 1,
        borderTopColor: colors.borderLight,
        backgroundColor: colors.background,
        ...shadows.medium,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    price: {
        fontSize: fontSizes.xxl,
        fontWeight: '700',
        color: colors.textPrimary,
    },
    originalPrice: {
        fontSize: fontSizes.md,
        color: colors.textMuted,
        textDecorationLine: 'line-through',
        marginLeft: spacing.sm,
    },
    buyButton: {
        flex: 1,
        marginLeft: spacing.lg,
    },
});

export default CourseDetailScreen;

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
import { colors, fontSizes, spacing, borderRadius, shadows } from '../../config/theme';
import { mockCourses, mockUser } from '../../data/mockData';

const MyLearningScreen = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('all');

    const tabs = [
        { id: 'all', label: 'All Courses' },
        { id: 'downloaded', label: 'Downloaded' },
        { id: 'archived', label: 'Archived' },
    ];

    // Simulate enrolled courses with progress
    const enrolledCourses = mockCourses.slice(0, 3).map((course, index) => ({
        ...course,
        progress: [45, 78, 12][index],
        lastWatched: ['2 hours ago', '1 day ago', '3 days ago'][index],
        nextLecture: course.sections?.[0]?.lectures?.[index % 3]?.title || 'Continue learning',
    }));

    const handleCoursePress = (course) => {
        navigation.navigate('CourseDetail', { course, enrolled: true });
    };

    const handleContinueLearning = (course) => {
        navigation.navigate('VideoPlayer', { course });
    };

    const renderCourseCard = ({ item }) => (
        <TouchableOpacity
            style={styles.courseCard}
            onPress={() => handleCoursePress(item)}
            activeOpacity={0.8}
        >
            <Image source={{ uri: item.thumbnail }} style={styles.courseThumbnail} />

            <View style={styles.courseContent}>
                <Text style={styles.courseTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.courseInstructor}>{item.instructor}</Text>

                {/* Progress Bar */}
                <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: `${item.progress}%` }]} />
                    </View>
                    <Text style={styles.progressText}>{item.progress}% complete</Text>
                </View>

                <Text style={styles.nextLecture} numberOfLines={1}>
                    <Icon name="play-circle-outline" size={14} color={colors.textSecondary} />
                    {' '}{item.nextLecture}
                </Text>

                <Text style={styles.lastWatched}>{item.lastWatched}</Text>
            </View>

            {/* Continue Button */}
            <TouchableOpacity
                style={styles.continueButton}
                onPress={() => handleContinueLearning(item)}
            >
                <Icon name="play" size={24} color={colors.textLight} />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
                <Icon name="book-open-variant" size={60} color={colors.textMuted} />
            </View>
            <Text style={styles.emptyTitle}>Start learning</Text>
            <Text style={styles.emptyText}>
                Your courses will appear here. Head over to our catalog to find something interesting.
            </Text>
            <TouchableOpacity
                style={styles.browseButton}
                onPress={() => navigation.navigate('Home')}
            >
                <Text style={styles.browseButtonText}>Browse courses</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Learning</Text>
                <View style={styles.headerActions}>
                    <TouchableOpacity style={styles.headerButton}>
                        <Icon name="magnify" size={24} color={colors.textPrimary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerButton}>
                        <Icon name="filter-variant" size={24} color={colors.textPrimary} />
                    </TouchableOpacity>
                </View>
            </View>

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

            {/* Course List */}
            {enrolledCourses.length > 0 ? (
                <FlatList
                    data={enrolledCourses}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderCourseCard}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                renderEmptyState()
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: spacing.lg,
        paddingHorizontal: spacing.lg,
        backgroundColor: colors.background,
    },
    headerTitle: {
        fontSize: fontSizes.xxxl,
        fontWeight: '700',
        color: colors.textPrimary,
    },
    headerActions: {
        flexDirection: 'row',
    },
    headerButton: {
        padding: spacing.sm,
        marginLeft: spacing.sm,
    },
    tabsContainer: {
        flexDirection: 'row',
        paddingHorizontal: spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLight,
    },
    tab: {
        paddingVertical: spacing.md,
        marginRight: spacing.xl,
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
    listContent: {
        padding: spacing.lg,
    },
    courseCard: {
        flexDirection: 'row',
        backgroundColor: colors.background,
        marginBottom: spacing.lg,
        borderRadius: borderRadius.md,
        overflow: 'hidden',
        ...shadows.light,
        padding: spacing.md,
    },
    courseThumbnail: {
        width: 100,
        height: 100,
        borderRadius: borderRadius.sm,
        backgroundColor: colors.backgroundGray,
    },
    courseContent: {
        flex: 1,
        marginLeft: spacing.md,
        justifyContent: 'space-between',
    },
    courseTitle: {
        fontSize: fontSizes.md,
        fontWeight: '600',
        color: colors.textPrimary,
        lineHeight: 20,
    },
    courseInstructor: {
        fontSize: fontSizes.xs,
        color: colors.textSecondary,
        marginTop: 2,
    },
    progressContainer: {
        marginTop: spacing.sm,
    },
    progressBar: {
        height: 4,
        backgroundColor: colors.borderLight,
        borderRadius: 2,
    },
    progressFill: {
        height: '100%',
        backgroundColor: colors.primary,
        borderRadius: 2,
    },
    progressText: {
        fontSize: fontSizes.xs,
        color: colors.textSecondary,
        marginTop: 4,
    },
    nextLecture: {
        fontSize: fontSizes.xs,
        color: colors.textSecondary,
        marginTop: spacing.xs,
    },
    lastWatched: {
        fontSize: fontSizes.xs,
        color: colors.textMuted,
    },
    continueButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginLeft: spacing.sm,
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
        backgroundColor: colors.backgroundGray,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.xxl,
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
        marginBottom: spacing.xxl,
    },
    browseButton: {
        backgroundColor: colors.primary,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.xxl,
        borderRadius: borderRadius.sm,
    },
    browseButtonText: {
        color: colors.textLight,
        fontSize: fontSizes.md,
        fontWeight: '600',
    },
});

export default MyLearningScreen;

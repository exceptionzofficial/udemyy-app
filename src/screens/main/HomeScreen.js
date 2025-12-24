import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    RefreshControl,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, fontSizes, spacing, borderRadius, shadows } from '../../config/theme';
import { mockCategories, mockCourses } from '../../data/mockData';
import { CategoryCarousel, CourseRow, FeaturedBanner, SaleBanner } from '../../components/home';

const HomeScreen = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1500);
    };

    const handleCoursePress = (course) => {
        navigation.navigate('CourseDetail', { course });
    };

    const handleCategoryPress = (category) => {
        navigation.navigate('CategoryCourses', { category });
    };

    const handleSearch = () => {
        navigation.navigate('Search');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={colors.primaryDark} />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <View style={styles.logoContainer}>
                        <View style={styles.logoIcon}>
                            <Text style={styles.logoText}>Y</Text>
                        </View>
                        <Text style={styles.appName}>Your App Name</Text>
                    </View>

                    <View style={styles.headerActions}>
                        <TouchableOpacity style={styles.headerButton}>
                            <Icon name="bell-outline" size={24} color={colors.textLight} />
                            <View style={styles.notificationBadge} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.headerButton}>
                            <Icon name="cart-outline" size={24} color={colors.textLight} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Search Bar */}
                <TouchableOpacity style={styles.searchBar} onPress={handleSearch} activeOpacity={0.8}>
                    <Icon name="magnify" size={20} color={colors.textSecondary} />
                    <Text style={styles.searchPlaceholder}>Search for anything</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {/* Sale Banner */}
                <SaleBanner
                    discount={85}
                    endTime="24:00:00"
                    onPress={() => navigation.navigate('Search')}
                />

                {/* Featured Banner */}
                <FeaturedBanner
                    title="Learn new skills"
                    subtitle="Courses from ₹449 | Sale ends today"
                    buttonText="Browse courses"
                    onButtonPress={() => navigation.navigate('Search')}
                />

                {/* Categories */}
                <CategoryCarousel
                    categories={mockCategories}
                    onCategoryPress={handleCategoryPress}
                    title="Categories"
                    showAll
                    onShowAllPress={() => navigation.navigate('Categories')}
                />

                {/* Featured Courses */}
                <CourseRow
                    title="Featured"
                    subtitle="Courses chosen just for you"
                    courses={mockCourses.filter(c => c.isBestseller)}
                    onCoursePress={handleCoursePress}
                    onSeeAllPress={() => navigation.navigate('Search', { filter: 'featured' })}
                />

                {/* Because you viewed Web Development */}
                <CourseRow
                    title="Because you viewed"
                    subtitle="Web Development"
                    courses={mockCourses.slice(0, 4)}
                    onCoursePress={handleCoursePress}
                    onSeeAllPress={() => navigation.navigate('Search')}
                />

                {/* Top courses in Development */}
                <CourseRow
                    title="Top courses in Development"
                    courses={mockCourses.filter(c => c.isBestseller)}
                    onCoursePress={handleCoursePress}
                    onSeeAllPress={() => navigation.navigate('CategoryCourses', { category: mockCategories[0] })}
                />

                {/* Students are viewing */}
                <CourseRow
                    title="Students are viewing"
                    courses={mockCourses.slice(2, 6)}
                    onCoursePress={handleCoursePress}
                    onSeeAllPress={() => navigation.navigate('Search')}
                />

                {/* Short & Sweet */}
                <View style={styles.promoSection}>
                    <View style={styles.promoHeader}>
                        <Text style={styles.promoTitle}>Short and sweet courses</Text>
                        <Text style={styles.promoSubtitle}>5 hours or less</Text>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.promoScroll}>
                        {mockCourses.slice(0, 3).map((course) => (
                            <TouchableOpacity key={course.id} style={styles.promoCard} onPress={() => handleCoursePress(course)}>
                                <Image source={{ uri: course.thumbnail }} style={styles.promoImage} />
                                <View style={styles.promoDuration}>
                                    <Icon name="clock-outline" size={12} color={colors.textLight} />
                                    <Text style={styles.promoDurationText}>{course.duration}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Learner are viewing */}
                <CourseRow
                    title="Learners are viewing"
                    courses={mockCourses.slice(1, 5)}
                    onCoursePress={handleCoursePress}
                    onSeeAllPress={() => navigation.navigate('Search')}
                />

                {/* Bottom padding */}
                <View style={styles.bottomPadding} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        backgroundColor: colors.primaryDark,
        paddingTop: 50,
        paddingBottom: spacing.lg,
        paddingHorizontal: spacing.lg,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoIcon: {
        width: 32,
        height: 32,
        borderRadius: 4,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoText: {
        fontSize: fontSizes.xl,
        fontWeight: '700',
        color: colors.textLight,
    },
    appName: {
        fontSize: fontSizes.xxl,
        fontWeight: '700',
        color: colors.textLight,
        marginLeft: spacing.sm,
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerButton: {
        padding: spacing.sm,
        marginLeft: spacing.sm,
        position: 'relative',
    },
    notificationBadge: {
        position: 'absolute',
        top: 6,
        right: 6,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.accent,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        borderRadius: borderRadius.round,
    },
    searchPlaceholder: {
        marginLeft: spacing.sm,
        fontSize: fontSizes.md,
        color: colors.textSecondary,
    },
    promoSection: {
        marginBottom: spacing.xxl,
    },
    promoHeader: {
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.md,
    },
    promoTitle: {
        fontSize: fontSizes.xxl,
        fontWeight: '700',
        color: colors.textPrimary,
    },
    promoSubtitle: {
        fontSize: fontSizes.sm,
        color: colors.textSecondary,
        marginTop: spacing.xs,
    },
    promoScroll: {
        paddingLeft: spacing.lg,
    },
    promoCard: {
        marginRight: spacing.md,
        borderRadius: borderRadius.md,
        overflow: 'hidden',
        ...shadows.light,
    },
    promoImage: {
        width: 200,
        height: 120,
        backgroundColor: colors.backgroundGray,
    },
    promoDuration: {
        position: 'absolute',
        bottom: spacing.sm,
        right: spacing.sm,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingHorizontal: spacing.sm,
        paddingVertical: 4,
        borderRadius: borderRadius.sm,
    },
    promoDurationText: {
        fontSize: fontSizes.xs,
        color: colors.textLight,
        marginLeft: 4,
    },
    bottomPadding: {
        height: 100,
    },
});

export default HomeScreen;

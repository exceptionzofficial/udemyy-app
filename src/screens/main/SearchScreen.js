import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    StatusBar,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, fontSizes, spacing, borderRadius } from '../../config/theme';
import { mockCourses, mockCategories } from '../../data/mockData';
import CourseCard from '../../components/course/CourseCard';
import { CategoryItem } from '../../components/home/CategoryCarousel';

const SearchScreen = ({ navigation, route }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [recentSearches] = useState([
        'Web Development',
        'Python',
        'React Native',
        'Machine Learning',
        'UI/UX Design',
    ]);
    const [selectedFilter, setSelectedFilter] = useState('all');

    const filters = [
        { id: 'all', label: 'All' },
        { id: 'free', label: 'Free' },
        { id: 'paid', label: 'Paid' },
        { id: 'beginner', label: 'Beginner' },
        { id: 'intermediate', label: 'Intermediate' },
        { id: 'advanced', label: 'Advanced' },
    ];

    const filteredCourses = mockCourses.filter((course) => {
        if (!searchQuery) return true;
        return course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const handleCoursePress = (course) => {
        navigation.navigate('CourseDetail', { course });
    };

    const handleCategoryPress = (category) => {
        setSearchQuery(category.name);
        setIsSearching(true);
    };

    const handleRecentSearch = (search) => {
        setSearchQuery(search);
        setIsSearching(true);
    };

    const renderSearchResults = () => (
        <View style={styles.resultsContainer}>
            {/* Filters */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.filtersContainer}
                contentContainerStyle={styles.filtersContent}
            >
                {filters.map((filter) => (
                    <TouchableOpacity
                        key={filter.id}
                        style={[
                            styles.filterChip,
                            selectedFilter === filter.id && styles.filterChipActive,
                        ]}
                        onPress={() => setSelectedFilter(filter.id)}
                    >
                        <Text
                            style={[
                                styles.filterChipText,
                                selectedFilter === filter.id && styles.filterChipTextActive,
                            ]}
                        >
                            {filter.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Results count */}
            <Text style={styles.resultsCount}>
                {filteredCourses.length} results for "{searchQuery}"
            </Text>

            {/* Results list */}
            <FlatList
                data={filteredCourses}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <CourseCard
                        course={item}
                        onPress={() => handleCoursePress(item)}
                        variant="compact"
                    />
                )}
                contentContainerStyle={styles.resultsList}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );

    const renderInitialState = () => (
        <ScrollView style={styles.initialContainer} showsVerticalScrollIndicator={false}>
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Recent Searches</Text>
                        <TouchableOpacity>
                            <Text style={styles.clearText}>Clear</Text>
                        </TouchableOpacity>
                    </View>
                    {recentSearches.map((search, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.recentItem}
                            onPress={() => handleRecentSearch(search)}
                        >
                            <Icon name="history" size={20} color={colors.textSecondary} />
                            <Text style={styles.recentText}>{search}</Text>
                            <Icon name="arrow-top-left" size={18} color={colors.textMuted} />
                        </TouchableOpacity>
                    ))}
                </View>
            )}

            {/* Top Categories */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Top Categories</Text>
                <View style={styles.categoriesGrid}>
                    {mockCategories.map((category) => (
                        <TouchableOpacity
                            key={category.id}
                            style={styles.categoryCard}
                            onPress={() => handleCategoryPress(category)}
                        >
                            <CategoryItem category={category} variant="horizontal" />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Trending */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Trending Searches</Text>
                <View style={styles.trendingContainer}>
                    {['JavaScript', 'React', 'Data Science', 'AWS', 'Python'].map((term, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.trendingChip}
                            onPress={() => handleRecentSearch(term)}
                        >
                            <Icon name="trending-up" size={14} color={colors.primary} />
                            <Text style={styles.trendingText}>{term}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </ScrollView>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

            {/* Search Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={24} color={colors.textPrimary} />
                </TouchableOpacity>

                <View style={styles.searchInputContainer}>
                    <Icon name="magnify" size={20} color={colors.textSecondary} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search for anything"
                        placeholderTextColor={colors.textMuted}
                        value={searchQuery}
                        onChangeText={(text) => {
                            setSearchQuery(text);
                            setIsSearching(text.length > 0);
                        }}
                        autoFocus
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => {
                            setSearchQuery('');
                            setIsSearching(false);
                        }}>
                            <Icon name="close-circle" size={20} color={colors.textSecondary} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Content */}
            {isSearching ? renderSearchResults() : renderInitialState()}
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
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: spacing.md,
        paddingHorizontal: spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLight,
    },
    backButton: {
        marginRight: spacing.md,
    },
    searchInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.backgroundGray,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.round,
    },
    searchInput: {
        flex: 1,
        marginLeft: spacing.sm,
        fontSize: fontSizes.md,
        color: colors.textPrimary,
    },
    initialContainer: {
        flex: 1,
    },
    section: {
        paddingVertical: spacing.lg,
        paddingHorizontal: spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLight,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    sectionTitle: {
        fontSize: fontSizes.xl,
        fontWeight: '700',
        color: colors.textPrimary,
    },
    clearText: {
        fontSize: fontSizes.md,
        color: colors.primary,
        fontWeight: '600',
    },
    recentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.md,
    },
    recentText: {
        flex: 1,
        marginLeft: spacing.md,
        fontSize: fontSizes.md,
        color: colors.textPrimary,
    },
    categoriesGrid: {
        marginTop: spacing.sm,
    },
    categoryCard: {
        marginBottom: 0,
    },
    trendingContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: spacing.md,
    },
    trendingChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.backgroundGray,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.round,
        marginRight: spacing.sm,
        marginBottom: spacing.sm,
    },
    trendingText: {
        fontSize: fontSizes.sm,
        color: colors.textPrimary,
        marginLeft: spacing.xs,
    },
    // Results
    resultsContainer: {
        flex: 1,
    },
    filtersContainer: {
        maxHeight: 50,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLight,
    },
    filtersContent: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
    },
    filterChip: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.round,
        backgroundColor: colors.backgroundGray,
        marginRight: spacing.sm,
        borderWidth: 1,
        borderColor: colors.border,
    },
    filterChipActive: {
        backgroundColor: colors.textPrimary,
        borderColor: colors.textPrimary,
    },
    filterChipText: {
        fontSize: fontSizes.sm,
        color: colors.textPrimary,
        fontWeight: '500',
    },
    filterChipTextActive: {
        color: colors.textLight,
    },
    resultsCount: {
        fontSize: fontSizes.lg,
        fontWeight: '700',
        color: colors.textPrimary,
        padding: spacing.lg,
    },
    resultsList: {
        paddingHorizontal: spacing.lg,
    },
});

export default SearchScreen;

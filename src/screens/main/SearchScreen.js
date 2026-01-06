import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    FlatList,
    StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontSizes, spacing, borderRadius, shadows } from '../../config/theme';
import { mockUser, mockContent, hasAccess, getContentPrice, subjectFilters } from '../../data/mockData';

// Subject cards for browsing
const subjectCards = [
    { id: 'physics', name: 'Physics', icon: 'atom', color: '#3498DB' },
    { id: 'chemistry', name: 'Chemistry', icon: 'flask', color: '#27AE60' },
    { id: 'mathematics', name: 'Mathematics', icon: 'calculator', color: '#E74C3C' },
    { id: 'biology', name: 'Biology', icon: 'dna', color: '#9B59B6' },
    { id: 'english', name: 'English', icon: 'book-open-variant', color: '#E67E22' },
    { id: 'science', name: 'Science', icon: 'beaker', color: '#1ABC9C' },
];

const SearchScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [user] = useState(mockUser);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [recentSearches] = useState(['Physics Notes', 'Chemistry', 'Mathematics']);

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.length > 1) {
            const results = mockContent.filter(item =>
                item.targetClass.includes(user.class) &&
                (item.title.toLowerCase().includes(query.toLowerCase()) ||
                    item.subject.toLowerCase().includes(query.toLowerCase()))
            );
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setSearchResults([]);
    };

    const handleContentPress = (item) => {
        const isLocked = !hasAccess(user, item);
        if (!isLocked) {
            navigation.navigate('VideoPlayer', { content: item });
        } else {
            navigation.navigate('Subscription');
        }
    };

    const renderSubjectCard = (subject) => (
        <TouchableOpacity
            key={subject.id}
            style={styles.subjectCard}
            onPress={() => handleSearch(subject.name)}
        >
            <View style={[styles.subjectIcon, { backgroundColor: subject.color + '20' }]}>
                <Icon name={subject.icon} size={28} color={subject.color} />
            </View>
            <Text style={styles.subjectName}>{subject.name}</Text>
        </TouchableOpacity>
    );

    const renderResultItem = ({ item }) => {
        const isLocked = !hasAccess(user, item);
        const price = getContentPrice(item.type);

        return (
            <TouchableOpacity
                style={styles.resultCard}
                onPress={() => handleContentPress(item)}
            >
                <View style={[styles.typeBadge, item.type === 'pdf' ? styles.pdfBadge : styles.videoBadge]}>
                    <Icon
                        name={item.type === 'pdf' ? 'file-document' : 'play-circle'}
                        size={16}
                        color={colors.textLight}
                    />
                </View>

                <View style={styles.resultInfo}>
                    <Text style={styles.resultTitle} numberOfLines={2}>{item.title}</Text>
                    <Text style={styles.resultSubject}>{item.subject} | {item.board === 'state' ? 'State Board' : 'CBSE'}</Text>
                    <View style={styles.resultMeta}>
                        <Icon name="star" size={14} color={colors.secondary} />
                        <Text style={styles.resultRating}>{item.rating}</Text>
                        {isLocked && !item.isFree && (
                            <View style={styles.priceBadge}>
                                <Text style={styles.priceText}>Rs.{price}</Text>
                            </View>
                        )}
                        {item.isFree && (
                            <View style={styles.freeBadge}>
                                <Text style={styles.freeText}>FREE</Text>
                            </View>
                        )}
                    </View>
                </View>

                <Icon name="chevron-right" size={22} color={colors.textMuted} />
            </TouchableOpacity>
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
                <Text style={styles.headerTitle}>Search</Text>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Icon name="magnify" size={20} color={colors.textMuted} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search PDFs, videos..."
                        placeholderTextColor={colors.textMuted}
                        value={searchQuery}
                        onChangeText={handleSearch}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={handleClearSearch}>
                            <Icon name="close-circle" size={18} color={colors.textMuted} />
                        </TouchableOpacity>
                    )}
                </View>
            </LinearGradient>

            {searchResults.length > 0 ? (
                /* Search Results */
                <FlatList
                    data={searchResults}
                    renderItem={renderResultItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.resultsList}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <Text style={styles.resultsCount}>
                            {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"
                        </Text>
                    }
                />
            ) : (
                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                >
                    {/* Recent Searches */}
                    {searchQuery.length === 0 && recentSearches.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Recent Searches</Text>
                            {recentSearches.map((search, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.recentItem}
                                    onPress={() => handleSearch(search)}
                                >
                                    <Icon name="history" size={18} color={colors.textMuted} />
                                    <Text style={styles.recentText}>{search}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    {/* Browse by Subject */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Browse by Subject</Text>
                        <View style={styles.subjectsGrid}>
                            {subjectCards.map(renderSubjectCard)}
                        </View>
                    </View>

                    {/* Content Types */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Content Types</Text>
                        <View style={styles.typesRow}>
                            <TouchableOpacity
                                style={styles.typeCard}
                                onPress={() => handleSearch('pdf')}
                            >
                                <View style={[styles.typeIcon, { backgroundColor: colors.error + '20' }]}>
                                    <Icon name="file-document" size={32} color={colors.error} />
                                </View>
                                <Text style={styles.typeName}>PDFs</Text>
                                <Text style={styles.typeCount}>Notes & Sheets</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.typeCard}
                                onPress={() => handleSearch('video')}
                            >
                                <View style={[styles.typeIcon, { backgroundColor: colors.primary + '20' }]}>
                                    <Icon name="play-circle" size={32} color={colors.primary} />
                                </View>
                                <Text style={styles.typeName}>Videos</Text>
                                <Text style={styles.typeCount}>Lectures & Tutorials</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            )}
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
        marginBottom: spacing.md,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background,
        paddingHorizontal: spacing.md,
        borderRadius: borderRadius.md,
        height: 48,
    },
    searchInput: {
        flex: 1,
        fontSize: fontSizes.md,
        color: colors.textPrimary,
        marginLeft: spacing.sm,
        paddingVertical: 0,
    },
    content: {
        flex: 1,
    },
    section: {
        marginTop: spacing.xl,
        paddingHorizontal: spacing.lg,
    },
    sectionTitle: {
        fontSize: fontSizes.lg,
        fontWeight: '700',
        color: colors.textPrimary,
        marginBottom: spacing.md,
    },
    recentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLight,
    },
    recentText: {
        fontSize: fontSizes.md,
        color: colors.textPrimary,
        marginLeft: spacing.md,
    },
    subjectsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -spacing.xs,
    },
    subjectCard: {
        width: '33.33%',
        padding: spacing.xs,
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    subjectIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.sm,
    },
    subjectName: {
        fontSize: fontSizes.sm,
        color: colors.textPrimary,
        textAlign: 'center',
    },
    typesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    typeCard: {
        width: '48%',
        backgroundColor: colors.background,
        padding: spacing.lg,
        borderRadius: borderRadius.lg,
        alignItems: 'center',
        ...shadows.light,
    },
    typeIcon: {
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.md,
    },
    typeName: {
        fontSize: fontSizes.md,
        fontWeight: '600',
        color: colors.textPrimary,
    },
    typeCount: {
        fontSize: fontSizes.xs,
        color: colors.textSecondary,
        marginTop: 2,
    },
    resultsList: {
        padding: spacing.lg,
        paddingBottom: 100,
    },
    resultsCount: {
        fontSize: fontSizes.sm,
        color: colors.textSecondary,
        marginBottom: spacing.md,
    },
    resultCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background,
        padding: spacing.md,
        borderRadius: borderRadius.md,
        marginBottom: spacing.sm,
        ...shadows.light,
    },
    typeBadge: {
        width: 40,
        height: 40,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    pdfBadge: {
        backgroundColor: colors.error,
    },
    videoBadge: {
        backgroundColor: colors.primary,
    },
    resultInfo: {
        flex: 1,
    },
    resultTitle: {
        fontSize: fontSizes.md,
        fontWeight: '600',
        color: colors.textPrimary,
        lineHeight: 18,
    },
    resultSubject: {
        fontSize: fontSizes.xs,
        color: colors.textSecondary,
        marginTop: 2,
    },
    resultMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: spacing.sm,
    },
    resultRating: {
        fontSize: fontSizes.xs,
        color: colors.textSecondary,
        marginLeft: 2,
        marginRight: spacing.md,
    },
    priceBadge: {
        backgroundColor: colors.secondary,
        paddingHorizontal: spacing.sm,
        paddingVertical: 2,
        borderRadius: borderRadius.sm,
    },
    priceText: {
        fontSize: fontSizes.xs,
        color: colors.textPrimary,
        fontWeight: '600',
    },
    freeBadge: {
        backgroundColor: colors.success,
        paddingHorizontal: spacing.sm,
        paddingVertical: 2,
        borderRadius: borderRadius.sm,
    },
    freeText: {
        fontSize: fontSizes.xs,
        color: colors.textLight,
        fontWeight: '600',
    },
});

export default SearchScreen;

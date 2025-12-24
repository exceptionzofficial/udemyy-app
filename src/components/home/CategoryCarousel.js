import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, fontSizes, spacing, borderRadius, shadows } from '../../config/theme';

const iconMap = {
    'code': 'code-braces',
    'briefcase': 'briefcase-outline',
    'laptop': 'laptop',
    'palette': 'palette-outline',
    'trending-up': 'trending-up',
    'camera': 'camera-outline',
    'music': 'music',
    'heart': 'heart-outline',
};

const CategoryItem = ({ category, onPress, variant = 'grid' }) => {
    const iconName = iconMap[category.icon] || 'folder-outline';

    if (variant === 'chip') {
        return (
            <TouchableOpacity style={styles.chipContainer} onPress={onPress} activeOpacity={0.7}>
                <Text style={styles.chipText}>{category.name}</Text>
            </TouchableOpacity>
        );
    }

    if (variant === 'horizontal') {
        return (
            <TouchableOpacity style={styles.horizontalContainer} onPress={onPress} activeOpacity={0.7}>
                <View style={styles.horizontalIconContainer}>
                    <Icon name={iconName} size={24} color={colors.primary} />
                </View>
                <Text style={styles.horizontalText}>{category.name}</Text>
                <Icon name="chevron-right" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
        );
    }

    // Grid variant (default)
    return (
        <TouchableOpacity style={styles.gridContainer} onPress={onPress} activeOpacity={0.7}>
            <View style={styles.gridIconContainer}>
                <Icon name={iconName} size={28} color={colors.primary} />
            </View>
            <Text style={styles.gridText} numberOfLines={2}>{category.name}</Text>
        </TouchableOpacity>
    );
};

const CategoryCarousel = ({ categories, onCategoryPress, title, showAll, onShowAllPress }) => {
    return (
        <View style={styles.carouselContainer}>
            {title && (
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>{title}</Text>
                    {showAll && (
                        <TouchableOpacity onPress={onShowAllPress}>
                            <Text style={styles.seeAll}>See all</Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}
            <FlatList
                data={categories}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <CategoryItem
                        category={item}
                        onPress={() => onCategoryPress(item)}
                        variant="grid"
                    />
                )}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    // Carousel
    carouselContainer: {
        marginBottom: spacing.xl,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.md,
    },
    headerTitle: {
        fontSize: fontSizes.xxl,
        fontWeight: '700',
        color: colors.textPrimary,
    },
    seeAll: {
        fontSize: fontSizes.md,
        color: colors.primary,
        fontWeight: '600',
    },
    listContent: {
        paddingHorizontal: spacing.lg,
    },

    // Grid variant
    gridContainer: {
        alignItems: 'center',
        marginRight: spacing.xl,
        width: 80,
    },
    gridIconContainer: {
        width: 60,
        height: 60,
        borderRadius: borderRadius.round,
        backgroundColor: colors.backgroundGray,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.sm,
    },
    gridText: {
        fontSize: fontSizes.sm,
        color: colors.textPrimary,
        textAlign: 'center',
        fontWeight: '500',
    },

    // Horizontal variant
    horizontalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLight,
    },
    horizontalIconContainer: {
        width: 44,
        height: 44,
        borderRadius: borderRadius.md,
        backgroundColor: colors.backgroundGray,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    horizontalText: {
        flex: 1,
        fontSize: fontSizes.lg,
        color: colors.textPrimary,
        fontWeight: '500',
    },

    // Chip variant
    chipContainer: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
        borderRadius: borderRadius.round,
        backgroundColor: colors.backgroundGray,
        marginRight: spacing.sm,
        borderWidth: 1,
        borderColor: colors.border,
    },
    chipText: {
        fontSize: fontSizes.md,
        color: colors.textPrimary,
        fontWeight: '500',
    },
});

export { CategoryItem, CategoryCarousel };
export default CategoryCarousel;

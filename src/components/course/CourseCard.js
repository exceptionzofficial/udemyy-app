import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, fontSizes, spacing, borderRadius, shadows } from '../../config/theme';
import RatingStars from '../common/RatingStars';
import Badge from '../common/Badge';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.65;

const CourseCard = ({
    course,
    onPress,
    variant = 'horizontal', // horizontal, vertical, compact
    showProgress = false,
    progress = 0,
}) => {
    const formatPrice = (price) => {
        return '₹' + price.toLocaleString('en-IN');
    };

    const formatStudents = (count) => {
        if (count >= 1000000) {
            return (count / 1000000).toFixed(1) + 'M students';
        }
        if (count >= 1000) {
            return (count / 1000).toFixed(0) + 'K students';
        }
        return count + ' students';
    };

    if (variant === 'compact') {
        return (
            <TouchableOpacity style={styles.compactContainer} onPress={onPress} activeOpacity={0.8}>
                <Image source={{ uri: course.thumbnail }} style={styles.compactThumbnail} />
                <View style={styles.compactContent}>
                    <Text style={styles.compactTitle} numberOfLines={2}>{course.title}</Text>
                    <Text style={styles.compactInstructor}>{course.instructor}</Text>
                    <RatingStars rating={course.rating} size="small" showCount count={course.reviewsCount} />
                    <View style={styles.priceRow}>
                        <Text style={styles.price}>{formatPrice(course.price)}</Text>
                        {course.originalPrice > course.price && (
                            <Text style={styles.originalPrice}>{formatPrice(course.originalPrice)}</Text>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    if (variant === 'vertical') {
        return (
            <TouchableOpacity style={styles.verticalContainer} onPress={onPress} activeOpacity={0.8}>
                <View style={styles.thumbnailContainer}>
                    <Image source={{ uri: course.thumbnail }} style={styles.verticalThumbnail} />
                    {course.isBestseller && (
                        <Badge text="Bestseller" variant="bestseller" size="small" style={styles.badgePosition} />
                    )}
                    {course.isNew && !course.isBestseller && (
                        <Badge text="New" variant="new" size="small" style={styles.badgePosition} />
                    )}
                    {showProgress && (
                        <View style={styles.progressBar}>
                            <View style={[styles.progressFill, { width: `${progress}%` }]} />
                        </View>
                    )}
                </View>

                <View style={styles.verticalContent}>
                    <Text style={styles.title} numberOfLines={2}>{course.title}</Text>
                    <Text style={styles.instructor}>{course.instructor}</Text>

                    <View style={styles.ratingRow}>
                        <RatingStars rating={course.rating} size="small" />
                        <Text style={styles.reviewCount}>({course.reviewsCount.toLocaleString()})</Text>
                    </View>

                    <View style={styles.priceRow}>
                        <Text style={styles.price}>{formatPrice(course.price)}</Text>
                        {course.originalPrice > course.price && (
                            <Text style={styles.originalPrice}>{formatPrice(course.originalPrice)}</Text>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    // Horizontal (default) - used in home screen carousels
    return (
        <TouchableOpacity style={styles.horizontalContainer} onPress={onPress} activeOpacity={0.8}>
            <View style={styles.thumbnailContainer}>
                <Image source={{ uri: course.thumbnail }} style={styles.horizontalThumbnail} />
                {course.isBestseller && (
                    <Badge text="Bestseller" variant="bestseller" size="small" style={styles.badgePositionHorizontal} />
                )}
            </View>

            <View style={styles.horizontalContent}>
                <Text style={styles.titleSmall} numberOfLines={2}>{course.title}</Text>
                <Text style={styles.instructorSmall}>{course.instructor}</Text>

                <View style={styles.ratingRow}>
                    <Text style={styles.ratingText}>{course.rating}</Text>
                    <RatingStars rating={course.rating} size="small" showValue={false} />
                    <Text style={styles.studentsText}>({formatStudents(course.studentsCount)})</Text>
                </View>

                <View style={styles.priceRow}>
                    <Text style={styles.priceSmall}>{formatPrice(course.price)}</Text>
                    {course.originalPrice > course.price && (
                        <Text style={styles.originalPriceSmall}>{formatPrice(course.originalPrice)}</Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    // Horizontal variant
    horizontalContainer: {
        width: CARD_WIDTH,
        marginRight: spacing.lg,
        backgroundColor: colors.background,
    },
    thumbnailContainer: {
        position: 'relative',
    },
    horizontalThumbnail: {
        width: '100%',
        height: 100,
        borderRadius: borderRadius.sm,
        backgroundColor: colors.backgroundGray,
    },
    badgePositionHorizontal: {
        position: 'absolute',
        bottom: spacing.sm,
        left: spacing.sm,
    },
    horizontalContent: {
        paddingTop: spacing.sm,
    },
    titleSmall: {
        fontSize: fontSizes.md,
        fontWeight: '700',
        color: colors.textPrimary,
        lineHeight: 18,
    },
    instructorSmall: {
        fontSize: fontSizes.xs,
        color: colors.textSecondary,
        marginTop: 2,
    },
    ratingText: {
        fontSize: fontSizes.sm,
        fontWeight: '700',
        color: colors.rating,
        marginRight: 2,
    },
    studentsText: {
        fontSize: fontSizes.xs,
        color: colors.textSecondary,
        marginLeft: spacing.xs,
    },
    priceSmall: {
        fontSize: fontSizes.md,
        fontWeight: '700',
        color: colors.textPrimary,
    },
    originalPriceSmall: {
        fontSize: fontSizes.sm,
        color: colors.textMuted,
        textDecorationLine: 'line-through',
        marginLeft: spacing.sm,
    },

    // Vertical variant
    verticalContainer: {
        backgroundColor: colors.background,
        marginBottom: spacing.lg,
        ...shadows.light,
    },
    verticalThumbnail: {
        width: '100%',
        height: 180,
        backgroundColor: colors.backgroundGray,
    },
    badgePosition: {
        position: 'absolute',
        bottom: spacing.sm,
        left: spacing.sm,
    },
    verticalContent: {
        padding: spacing.md,
    },
    title: {
        fontSize: fontSizes.lg,
        fontWeight: '700',
        color: colors.textPrimary,
        lineHeight: 22,
    },
    instructor: {
        fontSize: fontSizes.sm,
        color: colors.textSecondary,
        marginTop: spacing.xs,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: spacing.xs,
    },
    reviewCount: {
        fontSize: fontSizes.xs,
        color: colors.textSecondary,
        marginLeft: spacing.xs,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: spacing.sm,
    },
    price: {
        fontSize: fontSizes.lg,
        fontWeight: '700',
        color: colors.textPrimary,
    },
    originalPrice: {
        fontSize: fontSizes.md,
        color: colors.textMuted,
        textDecorationLine: 'line-through',
        marginLeft: spacing.sm,
    },
    progressBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 4,
        backgroundColor: colors.border,
    },
    progressFill: {
        height: '100%',
        backgroundColor: colors.primary,
    },

    // Compact variant
    compactContainer: {
        flexDirection: 'row',
        backgroundColor: colors.background,
        paddingVertical: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLight,
    },
    compactThumbnail: {
        width: 60,
        height: 60,
        borderRadius: borderRadius.sm,
        backgroundColor: colors.backgroundGray,
    },
    compactContent: {
        flex: 1,
        marginLeft: spacing.md,
        justifyContent: 'center',
    },
    compactTitle: {
        fontSize: fontSizes.md,
        fontWeight: '600',
        color: colors.textPrimary,
        lineHeight: 18,
    },
    compactInstructor: {
        fontSize: fontSizes.xs,
        color: colors.textSecondary,
        marginTop: 2,
    },
});

export default CourseCard;

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
import { mockCourses } from '../../data/mockData';
import RatingStars from '../../components/common/RatingStars';

const WishlistScreen = ({ navigation }) => {
    const [wishlist, setWishlist] = useState(mockCourses.slice(3, 6));

    const handleCoursePress = (course) => {
        navigation.navigate('CourseDetail', { course });
    };

    const handleRemove = (courseId) => {
        setWishlist(wishlist.filter(c => c.id !== courseId));
    };

    const handleAddToCart = (course) => {
        // Add to cart logic
        handleRemove(course.id);
    };

    const formatPrice = (price) => '₹' + price.toLocaleString('en-IN');

    const renderCourseCard = ({ item }) => (
        <View style={styles.courseCard}>
            <TouchableOpacity
                style={styles.courseContent}
                onPress={() => handleCoursePress(item)}
                activeOpacity={0.8}
            >
                <Image source={{ uri: item.thumbnail }} style={styles.courseThumbnail} />

                <View style={styles.courseInfo}>
                    <Text style={styles.courseTitle} numberOfLines={2}>{item.title}</Text>
                    <Text style={styles.courseInstructor}>{item.instructor}</Text>

                    <View style={styles.ratingRow}>
                        <RatingStars rating={item.rating} size="small" showCount count={item.reviewsCount} />
                    </View>

                    <View style={styles.priceRow}>
                        <Text style={styles.price}>{formatPrice(item.price)}</Text>
                        {item.originalPrice > item.price && (
                            <Text style={styles.originalPrice}>{formatPrice(item.originalPrice)}</Text>
                        )}
                    </View>
                </View>
            </TouchableOpacity>

            {/* Actions */}
            <View style={styles.actions}>
                <TouchableOpacity
                    style={styles.addToCartButton}
                    onPress={() => handleAddToCart(item)}
                >
                    <Icon name="cart-plus" size={18} color={colors.textLight} />
                    <Text style={styles.addToCartText}>Add to cart</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemove(item.id)}
                >
                    <Icon name="delete-outline" size={20} color={colors.textSecondary} />
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
                <Icon name="heart-outline" size={60} color={colors.textMuted} />
            </View>
            <Text style={styles.emptyTitle}>Your wishlist is empty</Text>
            <Text style={styles.emptyText}>
                Save courses for later by clicking the heart icon on any course page.
            </Text>
            <TouchableOpacity
                style={styles.browseButton}
                onPress={() => navigation.navigate('Home')}
            >
                <Text style={styles.browseButtonText}>Explore courses</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Wishlist</Text>
                {wishlist.length > 0 && (
                    <Text style={styles.headerCount}>{wishlist.length} courses</Text>
                )}
            </View>

            {/* Wishlist */}
            {wishlist.length > 0 ? (
                <FlatList
                    data={wishlist}
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
        paddingTop: 50,
        paddingBottom: spacing.lg,
        paddingHorizontal: spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLight,
    },
    headerTitle: {
        fontSize: fontSizes.xxxl,
        fontWeight: '700',
        color: colors.textPrimary,
    },
    headerCount: {
        fontSize: fontSizes.md,
        color: colors.textSecondary,
        marginTop: spacing.xs,
    },
    listContent: {
        padding: spacing.lg,
    },
    courseCard: {
        backgroundColor: colors.background,
        marginBottom: spacing.lg,
        borderRadius: borderRadius.md,
        ...shadows.light,
        overflow: 'hidden',
    },
    courseContent: {
        flexDirection: 'row',
        padding: spacing.md,
    },
    courseThumbnail: {
        width: 100,
        height: 70,
        borderRadius: borderRadius.sm,
        backgroundColor: colors.backgroundGray,
    },
    courseInfo: {
        flex: 1,
        marginLeft: spacing.md,
    },
    courseTitle: {
        fontSize: fontSizes.md,
        fontWeight: '600',
        color: colors.textPrimary,
        lineHeight: 18,
    },
    courseInstructor: {
        fontSize: fontSizes.xs,
        color: colors.textSecondary,
        marginTop: 2,
    },
    ratingRow: {
        marginTop: spacing.xs,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: spacing.xs,
    },
    price: {
        fontSize: fontSizes.md,
        fontWeight: '700',
        color: colors.textPrimary,
    },
    originalPrice: {
        fontSize: fontSizes.sm,
        color: colors.textMuted,
        textDecorationLine: 'line-through',
        marginLeft: spacing.sm,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: colors.borderLight,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
    },
    addToCartButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.sm,
        marginRight: spacing.sm,
    },
    addToCartText: {
        color: colors.textLight,
        fontSize: fontSizes.sm,
        fontWeight: '600',
        marginLeft: spacing.xs,
    },
    removeButton: {
        padding: spacing.sm,
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

export default WishlistScreen;

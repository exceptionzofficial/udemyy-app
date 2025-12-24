import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, fontSizes, spacing } from '../../config/theme';

const RatingStars = ({
    rating = 0,
    size = 'medium', // small, medium, large
    showValue = true,
    showCount = false,
    count = 0,
    color = colors.rating,
}) => {
    const getIconSize = () => {
        switch (size) {
            case 'small': return 12;
            case 'large': return 20;
            default: return 16;
        }
    };

    const getFontSize = () => {
        switch (size) {
            case 'small': return fontSizes.xs;
            case 'large': return fontSizes.lg;
            default: return fontSizes.sm;
        }
    };

    const renderStars = () => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating - fullStars >= 0.5;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(
                    <Icon key={i} name="star" size={getIconSize()} color={color} />
                );
            } else if (i === fullStars && hasHalfStar) {
                stars.push(
                    <Icon key={i} name="star-half-full" size={getIconSize()} color={color} />
                );
            } else {
                stars.push(
                    <Icon key={i} name="star-outline" size={getIconSize()} color={color} />
                );
            }
        }
        return stars;
    };

    const formatCount = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    };

    return (
        <View style={styles.container}>
            {showValue && (
                <Text style={[styles.ratingValue, { fontSize: getFontSize(), color }]}>
                    {rating.toFixed(1)}
                </Text>
            )}
            <View style={styles.starsContainer}>{renderStars()}</View>
            {showCount && count > 0 && (
                <Text style={[styles.countText, { fontSize: getFontSize() }]}>
                    ({formatCount(count)})
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starsContainer: {
        flexDirection: 'row',
        marginHorizontal: spacing.xs,
    },
    ratingValue: {
        fontWeight: '700',
    },
    countText: {
        color: colors.textSecondary,
    },
});

export default RatingStars;

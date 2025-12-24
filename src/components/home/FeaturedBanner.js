import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, fontSizes, spacing, borderRadius } from '../../config/theme';
import Button from '../common/Button';

const { width } = Dimensions.get('window');

const FeaturedBanner = ({
    title,
    subtitle,
    buttonText,
    onButtonPress,
    backgroundImage,
    backgroundColor,
}) => {
    const content = (
        <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
            {buttonText && (
                <Button
                    title={buttonText}
                    onPress={onButtonPress}
                    variant="outline"
                    size="small"
                    style={styles.button}
                    textStyle={styles.buttonText}
                />
            )}
        </View>
    );

    if (backgroundImage) {
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={onButtonPress}
                activeOpacity={0.9}
            >
                <ImageBackground
                    source={{ uri: backgroundImage }}
                    style={styles.imageBackground}
                    imageStyle={styles.image}
                >
                    <LinearGradient
                        colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']}
                        style={styles.gradient}
                    >
                        {content}
                    </LinearGradient>
                </ImageBackground>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            style={[
                styles.container,
                { backgroundColor: backgroundColor || colors.primaryDark },
            ]}
            onPress={onButtonPress}
            activeOpacity={0.9}
        >
            <LinearGradient
                colors={[colors.primaryDark, colors.primary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradientBackground}
            >
                {content}
            </LinearGradient>
        </TouchableOpacity>
    );
};

const SaleBanner = ({ discount, endTime, onPress }) => {
    return (
        <TouchableOpacity style={styles.saleContainer} onPress={onPress} activeOpacity={0.9}>
            <LinearGradient
                colors={['#9B3EEA', '#5624D0']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.saleGradient}
            >
                <View style={styles.saleContent}>
                    <View>
                        <Text style={styles.saleTitle}>Sale ends today</Text>
                        <Text style={styles.saleSubtitle}>
                            Get courses for as low as ₹449
                        </Text>
                    </View>
                    <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>{discount}%</Text>
                        <Text style={styles.offText}>OFF</Text>
                    </View>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    // Featured Banner
    container: {
        marginHorizontal: spacing.lg,
        marginBottom: spacing.xl,
        borderRadius: borderRadius.lg,
        overflow: 'hidden',
    },
    imageBackground: {
        width: '100%',
        height: 160,
    },
    image: {
        borderRadius: borderRadius.lg,
    },
    gradient: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: spacing.lg,
    },
    gradientBackground: {
        padding: spacing.xl,
        minHeight: 140,
        justifyContent: 'center',
    },
    content: {
        maxWidth: width * 0.7,
    },
    title: {
        fontSize: fontSizes.xxl,
        fontWeight: '700',
        color: colors.textLight,
        marginBottom: spacing.xs,
    },
    subtitle: {
        fontSize: fontSizes.md,
        color: colors.textLight,
        opacity: 0.9,
        marginBottom: spacing.md,
    },
    button: {
        borderColor: colors.textLight,
        alignSelf: 'flex-start',
    },
    buttonText: {
        color: colors.textLight,
    },

    // Sale Banner
    saleContainer: {
        marginHorizontal: spacing.lg,
        marginBottom: spacing.xl,
        borderRadius: borderRadius.lg,
        overflow: 'hidden',
    },
    saleGradient: {
        padding: spacing.lg,
    },
    saleContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    saleTitle: {
        fontSize: fontSizes.xl,
        fontWeight: '700',
        color: colors.textLight,
    },
    saleSubtitle: {
        fontSize: fontSizes.sm,
        color: colors.textLight,
        opacity: 0.9,
        marginTop: spacing.xs,
    },
    discountBadge: {
        backgroundColor: colors.accent,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.sm,
        alignItems: 'center',
    },
    discountText: {
        fontSize: fontSizes.xxl,
        fontWeight: '700',
        color: colors.textLight,
    },
    offText: {
        fontSize: fontSizes.xs,
        fontWeight: '600',
        color: colors.textLight,
    },
});

export { FeaturedBanner, SaleBanner };
export default FeaturedBanner;

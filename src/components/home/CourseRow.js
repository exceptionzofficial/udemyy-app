import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { colors, fontSizes, spacing } from '../../config/theme';
import CourseCard from '../course/CourseCard';

const CourseRow = ({
    title,
    subtitle,
    courses,
    onCoursePress,
    onSeeAllPress,
    showSeeAll = true,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{title}</Text>
                    {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                </View>
                {showSeeAll && (
                    <Text style={styles.seeAll} onPress={onSeeAllPress}>See all</Text>
                )}
            </View>

            <FlatList
                data={courses}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <CourseCard
                        course={item}
                        onPress={() => onCoursePress(item)}
                        variant="horizontal"
                    />
                )}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.xxl,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: spacing.lg,
        marginBottom: spacing.md,
    },
    titleContainer: {
        flex: 1,
        marginRight: spacing.md,
    },
    title: {
        fontSize: fontSizes.xxl,
        fontWeight: '700',
        color: colors.textPrimary,
    },
    subtitle: {
        fontSize: fontSizes.sm,
        color: colors.textSecondary,
        marginTop: spacing.xs,
    },
    seeAll: {
        fontSize: fontSizes.md,
        color: colors.primary,
        fontWeight: '600',
    },
    listContent: {
        paddingHorizontal: spacing.lg,
    },
});

export default CourseRow;

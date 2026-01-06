import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    ScrollView,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, fontSizes, spacing, borderRadius, shadows } from '../../config/theme';
import { enableContentSecurity, disableContentSecurity } from '../../utils/security';

const { width, height } = Dimensions.get('window');

const PDFViewerScreen = ({ navigation, route }) => {
    const { content } = route.params || {};
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = content?.pages || 25;
    const [scale, setScale] = useState(1.0);

    // Enable content security on mount (prevent screenshots)
    useEffect(() => {
        enableContentSecurity();
        return () => {
            disableContentSecurity();
        };
    }, []);

    const handleZoomIn = () => {
        setScale(Math.min(scale + 0.25, 2.0));
    };

    const handleZoomOut = () => {
        setScale(Math.max(scale - 0.25, 0.5));
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={colors.primaryDark} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Icon name="arrow-left" size={24} color={colors.textLight} />
                </TouchableOpacity>

                <View style={styles.titleContainer}>
                    <Text style={styles.pdfTitle} numberOfLines={1}>
                        {content?.title || 'PDF Document'}
                    </Text>
                    <Text style={styles.pageInfo}>
                        Page {currentPage} of {totalPages}
                    </Text>
                </View>

                <View style={styles.securityBadge}>
                    <Icon name="shield-lock" size={16} color={colors.success} />
                </View>
            </View>

            {/* PDF Content Area */}
            <ScrollView
                style={styles.pdfContainer}
                contentContainerStyle={styles.pdfContent}
                showsVerticalScrollIndicator={false}
            >
                {/* PDF Page Placeholder */}
                <View style={[styles.pdfPage, { transform: [{ scale }] }]}>
                    {/* Page Header */}
                    <View style={styles.pageHeader}>
                        <Text style={styles.pageHeaderText}>{content?.title || 'Document Title'}</Text>
                        <Text style={styles.pageSubject}>{content?.subject || 'Subject'}</Text>
                    </View>

                    {/* Content Placeholder */}
                    <View style={styles.contentBlock}>
                        <Text style={styles.sectionTitle}>Chapter {currentPage}: Introduction</Text>
                        <View style={styles.textLine} />
                        <View style={styles.textLine} />
                        <View style={[styles.textLine, { width: '70%' }]} />
                    </View>

                    <View style={styles.contentBlock}>
                        <Text style={styles.sectionTitle}>Key Concepts</Text>
                        <View style={styles.textLine} />
                        <View style={styles.textLine} />
                        <View style={styles.textLine} />
                        <View style={[styles.textLine, { width: '85%' }]} />
                    </View>

                    {/* Diagram Placeholder */}
                    <View style={styles.diagramPlaceholder}>
                        <Icon name="chart-line" size={40} color={colors.textMuted} />
                        <Text style={styles.diagramText}>Figure {currentPage}.1</Text>
                    </View>

                    <View style={styles.contentBlock}>
                        <Text style={styles.sectionTitle}>Summary</Text>
                        <View style={styles.textLine} />
                        <View style={styles.textLine} />
                        <View style={[styles.textLine, { width: '60%' }]} />
                    </View>

                    {/* Page Number */}
                    <Text style={styles.pageNumber}>{currentPage}</Text>
                </View>
            </ScrollView>

            {/* Navigation Controls */}
            <View style={styles.navControls}>
                <TouchableOpacity
                    style={[styles.navBtn, currentPage === 1 && styles.navBtnDisabled]}
                    onPress={goToPrevPage}
                    disabled={currentPage === 1}
                >
                    <Icon name="chevron-left" size={28} color={currentPage === 1 ? colors.textMuted : colors.textPrimary} />
                </TouchableOpacity>

                <View style={styles.pageIndicator}>
                    <Text style={styles.pageIndicatorText}>{currentPage} / {totalPages}</Text>
                </View>

                <TouchableOpacity
                    style={[styles.navBtn, currentPage === totalPages && styles.navBtnDisabled]}
                    onPress={goToNextPage}
                    disabled={currentPage === totalPages}
                >
                    <Icon name="chevron-right" size={28} color={currentPage === totalPages ? colors.textMuted : colors.textPrimary} />
                </TouchableOpacity>
            </View>

            {/* Toolbar */}
            <View style={styles.toolbar}>
                <View style={styles.zoomControls}>
                    <TouchableOpacity onPress={handleZoomOut} style={styles.zoomBtn}>
                        <Icon name="minus" size={20} color={colors.textPrimary} />
                    </TouchableOpacity>

                    <Text style={styles.zoomText}>{Math.round(scale * 100)}%</Text>

                    <TouchableOpacity onPress={handleZoomIn} style={styles.zoomBtn}>
                        <Icon name="plus" size={20} color={colors.textPrimary} />
                    </TouchableOpacity>
                </View>

                {/* Security Notice */}
                <View style={styles.securityNotice}>
                    <Icon name="shield-check" size={14} color={colors.success} />
                    <Text style={styles.securityText}>View Only</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundGray,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: spacing.md,
        paddingHorizontal: spacing.lg,
        backgroundColor: colors.primaryDark,
    },
    backBtn: {
        padding: spacing.sm,
        marginLeft: -spacing.sm,
    },
    titleContainer: {
        flex: 1,
        marginHorizontal: spacing.md,
    },
    pdfTitle: {
        fontSize: fontSizes.lg,
        fontWeight: '600',
        color: colors.textLight,
    },
    pageInfo: {
        fontSize: fontSizes.xs,
        color: colors.textLight,
        opacity: 0.8,
        marginTop: 2,
    },
    securityBadge: {
        padding: spacing.sm,
    },
    pdfContainer: {
        flex: 1,
    },
    pdfContent: {
        padding: spacing.lg,
        alignItems: 'center',
    },
    pdfPage: {
        width: width - spacing.lg * 2,
        backgroundColor: colors.background,
        borderRadius: borderRadius.md,
        padding: spacing.xl,
        ...shadows.medium,
        minHeight: height * 0.65,
    },
    pageHeader: {
        borderBottomWidth: 2,
        borderBottomColor: colors.primary,
        paddingBottom: spacing.md,
        marginBottom: spacing.lg,
    },
    pageHeaderText: {
        fontSize: fontSizes.xl,
        fontWeight: '700',
        color: colors.textPrimary,
    },
    pageSubject: {
        fontSize: fontSizes.sm,
        color: colors.textSecondary,
        marginTop: 4,
    },
    contentBlock: {
        marginBottom: spacing.lg,
    },
    sectionTitle: {
        fontSize: fontSizes.md,
        fontWeight: '600',
        color: colors.textPrimary,
        marginBottom: spacing.sm,
    },
    textLine: {
        height: 12,
        backgroundColor: colors.backgroundGray,
        borderRadius: 2,
        marginBottom: spacing.xs,
        width: '100%',
    },
    diagramPlaceholder: {
        height: 120,
        backgroundColor: colors.backgroundGray,
        borderRadius: borderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: spacing.md,
    },
    diagramText: {
        fontSize: fontSizes.sm,
        color: colors.textMuted,
        marginTop: spacing.sm,
    },
    pageNumber: {
        position: 'absolute',
        bottom: spacing.md,
        right: spacing.md,
        fontSize: fontSizes.sm,
        color: colors.textMuted,
    },
    navControls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.md,
        gap: spacing.xl,
    },
    navBtn: {
        padding: spacing.md,
        backgroundColor: colors.background,
        borderRadius: borderRadius.round,
        ...shadows.light,
    },
    navBtnDisabled: {
        opacity: 0.5,
    },
    pageIndicator: {
        backgroundColor: colors.primaryLight,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
        borderRadius: borderRadius.sm,
    },
    pageIndicatorText: {
        fontSize: fontSizes.md,
        fontWeight: '600',
        color: colors.textLight,
    },
    toolbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: spacing.md,
        backgroundColor: colors.background,
        borderTopWidth: 1,
        borderTopColor: colors.borderLight,
        ...shadows.light,
    },
    zoomControls: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.backgroundGray,
        borderRadius: borderRadius.md,
        paddingVertical: spacing.xs,
        paddingHorizontal: spacing.sm,
    },
    zoomBtn: {
        padding: spacing.sm,
    },
    zoomText: {
        fontSize: fontSizes.sm,
        fontWeight: '600',
        color: colors.textPrimary,
        marginHorizontal: spacing.sm,
        minWidth: 40,
        textAlign: 'center',
    },
    securityNotice: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    securityText: {
        fontSize: fontSizes.xs,
        color: colors.success,
        fontWeight: '500',
    },
});

export default PDFViewerScreen;

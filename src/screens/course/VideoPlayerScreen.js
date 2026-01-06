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
    useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, fontSizes, spacing, borderRadius, shadows } from '../../config/theme';
import { enableContentSecurity, disableContentSecurity } from '../../utils/security';

const VideoPlayerScreen = ({ navigation, route }) => {
    const { content } = route.params || {};
    const { width: screenWidth, height: screenHeight } = useWindowDimensions();

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration] = useState(2700); // 45 minutes in seconds (mock)
    const [showControls, setShowControls] = useState(true);
    const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
    const [showSpeedMenu, setShowSpeedMenu] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [activeTab, setActiveTab] = useState('description');

    // Enable content security on mount
    useEffect(() => {
        enableContentSecurity();
        return () => {
            disableContentSecurity();
        };
    }, []);

    // Simulate video progress
    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setCurrentTime(prev => {
                    if (prev >= duration) {
                        setIsPlaying(false);
                        return prev;
                    }
                    return prev + playbackSpeed;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, playbackSpeed, duration]);

    // Auto-hide controls
    useEffect(() => {
        let timeout;
        if (showControls && isPlaying) {
            timeout = setTimeout(() => setShowControls(false), 3000);
        }
        return () => clearTimeout(timeout);
    }, [showControls, isPlaying]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const skipForward = () => {
        setCurrentTime(prev => Math.min(prev + 10, duration));
    };

    const skipBackward = () => {
        setCurrentTime(prev => Math.max(prev - 10, 0));
    };

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
    };

    const progress = (currentTime / duration) * 100;
    const speedOptions = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];

    // Mock notes for the video
    const videoNotes = [
        { time: '0:00', note: 'Introduction to the topic' },
        { time: '2:30', note: 'Key concept 1 explained' },
        { time: '8:45', note: 'Important formula derivation' },
        { time: '15:20', note: 'Example problem solving' },
        { time: '25:00', note: 'Practice questions discussed' },
        { time: '35:40', note: 'Summary and key points' },
    ];

    const videoHeight = isFullscreen ? screenHeight : screenWidth * 0.56;

    const renderVideoPlayer = () => (
        <TouchableOpacity
            style={[styles.videoContainer, { height: videoHeight }]}
            activeOpacity={1}
            onPress={() => setShowControls(!showControls)}
        >
            {/* Video Placeholder with Thumbnail */}
            <Image
                source={{ uri: content?.thumbnail || 'https://picsum.photos/800/450' }}
                style={styles.videoPlaceholder}
                resizeMode="cover"
            />

            {/* Play indicator when paused */}
            {!isPlaying && showControls && (
                <View style={styles.playOverlay}>
                    <TouchableOpacity
                        style={styles.bigPlayBtn}
                        onPress={() => setIsPlaying(true)}
                    >
                        <Icon name="play" size={50} color={colors.textLight} />
                    </TouchableOpacity>
                </View>
            )}

            {/* Controls Overlay */}
            {showControls && (
                <View style={styles.controlsOverlay}>
                    {/* Top Bar */}
                    <View style={styles.topBar}>
                        <TouchableOpacity
                            onPress={() => {
                                if (isFullscreen) {
                                    setIsFullscreen(false);
                                } else {
                                    navigation.goBack();
                                }
                            }}
                            style={styles.backBtn}
                        >
                            <Icon name={isFullscreen ? "close" : "arrow-left"} size={24} color={colors.textLight} />
                        </TouchableOpacity>

                        {isFullscreen && (
                            <View style={styles.titleContainer}>
                                <Text style={styles.videoTitle} numberOfLines={1}>
                                    {content?.title || 'Video Lecture'}
                                </Text>
                            </View>
                        )}

                        <View style={styles.topRightControls}>
                            <TouchableOpacity
                                style={styles.speedBtn}
                                onPress={() => setShowSpeedMenu(!showSpeedMenu)}
                            >
                                <Text style={styles.speedText}>{playbackSpeed}x</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.fullscreenBtn}
                                onPress={toggleFullscreen}
                            >
                                <Icon
                                    name={isFullscreen ? 'fullscreen-exit' : 'fullscreen'}
                                    size={24}
                                    color={colors.textLight}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Speed Menu */}
                    {showSpeedMenu && (
                        <View style={styles.speedMenu}>
                            {speedOptions.map((speed) => (
                                <TouchableOpacity
                                    key={speed}
                                    style={[
                                        styles.speedOption,
                                        playbackSpeed === speed && styles.speedOptionActive,
                                    ]}
                                    onPress={() => {
                                        setPlaybackSpeed(speed);
                                        setShowSpeedMenu(false);
                                    }}
                                >
                                    <Text style={[
                                        styles.speedOptionText,
                                        playbackSpeed === speed && styles.speedOptionTextActive,
                                    ]}>
                                        {speed}x
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    {/* Center Controls */}
                    <View style={styles.centerControls}>
                        <TouchableOpacity onPress={skipBackward} style={styles.skipBtn}>
                            <Icon name="rewind-10" size={36} color={colors.textLight} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setIsPlaying(!isPlaying)}
                            style={styles.playBtn}
                        >
                            <Icon
                                name={isPlaying ? 'pause' : 'play'}
                                size={40}
                                color={colors.textLight}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={skipForward} style={styles.skipBtn}>
                            <Icon name="fast-forward-10" size={36} color={colors.textLight} />
                        </TouchableOpacity>
                    </View>

                    {/* Bottom Bar */}
                    <View style={styles.bottomBar}>
                        <Text style={styles.timeText}>{formatTime(currentTime)}</Text>

                        {/* Progress Bar */}
                        <View style={styles.progressContainer}>
                            <View style={styles.progressTrack}>
                                <View style={[styles.progressFill, { width: `${progress}%` }]} />
                                <View style={[styles.progressThumb, { left: `${progress}%` }]} />
                            </View>
                        </View>

                        <Text style={styles.timeText}>{formatTime(duration)}</Text>
                    </View>

                    {/* Security Notice */}
                    <View style={styles.securityNotice}>
                        <Icon name="shield-check" size={14} color={colors.success} />
                        <Text style={styles.securityText}>Protected</Text>
                    </View>
                </View>
            )}
        </TouchableOpacity>
    );

    // If fullscreen, only show video player
    if (isFullscreen) {
        return (
            <View style={styles.fullscreenContainer}>
                <StatusBar hidden />
                {renderVideoPlayer()}
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000" />

            {/* Video Player */}
            {renderVideoPlayer()}

            {/* Tabs */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'description' && styles.tabActive]}
                    onPress={() => setActiveTab('description')}
                >
                    <Icon name="information-outline" size={18} color={activeTab === 'description' ? colors.primary : colors.textSecondary} />
                    <Text style={[styles.tabText, activeTab === 'description' && styles.tabTextActive]}>Description</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tab, activeTab === 'notes' && styles.tabActive]}
                    onPress={() => setActiveTab('notes')}
                >
                    <Icon name="notebook-outline" size={18} color={activeTab === 'notes' ? colors.primary : colors.textSecondary} />
                    <Text style={[styles.tabText, activeTab === 'notes' && styles.tabTextActive]}>Notes</Text>
                </TouchableOpacity>
            </View>

            {/* Content Section */}
            <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}>
                {activeTab === 'description' ? (
                    <View style={styles.descriptionSection}>
                        {/* Title & Meta */}
                        <Text style={styles.contentTitle}>{content?.title || 'Video Lecture'}</Text>

                        <View style={styles.metaRow}>
                            <View style={styles.metaItem}>
                                <Icon name="clock-outline" size={16} color={colors.textSecondary} />
                                <Text style={styles.metaText}>{content?.duration || '45 min'}</Text>
                            </View>
                            <View style={styles.metaItem}>
                                <Icon name="star" size={16} color={colors.secondary} />
                                <Text style={styles.metaText}>{content?.rating || 4.8}</Text>
                            </View>
                            <View style={styles.metaItem}>
                                <Icon name="school-outline" size={16} color={colors.textSecondary} />
                                <Text style={styles.metaText}>{content?.board === 'state' ? 'State Board' : 'CBSE'}</Text>
                            </View>
                        </View>

                        {/* Subject Badge */}
                        <View style={styles.subjectBadge}>
                            <Text style={styles.subjectBadgeText}>{content?.subject || 'Physics'}</Text>
                        </View>

                        {/* Description */}
                        <View style={styles.descriptionBlock}>
                            <Text style={styles.sectionTitle}>About this lecture</Text>
                            <Text style={styles.descriptionText}>
                                This comprehensive lecture covers all the essential concepts you need to understand for your exams.
                                The video includes detailed explanations with real-world examples, step-by-step problem solving,
                                and practice questions to test your understanding.
                            </Text>
                            <Text style={styles.descriptionText}>
                                Topics covered: Basic concepts, formulas derivation, numerical problems, and exam tips.
                                Watch this video multiple times for better understanding and take notes in the Notes section.
                            </Text>
                        </View>

                        {/* What you'll learn */}
                        <View style={styles.learnBlock}>
                            <Text style={styles.sectionTitle}>What you'll learn</Text>
                            {[
                                'Understand core concepts and principles',
                                'Solve numerical problems step by step',
                                'Apply formulas in different scenarios',
                                'Prepare effectively for exams'
                            ].map((item, index) => (
                                <View key={index} style={styles.learnItem}>
                                    <Icon name="check-circle" size={18} color={colors.success} />
                                    <Text style={styles.learnText}>{item}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                ) : (
                    <View style={styles.notesSection}>
                        <Text style={styles.sectionTitle}>Video Notes</Text>
                        <Text style={styles.notesSubtitle}>Quick reference points from this lecture</Text>

                        {videoNotes.map((note, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.noteItem}
                                onPress={() => {
                                    // Could seek to this time
                                }}
                            >
                                <View style={styles.noteTime}>
                                    <Icon name="play-circle" size={16} color={colors.primary} />
                                    <Text style={styles.noteTimeText}>{note.time}</Text>
                                </View>
                                <Text style={styles.noteText}>{note.note}</Text>
                            </TouchableOpacity>
                        ))}

                        <View style={styles.noteTip}>
                            <Icon name="lightbulb-outline" size={20} color={colors.secondary} />
                            <Text style={styles.noteTipText}>
                                Tip: Pause the video and take your own notes for better retention!
                            </Text>
                        </View>
                    </View>
                )}

                <View style={styles.bottomPadding} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundGray,
    },
    fullscreenContainer: {
        flex: 1,
        backgroundColor: '#000',
    },
    videoContainer: {
        width: '100%',
        backgroundColor: '#000',
    },
    videoPlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: '#1a1a1a',
    },
    playOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    bigPlayBtn: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    controlsOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'space-between',
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingHorizontal: spacing.md,
    },
    backBtn: {
        padding: spacing.sm,
    },
    titleContainer: {
        flex: 1,
        marginHorizontal: spacing.md,
    },
    videoTitle: {
        fontSize: fontSizes.md,
        fontWeight: '600',
        color: colors.textLight,
    },
    topRightControls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    speedBtn: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.sm,
    },
    speedText: {
        fontSize: fontSizes.sm,
        fontWeight: '600',
        color: colors.textLight,
    },
    fullscreenBtn: {
        padding: spacing.sm,
    },
    speedMenu: {
        position: 'absolute',
        top: 50,
        right: spacing.lg,
        backgroundColor: 'rgba(0,0,0,0.9)',
        borderRadius: borderRadius.md,
        padding: spacing.sm,
    },
    speedOption: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
    },
    speedOptionActive: {
        backgroundColor: colors.primary,
        borderRadius: borderRadius.sm,
    },
    speedOptionText: {
        fontSize: fontSizes.md,
        color: colors.textLight,
    },
    speedOptionTextActive: {
        fontWeight: '600',
    },
    centerControls: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
    },
    skipBtn: {
        padding: spacing.sm,
    },
    playBtn: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingBottom: spacing.sm,
    },
    timeText: {
        fontSize: fontSizes.xs,
        color: colors.textLight,
        width: 40,
        textAlign: 'center',
    },
    progressContainer: {
        flex: 1,
        height: 20,
        justifyContent: 'center',
        marginHorizontal: spacing.xs,
    },
    progressTrack: {
        height: 3,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 2,
        position: 'relative',
    },
    progressFill: {
        height: '100%',
        backgroundColor: colors.primary,
        borderRadius: 2,
    },
    progressThumb: {
        position: 'absolute',
        top: -5,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: colors.primary,
        marginLeft: -6,
    },
    securityNotice: {
        position: 'absolute',
        bottom: 30,
        right: spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    securityText: {
        fontSize: 10,
        color: colors.success,
    },

    // Tabs
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: colors.background,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLight,
    },
    tab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.md,
        gap: spacing.xs,
    },
    tabActive: {
        borderBottomWidth: 2,
        borderBottomColor: colors.primary,
    },
    tabText: {
        fontSize: fontSizes.sm,
        color: colors.textSecondary,
        fontWeight: '500',
    },
    tabTextActive: {
        color: colors.primary,
        fontWeight: '600',
    },

    // Content
    contentScroll: {
        flex: 1,
    },

    // Description Section
    descriptionSection: {
        padding: spacing.lg,
    },
    contentTitle: {
        fontSize: fontSizes.xl,
        fontWeight: '700',
        color: colors.textPrimary,
        lineHeight: 28,
    },
    metaRow: {
        flexDirection: 'row',
        marginTop: spacing.md,
        gap: spacing.lg,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    metaText: {
        fontSize: fontSizes.sm,
        color: colors.textSecondary,
    },
    subjectBadge: {
        alignSelf: 'flex-start',
        backgroundColor: colors.primary + '20',
        paddingVertical: spacing.xs,
        paddingHorizontal: spacing.md,
        borderRadius: borderRadius.sm,
        marginTop: spacing.md,
    },
    subjectBadgeText: {
        fontSize: fontSizes.sm,
        color: colors.primary,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    descriptionBlock: {
        marginTop: spacing.xl,
    },
    sectionTitle: {
        fontSize: fontSizes.lg,
        fontWeight: '700',
        color: colors.textPrimary,
        marginBottom: spacing.md,
    },
    descriptionText: {
        fontSize: fontSizes.md,
        color: colors.textSecondary,
        lineHeight: 22,
        marginBottom: spacing.md,
    },
    learnBlock: {
        marginTop: spacing.lg,
        backgroundColor: colors.background,
        padding: spacing.lg,
        borderRadius: borderRadius.lg,
        ...shadows.light,
    },
    learnItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.sm,
        gap: spacing.sm,
    },
    learnText: {
        fontSize: fontSizes.sm,
        color: colors.textPrimary,
        flex: 1,
    },

    // Notes Section
    notesSection: {
        padding: spacing.lg,
    },
    notesSubtitle: {
        fontSize: fontSizes.sm,
        color: colors.textSecondary,
        marginBottom: spacing.lg,
    },
    noteItem: {
        backgroundColor: colors.background,
        padding: spacing.md,
        borderRadius: borderRadius.md,
        marginBottom: spacing.sm,
        ...shadows.light,
    },
    noteTime: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        marginBottom: spacing.xs,
    },
    noteTimeText: {
        fontSize: fontSizes.sm,
        color: colors.primary,
        fontWeight: '600',
    },
    noteText: {
        fontSize: fontSizes.md,
        color: colors.textPrimary,
    },
    noteTip: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: colors.secondary + '15',
        padding: spacing.md,
        borderRadius: borderRadius.md,
        marginTop: spacing.md,
        gap: spacing.sm,
    },
    noteTipText: {
        fontSize: fontSizes.sm,
        color: colors.textSecondary,
        flex: 1,
        lineHeight: 20,
    },

    bottomPadding: {
        height: 50,
    },
});

export default VideoPlayerScreen;

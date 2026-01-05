import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    FlatList,
    ScrollView,
    NativeModules,
    Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, fontSizes, spacing, borderRadius } from '../../config/theme';

const { width, height } = Dimensions.get('window');

const VideoPlayerScreen = ({ navigation, route }) => {
    const { course, lecture, content } = route.params || {};
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
    const [currentLecture, setCurrentLecture] = useState(
        lecture || course?.sections?.[0]?.lectures?.[0]
    );

    // Enable content security (prevent screenshots/screen recording)
    useEffect(() => {
        if (Platform.OS === 'android' && NativeModules.ContentSecurityModule) {
            NativeModules.ContentSecurityModule.enableSecureMode();
        }
        return () => {
            if (Platform.OS === 'android' && NativeModules.ContentSecurityModule) {
                NativeModules.ContentSecurityModule.disableSecureMode();
            }
        };
    }, []);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const allLectures = course?.sections?.flatMap(s =>
        s.lectures.map(l => ({ ...l, sectionTitle: s.title }))
    ) || [];

    const currentIndex = allLectures.findIndex(l => l.id === currentLecture?.id);

    const handleNextLecture = () => {
        if (currentIndex < allLectures.length - 1) {
            setCurrentLecture(allLectures[currentIndex + 1]);
        }
    };

    const handlePrevLecture = () => {
        if (currentIndex > 0) {
            setCurrentLecture(allLectures[currentIndex - 1]);
        }
    };

    const renderSpeedOption = (speed) => (
        <TouchableOpacity
            key={speed}
            style={[styles.speedOption, playbackSpeed === speed && styles.speedOptionActive]}
            onPress={() => setPlaybackSpeed(speed)}
        >
            <Text style={[styles.speedText, playbackSpeed === speed && styles.speedTextActive]}>
                {speed}x
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar hidden={isFullscreen} barStyle="light-content" />

            {/* Video Player */}
            <View style={[styles.videoContainer, isFullscreen && styles.videoFullscreen]}>
                {/* Video placeholder - would use react-native-video here */}
                <View style={styles.videoPlaceholder}>
                    <Icon name="play-circle" size={80} color="rgba(255,255,255,0.8)" />
                    <Text style={styles.videoPlaceholderText}>Video Player</Text>
                </View>

                {/* Controls Overlay */}
                {showControls && (
                    <View style={styles.controlsOverlay}>
                        {/* Top Bar */}
                        <View style={styles.topBar}>
                            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
                                <Icon name="chevron-down" size={28} color={colors.textLight} />
                            </TouchableOpacity>
                            <View style={styles.topBarRight}>
                                <TouchableOpacity style={styles.topBarButton}>
                                    <Icon name="cog" size={22} color={colors.textLight} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.topBarButton}
                                    onPress={() => setIsFullscreen(!isFullscreen)}
                                >
                                    <Icon
                                        name={isFullscreen ? 'fullscreen-exit' : 'fullscreen'}
                                        size={22}
                                        color={colors.textLight}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Center Controls */}
                        <View style={styles.centerControls}>
                            <TouchableOpacity onPress={handlePrevLecture} disabled={currentIndex === 0}>
                                <Icon
                                    name="skip-previous"
                                    size={36}
                                    color={currentIndex === 0 ? 'rgba(255,255,255,0.3)' : colors.textLight}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setCurrentTime(Math.max(0, currentTime - 10))}>
                                <Icon name="rewind-10" size={36} color={colors.textLight} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.playPauseButton}
                                onPress={() => setIsPlaying(!isPlaying)}
                            >
                                <Icon
                                    name={isPlaying ? 'pause' : 'play'}
                                    size={40}
                                    color={colors.textLight}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setCurrentTime(currentTime + 10)}>
                                <Icon name="fast-forward-10" size={36} color={colors.textLight} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleNextLecture}
                                disabled={currentIndex === allLectures.length - 1}
                            >
                                <Icon
                                    name="skip-next"
                                    size={36}
                                    color={currentIndex === allLectures.length - 1 ? 'rgba(255,255,255,0.3)' : colors.textLight}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Bottom Bar */}
                        <View style={styles.bottomBar}>
                            {/* Progress Bar */}
                            <View style={styles.progressContainer}>
                                <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                                <View style={styles.progressBar}>
                                    <View style={[styles.progressFill, { width: '35%' }]} />
                                    <View style={styles.progressThumb} />
                                </View>
                                <Text style={styles.timeText}>{formatTime(duration || 1234)}</Text>
                            </View>

                            {/* Speed Options */}
                            <View style={styles.speedContainer}>
                                {[0.5, 0.75, 1.0, 1.25, 1.5, 2.0].map(renderSpeedOption)}
                            </View>
                        </View>
                    </View>
                )}
            </View>

            {/* Lecture Info */}
            {!isFullscreen && (
                <ScrollView style={styles.content}>
                    <View style={styles.lectureHeader}>
                        <Text style={styles.lectureTitle}>{currentLecture?.title}</Text>
                        <Text style={styles.sectionTitle}>{currentLecture?.sectionTitle || course?.sections?.[0]?.title}</Text>
                    </View>

                    {/* Course Progress */}
                    <View style={styles.progressSection}>
                        <View style={styles.progressInfo}>
                            <Text style={styles.progressLabel}>Course Progress</Text>
                            <Text style={styles.progressPercent}>35%</Text>
                        </View>
                        <View style={styles.courseProgressBar}>
                            <View style={[styles.courseProgressFill, { width: '35%' }]} />
                        </View>
                        <Text style={styles.progressDetail}>
                            Lecture {currentIndex + 1} of {allLectures.length}
                        </Text>
                    </View>

                    {/* Lecture List */}
                    <View style={styles.lectureList}>
                        <Text style={styles.listTitle}>Course Content</Text>
                        {allLectures.map((item, index) => (
                            <TouchableOpacity
                                key={item.id}
                                style={[
                                    styles.lectureItem,
                                    item.id === currentLecture?.id && styles.lectureItemActive,
                                ]}
                                onPress={() => setCurrentLecture(item)}
                            >
                                <View style={styles.lectureIcon}>
                                    {index < currentIndex ? (
                                        <Icon name="check-circle" size={20} color={colors.success} />
                                    ) : item.id === currentLecture?.id ? (
                                        <Icon name="play-circle" size={20} color={colors.primary} />
                                    ) : (
                                        <Text style={styles.lectureNumber}>{index + 1}</Text>
                                    )}
                                </View>
                                <View style={styles.lectureInfo}>
                                    <Text
                                        style={[
                                            styles.lectureItemTitle,
                                            item.id === currentLecture?.id && styles.lectureItemTitleActive,
                                        ]}
                                        numberOfLines={2}
                                    >
                                        {item.title}
                                    </Text>
                                    <Text style={styles.lectureDuration}>{item.duration}</Text>
                                </View>
                                {item.type === 'pdf' && (
                                    <Icon name="file-document-outline" size={18} color={colors.textSecondary} />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={styles.bottomPadding} />
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundDark,
    },
    videoContainer: {
        width: '100%',
        height: width * 0.5625, // 16:9 aspect ratio
        backgroundColor: '#000',
        position: 'relative',
    },
    videoFullscreen: {
        height: height,
        width: width,
    },
    videoPlaceholder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1a1a1a',
    },
    videoPlaceholderText: {
        color: colors.textLight,
        fontSize: fontSizes.md,
        marginTop: spacing.md,
    },
    controlsOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'space-between',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingTop: spacing.lg,
    },
    closeButton: {
        padding: spacing.sm,
    },
    topBarRight: {
        flexDirection: 'row',
    },
    topBarButton: {
        padding: spacing.sm,
        marginLeft: spacing.sm,
    },
    centerControls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    playPauseButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: spacing.xl,
    },
    bottomBar: {
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.md,
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    timeText: {
        color: colors.textLight,
        fontSize: fontSizes.xs,
        width: 40,
        textAlign: 'center',
    },
    progressBar: {
        flex: 1,
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 2,
        marginHorizontal: spacing.sm,
        position: 'relative',
    },
    progressFill: {
        height: '100%',
        backgroundColor: colors.primary,
        borderRadius: 2,
    },
    progressThumb: {
        position: 'absolute',
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: colors.primary,
        top: -4,
        left: '35%',
        marginLeft: -6,
    },
    speedContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    speedOption: {
        paddingHorizontal: spacing.sm,
        paddingVertical: 4,
        marginHorizontal: 2,
        borderRadius: borderRadius.sm,
    },
    speedOptionActive: {
        backgroundColor: colors.primary,
    },
    speedText: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: fontSizes.xs,
    },
    speedTextActive: {
        color: colors.textLight,
        fontWeight: '600',
    },
    content: {
        flex: 1,
        backgroundColor: colors.background,
    },
    lectureHeader: {
        padding: spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLight,
    },
    lectureTitle: {
        fontSize: fontSizes.xl,
        fontWeight: '700',
        color: colors.textPrimary,
    },
    sectionTitle: {
        fontSize: fontSizes.sm,
        color: colors.textSecondary,
        marginTop: spacing.xs,
    },
    progressSection: {
        padding: spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLight,
    },
    progressInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.sm,
    },
    progressLabel: {
        fontSize: fontSizes.md,
        color: colors.textSecondary,
    },
    progressPercent: {
        fontSize: fontSizes.md,
        fontWeight: '600',
        color: colors.primary,
    },
    courseProgressBar: {
        height: 6,
        backgroundColor: colors.borderLight,
        borderRadius: 3,
    },
    courseProgressFill: {
        height: '100%',
        backgroundColor: colors.primary,
        borderRadius: 3,
    },
    progressDetail: {
        fontSize: fontSizes.sm,
        color: colors.textSecondary,
        marginTop: spacing.sm,
    },
    lectureList: {
        padding: spacing.lg,
    },
    listTitle: {
        fontSize: fontSizes.lg,
        fontWeight: '700',
        color: colors.textPrimary,
        marginBottom: spacing.md,
    },
    lectureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLight,
    },
    lectureItemActive: {
        backgroundColor: colors.backgroundGray,
        marginHorizontal: -spacing.lg,
        paddingHorizontal: spacing.lg,
    },
    lectureIcon: {
        width: 30,
        alignItems: 'center',
    },
    lectureNumber: {
        fontSize: fontSizes.md,
        color: colors.textSecondary,
    },
    lectureInfo: {
        flex: 1,
        marginLeft: spacing.md,
    },
    lectureItemTitle: {
        fontSize: fontSizes.md,
        color: colors.textPrimary,
    },
    lectureItemTitleActive: {
        color: colors.primary,
        fontWeight: '600',
    },
    lectureDuration: {
        fontSize: fontSizes.xs,
        color: colors.textSecondary,
        marginTop: 2,
    },
    bottomPadding: {
        height: 50,
    },
});

export default VideoPlayerScreen;

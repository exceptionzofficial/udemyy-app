import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../config/theme';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

// Main Screens
import HomeScreen from '../screens/main/HomeScreen';
import SearchScreen from '../screens/main/SearchScreen';
import MyLearningScreen from '../screens/main/MyLearningScreen';
import WishlistScreen from '../screens/main/WishlistScreen';
import AccountScreen from '../screens/main/AccountScreen';

// Course Screens
import CourseDetailScreen from '../screens/course/CourseDetailScreen';
import VideoPlayerScreen from '../screens/course/VideoPlayerScreen';

// Subscription Screens
import SubscriptionScreen from '../screens/subscription/SubscriptionScreen';
import PaymentScreen from '../screens/subscription/PaymentScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator with Safe Area Support
const MainTabs = () => {
    const insets = useSafeAreaInsets();

    // Calculate bottom padding for 3-button navigation
    // Minimum padding of 8, or use safe area bottom inset if larger
    const bottomPadding = Platform.OS === 'android'
        ? Math.max(8, insets.bottom)
        : insets.bottom;

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    switch (route.name) {
                        case 'Featured':
                            iconName = focused ? 'star' : 'star-outline';
                            break;
                        case 'Search':
                            iconName = 'magnify';
                            break;
                        case 'MyLearning':
                            iconName = focused ? 'play-box' : 'play-box-outline';
                            break;
                        case 'Wishlist':
                            iconName = focused ? 'heart' : 'heart-outline';
                            break;
                        case 'Account':
                            iconName = focused ? 'account' : 'account-outline';
                            break;
                        default:
                            iconName = 'circle';
                    }

                    return <Icon name={iconName} size={24} color={color} />;
                },
                tabBarActiveTintColor: colors.textPrimary,
                tabBarInactiveTintColor: colors.textSecondary,
                tabBarStyle: {
                    backgroundColor: colors.background,
                    borderTopWidth: 1,
                    borderTopColor: colors.borderLight,
                    paddingTop: 8,
                    paddingBottom: bottomPadding + 4,
                    height: 60 + bottomPadding,
                    // Ensure tab bar is above Android navigation
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    elevation: 8,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: '500',
                    marginTop: 2,
                },
                // Add padding at the bottom of screen content to not be hidden by tab bar
                tabBarHideOnKeyboard: true,
            })}
        >
            <Tab.Screen
                name="Featured"
                component={HomeScreen}
                options={{ tabBarLabel: 'Featured' }}
            />
            <Tab.Screen
                name="Search"
                component={SearchScreen}
                options={{ tabBarLabel: 'Search' }}
            />
            <Tab.Screen
                name="MyLearning"
                component={MyLearningScreen}
                options={{ tabBarLabel: 'My Learning' }}
            />
            <Tab.Screen
                name="Wishlist"
                component={WishlistScreen}
                options={{ tabBarLabel: 'Wishlist' }}
            />
            <Tab.Screen
                name="Account"
                component={AccountScreen}
                options={{ tabBarLabel: 'Account' }}
            />
        </Tab.Navigator>
    );
};

// Main Navigation
const Navigation = () => {
    // You can add auth state logic here
    const isLoggedIn = true; // For demo, set to true to skip login

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    animation: 'slide_from_right',
                }}
            >
                {!isLoggedIn ? (
                    // Auth Stack
                    <>
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Signup" component={SignupScreen} />
                        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                    </>
                ) : (
                    // Main App Stack
                    <>
                        <Stack.Screen name="MainTabs" component={MainTabs} />
                        <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
                        <Stack.Screen
                            name="VideoPlayer"
                            component={VideoPlayerScreen}
                            options={{ animation: 'slide_from_bottom' }}
                        />
                        <Stack.Screen name="Subscription" component={SubscriptionScreen} />
                        <Stack.Screen name="Payment" component={PaymentScreen} />

                        {/* Auth screens accessible from main app */}
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Signup" component={SignupScreen} />
                        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;

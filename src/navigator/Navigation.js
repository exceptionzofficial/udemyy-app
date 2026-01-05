import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../config/theme';

// Splash Screen
import SplashScreen from '../screens/SplashScreen';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

// Main Screens
import HomeScreen from '../screens/main/HomeScreen';
import SearchScreen from '../screens/main/SearchScreen';
import MyLearningScreen from '../screens/main/MyLearningScreen';
import AccountScreen from '../screens/main/AccountScreen';

// Course Screens
import CourseDetailScreen from '../screens/course/CourseDetailScreen';
import VideoPlayerScreen from '../screens/course/VideoPlayerScreen';

// Subscription Screens
import SubscriptionScreen from '../screens/subscription/SubscriptionScreen';
import PaymentScreen from '../screens/subscription/PaymentScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator for Genii Books
const MainTabs = () => {
    const insets = useSafeAreaInsets();

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
                        case 'Home':
                            iconName = focused ? 'home' : 'home-outline';
                            break;
                        case 'Search':
                            iconName = 'magnify';
                            break;
                        case 'MyLearning':
                            iconName = focused ? 'book-open-page-variant' : 'book-open-page-variant-outline';
                            break;
                        case 'Account':
                            iconName = focused ? 'account-circle' : 'account-circle-outline';
                            break;
                        default:
                            iconName = 'circle';
                    }

                    return <Icon name={iconName} size={26} color={color} />;
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textSecondary,
                tabBarStyle: {
                    backgroundColor: colors.background,
                    borderTopWidth: 1,
                    borderTopColor: colors.borderLight,
                    paddingTop: 8,
                    paddingBottom: bottomPadding + 4,
                    height: 60 + bottomPadding,
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
                    fontSize: 11,
                    fontWeight: '500',
                    marginTop: 2,
                },
                tabBarHideOnKeyboard: true,
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{ tabBarLabel: 'Home' }}
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
                name="Account"
                component={AccountScreen}
                options={{ tabBarLabel: 'Account' }}
            />
        </Tab.Navigator>
    );
};

// Main Navigation
const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Splash"
                screenOptions={{
                    headerShown: false,
                    animation: 'slide_from_right',
                }}
            >
                {/* Splash Screen */}
                <Stack.Screen
                    name="Splash"
                    component={SplashScreen}
                    options={{ animation: 'fade' }}
                />

                {/* Auth Stack */}
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />

                {/* Main App Stack */}
                <Stack.Screen name="MainTabs" component={MainTabs} />
                <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
                <Stack.Screen
                    name="VideoPlayer"
                    component={VideoPlayerScreen}
                    options={{ animation: 'slide_from_bottom' }}
                />
                <Stack.Screen name="Subscription" component={SubscriptionScreen} />
                <Stack.Screen name="Payment" component={PaymentScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;

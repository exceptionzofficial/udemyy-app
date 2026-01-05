/**
 * RevenueCat Service for Genii Books
 * Handles subscription management with Google Play via RevenueCat
 * 
 * SETUP REQUIRED:
 * 1. Create account at https://www.revenuecat.com
 * 2. Create a project and get your API key
 * 3. Add your Google Play credentials in RevenueCat dashboard
 * 4. Create products in Google Play Console
 * 5. Add products to RevenueCat offerings
 */

import Purchases from 'react-native-purchases';
import { Platform } from 'react-native';

// RevenueCat API Keys (Replace with your actual keys)
const REVENUECAT_API_KEY_ANDROID = 'YOUR_REVENUECAT_ANDROID_API_KEY';
const REVENUECAT_API_KEY_IOS = 'YOUR_REVENUECAT_IOS_API_KEY'; // For future iOS support

// Product identifiers (should match Google Play Console products)
export const PRODUCT_IDS = {
    CLASS_10_ANNUAL: 'class_10_annual',
    CLASS_11_ANNUAL: 'class_11_annual',
    CLASS_12_ANNUAL: 'class_12_annual',
    NEET_ANNUAL: 'neet_annual',
};

// Initialize RevenueCat
export const initRevenueCat = async (userId = null) => {
    try {
        const apiKey = Platform.OS === 'ios'
            ? REVENUECAT_API_KEY_IOS
            : REVENUECAT_API_KEY_ANDROID;

        await Purchases.configure({ apiKey });

        // If user is logged in, identify them
        if (userId) {
            await Purchases.logIn(userId);
        }

        console.log('[RevenueCat] Initialized successfully');
        return true;
    } catch (error) {
        console.error('[RevenueCat] Initialization error:', error);
        return false;
    }
};

// Get available subscription packages
export const getSubscriptionPackages = async () => {
    try {
        const offerings = await Purchases.getOfferings();

        if (offerings.current !== null && offerings.current.availablePackages.length > 0) {
            return offerings.current.availablePackages;
        }

        return [];
    } catch (error) {
        console.error('[RevenueCat] Error fetching packages:', error);
        return [];
    }
};

// Check if user has active subscription
export const checkSubscriptionStatus = async () => {
    try {
        const customerInfo = await Purchases.getCustomerInfo();

        // Check for active entitlements
        const activeSubscriptions = customerInfo.activeSubscriptions;
        const entitlements = customerInfo.entitlements.active;

        // Check for specific class entitlements
        const subscriptionStatus = {
            isSubscribed: Object.keys(entitlements).length > 0,
            activeClass: null,
            expiryDate: null,
            entitlements: entitlements,
        };

        // Determine which class subscription is active
        if (entitlements['class_10']) {
            subscriptionStatus.activeClass = '10';
            subscriptionStatus.expiryDate = entitlements['class_10'].expirationDate;
        } else if (entitlements['class_11']) {
            subscriptionStatus.activeClass = '11';
            subscriptionStatus.expiryDate = entitlements['class_11'].expirationDate;
        } else if (entitlements['class_12']) {
            subscriptionStatus.activeClass = '12';
            subscriptionStatus.expiryDate = entitlements['class_12'].expirationDate;
        } else if (entitlements['neet']) {
            subscriptionStatus.activeClass = 'neet';
            subscriptionStatus.expiryDate = entitlements['neet'].expirationDate;
        }

        return subscriptionStatus;
    } catch (error) {
        console.error('[RevenueCat] Error checking subscription:', error);
        return { isSubscribed: false, activeClass: null, expiryDate: null };
    }
};

// Purchase a subscription package
export const purchasePackage = async (packageToPurchase) => {
    try {
        const { customerInfo } = await Purchases.purchasePackage(packageToPurchase);

        // Check if purchase was successful
        if (Object.keys(customerInfo.entitlements.active).length > 0) {
            return { success: true, customerInfo };
        }

        return { success: false, error: 'Purchase not completed' };
    } catch (error) {
        if (error.userCancelled) {
            return { success: false, error: 'Purchase cancelled', cancelled: true };
        }
        console.error('[RevenueCat] Purchase error:', error);
        return { success: false, error: error.message };
    }
};

// Restore previous purchases
export const restorePurchases = async () => {
    try {
        const customerInfo = await Purchases.restorePurchases();

        return {
            success: true,
            hasActiveSubscription: Object.keys(customerInfo.entitlements.active).length > 0,
            customerInfo,
        };
    } catch (error) {
        console.error('[RevenueCat] Restore error:', error);
        return { success: false, error: error.message };
    }
};

// Log in user (call after user authentication)
export const loginUser = async (userId) => {
    try {
        const { customerInfo } = await Purchases.logIn(userId);
        return { success: true, customerInfo };
    } catch (error) {
        console.error('[RevenueCat] Login error:', error);
        return { success: false, error: error.message };
    }
};

// Log out user
export const logoutUser = async () => {
    try {
        await Purchases.logOut();
        return { success: true };
    } catch (error) {
        console.error('[RevenueCat] Logout error:', error);
        return { success: false, error: error.message };
    }
};

// Set user attributes (for analytics and targeting)
export const setUserAttributes = async (attributes) => {
    try {
        if (attributes.email) {
            await Purchases.setEmail(attributes.email);
        }
        if (attributes.displayName) {
            await Purchases.setDisplayName(attributes.displayName);
        }
        if (attributes.phoneNumber) {
            await Purchases.setPhoneNumber(attributes.phoneNumber);
        }
        // Custom attributes
        if (attributes.studentClass) {
            await Purchases.setAttributes({ student_class: attributes.studentClass });
        }
        if (attributes.school) {
            await Purchases.setAttributes({ school: attributes.school });
        }

        return { success: true };
    } catch (error) {
        console.error('[RevenueCat] Set attributes error:', error);
        return { success: false, error: error.message };
    }
};

// Listen for purchase updates (for real-time subscription status)
export const addPurchaseListener = (callback) => {
    Purchases.addCustomerInfoUpdateListener((customerInfo) => {
        callback(customerInfo);
    });
};

export default {
    initRevenueCat,
    getSubscriptionPackages,
    checkSubscriptionStatus,
    purchasePackage,
    restorePurchases,
    loginUser,
    logoutUser,
    setUserAttributes,
    addPurchaseListener,
    PRODUCT_IDS,
};

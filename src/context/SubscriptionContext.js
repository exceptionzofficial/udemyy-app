/**
 * Subscription Context for Genii Books
 * Provides subscription state management across the app
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import * as RevenueCatService from '../services/revenueCat';

// Create context
const SubscriptionContext = createContext();

// Subscription Provider component
export const SubscriptionProvider = ({ children }) => {
    const [isInitialized, setIsInitialized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [activeClass, setActiveClass] = useState(null);
    const [expiryDate, setExpiryDate] = useState(null);
    const [packages, setPackages] = useState([]);
    const [error, setError] = useState(null);

    // Initialize RevenueCat on mount
    useEffect(() => {
        initializeRevenueCat();
    }, []);

    const initializeRevenueCat = async (userId = null) => {
        try {
            setIsLoading(true);
            const initialized = await RevenueCatService.initRevenueCat(userId);

            if (initialized) {
                setIsInitialized(true);

                // Fetch subscription status
                await refreshSubscriptionStatus();

                // Fetch available packages
                const availablePackages = await RevenueCatService.getSubscriptionPackages();
                setPackages(availablePackages);

                // Add listener for subscription updates
                RevenueCatService.addPurchaseListener((customerInfo) => {
                    updateSubscriptionFromCustomerInfo(customerInfo);
                });
            }
        } catch (err) {
            console.error('[SubscriptionContext] Init error:', err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const refreshSubscriptionStatus = async () => {
        try {
            const status = await RevenueCatService.checkSubscriptionStatus();
            setIsSubscribed(status.isSubscribed);
            setActiveClass(status.activeClass);
            setExpiryDate(status.expiryDate);
            return status;
        } catch (err) {
            console.error('[SubscriptionContext] Refresh error:', err);
            return { isSubscribed: false };
        }
    };

    const updateSubscriptionFromCustomerInfo = (customerInfo) => {
        const status = {
            isSubscribed: Object.keys(customerInfo.entitlements.active).length > 0,
            activeClass: null,
            expiryDate: null,
        };

        const entitlements = customerInfo.entitlements.active;

        if (entitlements['class_10']) {
            status.activeClass = '10';
            status.expiryDate = entitlements['class_10'].expirationDate;
        } else if (entitlements['class_11']) {
            status.activeClass = '11';
            status.expiryDate = entitlements['class_11'].expirationDate;
        } else if (entitlements['class_12']) {
            status.activeClass = '12';
            status.expiryDate = entitlements['class_12'].expirationDate;
        } else if (entitlements['neet']) {
            status.activeClass = 'neet';
            status.expiryDate = entitlements['neet'].expirationDate;
        }

        setIsSubscribed(status.isSubscribed);
        setActiveClass(status.activeClass);
        setExpiryDate(status.expiryDate);
    };

    const purchaseSubscription = async (packageToPurchase) => {
        try {
            setIsLoading(true);
            const result = await RevenueCatService.purchasePackage(packageToPurchase);

            if (result.success) {
                await refreshSubscriptionStatus();
            }

            return result;
        } catch (err) {
            console.error('[SubscriptionContext] Purchase error:', err);
            return { success: false, error: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    const restorePurchases = async () => {
        try {
            setIsLoading(true);
            const result = await RevenueCatService.restorePurchases();

            if (result.success && result.hasActiveSubscription) {
                await refreshSubscriptionStatus();
            }

            return result;
        } catch (err) {
            console.error('[SubscriptionContext] Restore error:', err);
            return { success: false, error: err.message };
        } finally {
            setIsLoading(false);
        }
    };

    const loginUser = async (userId, attributes = {}) => {
        try {
            const result = await RevenueCatService.loginUser(userId);

            if (result.success) {
                // Set user attributes
                await RevenueCatService.setUserAttributes(attributes);
                // Refresh subscription
                await refreshSubscriptionStatus();
            }

            return result;
        } catch (err) {
            console.error('[SubscriptionContext] Login error:', err);
            return { success: false, error: err.message };
        }
    };

    const logoutUser = async () => {
        try {
            await RevenueCatService.logoutUser();
            setIsSubscribed(false);
            setActiveClass(null);
            setExpiryDate(null);
            return { success: true };
        } catch (err) {
            console.error('[SubscriptionContext] Logout error:', err);
            return { success: false, error: err.message };
        }
    };

    const value = {
        // State
        isInitialized,
        isLoading,
        isSubscribed,
        activeClass,
        expiryDate,
        packages,
        error,

        // Actions
        refreshSubscriptionStatus,
        purchaseSubscription,
        restorePurchases,
        loginUser,
        logoutUser,

        // Helpers
        canAccessContent: (contentClass) => {
            if (!isSubscribed) return false;
            return activeClass === contentClass || activeClass === 'all';
        },
    };

    return (
        <SubscriptionContext.Provider value={value}>
            {children}
        </SubscriptionContext.Provider>
    );
};

// Custom hook to use subscription context
export const useSubscription = () => {
    const context = useContext(SubscriptionContext);

    if (!context) {
        throw new Error('useSubscription must be used within a SubscriptionProvider');
    }

    return context;
};

export default SubscriptionContext;

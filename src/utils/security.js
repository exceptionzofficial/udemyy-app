/**
 * Content Security Utility for Genii Books
 * Provides functions to prevent screenshots, screen recording, and secure content viewing
 */

import { Platform, NativeModules } from 'react-native';

// Flag to track if security is enabled
let securityEnabled = false;

/**
 * Enable content protection (prevent screenshots and screen recording)
 * On Android, this uses FLAG_SECURE
 * Note: This requires a native module for full implementation
 */
export const enableContentSecurity = () => {
    if (Platform.OS === 'android') {
        try {
            // This will work when we add the native module
            if (NativeModules.ContentSecurityModule) {
                NativeModules.ContentSecurityModule.enableSecureMode();
                securityEnabled = true;
                console.log('[Security] Content protection enabled');
            } else {
                console.log('[Security] Native module not available, using mock');
                securityEnabled = true;
            }
        } catch (error) {
            console.error('[Security] Failed to enable:', error);
        }
    } else {
        // iOS implementation would go here
        console.log('[Security] iOS security not implemented yet');
    }
};

/**
 * Disable content protection
 */
export const disableContentSecurity = () => {
    if (Platform.OS === 'android') {
        try {
            if (NativeModules.ContentSecurityModule) {
                NativeModules.ContentSecurityModule.disableSecureMode();
                securityEnabled = false;
                console.log('[Security] Content protection disabled');
            } else {
                securityEnabled = false;
            }
        } catch (error) {
            console.error('[Security] Failed to disable:', error);
        }
    }
};

/**
 * Check if content security is currently enabled
 */
export const isSecurityEnabled = () => securityEnabled;

/**
 * Hook to use in screens that need content protection
 * Usage: useContentSecurity() in any component
 */
export const useContentSecurity = () => {
    // Enable on mount, disable on unmount
    React.useEffect(() => {
        enableContentSecurity();
        return () => disableContentSecurity();
    }, []);
};

// Import React for hooks
import React from 'react';

export default {
    enableContentSecurity,
    disableContentSecurity,
    isSecurityEnabled,
    useContentSecurity,
};

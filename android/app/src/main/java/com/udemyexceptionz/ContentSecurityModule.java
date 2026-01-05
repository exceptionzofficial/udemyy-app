package com.udemyexceptionz;

import android.view.WindowManager;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Native module to enable/disable screenshot prevention (FLAG_SECURE)
 * This prevents screenshots and screen recording on Android
 */
public class ContentSecurityModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    public ContentSecurityModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "ContentSecurityModule";
    }

    @ReactMethod
    public void enableSecureMode() {
        if (getCurrentActivity() != null) {
            getCurrentActivity().runOnUiThread(() -> {
                getCurrentActivity().getWindow().setFlags(
                    WindowManager.LayoutParams.FLAG_SECURE,
                    WindowManager.LayoutParams.FLAG_SECURE
                );
            });
        }
    }

    @ReactMethod
    public void disableSecureMode() {
        if (getCurrentActivity() != null) {
            getCurrentActivity().runOnUiThread(() -> {
                getCurrentActivity().getWindow().clearFlags(
                    WindowManager.LayoutParams.FLAG_SECURE
                );
            });
        }
    }
}

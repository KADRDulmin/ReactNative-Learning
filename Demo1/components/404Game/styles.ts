// app/components/404Game/styles.ts
import { StyleSheet, Platform } from 'react-native';
import { ICON_SIZE, SCREEN_HEIGHT } from './constants';
import { WebViewStyle } from './types';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        gap: 30,
    },
    logo: {
        width: 200,
        height: 60,
        resizeMode: 'contain',
    },
    errorCode: {
        fontSize: 80,
        fontWeight: 'bold',
        marginTop: 10,
        paddingTop: 45,
    },
    link: {
        marginTop: 60,
    },
    gameContainer: {
        position: 'relative',
        width: '100%',
        height: Platform.OS === 'android' ? SCREEN_HEIGHT * 0.5 : SCREEN_HEIGHT * 0.6,
        alignItems: 'center',
        marginVertical: 20,
        overflow: 'visible', // Changed to visible to allow touches
        borderRadius: 20,
        ...(Platform.OS === 'android' && {
            backgroundColor: 'rgba(255,255,255,0.05)',
            paddingBottom: 40,
        }),
    },
    gameStats: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
        color: Platform.OS === 'ios' ? '#007AFF' : '#2196F3',
        marginBottom: 5, // Add this to accommodate scoreMessage
    },
    floatingIcon: {
        width: ICON_SIZE * 1.5,
        height: ICON_SIZE * 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000, // Add this for better touch handling on Android
    },
    startButton: {
        backgroundColor: Platform.select({
            web: '#007AFF',
            ios: '#007AFF',
            android: '#2196F3'
        }),
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 25,
        ...(Platform.OS === 'web' ? {
            cursor: 'pointer',
            WebkitTapHighlightColor: 'transparent',
            transition: 'transform 0.2s ease',
            ':hover': {
                transform: 'scale(1.05)'
            }
        } as WebViewStyle : {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: Platform.OS === 'android' ? 5 : 0,
        })
    },
    gameOver: {
        position: 'absolute',
        top: '40%',
        padding: 30,
        borderRadius: 15,
        alignItems: 'center',
        ...(Platform.OS === 'web' ? {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            transform: 'translateZ(0)'
        } : {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        })
    },
    scoreText: {
        fontSize: 20,
        marginVertical: 10,
    },
    iconWrapper: {
        width: ICON_SIZE * 1.5,
        height: ICON_SIZE * 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: (ICON_SIZE * 1.5) / 2,
        backgroundColor: Platform.select({
            ios: 'rgba(255, 255, 255, 0.9)',
            android: 'rgba(255, 255, 255, 0.95)',
            web: 'rgba(255, 255, 255, 0.95)'
        }),
        ...(Platform.OS === 'android' ? {
            elevation: 12, // Increased elevation
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.1)',
            backgroundColor: '#FFFFFF',
        } : undefined),
    },
    startContainer: {
        alignItems: 'center',
        gap: 20,
        paddingHorizontal: 20,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    retryButtonStyle: {
        backgroundColor: Platform.select({
            web: '#007AFF',
            ios: '#007AFF',
            android: '#2196F3'
        }),
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginTop: 15,
        ...(Platform.OS === 'web' ? {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
            cursor: 'pointer'
        } as WebViewStyle : {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: Platform.OS === 'android' ? 5 : 0,
        })
    },
    benefitTooltip: {
        position: 'absolute',
        top: 70,
        backgroundColor: Platform.OS === 'web' ? 'rgba(0, 122, 255, 0.9)' : '#007AFF',
        padding: 12,
        borderRadius: 8,
        maxWidth: '80%',
        ...(Platform.OS === 'web' ? {
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
        } : {}),
    },

    benefitText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '500',
    },

    scoreMessage: {
        fontSize: 16,
        color: '#007AFF',
        fontWeight: '600',
        marginBottom: 10,
        textAlign: 'center',
    },

    benefitSummary: {
        textAlign: 'center',
        marginVertical: 10,
        fontSize: 14,
        opacity: 0.8,
        maxWidth: '80%',
    },
    touchArea: {
        position: 'absolute',
        width: ICON_SIZE * 3, // Increased touch area
        height: ICON_SIZE * 3,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        // Debug style (remove in production)
        // backgroundColor: 'rgba(255,0,0,0.1)',
    },
});
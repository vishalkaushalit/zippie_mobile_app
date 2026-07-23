import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Easing,
    ImageBackground,
    Keyboard,
    KeyboardEvent,
    Platform,
    Pressable,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    useWindowDimensions,
    View,
} from 'react-native';
import {
    SafeAreaView,
    useSafeAreaInsets,
} from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import LoginBadge from '../../assets/images/login_badge.svg';
import NigeriaFlag from '../../assets/icons/nigeria_flag.svg';
import GoogleIcon from '../../assets/icons/google.svg';
import AppleIcon from '../../assets/icons/apple.svg';
import EmailIcon from '../../assets/icons/email.svg';
import type { RootStackParamList } from '../../navigation/AppNavigator';

/*
 * Height required between the top of the login card
 * and the top of the keyboard.
 *
 * Increase this value if you want the card to move higher.
 */
const OPEN_CARD_VISIBLE_HEIGHT = 270;

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
    const { height: windowHeight } = useWindowDimensions();
    const insets = useSafeAreaInsets();

    const [mobileNumber, setMobileNumber] = useState('');
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    const [rememberLogin, setRememberLogin] = useState(true);
    const [isInputFocused, setIsInputFocused] = useState(false);

    const cardTranslateY = useRef(new Animated.Value(0)).current;

    /*
     * The hero never changes its height.
     * This keeps all top elements fixed.
     */
    const heroHeight = useMemo(() => {
        return Math.max(windowHeight * 0.64, 540);
    }, [windowHeight]);

    /*
     * Original card position before the keyboard opens.
     */
    const closedCardTop = heroHeight - 150;

    function animateCard(toValue: number, duration = 250) {
        Animated.timing(cardTranslateY, {
            toValue,
            duration,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
        }).start();
    }

    function handleKeyboardShow(event: KeyboardEvent) {
        setIsKeyboardOpen(true);

        /*
         * screenY gives the exact top position of the native keyboard.
         *
         * Safe-area top is removed because this screen starts below
         * the top safe area.
         */
        const keyboardTop =
            event.endCoordinates.screenY - insets.top;

        /*
         * The desired card position places its main content
         * directly above the keyboard.
         */
        const desiredCardTop =
            keyboardTop - OPEN_CARD_VISIBLE_HEIGHT;

        /*
         * Only allow upward movement.
         */
        const cardOffset = Math.min(
            0,
            desiredCardTop - closedCardTop,
        );

        animateCard(cardOffset, event.duration || 250);
    }

    function handleKeyboardHide(event: KeyboardEvent) {
        setIsKeyboardOpen(false);
        setIsInputFocused(false);

        animateCard(0, event.duration || 250);
    }

    useEffect(() => {
        const showEvent =
            Platform.OS === 'ios'
                ? 'keyboardWillShow'
                : 'keyboardDidShow';

        const hideEvent =
            Platform.OS === 'ios'
                ? 'keyboardWillHide'
                : 'keyboardDidHide';

        const showSubscription = Keyboard.addListener(
            showEvent,
            handleKeyboardShow,
        );

        const hideSubscription = Keyboard.addListener(
            hideEvent,
            handleKeyboardHide,
        );

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, [closedCardTop, insets.top]);

    function handleMobileNumberChange(value: string) {
        const numbersOnly = value.replace(/\D/g, '');
        setMobileNumber(numbersOnly);
    }

    function handleContinue() {
        const cleanedNumber = mobileNumber.replace(/\D/g, '');

        if (cleanedNumber.length < 7) {
            Alert.alert(
                'Invalid mobile number',
                'Please enter a valid mobile number.',
            );
            return;
        }

        Keyboard.dismiss();

        const phoneNumber = `+234 ${cleanedNumber}`;

        console.log('Mobile number:', phoneNumber);
        console.log('Remember login:', rememberLogin);

        navigation.navigate('OTPVerification', { phoneNumber });
    }

    function handleSkip() {
        Keyboard.dismiss();
        Alert.alert('Success', 'Skip pressed');
    }

    function handleGoogleLogin() {
        Keyboard.dismiss();
        Alert.alert('Success', 'Google login pressed');
    }

    function handleAppleLogin() {
        Keyboard.dismiss();
        Alert.alert('Success', 'Apple login pressed');
    }

    function handleEmailLogin() {
        Keyboard.dismiss();
        Alert.alert('Success', 'Email login pressed');
    }

    function handleTermsOfService() {
        Alert.alert('Success', 'Terms of Service pressed');
    }

    function handlePrivacyPolicy() {
        Alert.alert('Success', 'Privacy Policy pressed');
    }

    function handleContentPolicies() {
        Alert.alert('Success', 'Content Policies pressed');
    }

    return (
        <SafeAreaView
            style={styles.safeArea}
            edges={['top']}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
            />

            <View style={styles.screen}>
                {/* Fixed hero section */}
                <View
                    style={[
                        styles.heroSection,
                        {
                            height: heroHeight,
                        },
                    ]}>
                    <ImageBackground
                        source={require('../../assets/images/splash_bg.png')}
                        resizeMode="cover"
                        style={styles.heroBackground}
                        imageStyle={styles.heroImage}>
                        <View style={styles.heroOverlay} />

                        <Pressable
                            style={({ pressed }) => [
                                styles.skipButton,
                                pressed && styles.buttonPressed,
                            ]}
                            onPress={handleSkip}>
                            <Text style={styles.skipText}>
                                Skip
                            </Text>
                        </Pressable>

                        <View style={styles.headingContainer}>
                            <Text style={styles.heading}>
                                AFRICA’S FAST
                            </Text>

                            <Text style={styles.heading}>
                                FOOD DELIVERY APP
                            </Text>

                            <LoginBadge
                                width={200}
                                height={80}
                            />
                        </View>
                    </ImageBackground>
                </View>

                {/* Only this card moves */}
                <Animated.View
                    style={[
                        styles.loginCard,
                        {
                            top: closedCardTop,
                            transform: [
                                {
                                    translateY: cardTranslateY,
                                },
                            ],
                        },
                    ]}>
                    <Text style={styles.cardTitle}>
                        Log in or sign up
                    </Text>

                    <View style={styles.mobileRow}>
                        <Pressable
                            style={({ pressed }) => [
                                styles.countrySelector,
                                pressed && styles.buttonPressed,
                            ]}>
                            <NigeriaFlag
                                width={28}
                                height={28}
                            />

                            <Text style={styles.dropdownIcon}>
                                ▼
                            </Text>
                        </Pressable>

                        <View
                            style={[
                                styles.phoneInputContainer,
                                isInputFocused &&
                                styles.phoneInputContainerFocused,
                            ]}>
                            <Text style={styles.countryCode}>
                                +234
                            </Text>

                            <TextInput
                                value={mobileNumber}
                                onChangeText={
                                    handleMobileNumberChange
                                }
                                onFocus={() =>
                                    setIsInputFocused(true)
                                }
                                onBlur={() =>
                                    setIsInputFocused(false)
                                }
                                placeholder="Enter Mobile Number"
                                placeholderTextColor="#69708E"
                                keyboardType="phone-pad"
                                textContentType="telephoneNumber"
                                autoComplete="tel"
                                maxLength={15}
                                style={styles.phoneInput}
                                returnKeyType="done"
                                onSubmitEditing={handleContinue}
                            />
                        </View>
                    </View>

                    {isKeyboardOpen && (
                        <Pressable
                            style={styles.rememberRow}
                            onPress={() =>
                                setRememberLogin(
                                    previousValue =>
                                        !previousValue,
                                )
                            }>
                            <View
                                style={[
                                    styles.checkbox,
                                    rememberLogin &&
                                    styles.checkboxSelected,
                                ]}>
                                {rememberLogin && (
                                    <Text
                                        style={
                                            styles.checkmark
                                        }>
                                        ✓
                                    </Text>
                                )}
                            </View>

                            <Text style={styles.rememberText}>
                                Remember my login for faster
                                sign-in
                            </Text>
                        </Pressable>
                    )}

                    <Pressable
                        style={({ pressed }) => [
                            styles.continueButton,
                            isKeyboardOpen &&
                            styles.continueButtonKeyboardOpen,
                            pressed && styles.buttonPressed,
                        ]}
                        onPress={handleContinue}>
                        <Text
                            style={
                                styles.continueButtonText
                            }>
                            Continue
                        </Text>
                    </Pressable>

                    {!isKeyboardOpen && (
                        <>
                            <View style={styles.socialRow}>
                                <Pressable
                                    style={({ pressed }) => [
                                        styles.socialButton,
                                        pressed &&
                                        styles.buttonPressed,
                                    ]}
                                    onPress={handleGoogleLogin}>
                                    <GoogleIcon
                                        width={30}
                                        height={30}
                                    />
                                </Pressable>

                                <Pressable
                                    style={({ pressed }) => [
                                        styles.socialButton,
                                        pressed &&
                                        styles.buttonPressed,
                                    ]}
                                    onPress={handleAppleLogin}>
                                    <AppleIcon
                                        width={30}
                                        height={30}
                                    />
                                </Pressable>

                                <Pressable
                                    style={({ pressed }) => [
                                        styles.socialButton,
                                        pressed &&
                                        styles.buttonPressed,
                                    ]}
                                    onPress={handleEmailLogin}>
                                    <EmailIcon
                                        width={30}
                                        height={30}
                                    />
                                </Pressable>
                            </View>

                            <Text style={styles.agreementText}>
                                By continuing, you agree to our
                            </Text>

                            <View style={styles.policyRow}>
                                <Pressable
                                    onPress={
                                        handleTermsOfService
                                    }>
                                    <Text
                                        style={
                                            styles.policyText
                                        }>
                                        Terms of Service
                                    </Text>
                                </Pressable>

                                <Pressable
                                    onPress={
                                        handlePrivacyPolicy
                                    }>
                                    <Text
                                        style={
                                            styles.policyText
                                        }>
                                        Privacy Policy
                                    </Text>
                                </Pressable>

                                <Pressable
                                    onPress={
                                        handleContentPolicies
                                    }>
                                    <Text
                                        style={
                                            styles.policyText
                                        }>
                                        Content Policies
                                    </Text>
                                </Pressable>
                            </View>
                        </>
                    )}
                </Animated.View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F6F1FF',
    },

    screen: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#F6F1FF',
        overflow: 'hidden',
    },

    heroSection: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#F6F1FF',
    },

    heroBackground: {
        flex: 1,
        alignItems: 'center',
    },

    heroImage: {
        width: '100%',
        height: '100%',
    },

    heroOverlay: {
        ...StyleSheet.absoluteFill,
        backgroundColor: 'rgba(247, 243, 255, 0.05)',
    },

    skipButton: {
        position: 'absolute',
        top: 18,
        right: 20,
        minWidth: 78,
        height: 40,
        borderRadius: 30,
        backgroundColor: '#E9DEFF',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5,
    },

    skipText: {
        color: '#8738F4',
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
    },

    headingContainer: {
        position: 'absolute',
        top: 50,
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
    },

    heading: {
        color: '#1D1237',
        fontSize: 26,
        lineHeight: 36,
        fontFamily: 'Poppins-Bold',
        textAlign: 'center',
        marginBottom: 5,
    },

    loginCard: {
        position: 'absolute',
        left: 0,
        right: 0,
        minHeight: 430,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 38,
        borderTopRightRadius: 38,
        paddingTop: 20,
        paddingHorizontal: 24,
        paddingBottom: 34,
        borderWidth: 1,
        borderColor: '#E7DDF4',
        zIndex: 20,

        shadowColor: '#1D1237',
        shadowOffset: {
            width: 0,
            height: -4,
        },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 8,
    },

    cardTitle: {
        color: '#1B102A',
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold',
        marginBottom: 24,
    },

    mobileRow: {
        flexDirection: 'row',
        gap: 12,
    },

    countrySelector: {
        width: 88,
        height: 60,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#E5DCF4',
        backgroundColor: '#FBF9FF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14,
    },

    dropdownIcon: {
        color: '#696F8C',
        fontSize: 13,
    },

    phoneInputContainer: {
        flex: 1,
        height: 60,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#E5DCF4',
        backgroundColor: '#FBF9FF',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },

    phoneInputContainerFocused: {
        borderColor: '#D7C5F4',
    },

    countryCode: {
        color: '#1E1534',
        fontSize: 17,
        fontFamily: 'Poppins-SemiBold',
        marginRight: 16,
    },

    phoneInput: {
        flex: 1,
        height: '100%',
        color: '#1E1534',
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        paddingVertical: 0,
    },

    rememberRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 26,
        paddingHorizontal: 2,
    },

    checkbox: {
        width: 28,
        height: 28,
        borderRadius: 7,
        borderWidth: 2,
        borderColor: '#8034F4',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    checkboxSelected: {
        backgroundColor: '#8034F4',
    },

    checkmark: {
        color: '#FFFFFF',
        fontSize: 20,
        lineHeight: 23,
        fontFamily: 'Poppins-SemiBold',
    },

    rememberText: {
        flex: 1,
        color: '#69708E',
        fontSize: 15,
        lineHeight: 22,
        fontFamily: 'Poppins-Regular',
    },

    continueButton: {
        height: 60,
        borderRadius: 17,
        backgroundColor: '#5100D9',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },

    continueButtonKeyboardOpen: {
        marginTop: 28,
    },

    continueButtonText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: 'Poppins-SemiBold',
    },

    socialRow: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 20,
    },

    socialButton: {
        flex: 1,
        height: 60,
        backgroundColor: '#F0EAFB',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },

    agreementText: {
        color: '#68708F',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'Poppins-Regular',
        marginTop: 20,
    },

    policyRow: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        columnGap: 24,
        rowGap: 10,
    },

    policyText: {
        color: '#626A88',
        fontSize: 14,
        fontFamily: 'Poppins-Medium',
        textDecorationLine: 'underline',
    },

    buttonPressed: {
        opacity: 0.72,
        transform: [
            {
                scale: 0.98,
            },
        ],
    },
});

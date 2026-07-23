import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoginBadge from '../../assets/images/login_badge.svg';
import NigeriaFlag from '../../assets/icons/nigeria_flag.svg';
import GoogleIcon from '../../assets/icons/google.svg';
import AppleIcon from '../../assets/icons/apple.svg';
import EmailIcon from '../../assets/icons/email.svg';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
    const [mobileNumber, setMobileNumber] = useState('');

    function handleContinue() {
        const cleanedNumber = mobileNumber.replace(/\D/g, '');

        if (cleanedNumber.length < 7) {
            Alert.alert(
                'Invalid mobile number',
                'Please enter a valid mobile number.',
            );
            return;
        }

        console.log('Mobile number:', `+234${cleanedNumber}`);
    }

    function handleSkip() {
        console.log('Skip pressed');
    }

    function handleGoogleLogin() {
        console.log('Google login pressed');
    }

    function handleAppleLogin() {
        console.log('Apple login pressed');
    }

    function handleEmailLogin() {
        console.log('Email login pressed');
    }

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
            />

            <KeyboardAvoidingView
                style={styles.keyboardContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    bounces={false}
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.heroSection}>
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
                                <Text style={styles.skipText}>Skip</Text>
                            </Pressable>

                            <View style={styles.headingContainer}>
                                <Text style={styles.heading}>AFRICA’S FAST</Text>
                                <Text style={styles.heading}>FOOD DELIVERY APP</Text>
                                <LoginBadge width={200} height={80} />
                            </View>
                        </ImageBackground>
                    </View>

                    <View style={styles.loginCard}>
                        <Text style={styles.cardTitle}>Log in or sign up</Text>

                        <View style={styles.mobileRow}>
                            <Pressable style={styles.countrySelector}>
                                <NigeriaFlag width={20} height={20} />

                                <Text style={styles.dropdownIcon}>▼</Text>
                            </Pressable>

                            <View style={styles.phoneInputContainer}>
                                <Text style={styles.countryCode}>+234</Text>

                                <TextInput
                                    value={mobileNumber}
                                    onChangeText={setMobileNumber}
                                    placeholder="Enter Mobile Number"
                                    placeholderTextColor="#69708E"
                                    keyboardType="phone-pad"
                                    maxLength={15}
                                    style={styles.phoneInput}
                                    returnKeyType="done"
                                    onSubmitEditing={handleContinue}
                                />
                            </View>
                        </View>

                        <Pressable
                            style={({ pressed }) => [
                                styles.continueButton,
                                pressed && styles.buttonPressed,
                            ]}
                            onPress={handleContinue}>
                            <Text style={styles.continueButtonText}>Continue</Text>
                        </Pressable>

                        <View style={styles.socialRow}>
                            <Pressable
                                style={({ pressed }) => [
                                    styles.socialButton,
                                    pressed && styles.buttonPressed,
                                ]}
                                onPress={handleGoogleLogin}>
                                <GoogleIcon width={30} height={30} />
                            </Pressable>

                            <Pressable
                                style={({ pressed }) => [
                                    styles.socialButton,
                                    pressed && styles.buttonPressed,
                                ]}
                                onPress={handleAppleLogin}>
                                <AppleIcon width={30} height={30} />
                            </Pressable>

                            <Pressable
                                style={({ pressed }) => [
                                    styles.socialButton,
                                    pressed && styles.buttonPressed,
                                ]}
                                onPress={handleEmailLogin}>
                                <EmailIcon width={30} height={30} />
                            </Pressable>
                        </View>

                        <Text style={styles.agreementText}>
                            By continuing, you agree to our
                        </Text>

                        <View style={styles.policyRow}>
                            <Pressable onPress={() => console.log('Terms of Service')}>
                                <Text style={styles.policyText}>Terms of Service</Text>
                            </Pressable>

                            <Pressable onPress={() => console.log('Privacy Policy')}>
                                <Text style={styles.policyText}>Privacy Policy</Text>
                            </Pressable>

                            <Pressable onPress={() => console.log('Content Policies')}>
                                <Text style={styles.policyText}>Content Policies</Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

type SocialButtonProps = {
    image: number;
    onPress: () => void;
};

function SocialButton({ image, onPress }: SocialButtonProps) {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.socialButton,
                pressed && styles.buttonPressed,
            ]}
            onPress={onPress}>
            <Image source={image} style={styles.socialIcon} resizeMode="contain" />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F6F1FF',
    },

    keyboardContainer: {
        flex: 1,
    },

    scrollContent: {
        flexGrow: 1,
        backgroundColor: '#F6F1FF',
    },

    heroSection: {
        height: Math.max(height * 0.64, 650),
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
        fontWeight: 600,
        textAlign: 'center',
        marginBottom: 5,
    },

    loginCard: {
        marginTop: -150,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 38,
        borderTopRightRadius: 38,
        paddingTop: 20,
        paddingHorizontal: 24,
        paddingBottom: 20,
        borderWidth: 1,
        borderColor: '#E7DDF4',
    },

    cardTitle: {
        color: '#1B102A',
        fontSize: 16,
        fontWeight: 600,
        textAlign: 'center',
        fontFamily: 'Google Sans',
        marginBottom: 20,
    },

    mobileRow: {
        flexDirection: 'row',
        gap: 10,
    },

    countrySelector: {
        width: 80,
        height: 60,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#E5DCF4',
        backgroundColor: '#FBF9FF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
    },

    flagIcon: {
        width: 40,
        height: 29,
    },

    dropdownIcon: {
        color: '#696F8C',
        fontSize: 15,
    },

    phoneInputContainer: {
        flex: 1,
        height: 60,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#E5DCF4',
        backgroundColor: '#FBF9FF',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
    },

    countryCode: {
        color: '#1E1534',
        fontSize: 16,
        fontWeight: 500,
        fontFamily: 'Google Sans',
        marginRight: 17,
    },

    phoneInput: {
        flex: 1,
        height: '100%',
        color: '#1E1534',
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        paddingVertical: 0,
    },

    continueButton: {
        height: 60,
        borderRadius: 17,
        backgroundColor: '#5100D9',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
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

    socialIcon: {
        width: 30,
        height: 30,
    },

    agreementText: {
        color: '#68708F',
        fontSize: 17,
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
        transform: [{ scale: 0.98 }],
    },
});
import React, { useEffect, useRef, useState } from "react";
import {
    Alert,
    Keyboard,
    Platform,
    Pressable,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/AppNavigator";
import LeftArrow from "../../assets/icons/arrow_left.svg";

const OTP_LENGTH = 4;
const RESEND_SECONDS = 15;
const DEMO_OTP = "1111";

type OTPVerificationScreenProps = NativeStackScreenProps<
    RootStackParamList,
    "OTPVerification"
>;

export default function OTPVerificationScreen({
    navigation,
    route,
}: OTPVerificationScreenProps) {
    const { phoneNumber } = route.params;

    const [otp, setOtp] = useState("");
    const [countdown, setCountdown] = useState(RESEND_SECONDS);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
        const focusTimer = setTimeout(() => {
            inputRef.current?.focus();
        }, 400);

        return () => clearTimeout(focusTimer);
    }, []);

    useEffect(() => {
        if (countdown <= 0) {
            return;
        }

        const timer = setInterval(() => {
            setCountdown((previous) => previous - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [countdown]);

    useEffect(() => {
        const showEvent =
            Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
        const hideEvent =
            Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

        const showSubscription = Keyboard.addListener(showEvent, () => {
            setIsKeyboardVisible(true);
        });
        const hideSubscription = Keyboard.addListener(hideEvent, () => {
            setIsKeyboardVisible(false);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    function handleOTPChange(value: string) {
        const numbersOnly = value.replace(/\D/g, "");
        setOtp(numbersOnly.slice(0, OTP_LENGTH));
    }

    function handleSubmitOTP() {
        if (otp.length !== OTP_LENGTH) {
            Alert.alert(
                "Incomplete OTP",
                `Please enter the ${OTP_LENGTH}-digit verification code.`
            );
            return;
        }

        handleVerifyOTP(otp);
    }

    function handleVerifyOTP(code: string) {
        Keyboard.dismiss();

        console.log("Entered OTP:", code);

        if (code !== DEMO_OTP) {
            Alert.alert(
                "Invalid OTP",
                "The verification code you entered is incorrect."
            );
            return;
        }

        Alert.alert(
            "OTP verified",
            "Your phone number has been verified successfully.",
            [
                {
                    text: "Continue",
                    onPress: () => navigation.replace("Home"),
                },
            ],
            { cancelable: false }
        );
    }

    function handleResendOTP() {
        if (countdown > 0) {
            return;
        }

        setOtp("");
        setCountdown(RESEND_SECONDS);

        inputRef.current?.focus();

        console.log("Resend OTP requested");

        Alert.alert(
            "OTP sent",
            `A new verification code was sent to ${phoneNumber}.`
        );
    }

    function handleBack() {
        Keyboard.dismiss();
        navigation.goBack();
    }

    function handleGoBackToLogin() {
        Keyboard.dismiss();

        navigation.goBack();
    }

    function dismissKeyboard() {
        setIsKeyboardVisible(false);
        Keyboard.dismiss();
    }

    return (
        <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
            <StatusBar barStyle="dark-content" backgroundColor="#F9F7FF" />

            <TouchableWithoutFeedback onPress={dismissKeyboard} accessible={false}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Pressable
                            onPress={handleBack}
                            style={({ pressed }) => [
                                styles.backButton,
                                pressed && styles.pressed,
                            ]}
                        >
                            <View style={styles.backArrow}>
                                <LeftArrow width={20} height={20} />
                            </View>
                        </Pressable>

                        <Text style={styles.headerTitle}>OTP Verification</Text>

                        <View style={styles.headerSpacer} />
                    </View>

                    <View style={styles.content}>
                        <Text style={styles.description}>
                            We have sent a verification code to
                        </Text>

                        <Text style={styles.phoneNumber}>{phoneNumber}</Text>

                        <View style={styles.otpContainer}>
                            <View pointerEvents="none" style={styles.otpRow}>
                                {Array.from({ length: OTP_LENGTH }).map((_, index) => {
                                    const digit = otp[index] || "";
                                    const isActive = isInputFocused && index === otp.length;

                                    const isLastActive =
                                        isInputFocused &&
                                        otp.length === OTP_LENGTH &&
                                        index === OTP_LENGTH - 1;

                                    return (
                                        <View
                                            key={index}
                                            style={[
                                                styles.otpBox,
                                                (isActive || isLastActive) && styles.activeOTPBox,
                                                digit !== "" && styles.filledOTPBox,
                                            ]}
                                        >
                                            <Text style={styles.otpDigit}>{digit}</Text>
                                        </View>
                                    );
                                })}
                            </View>

                            <TextInput
                                ref={inputRef}
                                value={otp}
                                onChangeText={handleOTPChange}
                                onFocus={() => setIsInputFocused(true)}
                                onBlur={() => setIsInputFocused(false)}
                                keyboardType="number-pad"
                                textContentType="oneTimeCode"
                                autoComplete={
                                    Platform.OS === "android" ? "sms-otp" : "one-time-code"
                                }
                                maxLength={OTP_LENGTH}
                                caretHidden
                                selectionColor="transparent"
                                style={styles.hiddenInput}
                                accessibilityLabel="Enter four digit verification code"
                            />
                        </View>

                        <View style={styles.resendRow}>
                            <Text style={styles.resendLabel}>Didn’t get the OTP?</Text>

                            <Pressable disabled={countdown > 0} onPress={handleResendOTP}>
                                <Text
                                    style={[
                                        styles.resendText,
                                        countdown === 0 && styles.resendTextActive,
                                    ]}
                                >
                                    {countdown > 0 ? `Resend SMS in ${countdown}s` : "Resend SMS"}
                                </Text>
                            </Pressable>
                        </View>

                        <Pressable
                            disabled={otp.length !== OTP_LENGTH}
                            onPress={handleSubmitOTP}
                            style={({ pressed }) => [
                                styles.submitButton,
                                otp.length !== OTP_LENGTH && styles.submitButtonDisabled,
                                pressed && styles.pressed,
                            ]}
                        >
                            <Text style={styles.submitButtonText}>Submit OTP</Text>
                        </Pressable>
                    </View>

                    {!isKeyboardVisible && (
                        <Pressable
                            onPress={handleGoBackToLogin}
                            style={({ pressed }) => [
                                styles.loginMethodsButton,
                                pressed && styles.pressed,
                            ]}
                        >
                            <Text style={styles.loginMethodsText}>
                                Go back to login methods
                            </Text>
                        </Pressable>
                    )}
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#F9F7FF",
    },

    container: {
        flex: 1,
        backgroundColor: "#F9F7FF",
    },

    header: {
        height: 96,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 28,
    },

    backButton: {
        width: 45,
        height: 45,
        borderRadius: 50,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#1D1237",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.08,
        shadowRadius: 14,
        elevation: 4,
    },

    backArrow: {
        color: "#0D1321",
        fontFamily: "Poppins-Light",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    headerTitle: {
        flex: 1,
        color: "#1D1237",
        fontSize: 22,
        textAlign: "center",
        fontFamily: "Poppins-SemiBold",
    },

    headerSpacer: {
        width: 50,
        height: 50,
    },

    content: {
        alignItems: "center",
        paddingHorizontal: 24,
        paddingTop: 58,
    },

    description: {
        color: "#211536",
        fontSize: 19,
        lineHeight: 28,
        textAlign: "center",
        fontFamily: "Poppins-Regular",
    },

    phoneNumber: {
        color: "#211536",
        fontSize: 20,
        lineHeight: 30,
        textAlign: "center",
        fontFamily: "Poppins-SemiBold",
    },

    otpContainer: {
        width: "100%",
        height: 62,
        marginTop: 76,
    },

    otpRow: {
        ...StyleSheet.absoluteFill,
        flexDirection: "row",
        justifyContent: "center",
        gap: 28,
    },

    otpBox: {
        width: 62,
        height: 62,
        borderRadius: 14,
        borderWidth: 2,
        borderColor: "#E6DDF7",
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
    },

    activeOTPBox: {
        borderColor: "#111222",
        borderWidth: 2.5,
    },

    filledOTPBox: {
        borderColor: "#111222",
    },

    otpDigit: {
        color: "#1D1237",
        fontSize: 27,
        fontFamily: "Poppins-SemiBold",
        textAlign: "center",
    },

    hiddenInput: {
        ...StyleSheet.absoluteFill,
        zIndex: 1,
        color: "transparent",
        backgroundColor: "transparent",
        fontSize: 1,
        opacity: 0.02,
    },

    resendRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        marginTop: 48,
    },

    resendLabel: {
        color: "#211536",
        fontSize: 16,
        fontFamily: "Poppins-Regular",
    },

    resendText: {
        color: "#707998",
        fontSize: 16,
        fontFamily: "Poppins-Regular",
        marginLeft: 4,
    },

    resendTextActive: {
        color: "#8137F5",
        fontFamily: "Poppins-Medium",
    },

    submitButton: {
        width: "100%",
        height: 58,
        marginTop: 36,
        borderRadius: 16,
        backgroundColor: "#5100D9",
        alignItems: "center",
        justifyContent: "center",
    },

    submitButtonDisabled: {
        opacity: 0.45,
    },

    submitButtonText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontFamily: "Poppins-SemiBold",
    },

    loginMethodsButton: {
        position: "absolute",
        bottom: 56,
        alignSelf: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },

    loginMethodsText: {
        color: "#8137F5",
        fontSize: 17,
        fontFamily: "Poppins-Medium",
    },

    pressed: {
        opacity: 0.7,
        transform: [{ scale: 0.97 }],
    },
});

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  Easing,
  FlatList,
  ImageBackground,
  Keyboard,
  KeyboardEvent,
  Modal,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  getExampleNumber,
  validatePhoneNumberLength,
  type CountryCode,
} from "libphonenumber-js";
import mobilePhoneExamples from "libphonenumber-js/mobile/examples";

import LoginBadge from "../../assets/images/login_badge.svg";
import GoogleIcon from "../../assets/icons/google.svg";
import AppleIcon from "../../assets/icons/apple.svg";
import EmailIcon from "../../assets/icons/email.svg";
import type { RootStackParamList } from "../../navigation/AppNavigator";
import {
  fetchCountries,
  type CountryPhoneDetails,
} from "../../services/countries";

/*
 * Height required between the top of the login card
 * and the top of the keyboard.
 *
 * Increase this value if you want the card to move higher.
 */
const OPEN_CARD_VISIBLE_HEIGHT = 270;

const DEFAULT_COUNTRY: CountryPhoneDetails = {
  name: "Canada",
  isoCode: "CA",
  callingCode: "+1",
  flag: "🇨🇦",
};

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: Props) {
  const { height: windowHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const [mobileNumber, setMobileNumber] = useState("");
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [rememberLogin, setRememberLogin] = useState(true);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [country, setCountry] = useState(DEFAULT_COUNTRY);
  const [countries, setCountries] = useState<CountryPhoneDetails[]>([
    DEFAULT_COUNTRY,
  ]);
  const [isCountryPickerOpen, setIsCountryPickerOpen] = useState(false);
  const [isLoadingCountries, setIsLoadingCountries] = useState(true);
  const [countrySearch, setCountrySearch] = useState("");

  const cardTranslateY = useRef(new Animated.Value(0)).current;
  const countryIsoCode = country.isoCode as CountryCode;
  const phoneNumberLength =
    getExampleNumber(countryIsoCode, mobilePhoneExamples)?.nationalNumber
      .length ?? 15;
  const filteredCountries = useMemo(() => {
    const query = countrySearch.trim().toLowerCase();

    if (!query) {
      return countries;
    }

    return countries.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.callingCode.includes(query) ||
        item.isoCode.toLowerCase().includes(query)
    );
  }, [countries, countrySearch]);

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
    const keyboardTop = event.endCoordinates.screenY - insets.top;

    /*
     * The desired card position places its main content
     * directly above the keyboard.
     */
    const desiredCardTop = keyboardTop - OPEN_CARD_VISIBLE_HEIGHT;

    /*
     * Only allow upward movement.
     */
    const cardOffset = Math.min(0, desiredCardTop - closedCardTop);

    animateCard(cardOffset, event.duration || 250);
  }

  function handleKeyboardHide(event: KeyboardEvent) {
    setIsKeyboardOpen(false);
    setIsInputFocused(false);

    animateCard(0, event.duration || 250);
  }

  useEffect(() => {
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";

    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const showSubscription = Keyboard.addListener(
      showEvent,
      handleKeyboardShow
    );

    const hideSubscription = Keyboard.addListener(
      hideEvent,
      handleKeyboardHide
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [closedCardTop, insets.top]);

  useEffect(() => {
    const controller = new AbortController();

    fetchCountries(controller.signal)
      .then((items) => {
        if (items.length > 0) {
          setCountries(items);
          setCountry(
            items.find((item) => item.isoCode === "CA") ?? items[0]
          );
        }
      })
      .catch((error) => {
        if (error instanceof Error && error.name !== "AbortError") {
          console.warn("Unable to load country details:", error.message);
        }
      })
      .finally(() => setIsLoadingCountries(false));

    return () => controller.abort();
  }, []);

  function handleCountrySelect(selectedCountry: CountryPhoneDetails) {
    setCountry(selectedCountry);
    setMobileNumber("");
    setCountrySearch("");
    setIsCountryPickerOpen(false);
  }

  function handleMobileNumberChange(value: string) {
    const numbersOnly = value
      .replace(/\D/g, "")
      .slice(0, phoneNumberLength);
    setMobileNumber(numbersOnly);
  }

  function handleContinue() {
    const cleanedNumber = mobileNumber.replace(/\D/g, "");

    if (validatePhoneNumberLength(cleanedNumber, countryIsoCode)) {
      Alert.alert(
        "Invalid mobile number",
        `Please enter a valid ${phoneNumberLength}-digit mobile number for ${country.name}.`
      );
      return;
    }

    Keyboard.dismiss();

    const phoneNumber = `${country.callingCode} ${cleanedNumber}`;

    console.log("Mobile number:", phoneNumber);
    console.log("Remember login:", rememberLogin);

    navigation.navigate("OTPVerification", { phoneNumber });
  }

  function handleSkip() {
    Keyboard.dismiss();
    Alert.alert("Success", "Skip pressed");
  }

  function handleGoogleLogin() {
    Keyboard.dismiss();
    Alert.alert("Success", "Google login pressed");
  }

  function handleAppleLogin() {
    Keyboard.dismiss();
    Alert.alert("Success", "Apple login pressed");
  }

  function handleEmailLogin() {
    Keyboard.dismiss();
    Alert.alert("Success", "Email login pressed");
  }

  function handleTermsOfService() {
    Alert.alert("Success", "Terms of Service pressed");
  }

  function handlePrivacyPolicy() {
    Alert.alert("Success", "Privacy Policy pressed");
  }

  function handleContentPolicies() {
    Alert.alert("Success", "Content Policies pressed");
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
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
          ]}
        >
          <ImageBackground
            source={require("../../assets/images/splash_bg.png")}
            resizeMode="cover"
            style={styles.heroBackground}
            imageStyle={styles.heroImage}
          >
            <View style={styles.heroOverlay} />

            <Pressable
              style={({ pressed }) => [
                styles.skipButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={handleSkip}
            >
              <Text style={styles.skipText}>Skip</Text>
            </Pressable>

            <View style={styles.headingContainer}>
              <Text style={styles.heading}>AFRICA’S FAST</Text>

              <Text style={styles.heading}>FOOD DELIVERY APP</Text>

              <LoginBadge width={200} height={80} />
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
          ]}
        >
          <Text style={styles.cardTitle}>Log in or sign up</Text>

          <View style={styles.mobileRow}>
            <Pressable
              style={({ pressed }) => [
                styles.countrySelector,
                pressed && styles.buttonPressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel={`Choose country. Current country is ${country.name}`}
              onPress={() => {
                Keyboard.dismiss();
                setIsCountryPickerOpen(true);
              }}
            >
              <Text
                accessibilityLabel={`${country.name} flag`}
                style={styles.countryFlag}
              >
                {country.flag}
              </Text>

              <Text style={styles.dropdownIcon}>▼</Text>
            </Pressable>

            <View
              style={[
                styles.phoneInputContainer,
                isInputFocused && styles.phoneInputContainerFocused,
              ]}
            >
              <Text style={styles.countryCode}>{country.callingCode}</Text>

              <TextInput
                value={mobileNumber}
                onChangeText={handleMobileNumberChange}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                placeholder={`Enter ${phoneNumberLength}-digit number`}
                placeholderTextColor="#69708E"
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
                autoComplete="tel"
                maxLength={phoneNumberLength}
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
                setRememberLogin((previousValue) => !previousValue)
              }
            >
              <View
                style={[
                  styles.checkbox,
                  rememberLogin && styles.checkboxSelected,
                ]}
              >
                {rememberLogin && <Text style={styles.checkmark}>✓</Text>}
              </View>

              <Text style={styles.rememberText}>
                Remember my login for faster sign-in
              </Text>
            </Pressable>
          )}

          <Pressable
            style={({ pressed }) => [
              styles.continueButton,
              isKeyboardOpen && styles.continueButtonKeyboardOpen,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </Pressable>

          {!isKeyboardOpen && (
            <>
              <View style={styles.socialRow}>
                <Pressable
                  style={({ pressed }) => [
                    styles.socialButton,
                    pressed && styles.buttonPressed,
                  ]}
                  onPress={handleGoogleLogin}
                >
                  <GoogleIcon width={30} height={30} />
                </Pressable>

                <Pressable
                  style={({ pressed }) => [
                    styles.socialButton,
                    pressed && styles.buttonPressed,
                  ]}
                  onPress={handleAppleLogin}
                >
                  <AppleIcon width={30} height={30} />
                </Pressable>

                <Pressable
                  style={({ pressed }) => [
                    styles.socialButton,
                    pressed && styles.buttonPressed,
                  ]}
                  onPress={handleEmailLogin}
                >
                  <EmailIcon width={30} height={30} />
                </Pressable>
              </View>

              <Text style={styles.agreementText}>
                By continuing, you agree to our
              </Text>

              <View style={styles.policyRow}>
                <Pressable onPress={handleTermsOfService}>
                  <Text style={styles.policyText}>Terms of Service</Text>
                </Pressable>

                <Pressable onPress={handlePrivacyPolicy}>
                  <Text style={styles.policyText}>Privacy Policy</Text>
                </Pressable>

                <Pressable onPress={handleContentPolicies}>
                  <Text style={styles.policyText}>Content Policies</Text>
                </Pressable>
              </View>
            </>
          )}
        </Animated.View>
      </View>

      <Modal
        animationType="slide"
        transparent
        visible={isCountryPickerOpen}
        onRequestClose={() => setIsCountryPickerOpen(false)}
      >
        <View style={styles.modalBackdrop}>
          <Pressable
            style={StyleSheet.absoluteFill}
            accessibilityLabel="Close country picker"
            onPress={() => setIsCountryPickerOpen(false)}
          />

          <SafeAreaView style={styles.countryModal} edges={["bottom"]}>
            <View style={styles.countryModalHeader}>
              <Text style={styles.countryModalTitle}>Select country</Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close country picker"
                hitSlop={12}
                onPress={() => setIsCountryPickerOpen(false)}
              >
                <Text style={styles.closeButton}>✕</Text>
              </Pressable>
            </View>

            <TextInput
              value={countrySearch}
              onChangeText={setCountrySearch}
              placeholder="Search country or code"
              placeholderTextColor="#69708E"
              autoCorrect={false}
              style={styles.countrySearchInput}
            />

            {isLoadingCountries ? (
              <View style={styles.countryListMessage}>
                <ActivityIndicator size="large" color="#5100D9" />
                <Text style={styles.countryListMessageText}>
                  Loading countries…
                </Text>
              </View>
            ) : (
              <FlatList
                data={filteredCountries}
                keyExtractor={(item) => item.isoCode}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.countryList}
                ListEmptyComponent={
                  <Text style={styles.countryListMessageText}>
                    No countries found.
                  </Text>
                }
                renderItem={({ item }) => (
                  <Pressable
                    style={({ pressed }) => [
                      styles.countryOption,
                      item.isoCode === country.isoCode &&
                        styles.countryOptionSelected,
                      pressed && styles.buttonPressed,
                    ]}
                    onPress={() => handleCountrySelect(item)}
                  >
                    <Text style={styles.countryOptionFlag}>{item.flag}</Text>
                    <Text style={styles.countryOptionName}>{item.name}</Text>
                    <Text style={styles.countryOptionCode}>
                      {item.callingCode}
                    </Text>
                  </Pressable>
                )}
              />
            )}
          </SafeAreaView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F1FF",
  },

  screen: {
    flex: 1,
    position: "relative",
    backgroundColor: "#F6F1FF",
    overflow: "hidden",
  },

  heroSection: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#F6F1FF",
  },

  heroBackground: {
    flex: 1,
    alignItems: "center",
  },

  heroImage: {
    width: "100%",
    height: "100%",
  },

  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(247, 243, 255, 0.05)",
  },

  skipButton: {
    position: "absolute",
    top: 18,
    right: 20,
    minWidth: 78,
    height: 40,
    borderRadius: 30,
    backgroundColor: "#E9DEFF",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
  },

  skipText: {
    color: "#8738F4",
    fontSize: 18,
    fontFamily: "Poppins-Medium",
  },

  headingContainer: {
    position: "absolute",
    top: 50,
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  heading: {
    color: "#1D1237",
    fontSize: 26,
    lineHeight: 36,
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    marginBottom: 5,
  },

  loginCard: {
    position: "absolute",
    left: 0,
    right: 0,
    minHeight: 430,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 38,
    borderTopRightRadius: 38,
    paddingTop: 20,
    paddingHorizontal: 24,
    paddingBottom: 34,
    borderWidth: 1,
    borderColor: "#E7DDF4",
    zIndex: 20,

    shadowColor: "#1D1237",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 8,
  },

  cardTitle: {
    color: "#1B102A",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
    marginBottom: 24,
  },

  mobileRow: {
    flexDirection: "row",
    gap: 12,
  },

  countrySelector: {
    width: 88,
    height: 60,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#E5DCF4",
    backgroundColor: "#FBF9FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },

  dropdownIcon: {
    color: "#696F8C",
    fontSize: 13,
  },

  countryFlag: {
    fontSize: 28,
    lineHeight: 32,
  },

  modalBackdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(29, 18, 55, 0.38)",
  },

  countryModal: {
    height: "78%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 20,
    paddingHorizontal: 20,
  },

  countryModalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  countryModalTitle: {
    color: "#1B102A",
    fontSize: 21,
    fontFamily: "Poppins-SemiBold",
  },

  closeButton: {
    color: "#69708E",
    fontSize: 22,
  },

  countrySearchInput: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#E5DCF4",
    backgroundColor: "#FBF9FF",
    color: "#1E1534",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    paddingHorizontal: 16,
    marginBottom: 12,
  },

  countryList: {
    paddingBottom: 24,
  },

  countryListMessage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },

  countryListMessageText: {
    color: "#69708E",
    fontSize: 15,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    paddingVertical: 24,
  },

  countryOption: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 4,
  },

  countryOptionSelected: {
    backgroundColor: "#F0EAFB",
  },

  countryOptionFlag: {
    width: 42,
    fontSize: 27,
  },

  countryOptionName: {
    flex: 1,
    color: "#1E1534",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },

  countryOptionCode: {
    color: "#69708E",
    fontSize: 15,
    fontFamily: "Poppins-SemiBold",
    marginLeft: 12,
  },

  phoneInputContainer: {
    flex: 1,
    height: 60,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#E5DCF4",
    backgroundColor: "#FBF9FF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  phoneInputContainerFocused: {
    borderColor: "#D7C5F4",
  },

  countryCode: {
    color: "#1E1534",
    fontSize: 17,
    fontFamily: "Poppins-SemiBold",
    marginRight: 16,
  },

  phoneInput: {
    flex: 1,
    height: "100%",
    color: "#1E1534",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    paddingVertical: 0,
  },

  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 26,
    paddingHorizontal: 2,
  },

  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#8034F4",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  checkboxSelected: {
    backgroundColor: "#8034F4",
  },

  checkmark: {
    color: "#FFFFFF",
    fontSize: 20,
    lineHeight: 23,
    fontFamily: "Poppins-SemiBold",
  },

  rememberText: {
    flex: 1,
    color: "#69708E",
    fontSize: 15,
    lineHeight: 22,
    fontFamily: "Poppins-Regular",
  },

  continueButton: {
    height: 60,
    borderRadius: 17,
    backgroundColor: "#5100D9",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  continueButtonKeyboardOpen: {
    marginTop: 28,
  },

  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
  },

  socialRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },

  socialButton: {
    flex: 1,
    height: 60,
    backgroundColor: "#F0EAFB",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  agreementText: {
    color: "#68708F",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Poppins-Regular",
    marginTop: 20,
  },

  policyRow: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    columnGap: 24,
    rowGap: 10,
  },

  policyText: {
    color: "#626A88",
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    textDecorationLine: "underline",
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

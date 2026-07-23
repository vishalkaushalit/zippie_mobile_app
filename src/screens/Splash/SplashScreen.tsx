import React, { useEffect } from 'react';
import {
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LocationIcon from '../../assets/icons/location.svg';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

type Props = NativeStackScreenProps<
    RootStackParamList,
    'Splash'
>;

export default function SplashScreen({
    navigation,
}: Props) {

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Login');
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <ImageBackground
            source={require('../../assets/images/splash_bg.png')}
            style={styles.background}
            resizeMode="cover">
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/images/logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />

                    <Text style={styles.tagline}>
                        Fast.Reliable.Always
                    </Text>
                </View>

                <View style={styles.footer}>
                    <LocationIcon
                        width={26}
                        height={26}
                    />

                    <Text style={styles.footerText}>
                        Africa's fast food delivery app
                    </Text>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
    },

    safeArea: {
        flex: 1,
        justifyContent: 'space-between',
    },

    logoContainer: {
        marginTop: 120,
        alignItems: 'center',
        paddingHorizontal: 20,
    },

    logo: {
        width: 200,
        height: 60,
    },

    tagline: {
        marginTop: 12,
        fontSize: 24,
        fontWeight: '700',
        color: '#6A2CF6',
    },

    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 20,
    },

    footerText: {
        marginLeft: 8,
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        fontWeight: '500',
        color: '#6A2CF6',
    },
});
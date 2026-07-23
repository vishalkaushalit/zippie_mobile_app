import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

interface HeaderProps {
    title: string;
    onBackPress?: () => void;
    showBackButton?: boolean;
    style?: ViewStyle;
}

export const Header: React.FC<HeaderProps> = ({
    title,
    onBackPress,
    showBackButton = false,
    style,
}) => {
    return (
        <View style={[styles.header, style]}>
            {showBackButton && (
                <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
            )}
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    backButton: {
        padding: 8,
        marginRight: 8,
    },
    backButtonText: {
        fontSize: 24,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

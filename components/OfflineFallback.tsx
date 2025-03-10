import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import LeleKartSvg from './Logo';

interface OfflineFallbackProps {
    onRetry: () => void;
}

export default function OfflineFallback({ onRetry }: OfflineFallbackProps) {
    return (
        <View style={styles.container}>
            <LeleKartSvg />
            <Text style={styles.title}>No Internet Connection</Text>
            <Text style={styles.subtitle}>Please check your connection and try again</Text>
            <TouchableOpacity style={styles.button} onPress={onRetry}>
                <Text style={styles.buttonText}>Retry</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#FF4646',
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 25,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

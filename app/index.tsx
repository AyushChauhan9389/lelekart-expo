import { ActivityIndicator, Animated, StyleSheet, Text, View } from "react-native";
import { WebView, WebViewNavigation } from "react-native-webview";
import { useRef, useState, useEffect } from "react";
import { SvgXml } from 'react-native-svg';
import LeleKartSvg from "@/components/Logo";
import { SafeAreaView } from "react-native-safe-area-context";



export default function Index() {
  const webViewRef = useRef<WebView>(null);
  const [isLoading, setIsLoading] = useState(true);
  const progressAnim = useRef(new Animated.Value(0)).current;

  const isUrlAllowed = (url: string) => {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.hostname === 'lelekart.com' || parsedUrl.hostname === 'www.lelekart.com';
    } catch {
      return false;
    }
  };

  useEffect(() => {
    if (isLoading) {
      progressAnim.setValue(0);
      Animated.sequence([
        Animated.timing(progressAnim, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: false,
        }),
        Animated.timing(progressAnim, {
          toValue: 0.9,
          duration: 500,
          useNativeDriver: false,
        })
      ]).start();
    } else {
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [isLoading]);

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    if (!isUrlAllowed(navState.url)) {
      webViewRef.current?.stopLoading();
      webViewRef.current?.injectJavaScript('window.location.href = "https://lelekart.com"');
    }
  };

  const handleShouldStartLoadWithRequest = (request: WebViewNavigation) => {
    return isUrlAllowed(request.url);
  };

  const width = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.webviewContainer}>
        <WebView
          ref={webViewRef}
          source={{ uri: 'https://lelekart.com' }}
          style={styles.webview}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          onNavigationStateChange={handleNavigationStateChange}
          onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          bounces={false}
          allowsBackForwardNavigationGestures={false}
          pullToRefreshEnabled={false}
          thirdPartyCookiesEnabled={false}
        />
        {isLoading && (
          <View style={styles.loaderContainer}>
            <LeleKartSvg />
            <View style={styles.progressBackground}>
              <Animated.View style={[styles.progressBar, { width }]} />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webviewContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  progressBackground: {
    width: '60%',
    height: 2,
    backgroundColor: '#e0e0e0',
    marginTop: 20,
    borderRadius: 1,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FF4646',
  }
});

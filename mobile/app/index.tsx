import { View, Text, Animated, Dimensions, ImageBackground, StyleSheet, Platform } from "react-native";
import { Link, useRouter } from "expo-router";
import { GradientButton } from "../src/components/ui/GradientButton";
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import WebLandingPage from "../src/components/screens/WebLandingPage";

const { width, height } = Dimensions.get("window");

const SLIDES = [
  {
    id: 1,
    title: "Save Together,\nLock Forever",
    description: "Create shared capsules for shared dreams. Pool funds, lock memories, and unlock them when the time is right.",
    bg: ['#F9F9F9', '#FFFFFF']
  },
  {
    id: 2,
    title: "Memories in\nthe Vault",
    description: "Store video messages and photos that unlock only when you reach your goal. A gift for your future selves.",
    bg: ['#F9F9F9', '#FFFFFF']
  },
  {
    id: 3,
    title: "Visual\nAccountability",
    description: "Track progress with beautiful visualizations. See your dreams getting closer every day.",
    bg: ['#F9F9F9', '#FFFFFF']
  }
];

export default function WelcomeScreen() {
  const router = useRouter();
  
  if (Platform.OS === 'web') {
    return <WebLandingPage />;
  }

  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="dark" />
      
      {/* Soft Background Gradient */}
      <LinearGradient
        colors={['#F9F9F9', '#FFFFFF', '#FFF1F2']}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Hero Content */}
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        style={{ flex: 1 }}
      >
        {SLIDES.map((item, index) => {
          const opacity = scrollX.interpolate({
            inputRange: [(index - 1) * width, index * width, (index + 1) * width],
            outputRange: [0, 1, 0],
          });
          
          const translateY = scrollX.interpolate({
            inputRange: [(index - 1) * width, index * width, (index + 1) * width],
            outputRange: [50, 0, 50],
          });

          return (
            <View key={item.id} style={{ width, height: height * 0.7, justifyContent: 'center', padding: 32 }}>
              <Animated.Text 
                style={{ 
                  opacity, 
                  transform: [{ translateY }],
                  fontSize: 48,
                  fontWeight: '800',
                  color: '#0A2647', // Secondary (Navy)
                  lineHeight: 56,
                  marginBottom: 16
                }}
              >
                {item.title}
              </Animated.Text>
              <Animated.Text 
                style={{ 
                  opacity, 
                  transform: [{ translateY }],
                  fontSize: 18,
                  color: '#666666', // TextSecondary
                  lineHeight: 28
                }}
              >
                {item.description}
              </Animated.Text>
            </View>
          );
        })}
      </Animated.ScrollView>

      {/* Pagination Dots */}
      <View className="flex-row justify-center mb-12">
        {SLIDES.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 24, 8],
            extrapolate: 'clamp',
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={i}
              style={{
                height: 8,
                width: dotWidth,
                borderRadius: 4,
                backgroundColor: '#FF6B6B', // Primary
                marginHorizontal: 4,
                opacity,
              }}
            />
          );
        })}
      </View>

      {/* Actions */}
      <View className="px-6 pb-12 w-full">
        <GradientButton 
          title="Get Started" 
          onPress={() => router.push("/(auth)/signup")}
          className="mb-4 shadow-primary/20"
        />
        
        <Link href="/(auth)/login" asChild>
          <GradientButton 
            title="I have an account" 
            onPress={() => router.push("/(auth)/login")}
            colors={['transparent', 'transparent']} // Transparent for outline effect
            className="border border-secondary/20 bg-transparent shadow-none"
            textClassName="text-secondary"
            textStyle={{ color: '#0A2647' }}
          />
        </Link>
      </View>
    </View>
  );
}

import React, { useRef } from "react";
import { Text, Pressable, Animated, ViewStyle, TextStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  colors?: readonly [string, string, ...string[]];
  className?: string;
  textClassName?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export function GradientButton({
  title,
  onPress,
  // Updated default colors to "Trust & Emotion" Primary Gradient (Soft Pink -> Coral)
  colors = ['#FF6B6B', '#FF8E8E'], 
  className,
  textClassName,
  style,
  textStyle,
  icon
}: GradientButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = async () => {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch {}
    onPress();
  };

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <LinearGradient
          colors={colors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            paddingVertical: 18,
            paddingHorizontal: 32,
            borderRadius: 100, // Pill shape
            alignItems: "center",
            justifyContent: "center",
            flexDirection: 'row',
            shadowColor: colors[0],
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          {icon && <React.Fragment>{icon}</React.Fragment>}
          <Text
            style={[
              {
                color: "#FFFFFF",
                fontSize: 16,
                fontWeight: "600",
                letterSpacing: 0.5,
                marginLeft: icon ? 8 : 0,
              },
              textStyle,
            ]}
          >
            {title}
          </Text>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}

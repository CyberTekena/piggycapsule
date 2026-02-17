import React from 'react';
import { View, ViewProps, Platform, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

interface GlassCardProps extends ViewProps {
  intensity?: number;
  tint?: 'light' | 'dark' | 'default';
  className?: string;
}

export function GlassCard({
  children,
  intensity = 20,
  tint = 'dark',
  className = '',
  style,
  ...props
}: GlassCardProps) {
  const isWeb = Platform.OS === 'web';

  if (isWeb) {
    return (
      <View 
        className={`overflow-hidden rounded-2xl border border-white/10 ${className}`} 
        style={[
          {
            backgroundColor: tint === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.1)',
            // @ts-ignore: web-only style
            backdropFilter: `blur(${intensity}px)`,
            WebkitBackdropFilter: `blur(${intensity}px)`,
          }, 
          style
        ]}
        {...props}
      >
        <View className="flex-1 p-4">
          {children}
        </View>
      </View>
    );
  }

  return (
    <View className={`overflow-hidden rounded-2xl border border-white/10 ${className}`} style={style} {...props}>
      <BlurView intensity={intensity} tint={tint} className="flex-1 p-4">
        {children}
      </BlurView>
    </View>
  );
}

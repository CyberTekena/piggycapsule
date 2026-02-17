import React from 'react';
import { View, Platform, ViewProps } from 'react-native';

interface ScreenWrapperProps extends ViewProps {
  children: React.ReactNode;
  maxWidth?: number;
}

export function ScreenWrapper({ children, maxWidth = 480, style, ...props }: ScreenWrapperProps) {
  if (Platform.OS === 'web') {
    return (
      <View className="flex-1 items-center bg-dark w-full h-full min-h-screen">
         {/* On web, constrain content to mobile-like width for app screens */}
        <View 
          className="flex-1 w-full bg-dark shadow-2xl" 
          style={[{ maxWidth, width: '100%', minHeight: '100vh' as any, alignSelf: 'center' }, style]}
          {...props}
        >
          {children}
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-dark" style={style} {...props}>
      {children}
    </View>
  );
}

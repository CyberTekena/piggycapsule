import React from 'react';
import { View, ViewProps, Platform, StyleSheet } from 'react-native';

interface WarmCardProps extends ViewProps {
  className?: string;
  elevation?: number;
}

export function WarmCard({
  children,
  className = '',
  style,
  elevation = 2,
  ...props
}: WarmCardProps) {
  return (
    <View 
      className={`bg-surface rounded-3xl ${className}`} 
      style={[
        {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
          elevation: elevation,
        },
        style
      ]}
      {...props}
    >
      {children}
    </View>
  );
}

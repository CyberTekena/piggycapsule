import React from 'react';
import { View, Text } from 'react-native';

interface CountdownTimerProps {
  daysLeft: number;
  targetDate?: string;
  compact?: boolean;
}

export function CountdownTimer({ daysLeft, targetDate, compact = false }: CountdownTimerProps) {
  if (compact) {
    return (
      <View className="bg-gray-100 px-3 py-1.5 rounded-full">
        <Text className="text-textSecondary text-xs font-bold">
          {daysLeft} days left
        </Text>
      </View>
    );
  }

  return (
    <View className="items-center">
      <Text className="text-secondary text-5xl font-bold mb-2">{daysLeft}</Text>
      <Text className="text-textSecondary text-sm font-medium">
        days left to future you
      </Text>
      {targetDate && (
        <Text className="text-textSecondary text-xs mt-1">
          Until {new Date(targetDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </Text>
      )}
    </View>
  );
}

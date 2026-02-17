import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '../../../src/components/layout/ScreenWrapper';
import { WarmCard } from '../../../src/components/ui/WarmCard';
import { GradientButton } from '../../../src/components/ui/GradientButton';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function CreateCapsuleStep1() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', target: '', endDate: '' });

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="dark" />
      <ScreenWrapper maxWidth={480} style={{ backgroundColor: 'transparent' }}>
        <ScrollView contentContainerStyle={{ padding: 24, flexGrow: 1 }}>
          
          {/* Header */}
          <View className="mb-8">
            <TouchableOpacity onPress={() => router.back()} className="mb-6">
              <Ionicons name="arrow-back" size={24} color="#0A2647" />
            </TouchableOpacity>
            
            <View className="flex-row items-center mb-4">
              <View className="w-8 h-8 rounded-full bg-primary items-center justify-center mr-3">
                <Text className="text-white font-bold text-sm">1</Text>
              </View>
              <View className="flex-1 h-1 bg-gray-200 rounded-full mr-2" />
              <View className="w-8 h-8 rounded-full bg-gray-200 items-center justify-center mr-2" />
              <View className="flex-1 h-1 bg-gray-200 rounded-full mr-2" />
              <View className="w-8 h-8 rounded-full bg-gray-200 items-center justify-center mr-2" />
              <View className="flex-1 h-1 bg-gray-200 rounded-full mr-2" />
              <View className="w-8 h-8 rounded-full bg-gray-200 items-center justify-center" />
            </View>

            <Text className="text-secondary text-3xl font-bold mb-2">What's your goal?</Text>
            <Text className="text-textSecondary text-base leading-relaxed">
              Give your capsule a name and set your target. This is a promise to your future self.
            </Text>
          </View>

          <WarmCard className="p-6 mb-6">
            <View className="mb-5">
              <Text className="text-secondary text-xs font-bold uppercase tracking-wider mb-2 ml-1">CAPSULE NAME</Text>
              <TextInput
                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-textPrimary text-lg font-medium"
                placeholder="Bali Trip Fund 🏝️"
                placeholderTextColor="#9CA3AF"
                value={form.name}
                onChangeText={(t) => setForm({ ...form, name: t })}
                selectionColor="#FF6B6B"
              />
            </View>

            <View className="mb-5">
              <Text className="text-secondary text-xs font-bold uppercase tracking-wider mb-2 ml-1">TARGET AMOUNT</Text>
              <View className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 flex-row items-center">
                <Text className="text-textSecondary font-bold text-lg mr-2">₦</Text>
                <TextInput
                  className="flex-1 text-textPrimary text-lg font-medium"
                  placeholder="500,000"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                  value={form.target}
                  onChangeText={(t) => setForm({ ...form, target: t })}
                  selectionColor="#FF6B6B"
                />
              </View>
            </View>

            <View>
              <Text className="text-secondary text-xs font-bold uppercase tracking-wider mb-2 ml-1">END DATE</Text>
              <TouchableOpacity className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 flex-row items-center">
                <Ionicons name="calendar-outline" size={20} color="#9CA3AF" style={{ marginRight: 12 }} />
                <Text className={`flex-1 text-lg font-medium ${form.endDate ? 'text-textPrimary' : 'text-gray-400'}`}>
                  {form.endDate || 'Pick a date'}
                </Text>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>
              <Text className="text-textSecondary text-xs mt-2 ml-1">
                Funds will be locked until this date
              </Text>
            </View>
          </WarmCard>

          <View className="flex-1" />

          <GradientButton
            title="Continue to Members"
            onPress={() => router.push('/create/step2')}
            className="mb-4"
            icon={<Ionicons name="arrow-forward" size={18} color="white" />}
          />
        </ScrollView>
      </ScreenWrapper>
    </View>
  );
}

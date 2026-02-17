import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '../../../src/components/layout/ScreenWrapper';
import { WarmCard } from '../../../src/components/ui/WarmCard';
import { GradientButton } from '../../../src/components/ui/GradientButton';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function CreateCapsuleStep2() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [members, setMembers] = useState<string[]>([]);

  const addMember = () => {
    if (phone.trim()) {
      setMembers([...members, phone]);
      setPhone('');
    }
  };

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
              <View className="w-8 h-8 rounded-full bg-success items-center justify-center mr-2">
                <Ionicons name="checkmark" size={16} color="white" />
              </View>
              <View className="flex-1 h-1 bg-success rounded-full mr-2" />
              <View className="w-8 h-8 rounded-full bg-primary items-center justify-center mr-2">
                <Text className="text-white font-bold text-sm">2</Text>
              </View>
              <View className="flex-1 h-1 bg-gray-200 rounded-full mr-2" />
              <View className="w-8 h-8 rounded-full bg-gray-200 items-center justify-center mr-2" />
              <View className="flex-1 h-1 bg-gray-200 rounded-full mr-2" />
              <View className="w-8 h-8 rounded-full bg-gray-200 items-center justify-center" />
            </View>

            <Text className="text-secondary text-3xl font-bold mb-2">Who's saving with you?</Text>
            <Text className="text-textSecondary text-base leading-relaxed">
              Invite friends or family. You'll all save together toward this shared goal.
            </Text>
          </View>

          <WarmCard className="p-6 mb-4">
            <View className="flex-row items-center mb-4">
              <Ionicons name="people-outline" size={24} color="#FF6B6B" style={{ marginRight: 12 }} />
              <Text className="text-secondary font-bold text-base flex-1">Add Members</Text>
            </View>
            
            <View className="flex-row mb-4">
              <TextInput
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-textPrimary text-base font-medium mr-3"
                placeholder="+234 800 000 0000"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                selectionColor="#FF6B6B"
              />
              <TouchableOpacity 
                onPress={addMember}
                className="bg-primary/10 w-12 h-12 rounded-xl items-center justify-center"
              >
                <Ionicons name="add" size={24} color="#FF6B6B" />
              </TouchableOpacity>
            </View>

            {members.length > 0 && (
              <View className="pt-4 border-t border-gray-100">
                {members.map((member, index) => (
                  <View key={index} className="flex-row items-center justify-between mb-3">
                    <View className="flex-row items-center flex-1">
                      <View className="w-10 h-10 bg-gray-200 rounded-full items-center justify-center mr-3">
                        <Text className="text-secondary font-bold">M</Text>
                      </View>
                      <Text className="text-textPrimary font-medium">{member}</Text>
                    </View>
                    <TouchableOpacity onPress={() => setMembers(members.filter((_, i) => i !== index))}>
                      <Ionicons name="close-circle" size={20} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </WarmCard>

          <View className="bg-amber-50 border border-accent/20 rounded-2xl p-4 mb-6">
            <View className="flex-row items-start">
              <Ionicons name="warning-outline" size={20} color="#D97706" style={{ marginRight: 8, marginTop: 2 }} />
              <View className="flex-1">
                <Text className="text-secondary font-bold text-sm mb-1">Unanimous Withdrawal Required</Text>
                <Text className="text-textSecondary text-xs leading-relaxed">
                  All members must approve any withdrawal. This keeps everyone accountable.
                </Text>
              </View>
            </View>
          </View>

          <View className="flex-1" />

          <GradientButton
            title={`Continue with ${members.length + 1} Member${members.length > 0 ? 's' : ''}`}
            onPress={() => router.push('/create/step3')}
            className="mb-4"
            icon={<Ionicons name="arrow-forward" size={18} color="white" />}
          />
           <TouchableOpacity onPress={() => router.push('/create/step3')} className="items-center py-3">
            <Text className="text-textSecondary">Skip - I'll save alone</Text>
          </TouchableOpacity>
        </ScrollView>
      </ScreenWrapper>
    </View>
  );
}

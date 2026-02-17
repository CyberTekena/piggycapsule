import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image } from "react-native";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { GradientButton } from "../../src/components/ui/GradientButton";
import { ScreenWrapper } from "../../src/components/layout/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import { WarmCard } from "../../src/components/ui/WarmCard";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  const router = useRouter();
  const [phone, setPhone] = useState("");

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View className="flex-1 bg-background">
        <StatusBar style="dark" />
        
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
          <ScreenWrapper maxWidth={420} style={{ backgroundColor: 'transparent', shadowOpacity: 0 }}>
            
            <View className="items-center mb-8">
              <View className="w-16 h-16 bg-primary/10 rounded-2xl items-center justify-center mb-4">
                 <Ionicons name="lock-closed" size={32} color="#FF6B6B" />
              </View>
              <Text className="text-secondary font-bold text-2xl tracking-tight mb-2">Welcome Back</Text>
              <Text className="text-textSecondary text-center">
                 Your savings are safe. Log in to check your progress.
              </Text>
            </View>

            <WarmCard className="p-6 mb-8">
              <View className="mb-6">
                <Text className="text-secondary text-xs font-bold uppercase tracking-wider mb-2 ml-1">PHONE NUMBER</Text>
                <View className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex-row items-center focus:border-primary focus:bg-white transition-all">
                  <Ionicons name="call-outline" size={20} color="#9CA3AF" style={{ marginRight: 12 }} />
                  <TextInput 
                    className="flex-1 text-textPrimary text-lg font-medium"
                    placeholder="+234 800 000 0000"
                    placeholderTextColor="#9CA3AF"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    autoCapitalize="none"
                    selectionColor="#FF6B6B"
                  />
                </View>
              </View>

              <GradientButton 
                title="Secure Login" 
                onPress={() => router.push("/(auth)/otp")}
                className="mb-4 shadow-primary/20"
                icon={<Ionicons name="shield-checkmark-outline" size={18} color="white" />}
              />
            </WarmCard>

            <View className="flex-row justify-center items-center">
              <Text className="text-textSecondary mr-2">New to PiggyCapsule?</Text>
              <Link href="/(auth)/signup" asChild>
                <TouchableOpacity>
                  <Text className="text-primary font-bold">Create Account</Text>
                </TouchableOpacity>
              </Link>
            </View>

          </ScreenWrapper>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

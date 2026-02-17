import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { GradientButton } from "../../src/components/ui/GradientButton";
import { ScreenWrapper } from "../../src/components/layout/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import { WarmCard } from "../../src/components/ui/WarmCard";
import { Ionicons } from "@expo/vector-icons";

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({ phone: "", firstName: "", lastName: "" });

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
              <Text className="text-primary font-bold text-sm tracking-widest uppercase mb-2">JOIN THE MOVEMENT</Text>
              <Text className="text-secondary text-3xl font-bold tracking-tight text-center">
                Save Together.<br/>Remember Forever.
              </Text>
            </View>

            <WarmCard className="p-6 mb-8">
              <View className="flex-row mb-4 space-x-4">
                <View className="flex-1">
                  <Text className="text-secondary text-xs font-bold uppercase tracking-wider mb-2 ml-1">FIRST NAME</Text>
                  <TextInput 
                    className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-textPrimary text-lg font-medium"
                    onChangeText={(t) => setForm({...form, firstName: t})}
                    placeholder="Jane"
                    placeholderTextColor="#9CA3AF"
                    selectionColor="#FF6B6B"
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-secondary text-xs font-bold uppercase tracking-wider mb-2 ml-1">LAST NAME</Text>
                  <TextInput 
                    className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-textPrimary text-lg font-medium"
                    onChangeText={(t) => setForm({...form, lastName: t})}
                    placeholder="Doe"
                    placeholderTextColor="#9CA3AF"
                    selectionColor="#FF6B6B"
                  />
                </View>
              </View>

              <View className="mb-6">
                <Text className="text-secondary text-xs font-bold uppercase tracking-wider mb-2 ml-1">PHONE NUMBER</Text>
                <View className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex-row items-center">
                  <Ionicons name="call-outline" size={20} color="#9CA3AF" style={{ marginRight: 12 }} />
                  <TextInput 
                    className="flex-1 text-textPrimary text-lg font-medium"
                    keyboardType="phone-pad"
                    onChangeText={(t) => setForm({...form, phone: t})}
                    placeholder="+234 800 000 0000"
                    placeholderTextColor="#9CA3AF"
                    selectionColor="#FF6B6B"
                  />
                </View>
              </View>

              <GradientButton 
                title="Create Account" 
                onPress={() => router.push("/(auth)/otp")}
                className="mb-4 shadow-primary/20"
                colors={['#0A2647', '#144272']} // Navy for secondary action style
              />
              
              <Text className="text-center text-xs text-textSecondary px-4">
                 By joining, you agree to our trustworthy Terms & Privacy Policy.
              </Text>
            </WarmCard>

            <View className="flex-row justify-center items-center">
              <Text className="text-textSecondary mr-2">Already have an account?</Text>
              <Link href="/(auth)/login" asChild>
                <TouchableOpacity>
                  <Text className="text-primary font-bold">Log In</Text>
                </TouchableOpacity>
              </Link>
            </View>

          </ScreenWrapper>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

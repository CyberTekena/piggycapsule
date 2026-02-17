import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { GradientButton } from "../../src/components/ui/GradientButton";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import { ScreenWrapper } from "../../src/components/layout/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";

export default function OTP() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleInput = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
    if (!text && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View className="flex-1 bg-background">
        <StatusBar style="dark" />
        
        <ScreenWrapper maxWidth={420} style={{ backgroundColor: 'transparent', shadowOpacity: 0, justifyContent: 'center', paddingHorizontal: 24 }}>
          <View className="items-center mb-8">
            <View className="w-16 h-16 bg-accent/20 rounded-full items-center justify-center mb-6 border border-accent/30">
               <Ionicons name="key" size={28} color="#D97706" />
            </View>
            <Text className="text-secondary text-3xl font-bold mb-2 tracking-tight">Verify Identity</Text>
            <Text className="text-textSecondary text-center max-w-[280px] leading-6">
              We sent a secure code to <Text className="text-secondary font-bold">+234 800 000 0000</Text>
            </Text>
          </View>
          
          <View className="flex-row justify-between mb-12 px-2">
            {[0,1,2,3,4,5].map((i) => (
              <TextInput
                key={i}
                ref={(ref: TextInput | null) => { inputs.current[i] = ref; }}
                className={`w-12 h-14 rounded-xl border text-center text-xl font-bold ${code[i] ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 bg-white text-gray-400'}`}
                maxLength={1}
                keyboardType="number-pad"
                value={code[i]}
                onChangeText={(text) => handleInput(text, i)}
                selectionColor="#FF6B6B"
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === 'Backspace' && !code[i] && i > 0) {
                    inputs.current[i - 1]?.focus();
                  }
                }}
              />
            ))}
          </View>

          <GradientButton 
            title="Verify & Secure Login" 
            onPress={() => router.replace("/(tabs)/home")}
            className="mb-6 shadow-primary/20"
            icon={<Ionicons name="lock-closed" size={18} color="white" />}
          />
          
          <TouchableOpacity className="items-center mt-4">
            <Text className="text-textSecondary mb-1">Didn't receive code?</Text>
            <Text className="text-primary font-bold border-b border-primary/30 pb-0.5">Resend Secure Code</Text>
          </TouchableOpacity>
        </ScreenWrapper>
      </View>
    </KeyboardAvoidingView>
  );
}

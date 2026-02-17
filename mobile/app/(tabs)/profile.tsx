import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Profile() {
  return (
    <View className="flex-1 bg-dark justify-center items-center">
      <LinearGradient
        colors={['#121212', '#1a1a2e']}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
      />
      <Text className="text-white text-2xl font-bold">Profile</Text>
      <Text className="text-gray-500">Coming Soon</Text>
    </View>
  );
}

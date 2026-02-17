import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions } from "react-native";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { GlassCard } from "../../src/components/ui/GlassCard";
import { GradientButton } from "../../src/components/ui/GradientButton";
import { CAPSULES, RECENT_ACTIVITY } from "../../src/data/mock";
import { BlurView } from "expo-blur";

const { width } = Dimensions.get("window");

export default function CapsuleDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const capsule = CAPSULES.find(c => c.id === id);
  const activities = RECENT_ACTIVITY.filter(a => a.capsuleId === id);

  if (!capsule) {
    return (
      <View className="flex-1 bg-dark justify-center items-center">
        <Text className="text-white">Capsule not found</Text>
      </View>
    );
  }

  const progress = (capsule.currentAmount / capsule.goalAmount) * 100;

  return (
    <View className="flex-1 bg-dark">
      <StatusBar style="light" />
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header Hero */}
        <View style={{ height: 300, overflow: 'hidden' }}>
          <LinearGradient
            colors={capsule.color as any}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ width: '100%', height: '100%', position: 'absolute' }}
          />
          <Image 
             source={{ uri: 'https://images.unsplash.com/photo-1549637642-90187f64f420?q=80&w=2948&auto=format&fit=crop' }} 
             style={{ width: '100%', height: '100%', opacity: 0.3 }}
          />
          <LinearGradient
            colors={['transparent', '#121212']}
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 150 }}
          />
          
          {/* Back Button */}
          <View className="absolute top-12 left-6 z-10">
            <TouchableOpacity 
              onPress={() => router.back()} 
              className="w-10 h-10 bg-black/20 rounded-full items-center justify-center backdrop-blur-md"
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View className="absolute bottom-8 left-6 right-6">
             <View className="bg-white/20 self-start px-3 py-1 rounded-full mb-3 backdrop-blur-md">
                <Text className="text-white font-bold text-xs uppercase tracking-wider">{capsule.status} CAPSULE</Text>
             </View>
             <Text className="text-white text-4xl font-extrabold tracking-tighter drop-shadow-md">{capsule.title}</Text>
          </View>
        </View>

        <View className="px-6 -mt-6">
           {/* Stats Cards */}
           <View className="flex-row space-x-4 mb-6">
              <GlassCard className="flex-1 p-4 items-center">
                 <Text className="text-gray-400 text-xs font-bold uppercase mb-1">SAVED</Text>
                 <Text className="text-white text-xl font-bold">${capsule.currentAmount.toLocaleString()}</Text>
                 <Text className="text-primary text-xs font-bold">{progress.toFixed(0)}%</Text>
              </GlassCard>
              <GlassCard className="flex-1 p-4 items-center">
                 <Text className="text-gray-400 text-xs font-bold uppercase mb-1">TARGET</Text>
                 <Text className="text-white text-xl font-bold">${capsule.goalAmount.toLocaleString()}</Text>
                 <Text className="text-gray-500 text-xs font-bold">Goal</Text>
              </GlassCard>
              <GlassCard className="flex-1 p-4 items-center">
                 <Text className="text-gray-400 text-xs font-bold uppercase mb-1">DUE</Text>
                 <Text className="text-white text-xl font-bold tracking-tighter">Dec 25</Text>
                 <Text className="text-gray-500 text-xs font-bold">2024</Text>
              </GlassCard>
           </View>

           {/* Contributors */}
           <View className="mb-8">
              <Text className="text-white text-lg font-bold mb-4">Contributors</Text>
              <View className="flex-row items-center">
                {capsule.contributors.map((c, i) => (
                  <Image 
                    key={c.id}
                    source={{ uri: c.avatar }}
                    className="w-12 h-12 rounded-full border-2 border-dark"
                    style={{ marginLeft: i > 0 ? -12 : 0, zIndex: 10 - i }}
                  />
                ))}
                <TouchableOpacity className="w-12 h-12 rounded-full bg-gray-800 border-2 border-dark items-center justify-center -ml-3 z-0">
                  <Ionicons name="add" size={24} color="#666" />
                </TouchableOpacity>
              </View>
           </View>

           {/* Memory Timeline (Preview) */}
           <View className="mb-8">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-white text-lg font-bold">Memory Vault</Text>
                <View className="bg-primary/20 px-2 py-1 rounded">
                   <Text className="text-primary text-xs font-bold">3 LOCKED</Text>
                </View>
              </View>
              
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-6 px-6">
                 {[1, 2, 3].map((i) => (
                   <View key={i} className="mr-4 w-32 h-40 bg-gray-800 rounded-2xl overflow-hidden justify-center items-center border border-gray-700">
                      <LinearGradient
                        colors={['rgba(255,255,255,0.05)', 'rgba(255,255,255,0)']}
                        style={{ position: 'absolute', width: '100%', height: '100%' }}
                      />
                      <BlurView intensity={20} className="w-16 h-16 rounded-full bg-black/30 items-center justify-center mb-2">
                        <Ionicons name="lock-closed" size={24} color="#666" />
                      </BlurView>
                      <Text className="text-gray-500 text-xs font-bold">Dec 25</Text>
                   </View>
                 ))}
                 <View className="mr-4 w-32 h-40 border-2 border-dashed border-gray-700 rounded-2xl justify-center items-center">
                    <Ionicons name="add" size={32} color="#444" />
                    <Text className="text-gray-500 text-xs font-bold mt-2">Add Memory</Text>
                 </View>
              </ScrollView>
           </View>

           {/* Recent Activity List */}
           <View>
              <Text className="text-white text-lg font-bold mb-4">History</Text>
              {activities.length > 0 ? activities.map((item) => (
                <View key={item.id} className="flex-row items-center mb-4">
                  <View className={`w-10 h-10 rounded-full items-center justify-center mr-4 ${item.type === 'contribution' ? 'bg-green-500/20' : 'bg-purple-500/20'}`}>
                    <Ionicons 
                      name={item.type === 'contribution' ? "cash-outline" : "videocam-outline"} 
                      size={20} 
                      color={item.type === 'contribution' ? "#4ADE80" : "#C084FC"} 
                    />
                  </View>
                   <View className="flex-1">
                    <Text className="text-white font-bold text-base">
                      {item.user.name} {item.type === 'contribution' ? `added $${item.amount}` : 'added a memory'}
                    </Text>
                    <Text className="text-gray-500 text-xs">{item.date}</Text>
                  </View>
                </View>
              )) : (
                <Text className="text-gray-500">No activity yet.</Text>
              )}
           </View>

        </View>
      </ScrollView>

      {/* Floating Action Bar */}
      <View className="absolute bottom-6 left-6 right-6 flex-row space-x-4">
         <GradientButton 
            title="Contribute" 
            onPress={() => {}}
            className="flex-1 shadow-xl shadow-primary/30"
         />
         <TouchableOpacity 
            className="w-14 h-14 bg-gray-800 rounded-2xl items-center justify-center border border-gray-700"
            onPress={() => {}}
         >
            <Ionicons name="videocam" size={24} color="white" />
         </TouchableOpacity>
      </View>
    </View>
  );
}

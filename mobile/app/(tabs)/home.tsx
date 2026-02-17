import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { WarmCard } from "../../src/components/ui/WarmCard";
import { CircularProgress } from "../../src/components/ui/CircularProgress";
import { GradientButton } from "../../src/components/ui/GradientButton";
import { ScreenWrapper } from "../../src/components/layout/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { CURRENT_USER, CAPSULES, RECENT_ACTIVITY } from "../../src/data/mock";

export default function Home() {
  const router = useRouter();

  const renderCapsule = ({ item }: { item: typeof CAPSULES[0] }) => (
    <TouchableOpacity 
      onPress={() => router.push(`/capsule/${item.id}`)}
      className="mr-4"
    >
      <WarmCard className="w-64 p-5 h-full justify-between border-l-4 border-l-primary/20">
        <View>
          <View className="flex-row justify-between items-start mb-4">
             <View className="bg-primary/10 w-10 h-10 rounded-full items-center justify-center">
                <Ionicons name={item.type === 'savings' ? 'cash-outline' : 'time-outline'} size={20} color="#FF6B6B" />
             </View>
             <View className="bg-gray-100 px-2 py-1 rounded-md">
                <Text className="text-textSecondary text-xs font-bold">{item.daysLeft} days left</Text>
             </View>
          </View>
          <Text className="text-lg font-bold text-secondary mb-1" numberOfLines={1}>{item.title}</Text>
          <Text className="text-textSecondary text-xs mb-4">Target: {item.goalAmount}</Text>
        </View>
        
        <View className="flex-row items-center justify-between">
           <View>
              <Text className="text-2xl font-bold text-secondary">{item.currentAmount}</Text>
              <Text className="text-textSecondary text-xs">Saved so far</Text>
           </View>
           <CircularProgress size={50} strokeWidth={4} progress={item.progress} showText={false} color="#FF6B6B" trackColor="#F3F4F6" />
        </View>
      </WarmCard>
    </TouchableOpacity>
  );

  const renderActivity = ({ item }: { item: typeof RECENT_ACTIVITY[0] }) => (
    <View className="flex-row items-center mb-6">
      <View className="w-10 h-10 rounded-full bg-gray-200 items-center justify-center mr-4 border-2 border-white shadow-sm">
        <Text className="text-secondary font-bold">{item.user[0]}</Text>
      </View>
      <View className="flex-1">
        <Text className="text-secondary font-medium">
          <Text className="font-bold">{item.user}</Text> {item.action}
        </Text>
        <Text className="text-textSecondary text-xs mt-0.5">{item.time}</Text>
      </View>
      {item.amount && (
        <Text className="text-success font-bold bg-success/10 px-2 py-1 rounded-md text-xs">{item.amount}</Text>
      )}
    </View>
  );

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <ScreenWrapper maxWidth={600} style={{ padding: 0 }}>
        
        {/* Header */}
        <View className="pt-16 pb-8 px-6 bg-white rounded-b-[40px] shadow-sm mb-6">
          <View className="flex-row justify-between items-center mb-6">
            <View>
              <Text className="text-textSecondary text-sm font-medium mb-1">Good Morning,</Text>
              <Text className="text-secondary text-2xl font-bold">{CURRENT_USER.name}</Text>
            </View>
            <TouchableOpacity className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center border border-gray-100 shadow-sm">
              <Ionicons name="notifications-outline" size={20} color="#1A1A1A" />
              <View className="absolute top-2 right-2.5 w-2 h-2 bg-error rounded-full border border-white" />
            </TouchableOpacity>
          </View>

          <WarmCard className="p-6 flex-row items-center justify-between bg-secondary shadow-lg shadow-secondary/30">
             <View>
                <Text className="text-white/70 text-sm font-medium mb-1">Total Savings</Text>
                <Text className="text-white text-3xl font-bold mb-2">₦2,450,000</Text>
                <Text className="text-white/50 text-xs"> across 3 capsules</Text>
             </View>
             <View className="items-center justify-center">
                <CircularProgress size={80} strokeWidth={6} progress={65} color="#FFC107" trackColor="rgba(255,255,255,0.1)" />
             </View>
          </WarmCard>
        </View>

        {/* Active Capsules */}
        <View className="px-6 mb-8">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-secondary">Your Capsules</Text>
            <TouchableOpacity>
               <Text className="text-primary font-bold text-sm">View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            data={CAPSULES}
            renderItem={renderCapsule}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 24 }}
            className="overflow-visible"
          />
        </View>

        {/* Quick Actions */}
        <View className="px-6 mb-8 flex-row justify-between space-x-4">
           <TouchableOpacity className="flex-1 bg-white p-4 rounded-2xl items-center shadow-soft active:scale-95 transition-transform">
              <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mb-2">
                 <Ionicons name="add" size={24} color="#FF6B6B" />
              </View>
              <Text className="text-secondary font-bold text-xs">New Capsule</Text>
           </TouchableOpacity>
           <TouchableOpacity className="flex-1 bg-white p-4 rounded-2xl items-center shadow-soft active:scale-95 transition-transform">
              <View className="w-10 h-10 bg-accent/10 rounded-full items-center justify-center mb-2">
                 <Ionicons name="videocam" size={24} color="#D97706" />
              </View>
              <Text className="text-secondary font-bold text-xs">Record Memory</Text>
           </TouchableOpacity>
           <TouchableOpacity className="flex-1 bg-white p-4 rounded-2xl items-center shadow-soft active:scale-95 transition-transform">
              <View className="w-10 h-10 bg-green-50 rounded-full items-center justify-center mb-2">
                 <Ionicons name="gift-outline" size={24} color="#10B981" />
              </View>
              <Text className="text-secondary font-bold text-xs">Invite Friend</Text>
           </TouchableOpacity>
        </View>

        {/* Activity Feed */}
        <View className="px-6">
          <Text className="text-lg font-bold text-secondary mb-4">Recent Activity</Text>
          <View className="bg-white rounded-3xl p-6 shadow-soft">
             {RECENT_ACTIVITY.map((item, index) => (
               <View key={item.id}>
                 {renderActivity({ item })}
                 {index < RECENT_ACTIVITY.length - 1 && <View className="h-[1px] bg-gray-100 ml-14 mb-4" />}
               </View>
             ))}
          </View>
        </View>

        </ScreenWrapper>
      </ScrollView>
    </View>
  );
}

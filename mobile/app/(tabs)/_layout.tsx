import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: Platform.OS === 'ios' ? 85 : 65,
          elevation: 0,
          backgroundColor: 'transparent',
          borderTopWidth: 0,
        },
        tabBarBackground: () => (
          <BlurView 
            intensity={80} 
            tint="dark" 
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0,
              backgroundColor: 'rgba(18, 18, 18, 0.8)'
            }} 
          />
        ),
        tabBarActiveTintColor: '#FF2E63',
        tabBarInactiveTintColor: '#666',
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View className={`items-center justify-center ${focused ? 'bg-primary/10 w-12 h-12 rounded-full' : ''}`}>
               <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} />
            </View>
          ),
        }}
      />
      
      {/* 
         Placeholder screens for now. 
         In a real app, I'd create these files.
         For the sake of the demo, they will point to home or a "Coming Soon" placeholder if I created one.
         But since I didn't create explore.tsx etc, I should probably hide them or point them to home for now to avoid errors,
         OR create empty placeholders. I'll create empty placeholders to avoid routing errors.
      */}
      
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ color, focused }) => (
             <View className={`items-center justify-center ${focused ? 'bg-primary/10 w-12 h-12 rounded-full' : ''}`}>
               <Ionicons name={focused ? "compass" : "compass-outline"} size={24} color={color} />
             </View>
          ),
        }}
      />

      <Tabs.Screen
        name="activity"
        options={{
          tabBarIcon: ({ color, focused }) => (
             <View className={`items-center justify-center ${focused ? 'bg-primary/10 w-12 h-12 rounded-full' : ''}`}>
              <Ionicons name={focused ? "time" : "time-outline"} size={24} color={color} />
             </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
             <View className={`items-center justify-center ${focused ? 'bg-primary/10 w-12 h-12 rounded-full' : ''}`}>
              <Ionicons name={focused ? "person" : "person-outline"} size={24} color={color} />
             </View>
          ),
        }}
      />
    </Tabs>
  );
}

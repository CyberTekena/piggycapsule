import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { WarmCard } from '../ui/WarmCard';
import { GradientButton } from '../ui/GradientButton';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Redesigned Web Landing Page using "Trust & Emotion" theme
export default function WebLandingPage() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-background">
      {/* Navbar */}
      <View className="flex-row justify-between items-center px-8 py-6 max-w-7xl mx-auto w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <View className="flex-row items-center">
            <View className="w-10 h-10 bg-primary/10 rounded-xl items-center justify-center mr-3">
               <Ionicons name="wallet" size={24} color="#FF6B6B" />
            </View>
            <Text className="text-secondary text-2xl font-extrabold tracking-tight">
              Piggy<Text className="text-primary">Capsule</Text>
            </Text>
        </View>
        
        <View className="flex-row items-center space-x-8">
            <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
               <Text className="text-textSecondary font-bold text-sm hover:text-primary transition-colors">Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity 
               className="bg-secondary px-6 py-2.5 rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-secondary/20"
               onPress={() => router.push('/(auth)/signup')}
            >
               <Text className="text-white font-bold text-sm">Start Saving</Text>
            </TouchableOpacity>
        </View>
      </View>

      {/* Hero Section */}
      <View className="relative min-h-[85vh] flex items-center justify-center px-6 overflow-hidden">
        {/* Soft Background Blobs */}
        <View className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
           <View className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[100px]" />
           <View className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-accent/5 rounded-full blur-[100px]" />
        </View>

        <View className="max-w-4xl mx-auto w-full items-center z-10 text-center">
            <View className="bg-white border border-gray-100 px-4 py-1.5 rounded-full mb-8 shadow-sm flex-row items-center space-x-2">
               <View className="w-2 h-2 rounded-full bg-success animate-pulse" />
               <Text className="text-secondary text-xs font-bold tracking-widest uppercase">Trusted by 10,000+ Savers</Text>
            </View>
            
            <Text className="text-secondary text-6xl md:text-7xl font-extrabold text-center leading-[1.1] mb-8 tracking-tight">
               Save Together, <br/>
               <Text className="text-primary">Remember Forever.</Text>
            </Text>
            
            <Text className="text-textSecondary text-xl md:text-2xl text-center max-w-2xl mb-12 leading-relaxed font-medium">
               Create shared capsules for your biggest dreams. Pool funds, lock video memories, and unlock them only when you reach your goal.
            </Text>
            
            <View className="flex-row space-x-4 items-center">
               <TouchableOpacity 
                  onPress={() => router.push('/(auth)/signup')}
                  className="shadow-xl shadow-primary/30 active:scale-95 transition-transform"
               >
                  <LinearGradient
                    colors={['#FF6B6B', '#FF8E8E']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ paddingVertical: 18, paddingHorizontal: 48, borderRadius: 100 }}
                  >
                     <Text className="text-white font-bold text-lg">Create a Capsule</Text>
                  </LinearGradient>
               </TouchableOpacity>
               
               <TouchableOpacity 
                  onPress={() => {}}
                  className="bg-white border border-gray-200 px-10 py-4 rounded-full hover:bg-gray-50 transition-colors shadow-sm"
               >
                  <Text className="text-secondary font-bold text-lg flex-row items-center">
                    <Ionicons name="play-circle" size={20} style={{ marginRight: 8 }} />
                    How it Works
                  </Text>
               </TouchableOpacity>
            </View>

            {/* Trust Signals */}
            <View className="mt-16 flex-row items-center space-x-8 opacity-60">
               <View className="flex-row items-center space-x-2">
                  <Ionicons name="shield-checkmark" size={18} color="#0A2647" />
                  <Text className="font-bold text-secondary text-sm">Bank-Grade Security</Text>
               </View>
               <View className="flex-row items-center space-x-2">
                  <Ionicons name="lock-closed" size={18} color="#0A2647" />
                  <Text className="font-bold text-secondary text-sm">Strictly Locked Funds</Text>
               </View>
            </View>
        </View>
      </View>

      {/* Emotional Features Grid */}
      <View className="max-w-7xl mx-auto px-6 py-24 w-full">
         <View className="text-center items-center mb-16">
            <Text className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Why PiggyCapsule?</Text>
            <Text className="text-secondary text-4xl font-bold">More than just a savings app.</Text>
         </View>
         
         <View className="flex-row flex-wrap justify-center -mx-4">
             {[
               { 
                 icon: 'videocam', 
                 title: 'Video Vault', 
                 desc: 'Attach video messages to every deposit. Remind your future self why this matters.',
                 color: 'bg-primary/10',
                 iconColor: '#FF6B6B'
               },
               { 
                 icon: 'people', 
                 title: 'Shared Dreams', 
                 desc: 'Invite friends and family. See who contributes, and cheer each other on.',
                 color: 'bg-secondary/10',
                 iconColor: '#0A2647'
               },
               { 
                 icon: 'lock-closed', 
                 title: 'Iron-Clad Lock', 
                 desc: 'No withdrawals until the goal is met. We keep your promise when you cant.',
                 color: 'bg-accent/10',
                 iconColor: '#D97706'
               }
             ].map((feature, i) => (
                <View key={i} className="w-full md:w-1/3 px-4 mb-8">
                   <WarmCard className="h-full p-8 hover:-translate-y-2 transition-transform duration-300 border border-gray-100">
                      <View className={`w-14 h-14 ${feature.color} rounded-2xl items-center justify-center mb-6`}>
                         <Ionicons name={feature.icon as any} size={28} color={feature.iconColor} />
                      </View>
                      <Text className="text-secondary text-xl font-bold mb-3">{feature.title}</Text>
                      <Text className="text-textSecondary leading-relaxed">{feature.desc}</Text>
                   </WarmCard>
                </View>
             ))}
         </View>
      </View>

      {/* Footer */}
      <View className="bg-white border-t border-gray-100 py-12 mt-12">
         <View className="max-w-7xl mx-auto px-6 flex-row justify-between items-center text-center">
             <View>
                <Text className="text-secondary font-bold text-lg mb-1">PiggyCapsule</Text>
                <Text className="text-gray-400 text-sm">© 2026. Made with ❤️ for future you.</Text>
             </View>
             <View className="flex-row space-x-8">
                <Text className="text-textSecondary font-medium hover:text-primary transition-colors cursor-pointer">Privacy</Text>
                <Text className="text-textSecondary font-medium hover:text-primary transition-colors cursor-pointer">Terms</Text>
                <Text className="text-textSecondary font-medium hover:text-primary transition-colors cursor-pointer">Support</Text>
             </View>
         </View>
      </View>
    </ScrollView>
  );
}

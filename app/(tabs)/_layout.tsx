import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AntDesign } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].icon,
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          default: {
            backgroundColor: "#6db611",
            paddingTop: 4,
          },
        }),
      }}>
        
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <AntDesign name='home' size={28} color={color} />,
        }}
      />

      <Tabs.Screen
        name="camera"
        options={{
          title: 'Camera',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <AntDesign name='camerao' size={28} color={color} />,
        }}
      />

      <Tabs.Screen
        name="learn"
        options={{
          title: 'Learn',
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <AntDesign name='book' size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}

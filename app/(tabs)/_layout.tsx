import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

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
                        borderTopWidth: 1,
                        borderTopColor: "#A3A3A3",
                        paddingTop: 4,
                    },
                }),
            }}>

            <Tabs.Screen
                name="index"
                options={{
                    sceneStyle: {
                        backgroundColor: "#fff"
                    },
                    title: 'Home',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color }) => <FontAwesome5 name='home' size={24} color={color} />
                }}
            />
            <Tabs.Screen
                name="classification"
                options={{
                    sceneStyle: {
                        backgroundColor: "#fff"
                    },
                    title: 'Classification',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color }) => <FontAwesome5 name='camera' size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="learn"
                options={{
                    sceneStyle: {
                        backgroundColor: "#fff"
                    },
                    title: 'Learn',
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color }) => <FontAwesome5 name='book' size={24} color={color} />,
                }}
            />
        </Tabs>
    );
}

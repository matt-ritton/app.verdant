import React, { useCallback } from "react";
import HeaderBar from "@/components/ui/Header";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import TakePhotoCard from "@/components/TakePhotoCard";
import { appStorage } from "@/lib/storage";
import { ChevronRightIcon, Icon } from "@/components/ui/icon";
import Articles from "@/components/Articles";
import FeaturedArticles from "@/components/FeaturedArticles";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeScreen() {
    useFocusEffect(
        useCallback(() => {
            if (appStorage.getString('hasSeenWelcome') !== '1') {
                router.replace('/welcome');
            }
        }, [])
    );

    return (
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
            <HeaderBar />

            {/* Content */}
            <View className="flex flex-col gap-8 py-4">

                {/* Featured section */}
                <View className="flex flex-col gap-10 px-6">
                    <View className='flex flex-row justify-between items-center'>
                        <Text className="text-lg" style={{ fontFamily: 'PoppinsMedium' }}>Em destaque</Text>

                        {/*
                        <TouchableOpacity className="flex flex-row items-center" onPress={() => {}}>
                            <Text className="text-sm text-[#A3A3A3]" style={{ fontFamily: 'PoppinsLight' }}>Ver mais</Text>
                            <Icon as={ChevronRightIcon} size="sm" color="#A3A3A3" />
                        </TouchableOpacity>
                        */}
                    </View>
                    <View>
                        <FeaturedArticles />

                    </View>
                </View>

                {/* Card section */}
                <View className="px-6">
                    <TakePhotoCard />
                </View>

                {/* Articles section */}
                <View className="flex flex-col gap-6 ">
                    <View className="flex flex-row justify-between items-center  px-6 ">
                        <Text className="text-lg" style={{ fontFamily: 'PoppinsMedium' }}>Aprenda mais</Text>
                        <TouchableOpacity className="flex flex-row items-center" onPress={() => { router.push('/learn') }}>
                            <Text className="text-sm text-[#64AA0C]" style={{ fontFamily: 'Poppins' }}>Ver mais</Text>
                            <Icon as={ChevronRightIcon} size="sm" color="#64AA0C" />
                        </TouchableOpacity>
                    </View>
                    <Articles />
                </View>

            </View>

        </ScrollView>
    );
}
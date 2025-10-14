import React, { useEffect } from "react";
import HeaderBar from "@/components/ui/Header";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import TakePhotoCard from "@/components/TakePhotoCard";
import { appStorage } from "@/lib/storage";
import { ChevronRightIcon, Icon } from "@/components/ui/icon";
import Articles from "@/components/Articles";
import FeaturedArticles from "@/components/FeaturedArticles";

export default function HomeScreen() {

    useEffect(() => {
        if (appStorage.getString('hasSeenWelcome') !== '1') {
            router.push('/welcome');
        }
    }, []);

    return (

        <View>
            <HeaderBar />

            {/* Content */}
            <View className="flex flex-col gap-8 px-6 py-4">

                {/* Featured section */}
                <View className="flex flex-col gap-10">
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
                <TakePhotoCard />

                {/* Articles section */}
                <View className="flex flex-col gap-6">
                    <View className="flex flex-row justify-between items-center">
                        <Text className="text-lg" style={{ fontFamily: 'PoppinsMedium' }}>Aprenda mais</Text>
                        <TouchableOpacity className="flex flex-row items-center" onPress={() => { router.push('/learn') }}>
                            <Text className="text-sm text-[#64AA0C]" style={{ fontFamily: 'Poppins' }}>Ver mais</Text>
                            <Icon as={ChevronRightIcon} size="sm" color="#64AA0C" />
                        </TouchableOpacity>
                    </View>
                    <Articles />
                </View>

            </View>

        </View>

    );
}
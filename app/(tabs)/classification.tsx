import HistoryList from '@/components/HistoryList';
import TakePhotoCard from '@/components/TakePhotoCard';
import HeaderBar from '@/components/ui/Header';
import { ChevronRightIcon, Icon } from '@/components/ui/icon';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function ClassificationScreen() {

    const router = useRouter();

    return (
        <View>
            <HeaderBar />

            {/* Content */}
            <View className="px-6">

                {/* Take Photo section */}
                <TakePhotoCard />

                {/* Diagnosis list section */}
                <View className="mt-8 flex flex-col gap-4">
                    <View className='flex flex-row justify-between items-center'>
                        <Text className="text-lg" style={{ fontFamily: 'PoppinsMedium' }}>Seus diagnósticos</Text>
                        <TouchableOpacity className="flex flex-row items-center" onPress={() => { router.push('/history') }}>
                            <Text className="text-sm text-[#A3A3A3]" style={{ fontFamily: 'PoppinsLight' }}>Ver mais</Text>
                            <Icon as={ChevronRightIcon} size="sm" color="#A3A3A3"/>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <HistoryList limit={3} />
                    </View>
                </View>

            </View>
        </View>
    );
}
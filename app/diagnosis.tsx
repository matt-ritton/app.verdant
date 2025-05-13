import { Text, TouchableOpacity, View, Image } from 'react-native';
import React, { use, useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function DiagnosisScreen() {

    const router = useRouter();
    const { data } = useLocalSearchParams() as { data: any };

    interface DiagnosisData {
        label: string
        description: string,
        type: string,
        scientific_name: string,
        confidence?: number
    }

    const [diagnosisData, setDiagnosisData] = useState<DiagnosisData>({
        label: 'Nome da Doença',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        type: 'Tipo de Doença',
        scientific_name: 'Nome Científico',
        confidence: 0
    });


    useEffect(() => {
        if (!data) return;

        try {
            // Primeiro: transforme a string em objeto
            const parsed = JSON.parse(decodeURIComponent(data));

            // Depois: acesse parsed.message
            setDiagnosisData({
                label: parsed.message?.label || '???',
                description: parsed.message?.description || '',
                type: parsed.message?.type || '',
                scientific_name: parsed.message?.scientific_name || '',
                confidence: parsed.message?.confidence || 0
            });
        } catch (err) {
            console.error('Erro ao parsear os dados:', err);
        }
    }, [data]);


    if (!diagnosisData) return null;

    return (
        <View className='px-6 mt-12'>
            <View className='flex flex-col gap-4'>
                <TouchableOpacity className="ms-[-8]" onPress={() => router.navigate('/')}>
                    <MaterialIcons name="keyboard-arrow-left" size={28} color="black" />
                </TouchableOpacity>
                <Text className='text-2xl' style={{ fontFamily: 'PoppinsMedium' }}>Diagnóstico <Text className='text-lg color-[#A3A3A3]'>({ (diagnosisData.confidence * 100).toFixed(0) }% de chance)</Text></Text>
            </View>
            <View className='flex flex-col mt-4 gap-3'>
                <Image />
                <View className='flex flex-col gap-4'>
                    <View className='flex flex-col gap-1'>
                        <Text className='text-2xl' style={{ fontFamily: 'PoppinsSemiBold' }}>{diagnosisData.label || '???'}</Text>
                        <Text className='color-[#A3A3A3]' style={{ fontFamily: 'PoppinsItalic' }}>{diagnosisData.scientific_name} <Text style={{ fontFamily: 'Poppins' }}>({diagnosisData.type})</Text></Text>
                    </View>
                    <View>
                        <Text className='text-lg' style={{ fontFamily: 'PoppinsMedium' }}>Descrição:</Text>
                        <Text className='text-lg' style={{ fontFamily: 'Poppins' }}>
                            {diagnosisData.description}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}
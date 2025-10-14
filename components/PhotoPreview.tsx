import React, {  } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { api } from '@/lib/axios';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { saveClassification } from '@/lib/classificationStorage';

export default function PhotoPreview({ imgData, setCapturedPhoto, setPreviewVisible }: any) {

    const route = useRouter();

    // Make a POST request to the API with the image data and handle the response
    const handleSend = async () => {

        const formData = new FormData();
        formData.append("image", {
            uri: imgData.uri,
            type: "image/jpeg",
            name: "photo.jpg",
        } as any);

        try {
            const response = await api.post('/image_upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                setCapturedPhoto(null);
                setPreviewVisible(false);
                console.log('Photo sent successfully:', response.data);

                // Save the classification data
                const classification = {
                    label: response.data.message.label,
                    confidence: response.data.message.confidence,
                    timestamp: new Date().toISOString(),
                };
                saveClassification(classification);

                route.push({
                    pathname: '/diagnosis',
                    params: { data: JSON.stringify(response.data) }
                });

            }

        } catch (error) {

            console.error('Error sending photo to API:', error);
        }
    }

    return (
        <>
            <View className='h-24 flex flex-row px-4 pb-3 items-end justify-between' style={{ backgroundColor: '#000' }}>
                <TouchableOpacity className='p-[5]' onPress={() => { setCapturedPhoto(null); setPreviewVisible(false) }}>
                    <Ionicons name='close' size={24} color="#fff" />
                </TouchableOpacity>
                <Text className='text-white text-lg font-semibold p-[6]'>Enviar imagem</Text>
                <TouchableOpacity className='p-2' onPress={handleSend}>
                    <Entypo name='check' size={20} color="#fff" />
                </TouchableOpacity>
            </View>

            <Image source={{ uri: imgData && imgData.uri }} className="w-full h-[480]" />

            <View className='absolute bottom-0 items-center w-full h-[28%] py-10 px-6' style={{ backgroundColor: '#000' }}>
                <Text className='text-center text-white font-semibold mb-4'>
                    Confirme o envio da imagem
                </Text>
                <Text className='text-center text-white' style={{ fontFamily: 'Inter' }}>
                    Ao enviar, você receberá um possível diagnóstico da praga relacionada.
                </Text>
            </View>
        </>
    );
}
import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { AlertDialog, AlertDialogBackdrop, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from './ui/alert-dialog';
import { Button, ButtonText } from './ui/button';
import { api } from '@/lib/axios';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';

export default function PhotoPreview({ imgData, setCapturedPhoto, setPreviewVisible }: any) {

    const [showAlertDialog, setShowAlertDialog] = useState(false)
    const [buttonPressed, setButtonPressed] = useState(false)
    const handleClose = () => setShowAlertDialog(false)

    // Function to send photo to API
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
                handleClose();
                console.log('API response:', response.data);
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
import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { AlertDialog, AlertDialogBackdrop, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from './ui/alert-dialog';
import { Button, ButtonText } from './ui/button';
import { api } from '@/lib/axios';

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

    useEffect(() => {
        setShowAlertDialog(true);
    }, []);

    return (
        <>
            <View className='h-24 flex flex-row px-4 pb-3 items-end justify-between' style={{ backgroundColor: '#000' }} />

            <Image source={{ uri: imgData && imgData.uri }} className="w-full h-[480]" />

            <AlertDialog isOpen={showAlertDialog} onClose={handleClose} size="md" className='mt-52'>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <Text>
                            Deseja enviar esta imagem?
                        </Text>
                    </AlertDialogHeader>
                    <AlertDialogBody className="mt-3 mb-4">
                        <Text>
                            Uma vez que for analisada, a imagem será automaticamente deletada.
                        </Text>
                    </AlertDialogBody>
                    <AlertDialogFooter className="flex justify-center">
                        <Button variant="outline" action="secondary" onPress={() => { setCapturedPhoto(null); setPreviewVisible(false) }} size="md">
                            <ButtonText>Cancelar</ButtonText>
                        </Button>
                        <Button size="md"
                            style={buttonPressed ? { backgroundColor: "#5b990e" } : { backgroundColor: "#6db611" }}
                            onPressIn={() => setButtonPressed(true)}
                            onPress={handleSend}
                        >
                            <ButtonText>Enviar</ButtonText>
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <View className='absolute bottom-0 flex flex-row items-center justify-center w-full h-[22%]' style={{ backgroundColor: '#000' }} />
        </>
    );
}
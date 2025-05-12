import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import { CameraType, useCameraPermissions } from "expo-camera";
import CameraLivePreview from "@/components/CameraLivePreview";
import PhotoPreview from "@/components/PhotoPreview";

export default function CameraScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [previewVisible, setPreviewVisible] = useState(false);
    const [capturedPhoto, setCapturedPhoto] = useState<any>(null);

    // Carregado as permissões de câmera
    if (!permission) {
        return (
            <View />
        );
    }

    // Se a permissão não foi concedida, solicitar permissão
    if (!permission.granted) {
        return (
            <View className="mt-20">
                <Text className="text-center">Precisamos da sua permissão para usar a câmera</Text>
                <Button title="Solicitar permissão" onPress={requestPermission} />
            </View>
        );
    }

    return (
        <>
            {previewVisible ?
                <PhotoPreview 
                    setPreviewVisible={setPreviewVisible}
                    setCapturedPhoto={setCapturedPhoto}
                    imgData={capturedPhoto}
                />
                :
                <CameraLivePreview
                    setPreviewVisible={setPreviewVisible}
                    setCapturedPhoto={setCapturedPhoto}
                />
            }
        </>
    );
}
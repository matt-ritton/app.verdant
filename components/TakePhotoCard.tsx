import { Link, useRouter } from "expo-router";
import React from "react";
import { Image, View, Text } from "react-native";
import { Button, ButtonText } from "./ui/button";

export default function TakePhotoCard() {

    //FIXME: Desativar botao de camera caso o usuario nao tenha acesso a internet (no momento, o diagnostico so funciona com internet)

    const router = useRouter();

    return (

        <View className="flex flex-col gap-4 mt-4">
            <Text className="text-lg" style={{ fontFamily: 'PoppinsMedium' }}>Diagnosticar planta</Text>
            <View className="w-full rounded-2xl py-2 items-center justify-center bg-[#F5F5F5]">
                <Image className="absolute bottom-0 rounded-xl w-full" source={require("../assets/images/bg.takePictureCard.png")} />
                <Text className="mt-4 text-lg color-[#64AA0C]" style={{ fontFamily: "PoppinsSemiBold" }}>Diagnóstico por foto</Text>
                <Text className="my-4 px-2 text-center color-[#366100]" style={{ fontFamily: "PoppinsLight" }}>Para diagnosticar sua cultura, basta tirar uma foto e aguardar o diagnóstico, contendo as informações principais informações da doença ou praga.</Text>
                <Button className="rounded-2xl mb-2 bg-[#64AA0C]" size="md" variant="solid" action="primary" onPress={() => router.push("/camera")}>
                    <ButtonText>Tirar uma foto</ButtonText>
                </Button>
            </View>
        </View>
    )
}
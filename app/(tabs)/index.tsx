import React from "react";
import HeaderBar from "@/components/ui/Header";
import { Image, View, Text } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { Link } from "expo-router";
import { api } from "@/lib/axios";

//TODO: Show all diagnostics

export default function HomeScreen() {

    return (

        <View>
            <HeaderBar />

            {/* Content */}
            <View className="p-4">

                <View className="w-full items-center justify-center mt-4">
                    <View className="w-[90%] rounded-2xl py-2 items-center justify-center" style={{ backgroundColor: "#f5f5f5" }}>
                        <Image className="absolute bottom-0 rounded-xl w-full" source={require("../../assets/images/bg.takePictureCard.png")} />
                        <Text className="mt-4 text-lg color-[#64AA0C]" style={{ fontFamily: "PoppinsSemiBold" }}>Diagnosticar Cultura</Text>
                        <Text className="my-4 px-2 color-[#366100]" style={{ fontFamily: "PoppinsLight" }}>Para diagnosticar sua cultura, basta tirar uma foto e aguardar o diagnóstico, contendo as informações principais informações da doença ou praga.</Text>
                        <Link href="/camera" asChild>
                            <Button className="rounded-2xl mb-2 bg-[#64AA0C]" size="md" variant="solid" action="primary">
                                <ButtonText>Tirar uma foto</ButtonText>
                            </Button>
                        </Link>
                    </View>
                </View>

                <View className="mt-8">
                    <Text className="text-lg" style={{fontFamily: 'PoppinsMedium'}}>Seus diagnósticos</Text>
                    <View className="mt-8">
                        <Text className="text-center text-sm color-[#A3A3A3]" style={{fontFamily: "PoppinsLight"}}>Você ainda não possui diagnósticos realizados.</Text>
                    </View>
                </View>

            </View>

        </View>

    );
}
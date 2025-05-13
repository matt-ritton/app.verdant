import React from "react";
import HeaderBar from "@/components/ui/Header";
import { Image, View, Text } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { Link } from "expo-router";

//TODO: Show all diagnostics
export default function HomeScreen() {

    return (

        <View>
            <HeaderBar />

            {/* Content */}
            <View className="px-6">

                <View className="flex flex-col gap-4 mt-[-8]">
                    <Text className="text-lg" style={{fontFamily: 'PoppinsMedium'}}>Diagnosticar planta</Text>
                    <View className="w-full rounded-2xl py-2 items-center justify-center bg-[#F5F5F5]">
                        <Image className="absolute bottom-0 rounded-xl w-full" source={require("../../assets/images/bg.takePictureCard.png")} />
                        <Text className="mt-4 text-lg color-[#64AA0C]" style={{ fontFamily: "PoppinsSemiBold" }}>Tire uma foto</Text>
                        <Text className="my-4 px-2 color-[#366100]" style={{ fontFamily: "PoppinsLight" }}>Para diagnosticar sua cultura, basta tirar uma foto e aguardar o diagnóstico, contendo as informações principais informações da doença ou praga.</Text>
                        <Link href="/camera" asChild>
                            <Button className="rounded-2xl mb-2 bg-[#64AA0C]" size="md" variant="solid" action="primary">
                                <ButtonText>Tirar uma foto</ButtonText>
                            </Button>
                        </Link>
                    </View>
                </View>

                <View className="mt-8 flex flex-col gap-10">
                    <Text className="text-lg" style={{fontFamily: 'PoppinsMedium'}}>Seus diagnósticos</Text>
                    <View>
                        <Text className="text-center text-sm color-[#A3A3A3]" style={{fontFamily: "PoppinsLight"}}>Você ainda não possui diagnósticos realizados.</Text>
                    </View>
                </View>

            </View>

        </View>

    );
}
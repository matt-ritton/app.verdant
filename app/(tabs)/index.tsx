import React from "react";
import HeaderBar from "@/components/ui/Header";
import { Image, View, Text } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { Link } from "expo-router";
import { api } from "@/lib/axios";

export default function HomeScreen() {

    const testApi = async () => {

        try {
            const response = await api.get("/");

            if (response.status === 200) {
                console.log(response.data);
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (

        <View>
            <HeaderBar />

            <View className="w-full items-center justify-center mt-4">
                <View className="w-[90%] rounded-2xl items-center justify-center" style={{ backgroundColor: "#f5f5f5" }}>
                    <Image className="absolute bottom-0 rounded-xl w-full" source={require("../../assets/images/bg.takePictureCard.png")} />
                    <Text style={{ marginTop: 16, fontFamily: "Inter", fontSize: 18, fontWeight: "bold", color: "#6db611" }}>Diagnosticar Cultura</Text>
                    <Text style={{ marginTop: 16, marginBottom: 16, paddingLeft: 8, paddingRight: 8, fontFamily: "SairaLight", color: "#628536" }}>Para diagnosticar sua cultura, basta tirar uma foto e aguardar o diagnóstico, contendo as informações principais informações da doença ou praga.</Text>
                    <Link href="/camera" asChild>
                        <Button className="rounded-2xl mb-2" size="md" variant="solid" action="primary" style={{ backgroundColor: "#6db611" }}>
                            <ButtonText>Tirar uma foto</ButtonText>
                        </Button>
                    </Link>
                </View>
            </View>
            
        </View>

    );
}
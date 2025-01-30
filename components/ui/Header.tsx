import React from "react";
import { View, Text, Image } from "react-native";

export default function HeaderBar() {

    return (
        <View>
            <View className="flex flex-row h-[108px] w-full items-end" style={{ backgroundColor: "#6db611" }}>
                <View style={{ paddingLeft: 24}}>
                    <Text style={{fontSize: 16, color: "white"}}>Bom dia</Text>
                    <Text style={{marginTop: 4, fontFamily: 'Bernadette', fontSize: 24, color: "white"}}>Matheus Ritton</Text>
                </View>
            </View>

            <Image
                style={{ marginTop: -68, zIndex: -1 }}
                source={require('../../assets/images/img.header-border.png')}
            />
        </View>
    );
}
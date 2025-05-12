import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

//TODO: Notification functionality
//TODO: Open menu functionality

export default function HeaderBar() {

    return (
        <View>
            <View className="flex flex-row h-[124px] w-full items-end" style={{ backgroundColor: "#6db611" }}>
                <View className="mb-4 flex flex-row px-6 justify-between items-center w-full">
                    <View>
                        <Text style={{fontFamily: 'PoppinsLight'}}>Bem-vindo</Text>
                        <Text className="mt-1 text-2xl text-white" style={{fontFamily: "PoppinsSemiBold"}}>Matheus Ritton</Text>
                    </View>

                    {/* Open Menu */}
                    <TouchableOpacity onPress={() => { }}>

                        {/* Notification */}
                        <View 
                            className="absolute top-0 right-0 z-10 h-4 w-4 rounded-full bg-red-600" 
                            style={{outlineColor: "#6db611", outlineWidth: 4, outlineStyle: "solid"}}
                        />

                        <Image className="h-11 w-11 rounded-lg" source={require('../../assets/images/img.user.jpg')} />
                    </TouchableOpacity>
                </View>
            </View>

            <Image
                style={{ marginTop: -68, zIndex: -1 }}
                source={require('../../assets/images/img.header-border.png')}
            />
        </View>
    );
}
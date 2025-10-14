import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default function HeaderBar() {

    return (
        <View className="pt-8 h-28 w-full flex flex-row px-6 justify-between items-center">

            <View>
                <Text className="text-[24px] color-[#64AA0C]" style={{ fontFamily: 'PoppinsSemiBold' }}>Verdant AI</Text>
            </View>
            
        </View>
    );
}
import { AntDesign, Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Input, InputSlot, InputField } from "./ui/input";

type Props = {
    value: string;
    onChangeText: (text: string) => void;
    onSubmitEditing?: () => void;
};

//FIXME: [OPCIONAL - BAIXA PRIORIDADE] Filtro: aparecer somente se for feita uma pesquisa. Exibir opcoes de filtro (ex.: apenas artigos, apenas doenças, etc) ou Cancelar.
export default function SearchBar({ value, onChangeText, onSubmitEditing }: Props) {
    return (
        <View className="flex flex-row items-center gap-3">
            <Input variant="outline" size="lg" className="px-4 h-12 rounded-2xl flex-1">
                <InputSlot>
                    <AntDesign name="search1" size={20} color="#C0C0C0" />
                </InputSlot>
                <InputField
                    placeholder="Pesquisar assunto..."
                    className="color-[#A3A3A3] mt-1"
                    style={{ fontFamily: "PoppinsLight" }}
                    value={value}
                    onChangeText={onChangeText}
                    returnKeyType="search"
                    onSubmitEditing={onSubmitEditing}
                />
            </Input>

            {/*
            <TouchableOpacity>
                <Ionicons name="options-outline" size={28} color="#C0C0C0" />
            </TouchableOpacity>
            */}
        </View>
    );
}
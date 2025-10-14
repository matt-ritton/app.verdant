import { Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import HistoryList, { HistoryListHandle } from "@/components/HistoryList";
import HeaderBar from "@/components/ui/Header";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { Classification, getClassifications } from "@/lib/classificationStorage";
import { Button, ButtonText } from "@/components/ui/button";
import { Modal, ModalBackdrop, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@/components/ui/modal";
import { Icon, TrashIcon } from "@/components/ui/icon";

export default function history() {
    const router = useRouter();
    const historyRef = useRef<HistoryListHandle>(null);
    const [selectedCount, setSelectedCount] = useState(0);

    const [showModal, setShowModal] = useState(false);

    return (

        <>

            <View className="bg-white flex-1">
                <View className="mt-12">
                    <View className="px-6 flex flex-col gap-4">
                        <TouchableOpacity
                            className="ms-[-8]"
                            onPress={() => router.navigate("/classification")}
                        >
                            <MaterialIcons name="keyboard-arrow-left" size={28} color="black" />
                        </TouchableOpacity>
                        <View className="flex flex-row justify-between items-center">
                            <Text
                                className="text-2xl"
                                style={{ fontFamily: "PoppinsMedium" }}
                            >
                                Histórico de Diagnósticos
                            </Text>     
                        {selectedCount > 0 && (
                            <TouchableOpacity onPress={() => setShowModal(true)}>
                                <Icon as={TrashIcon}/>
                            </TouchableOpacity>
                        )}
                        </View>
                        {selectedCount > 0 && (
                            <View className="flex flex-row gap-2 items-center">
                                <Button size="xs" variant="outline" className="rounded-full">
                                    <ButtonText>{selectedCount} Selecionados</ButtonText>
                                </Button>
                                <Button
                                    size="xs"
                                    variant="outline"
                                    className="rounded-full"
                                    onPress={() => historyRef.current?.SelectAll()}
                                >
                                    <ButtonText>Selecionar Tudo</ButtonText>
                                </Button>
                                <Button
                                    size="xs"
                                    variant="outline"
                                    className="rounded-full"
                                    onPress={() => historyRef.current?.ClearSelection()}
                                >
                                    <ButtonText>Cancelar</ButtonText>
                                </Button>
                            </View>
                        )}
                    </View>
                    <View className="mt-8">
                        <HistoryList
                            ref={historyRef}
                            selectable
                            onSelectionChange={setSelectedCount}
                        />
                    </View>
                </View>
            </View>

            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <ModalBackdrop />
                <ModalContent>
                    <ModalHeader><Text className="text-xl">Confirmar Exclusão</Text></ModalHeader>

                    <ModalBody>
                        <Text className="text-base" style={{ fontFamily: 'Poppins' }}>Tem certeza que deseja excluir os diagnósticos selecionados? Esta ação não pode ser desfeita.</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="outline" className="flex-1 rounded-full" onPress={() => setShowModal(false)}>
                            <ButtonText>Cancelar</ButtonText>
                        </Button>
                        <Button className="flex-1 rounded-full" onPress={() => historyRef.current?.ClearHistory().then(() => setShowModal(false))}>
                            <ButtonText>Excluir</ButtonText>
                        </Button>
                    </ModalFooter>

                </ModalContent>
            </Modal>
        </>
    );
}
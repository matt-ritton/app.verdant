import React, { useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { CameraType, CameraView, FlashMode } from 'expo-camera';
import { Entypo, FontAwesome6, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from './ui/modal';
import { Button, ButtonText } from './ui/button';
import { CloseIcon, Icon } from './ui/icon';

export default function CameraLivePreview({ setPreviewVisible, setCapturedPhoto }: any) {

	const [facing, setFacing] = useState<CameraType>("back");
	const [flash, setFlash] = useState<FlashMode>("off");
	const [showModal, setShowModal] = useState(false);
	const [buttonPressed, setButtonPressed] = useState(false);

	const cameraRef = useRef(null);

	const _takePicture = async () => {
		if (!cameraRef.current) return;

		const photo = await cameraRef.current.takePictureAsync();
		//console.log('Available sizes:', await cameraRef.current.getAvailablePictureSizesAsync('4:3'));
		//console.log('Picture taken:', photo.uri);
		setPreviewVisible(true);
		setCapturedPhoto(photo);
	};

	const _imagePicker = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ['images'],
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setPreviewVisible(true);
			setCapturedPhoto(result.assets[0]);
		}
	};

	return (
		<View>
			{/* Upper Menu */}
			<View className='h-24 flex flex-row px-4 pb-3 items-end justify-between' style={{ backgroundColor: '#000' }}>
				<TouchableOpacity onPress={() => setShowModal(true)} style={{ padding: 10 }}>
					<Entypo name='info' size={20} color="#fff" />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => setFlash(flash === "off" ? "on" : "off")} style={{ padding: 10 }}>
					{flash === "off" ? <Ionicons name='flash' size={20} color="#fff" /> : <Ionicons name='flash-off' size={20} color="#fff" />}
				</TouchableOpacity>
			</View>

			<CameraView facing={facing} flash={flash} ratio='4:3' style={{ height: 480 }} ref={(cameraRef)} />

			{/* Action Menu */}
			<View className='flex flex-row items-center justify-between w-full h-[22%] px-8' style={{ backgroundColor: '#000' }}>
				<TouchableOpacity className='rounded-full p-4' style={{ backgroundColor: "#1f1f1f" }} onPress={_imagePicker}>
					<Entypo name='images' size={20} color="#fff" />
				</TouchableOpacity>
				<TouchableOpacity onPress={_takePicture} className="h-20 w-20 p-2 rounded-full" style={{ backgroundColor: "#fff" }} />
				<TouchableOpacity className='rounded-full p-4' style={{ backgroundColor: "#1f1f1f" }} onPress={() => setFacing(facing === "back" ? "front" : "back")}>
					<FontAwesome6 name='rotate' size={20} color="#fff" />
				</TouchableOpacity>
			</View>


			<Modal
				isOpen={showModal}
				onClose={() => {
					setShowModal(false)
				}}
				size="md"
			>
				<ModalBackdrop />
				<ModalContent>
					<ModalHeader>
						<Text className="text-xl">
							Fazendo o diagnóstico
						</Text>
						<ModalCloseButton>
							<Icon
								as={CloseIcon}
								size="md"
								className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
							/>
						</ModalCloseButton>
					</ModalHeader>
					<ModalBody>
						<View className='flex flex-col gap-4'>
							<Text> 1. Tire uma foto próxima e focada nos danos encontrados. </Text>
							<Text> 2. Certifique-se de tirar a foto em um ambiente bem iluminado. </Text>
						</View>
					</ModalBody>
					<ModalFooter>
						<Button
							style={buttonPressed ? { backgroundColor: "#5b990e" } : { backgroundColor: "#6db611" }}
							onPressIn={() => setButtonPressed(true)}
							onPress={() => {
								setShowModal(false)
							}}
						>
							<ButtonText>Entendido</ButtonText>
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</View>
	);
}
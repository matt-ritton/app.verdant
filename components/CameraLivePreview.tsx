import React, { useRef, useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { CameraType, CameraView, FlashMode } from 'expo-camera';
import { Entypo, FontAwesome6, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from './ui/modal';
import { Button, ButtonText } from './ui/button';
import { CloseIcon, Icon } from './ui/icon';
import { FadeLoop } from './ui/Effects';
import { useRouter } from 'expo-router';

export default function CameraLivePreview({ setPreviewVisible, setCapturedPhoto }: any) {

	//FIXME: Ajustar a posicao e tamanho  do frame de foco conforme o dispositivo (tamanho da tela)

	const router = useRouter();

	const [facing, setFacing] = useState<CameraType>("back");
	const [flash, setFlash] = useState<FlashMode>("off");
	const [showModal, setShowModal] = useState(false);

	// UI: Focus frame
	const { width, height } = Dimensions.get('window');
	const FRAME_SIZE = 240;
	const frameOffsetTop = (height - FRAME_SIZE) / 2 - 36;
	const frameOffsetLeft = (width - FRAME_SIZE) / 2;

	// Camera API
	const cameraRef = useRef(null);

	const _takePicture = async () => {
		if (!cameraRef.current) return;

		const photo = await cameraRef.current.takePictureAsync();
		//console.log('Available sizes:', await cameraRef.current.getAvailablePictureSizesAsync("1:1"));
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
				<TouchableOpacity className='p-1' onPress={() => router.back()}>
					<Entypo name='chevron-left' size={24} color="#fff" />
				</TouchableOpacity>
				<TouchableOpacity className='p-2' onPress={() => setFlash(flash === "off" ? "on" : "off")}>
					{flash === "off" ? <Ionicons name='flash' size={18} color="#fff" /> : <Ionicons name='flash-off' size={20} color="#fff" />}
				</TouchableOpacity>
				<TouchableOpacity className='p-2' onPress={() => setShowModal(true)}>
					<Entypo name='info' size={18} color="#fff" />
				</TouchableOpacity>
			</View>

			<View className='absolute z-10' style={{ top: frameOffsetTop, left: frameOffsetLeft, width: FRAME_SIZE, height: FRAME_SIZE }}>
				{/* Top Left */}
				<View className="absolute top-0 left-0 w-[30px] h-[30px] border-t-4 border-l-4 border-white rounded-md" />
				{/* Top Right */}
				<View className="absolute top-0 right-0 w-[30px] h-[30px] border-t-4 border-r-4 border-white rounded-md" />
				{/* Bottom Left */}
				<View className="absolute bottom-0 left-0 w-[30px] h-[30px] border-b-4 border-l-4 border-white rounded-md" />
				{/* Bottom Right */}
				<View className="absolute bottom-0 right-0 w-[30px] h-[30px] border-b-4 border-r-4 border-white rounded-md" />
			</View>

			<CameraView facing={facing} flash={flash} ratio='1:1' pictureSize='1088x1088' style={{ height: 480 }} ref={(cameraRef)} />

			<FadeLoop duration={1000} style={{ position: 'absolute', bottom: 300, left: 0, right: 0, alignItems: 'center' }}>
				<Text className='absolute z-10 text-white' style={{ fontFamily: "PoppinsRegular" }}>
					Foque a câmera na área do dano
				</Text>
			</FadeLoop>

			{/* Action Menu */}
			<View className='flex flex-row items-center justify-between w-full h-[30%] px-8' style={{ backgroundColor: '#000' }}>
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
						<Button className='rounded-full' onPress={() => { setShowModal(false) }}>
							<ButtonText>Entendido</ButtonText>
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</View>
	);
}
import { View, Text, useWindowDimensions, FlatList } from "react-native";
import React, { useState, useRef, useEffect } from 'react';
import HeaderBar from "@/components/ui/Header";
import { Button, ButtonText } from "@/components/ui/button";
import { useRouter } from "expo-router";
import { appStorage } from "@/lib/storage";

const slides = [
	{
		highlight: 'Capture diagnósticos',
		text: 'com sua câmera',
		subtitle: 'Saiba mais sobre pragas em suas plantas com apenas uma 1 foto',
	},
	{
		highlight: 'Descubra e aprenda',
		text: 'sobre pragas e culturas',
		subtitle: 'Leia artigos e descubra mais sobre culturas, técnicas de cultivo e pragas',
	},
];

export default function WelcomeScreen() {

	const { width } = useWindowDimensions();
	const [currentIndex, setCurrentIndex] = useState(0);
	const flatListRef = useRef(null);
	const router = useRouter();

	const handleScroll = (event: any) => {
		const index = Math.round(event.nativeEvent.contentOffset.x / width);
		setCurrentIndex(index);
	};

	const renderItem = ({ item }: any) => (
		<View className="items-center px-6" style={{ width }}>
			<Text
				className="text-3xl text-center font-semibold"
				style={{ fontFamily: 'PoppinsMedium' }}
			>
				<Text className="color-[#64AA0C]">{item.highlight}</Text> {item.text}
			</Text>
			<Text
				className="text-lg text-center mt-2"
				style={{ fontFamily: 'Poppins' }}
			>
				{item.subtitle}
			</Text>
		</View>
	);
	
	useEffect(() => {
		if (appStorage.getString('hasSeenWelcome') === '1') {
			router.push('/');
		}
	}, []);

	return (
		<View className="flex-1 bg-white">
			<HeaderBar />

			<View className="flex-1 justify-center items-center mt-32">
				<FlatList
					data={slides}
					horizontal
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					onScroll={handleScroll}
					scrollEventThrottle={16}
					renderItem={renderItem}
					keyExtractor={(_, index) => index.toString()}
					ref={flatListRef}
					style={{ flexGrow: 0 }}
				/>

				<View className="flex-row justify-center mt-8">
					{slides.map((_, index) => (
						<View
							key={index}
							className={`w-2 h-2 mx-1 rounded-full ${index === currentIndex ? 'bg-[#64AA0C]' : 'bg-gray-300'
								}`}
						/>
					))}
				</View>
			</View>

			<Button
				size="lg"
				className="bg-[#64AA0C] w-fit mx-auto mb-16 mt-10 rounded-full"
				onPress={() => { appStorage.set('hasSeenWelcome', '1'); router.push('/') }}
			>
				<ButtonText className="text-white" style={{ fontFamily: 'Poppins' }}>
					Começar
				</ButtonText>
			</Button>
		</View>
	);
}

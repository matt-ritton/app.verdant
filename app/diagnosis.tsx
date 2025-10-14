import { Text, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { getLocalDictionary } from '@/lib/dictionaryStorage';

//FIXME: Get image from API

type DiagnosisData = {
	label: string;
	description: string;
	type: string;
	scientific_name: string;
	confidence?: number; // opcional
};

function parseParam(dataParam: unknown): any {
	// Try direct parse; if it fails, try decode and parse
	if (typeof dataParam === 'string') {
		try {
			return JSON.parse(dataParam);
		} catch {
			try {
				return JSON.parse(decodeURIComponent(dataParam));
			} catch {
				return {};
			}
		}
	}
	return dataParam ?? {};
}

export default function DiagnosisScreen() {
	const router = useRouter();
	const { data } = useLocalSearchParams<{ data?: string }>();

	const [diagnosisData, setDiagnosisData] = useState<DiagnosisData>({
		label: 'Nome da Doença',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		type: 'Tipo de Doença',
		scientific_name: 'Nome Científico',
		confidence: undefined,
	});

	useEffect(() => {
		if (!data) return;

		const load = async () => {
			try {
				const parsed = parseParam(data);
				const responseLabel: string =
					parsed?.label ?? parsed?.message?.label ?? '???';

				const rawConf = parsed?.confidence ?? parsed?.message?.confidence;
				const responseConfidence: number | undefined =
					typeof rawConf === 'number' ? rawConf : undefined;

				const localData = await getLocalDictionary();
				const dataContent = localData?.phytopathologies || [];

				const found = dataContent.find((it: any) => it.label === responseLabel);

				if (found) {
					setDiagnosisData({
						label: found.label,
						description: found.description,
						type: found.type,
						scientific_name: found.scientific_name,
						confidence: responseConfidence,
					});
				} else {
					setDiagnosisData((prev) => ({
						...prev,
						label: responseLabel || prev.label,
						confidence: responseConfidence,
					}));
				}
			} catch (err) {
				console.error('Erro ao processar os dados do diagnóstico:', err);
			}
		};

		load();
	}, [data]);

	if (!diagnosisData) return null;

	return (
		<View className='flex-1 bg-white'>
			<View className="px-6 mt-12">
				<View className="flex flex-col gap-4">
					<TouchableOpacity className="ms-[-8]" onPress={() => router.back()}>
						<MaterialIcons name="keyboard-arrow-left" size={28} color="black" />
					</TouchableOpacity>
					<Text className="text-2xl" style={{ fontFamily: 'PoppinsMedium' }}>
						Diagnóstico
						{diagnosisData.confidence != null && (
							<Text className="text-lg color-[#A3A3A3]">
								{' '}({(diagnosisData.confidence * 100).toFixed(1)}% de chance)
							</Text>
						)}
					</Text>
				</View>

				<View className="flex flex-col mt-4 py-4 gap-3">
					<ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex flex-row gap-3">
						<Image className="w-80 h-60 rounded-2xl mr-3" source={require('../assets/images/img.example.jpeg')} />
						<Image className="w-80 h-60 rounded-2xl mr-3" source={require('../assets/images/img.example.jpeg')} />
						<Image className="w-80 h-60 rounded-2xl" source={require('../assets/images/img.example.jpeg')} />
					</ScrollView>

					<View className="flex flex-col gap-4">
						<View className="flex flex-col gap-1">
							<Text className="text-2xl" style={{ fontFamily: 'PoppinsSemiBold' }}>
								{diagnosisData.label || '???'}
							</Text>
							<Text className="color-[#A3A3A3]" style={{ fontFamily: 'PoppinsItalic' }}>
								{diagnosisData.scientific_name}{' '}
								<Text style={{ fontFamily: 'Poppins' }}>({diagnosisData.type})</Text>
							</Text>
						</View>

						<View>
							<Text className="text-lg" style={{ fontFamily: 'PoppinsMedium' }}>Descrição:</Text>
							<Text className="text-lg" style={{ fontFamily: 'Poppins' }}>
								{diagnosisData.description}
							</Text>
						</View>
					</View>
				</View>
			</View>
		</View>
	);
}
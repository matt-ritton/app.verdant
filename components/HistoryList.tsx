import React, { useCallback, useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { getClassifications, Classification } from "@/lib/classificationStorage";
import { classificationStorage } from "@/lib/storage";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";

export type HistoryListHandle = {
	ClearHistory: () => Promise<void>;
	SelectAll: () => void;
	ClearSelection: () => void;
};

type Props = {
	selectable?: boolean; // Enable item selection by long press
	onSelectionChange?: (count: number) => void; // Selection count change callback
	limit?: number; // Limit number of items shown
};

const HistoryList = forwardRef<HistoryListHandle, Props>(function HistoryList({ selectable = false, onSelectionChange, limit }, ref) {
	const router = useRouter();
	const [items, setItems] = useState<Classification[]>([]);
	const [selected, setSelected] = useState<Set<string>>(new Set());

	useFocusEffect(
		useCallback(() => {
			const data = getClassifications()
				.sort((a, b) => Number(new Date(b.timestamp)) - Number(new Date(a.timestamp))); // ordena do mais recente ao mais antigo
			setItems(data);
			setSelected(new Set());
			onSelectionChange?.(0); // Reset selection on focus
		}, [onSelectionChange])
	);

	//If selection is disabled, clear existing selections
	useEffect(() => {
		if (!selectable && selected.size) {
			setSelected(new Set());
			onSelectionChange?.(0); //Reset on disable selection
		}
	}, [selectable, selected.size, onSelectionChange]);

	useImperativeHandle(ref, () => ({
		ClearHistory: async () => {
			if (selected.size > 0) {
				const updated = items.filter((item, index) => !selected.has(`${item.timestamp}-${index}`));
				setItems(updated);
				setSelected(new Set());
				onSelectionChange?.(0);
				await classificationStorage.set("classifications", JSON.stringify(updated));
			} else {
				await classificationStorage.delete("classifications");
				setItems([]);
				setSelected(new Set());
				onSelectionChange?.(0);
			}
		},
		SelectAll: () => {
			const all = new Set<string>();
			items.forEach((item, index) => {
				all.add(`${item.timestamp}-${index}`);
			});
			setSelected(all);
			onSelectionChange?.(all.size);
		},
		ClearSelection: () => {
			setSelected(new Set());
			onSelectionChange?.(0);
		},
	}));

	return (
		items.length > 0 ? (
			<>
				<FlatList
					data={typeof limit === 'number' ? items.slice(0, limit) : items} // já está em ordem decrescente
					keyExtractor={(item, index) => `${item.timestamp}-${index}`}
					extraData={selected}
					renderItem={({ item, index }) => {
						const key = `${item.timestamp}-${index}`;
						const isSelected = selected.has(key);

						const toggleSelect = () => {
							setSelected(prev => {
								const next = new Set(prev);
								next.has(key) ? next.delete(key) : next.add(key);
								onSelectionChange?.(next.size);
								return next;
							});
						};

						const handleLongPress = selectable ? toggleSelect : undefined;

						const handlePress = () => {
							if (selectable && selected.size > 0) {
								toggleSelect();
							} else {
								router.push({
									pathname: "/diagnosis",
									params: { data: JSON.stringify(item) },
								});
							}
						};

						return (
							<View className="flex flex-col gap-2">
								<TouchableOpacity
									onLongPress={handleLongPress}
									delayLongPress={selectable ? 300 : undefined}
									onPress={handlePress}
									activeOpacity={0.85}
								>
									<View
										className={`flex flex-row items-center gap-3 py-3 rounded-lg ${selectable ? 'px-6' : ''}`}
										style={selectable && isSelected ? { backgroundColor: '#F3F4F6' } : undefined}
									>
										<Image className="w-20 h-20 rounded-lg" source={{ uri: item.photoUri }} />
										<View className="flex flex-1 flex-col gap-1">
											<View className="flex flex-row items-center justify-between">
												<Text className="text-lg" style={{ fontFamily: "Poppins" }}>{item.label}</Text>
												<Text className="text-[#C0C0C0] text-sm">{new Date(item.timestamp).toLocaleDateString('pt-BR')}</Text>
											</View>
											<Text className="text-[#A3A3A3]">Probabilidade: {(item.confidence * 100).toFixed(1)}</Text>
										</View>
									</View>
								</TouchableOpacity>
							</View>
						);
					}}
				/>
			</>
		) : (
			<Text className="text-center text-sm color-[#A3A3A3]" style={{ fontFamily: "PoppinsLight" }}>
				Você ainda não possui diagnósticos realizados.
			</Text>
		)
	);
});

export default HistoryList;
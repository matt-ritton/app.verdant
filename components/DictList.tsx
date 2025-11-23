import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { getLocalDictionary } from '@/lib/dictionaryStorage';
import { useRouter } from 'expo-router';

type Phytopathology = {
    label: string;
    type: string;
    images: {
        cover: string;
    }
};

type Props = {
    searchTerm?: string;
};

const normalize = (s: string) =>
    s?.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export default function ArticleList({ searchTerm = '' }: Props) {
    const [items, setItems] = useState<Phytopathology[]>([]);
    const router = useRouter();

    useEffect(() => {
        let mounted = true;
        (async () => {
            const dict = await getLocalDictionary();
            const list: Phytopathology[] = Array.isArray(dict?.phytopathologies)
                ? dict.phytopathologies
                : [];
            if (mounted) setItems(list);
        })();
        return () => {
            mounted = false;
        };
    }, []);

    const filtered = useMemo(() => {
        const q = normalize(searchTerm.trim());
        if (!q) return items;
        return items.filter((it) => {
            const label = normalize(it.label);
            const type = normalize(it.type);
            return label.includes(q) || type.includes(q);
        });
    }, [items, searchTerm]);

    if (!filtered.length) {
        return (
            <Text className="text-center text-sm text-[#A3A3A3]" style={{ fontFamily: 'PoppinsLight' }}>
                Nenhum item encontrado.
            </Text>
        );
    }

    return (
        <FlatList
            data={filtered}
            keyExtractor={(item, index) => `${item.label}-${index}`}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            renderItem={({ item }) => (
                <TouchableOpacity activeOpacity={0.85} onPress={() => {
                    router.push({
                        pathname: "/diagnosis",
                        params: { data: encodeURIComponent(JSON.stringify(item)) },
                    })
                }}>
                    <View className="flex flex-row items-center gap-3 py-3 rounded-lg">
                        <Image
                            style={{ width: 80, height: 80, borderRadius: 8 }}
                            source={{ uri: item.images.cover }}
                            cachePolicy='disk'
                        />
                        <View className="flex flex-1 flex-col gap-1">
                            <View className="flex flex-row items-center justify-between">
                                <Text className="text-lg" style={{ fontFamily: 'Poppins' }}>
                                    {item.label}
                                </Text>
                            </View>
                            <Text className="text-[#A3A3A3]" style={{ fontFamily: 'PoppinsLight' }}>
                                {item.type}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
        />
    );
}
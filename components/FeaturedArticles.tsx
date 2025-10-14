import React, { useEffect, useState } from "react";
import { ImageBackground, Text, View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import Svg, { Defs, LinearGradient, Stop, Rect } from "react-native-svg";
import { getLocalArticles, getArticlesFromStorage, Article } from "@/lib/articleStorage";
import { useRouter } from "expo-router";

const fallbackImage = require("../assets/images/img.example.jpeg");


export default function FeaturedArticles() {
    const [items, setItems] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const cached = getArticlesFromStorage<Article[]>() ?? [];
                if (mounted && cached.length) setItems(cached);

                const data = await getLocalArticles();
                if (mounted) setItems(data);
            } catch (e) {
                console.error(e);
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => { mounted = false; };
    }, []);

    if (loading) {
        return (
            <View className="h-56 justify-center items-center">
                <ActivityIndicator />
            </View>
        );
    }

    if (!items.length) {
        return (
            <Text className="text-sm text-[#A3A3A3]" style={{ fontFamily: "PoppinsLight" }}>
                Nenhum artigo encontrado.
            </Text>
        );
    }

    return (
        <FlatList
            horizontal
            data={items}
            keyExtractor={(it, i) => `${it.title}-${i}`}
            ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
                const imgSource = item.featuredImage?.url
                    ? { uri: item.featuredImage.url }
                    : fallbackImage;

                return (
                    <TouchableOpacity
                      activeOpacity={0.85}
                      onPress={() =>
                        router.push({
                          pathname: "/article",
                          params: { data: encodeURIComponent(JSON.stringify(item)) },
                        })
                      }
                    >
                        <View className="rounded-2xl overflow-hidden">
                            <ImageBackground source={imgSource} className="w-80 h-56 justify-end">
                                <Svg style={StyleSheet.absoluteFillObject} pointerEvents="none">
                                    <Defs>
                                        <LinearGradient id="fade" x1="0%" y1="50%" x2="100%" y2="50%">
                                            <Stop offset="0%" stopColor="black" stopOpacity="0.6" />
                                            <Stop offset="100%" stopColor="black" stopOpacity="0" />
                                        </LinearGradient>
                                    </Defs>
                                    <Rect width="100%" height="100%" fill="url(#fade)" />
                                </Svg>
                                <Text className="text-white text-lg p-3" style={{ fontFamily: "PoppinsMedium" }} numberOfLines={2}>
                                    {item.title}
                                </Text>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                );
            }}
        />
    );
}
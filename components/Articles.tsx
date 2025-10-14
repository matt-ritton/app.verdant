import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { Card } from "./ui/card";
import { getLocalDictionary } from "@/lib/dictionaryStorage";
import { useRouter } from "expo-router";

type Phytopathology = {
  label: string;
  type: string;
};

export default function Articles() {
  const [items, setItems] = useState<Phytopathology[]>([]);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    (async () => {
      const dict = await getLocalDictionary();
      const list: Phytopathology[] = Array.isArray(dict?.phytopathologies) ? dict.phytopathologies : [];
      if (mounted) setItems(list);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (!items.length) {
    return (
      <Text className="text-center text-sm color-[#A3A3A3]" style={{ fontFamily: "PoppinsLight" }}>
        Nenhuma postagem.
      </Text>
    );
  }

  return (
    <FlatList
      horizontal
      data={items}
      keyExtractor={(item, index) => `${item.label}-${index}`}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/diagnosis",
              params: { data: encodeURIComponent(JSON.stringify(item)) },
            })
          }
        >
          <Card className="rounded-lg bg-gray-50">
            <Image className="w-56 h-40 rounded-2xl" source={require('../assets/images/img.example.jpeg')} />
            <View className="mt-3">
              <Text className="text-lg" style={{ fontFamily: 'PoppinsMedium' }}>
                {item.label}
              </Text>
              <Text className="text-sm color-[#A3A3A3]" style={{ fontFamily: 'PoppinsLight' }}>
                {item.type}
              </Text>
            </View>
          </Card>
        </TouchableOpacity>
      )}
    />
  );
}
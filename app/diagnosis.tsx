import { Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { getLocalDictionary } from '@/lib/dictionaryStorage';
import { WebView } from 'react-native-webview';

type DiagnosisData = {
    label: string;
    description: string;
    type: string;
    scientific_name: string;
    confidence?: number;
    images: {
        cover: string;
        image2: string;
    }
};

function parseParam(dataParam: unknown): any {
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
        images: {
            cover: undefined,
            image2: undefined,
        },
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

                const responseImage1: string | undefined =
                    parsed?.image1 ?? parsed?.message?.image1 ?? undefined;
                const responseImage2: string | undefined =
                    parsed?.image2 ?? parsed?.message?.image2 ?? undefined;

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
                        images: {
                            cover: found.images.cover ?? responseImage1,
                            image2: found.images.image2 ?? responseImage2,
                        },
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

    const htmlFull = useMemo(() => {
        const conf =
            diagnosisData.confidence != null
                ? `(${(diagnosisData.confidence * 100).toFixed(1)}% de chance)`
                : '';
        const descHtml = (diagnosisData.description || '').replace(/\r\n|\n/g, '<br />');

        const imagesHtml = (() => {
            const urls = [diagnosisData.images.cover, diagnosisData.images.image2].filter(Boolean) as string[];
            if (!urls.length) return '';
            const enc = (u: string) => encodeURI(u);
            const imgs = urls.map((u, i) => `<img src="${enc(u)}" alt="Imagem ${i + 1}" />`).join('');
            return `<div class="gallery">${imgs}</div>`;
        })();

        return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<style>
    body { font-family: -apple-system, Segoe UI, Roboto, sans-serif; margin:0; color:#111827; line-height:1.55; background:#ffffff; }
    .container { padding: 0 24px 32px; }
    h1 { font-size:24px; margin:16px 0 4px; }
    .conf { color:#6B7280; font-size:14px; margin:0 0 16px; }
    .meta { color:#6B7280; font-style:italic; margin:0 0 12px; }
    .section-title { font-size:18px; margin:20px 0 8px; font-weight:600; }
    p { margin:8px 0; text-align:justify; }
    hr { border:none; border-top:1px solid #E5E7EB; margin:24px 0; }
    .gallery { margin:12px 0 8px; }
    .gallery {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 280px;
        gap: 12px;
        overflow-x: auto;
        overscroll-behavior-x: contain;
        scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch;
        padding-bottom: 8px;
    }
    .gallery img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 8px;
        scroll-snap-align: start;
    }
</style>
</head>
<body>
<div class="container">
    ${imagesHtml}
	<h1>${diagnosisData.label}</h1>
    <p class="meta">${diagnosisData.scientific_name} (${diagnosisData.type})</p>
    <hr />
    <div><p>${descHtml}</p></div>
</div>
</body>
</html>`;
    }, [diagnosisData]);

    return (
        <View className="flex-1 bg-white">
            <View className=" px-6 mt-12 flex flex-col gap-4">
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

            <WebView
                originWhitelist={['*']}
                source={{ html: htmlFull, baseUrl: '' }}
                javaScriptEnabled={false}
                style={{ flex: 1, marginTop: 8, backgroundColor: 'transparent' }}
            />
        </View>
    );
}
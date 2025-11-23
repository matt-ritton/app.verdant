import { TouchableOpacity, View } from "react-native";
import React, { useMemo } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { WebView } from "react-native-webview"; // + WebView

type ArticleParam = {
	title?: string;
	author?: string;
	content?: { html?: string } | string;
	featuredImage?: { url?: string } | string;
};

function parseParam(dataParam: unknown): any {
	if (typeof dataParam === "string") {
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

export default function PostScreen() {
	const router = useRouter();
	const { data } = useLocalSearchParams<{ data?: string }>();

	const articleData = useMemo(() => {
		const parsed: ArticleParam = parseParam(data);
		const html = typeof parsed?.content === "string" ? parsed.content : parsed?.content?.html ?? "";
		const imageUrl = typeof parsed?.featuredImage === "string" ? parsed.featuredImage : parsed?.featuredImage?.url;
		return {
			title: parsed?.title ?? "Sem título",
			author: parsed?.author ?? "",
			contentHtml: html,
			imageUrl,
		};
	}, [data]);

	const htmlFull = useMemo(() => {
		const title = articleData.title ?? "Sem título";
		const author = articleData.author ? `<p class="author">Por ${articleData.author}</p>` : "";
		const hero = articleData.imageUrl ? `<img class="hero" src="${articleData.imageUrl}" />` : "";
		const body = articleData.contentHtml || "";

		return `<!DOCTYPE html>
				<html>
				<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<style>
				body { font-family: -apple-system, Segoe UI, Roboto, sans-serif; color:#111827; margin:0; padding:0; line-height:1.6; }
				.wrap { padding: 0 24px; }
				.hero { width:100%; height:280px; object-fit: cover; display:block; border-radius: 0 !important; }
				h1 { margin: 16px 0 4px; font-size: 24px; }
				.author { margin: 0 0 12px; color:#6B7280; font-size: 14px; }
				img { max-width: 100%; height: auto; border-radius: 12px; }
				h2,h3 { margin-top: 1.25rem; margin-bottom: .5rem; }
				p { margin: .5rem 0; text-align: justify; }
				ul,ol { padding-left: 1.25rem; }
				a { color: #2563EB; text-decoration: none; }
				</style>
				</head>
				<body>
				${hero}
				<div class="wrap">
					<h1>${title}</h1>
					${author}
					<div>${body}</div>
				</div>
				</body>
				</html>`;
				}, [articleData]);

	return (
		<View className="flex-1 bg-white">
			{/* Header*/}
			<View className="px-6 mt-12 flex flex-col gap-4">
				<TouchableOpacity className="ms-[-8]" onPress={() => router.back()}>
					<MaterialIcons name="keyboard-arrow-left" size={28} color="black" />
				</TouchableOpacity>
			</View>

			{/* Content */}
			<WebView
				originWhitelist={["*"]}
				source={{ html: htmlFull, baseUrl: "" }}
				javaScriptEnabled={false}
				style={{ flex: 1, marginTop: 16, backgroundColor: "transparent" }}
			/>
		</View>
	);
}
import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import HeaderBar from '@/components/ui/Header';
import SearchBar from '@/components/SearchBar';
import ArticleList from '@/components/DictList';
import { getDictionaryFromStorage } from '@/lib/dictionaryStorage';

export default function LearnScreen() {
	const [query, setQuery] = useState('');

	return (
		<>
			<HeaderBar />
			<View className="flex flex-col gap-8 px-6 py-4">
				<SearchBar value={query} onChangeText={setQuery} onSubmitEditing={() => { }} />
				<ArticleList searchTerm={query} />
			</View>
		</>
	);
}
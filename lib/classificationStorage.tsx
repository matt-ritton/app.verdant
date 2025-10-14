import { classificationStorage } from './storage';

const STORAGE_KEY = 'classifications';

export interface Classification {
	label: string;
	confidence: number;
	timestamp: string;
}

// Save a new classification result to storage
export function saveClassification(newItem: Classification) {
	const existingData = classificationStorage.getString(STORAGE_KEY);
	const currentData: Classification[] = existingData ? JSON.parse(existingData) : [];

	currentData.unshift(newItem); // Add to the beginning of the array to keep most recent first
	classificationStorage.set(STORAGE_KEY, JSON.stringify(currentData)); // Save again
}

// Get all classification results from storage
export function getClassifications(): Classification[] {
	const data = classificationStorage.getString(STORAGE_KEY);
	return data ? JSON.parse(data) : [];
}

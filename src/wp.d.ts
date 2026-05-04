export {};

declare global {
	interface Window {
		wp: any; // Or use a specific type if you have one
	}
	const wp: any;
}
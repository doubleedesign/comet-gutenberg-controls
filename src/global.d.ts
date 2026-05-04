import type { Config } from './types';

declare global {
	let comet: Config;

	interface Window {
		comet: Config;
	}
}

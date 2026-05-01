import type { Config } from './components/cometConfig';

declare global {
	let comet: Config;

	interface Window {
		comet: Config;
	}
}

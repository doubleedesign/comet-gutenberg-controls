import React from 'react';
import { ASPECT_RATIOS } from "../components/constants";

export const withCometConfig = (Story, context) => {
	const mockConfig: Config = {
		aspectRatios: ASPECT_RATIOS
	}

	window.comet = mockConfig;

	return <Story />;
}
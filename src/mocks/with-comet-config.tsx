import React from 'react';
import { mockCometConfig } from "./mock-comet-config";

export const withCometConfig = (Story, context) => {
	mockCometConfig();

	return <Story />;
}
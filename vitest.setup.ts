/// <reference types="vitest/globals" />
import '@testing-library/jest-dom/vitest';
import { mockResizeObserver } from './src/mocks/mock-resize-observer';
import { mockMatchMedia } from './src/mocks/mock-match-media';
import {mockCometConfig} from "./src/mocks/mock-comet-config";

beforeAll(() => {
	mockResizeObserver();
	mockMatchMedia();
	mockCometConfig();
});

afterAll(() => {
	vi.clearAllMocks();
	// @ts-expect-error TS2551: Property comet does not exist on type Window & typeof globalThis.
	delete window.comet;
});
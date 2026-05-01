import { withMaxWidth } from '@doubleedesign/storybook-assorted-decorators';
import { withCometConfig } from '../src/mocks/with-comet-config.tsx';
import '@wordpress/components/build-style/style.css';
import '../dist/style.css';

/** @type { import('@storybook/react-webpack5').Preview } */
const preview = {
    parameters: {
        controls: {
            expanded: true,
            disableSaveFromUI: true,
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
            // Allow "attributes" to be defined in the EditorControlProps type but not be shown in the Storybook controls
            exclude: ['attributes']
        },
        docs: {
            inlineStories: true,
        },
    },
    decorators: [
        withMaxWidth('280px'),
        withCometConfig
    ],
};

export default preview;
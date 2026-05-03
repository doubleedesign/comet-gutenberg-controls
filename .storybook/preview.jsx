import { withMaxWidth } from '@doubleedesign/storybook-assorted-decorators';
import { withCometConfig } from '../src/mocks/with-comet-config.tsx';

import { themes } from 'storybook/theming';
import { create } from 'storybook/theming/create';
import { doubleeTheme } from '@doubleedesign/doublee-site-style';
import '@wordpress/components/build-style/style.css';
import '../dist/style.css';
import './preview.css';

import { SyntaxHighlighter } from 'storybook/internal/components';
import scss from 'react-syntax-highlighter/dist/esm/languages/prism/scss';
import php from 'react-syntax-highlighter/dist/esm/languages/prism/php';
import powershell from 'react-syntax-highlighter/dist/esm/languages/prism/powershell';

SyntaxHighlighter.registerLanguage('scss', scss);
SyntaxHighlighter.registerLanguage('php', php);
SyntaxHighlighter.registerLanguage('powershell', powershell);

const mergedTheme = create({
    ...themes.light,
    ...doubleeTheme,
});

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
            theme: mergedTheme,
        },
    },
    decorators: [
        withMaxWidth('280px'),
        withCometConfig
    ],
};

export default preview;
import { withMaxWidth } from '@doubleedesign/storybook-assorted-decorators';
import { withCometConfig } from '../src/mocks/with-comet-config.tsx';
import { themes } from 'storybook/theming';
import { create } from 'storybook/theming/create';
import { doubleeTheme } from '@doubleedesign/doublee-site-style';
import './preview.css';
import '@wordpress/components/build-style/style.css';
import '../dist/style.css';

import { SyntaxHighlighter } from 'storybook/internal/components';
import scss from 'react-syntax-highlighter/dist/esm/languages/prism/scss';
import php from 'react-syntax-highlighter/dist/esm/languages/prism/php';
import powershell from 'react-syntax-highlighter/dist/esm/languages/prism/powershell';
import { DocsContainer } from "@storybook/addon-docs/blocks";
import { withMockWpDataStore } from "../src/mocks/with-mock-wp-data-store.tsx";
import { withDocsStylesMaybe } from "./decorators/withDocsStylesMaybe.tsx";

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
            inlineStories: false, // put stories into an iframe
            theme: mergedTheme,
            // The preview.decorators array does not apply to MDX files, but we can wrap them in decorators here
            container: ({ children, context }) => withDocsStylesMaybe(() => (
                <DocsContainer context={context}>
                    <div className="sb-unstyled" data-typography-mode="docs">
                        {children}
                    </div>
                </DocsContainer>
            ), context)
        },
        options: {
            storySort: (a, b) => {
                const order = ['Docs', 'Control Groups', 'Block-Specific Control Groups', 'Controls', 'Internals'];
                const aGroup = order.findIndex(g => a.title.startsWith(g));
                const bGroup = order.findIndex(g => b.title.startsWith(g));
                const aIdx = aGroup === -1 ? order.length : aGroup;
                const bIdx = bGroup === -1 ? order.length : bGroup;

                return aIdx - bIdx;
            },
        },
    },
    decorators: [
        withMaxWidth('280px'),
        withCometConfig,
        withMockWpDataStore,
    ],
};

export default preview;
import wp from '@wordpress/element';

export const withDocsStylesMaybe = (Story, context) => {
    if(context?.channel?.data?.storySpecified?.[0]?.viewMode === 'docs') {
        // it is actually there, dunno why TypeScript is confused
        // @ts-expect-error TS2307: Cannot find module ../docs.css or its corresponding type declarations.
        import('../docs.css').then((result) => {
            // do nothing
        }).catch((error) => {
            console.error('Error loading docs.css:', error);
        });
    }

    return <Story />;
}

import wp from '@wordpress/element';
import { useEffect, useState } from 'react';
// @ts-expect-error TS2882: Cannot find module or type declarations for side-effect import of ./page-nav.css
import './page-nav.css';

type IndexEntry = {
    id: string;
    title: string;
    name: string;
    type: string;
}

export function PageNav() {
    const [allEntries, setAllEntries] = useState<IndexEntry[]>([]);
    const [currentId, setCurrentId] = useState<string>('');

	const prefixPath = window.location.hostname == 'localhost' ? '' : 'comet-gutenberg-controls';

    useEffect(() => {
        // Get current story ID from the global Storybook state
        const store = (globalThis as any).__STORYBOOK_STORY_STORE__;
        if (store) {
            const current = store.getCurrentStory?.();
            setCurrentId(current?.id ?? '');
        }

        // Fetch the story index directly from Storybook's index endpoint
        fetch(`${prefixPath}/index.json`)
            .then(res => res.json())
            .then(data => {
                // Filter to only docs entries, preserve sidebar order
                const entries = Object.values(data.entries as Record<string, IndexEntry>)
                    .filter(entry => entry.type === 'docs');
                setAllEntries(entries);
            })
            .catch((error) => {
				console.error(error);
				setAllEntries([]);
            });
    }, []);

    // Also watch for URL changes to update currentId
    useEffect(() => {
        const onHashChange = () => {
            const params = new URLSearchParams(window.parent.location.search);
            const path = params.get('path') ?? '';
            const match = path.match(/\/docs\/(.+)/);
            if (match) setCurrentId(match[1]);
        };

        try {
            window.parent.addEventListener('popstate', onHashChange);
            onHashChange(); // run once on mount
            return () => window.parent.removeEventListener('popstate', onHashChange);
        } catch(error) {
            console.error(error);
        }
    }, []);

    const currentIndex = allEntries.findIndex(entry => entry.id === currentId);
    const prev = currentIndex > 0 ? allEntries[currentIndex - 1] : null;
    const next = currentIndex < allEntries.length - 1 ? allEntries[currentIndex + 1] : null;

    const navigate = (id: string) => {
        try {
            const url = new URL(window.parent.location.href);
            url.searchParams.set('path', `/docs/${id}`);
            window.parent.history.pushState({}, '', url.toString());
            window.parent.dispatchEvent(new PopStateEvent('popstate'));
        } catch {
            // Fallback for cross-origin
            window.location.href = `?path=/docs/${id}`;
        }
    };

    if (allEntries.length === 0) return null;

    return (
        <nav className="page-nav">
            {prev ? (
                <button onClick={() => navigate(prev.id)} className="page-nav__prev">
                    <span className="page-nav__label page-nav__label--prev">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
						{/** <!--!Font Awesome Pro v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2026 Fonticons, Inc.--> */}
							<path d="M4.7 244.7c-6.2 6.2-6.2 16.4 0 22.6l176 176c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6L54.6 272 496 272c8.8 0 16-7.2 16-16s-7.2-16-16-16L54.6 240 203.3 91.3c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0l-176 176z"/>
						</svg>
						Previous
					</span>
                    <span className="page-nav__title page-nav__title--prev">{prev.title.split('/').at(-1)}</span>
                </button>
            ) : null}
            {next ? (
                <button onClick={() => navigate(next.id)} className="page-nav__next">
                    <span className="page-nav__label page-nav__label--next">
						Next
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
						{ /** <!--!Font Awesome Pro v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2026 Fonticons, Inc.--> */}
							<path d="M507.3 267.3c6.2-6.2 6.2-16.4 0-22.6l-176-176c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L457.4 240 16 240c-8.8 0-16 7.2-16 16s7.2 16 16 16l441.4 0-148.7 148.7c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0l176-176z"/>
						</svg>
					</span>
                    <span className="page-nav__title page-nav__title--next">{next.title.split('/').at(-1)}</span>
                </button>
            ) : null}
        </nav>
    );
}
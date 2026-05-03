import React, { useEffect, useState } from 'react';

type IndexEntry = {
    id: string;
    title: string;
    name: string;
    type: string;
}

export function PageNav() {
    const [allEntries, setAllEntries] = useState<IndexEntry[]>([]);
    const [currentId, setCurrentId] = useState<string>('');

    useEffect(() => {
        // Get current story ID from the global Storybook state
        const store = (globalThis as any).__STORYBOOK_STORY_STORE__;
        if (store) {
            const current = store.getCurrentStory?.();
            setCurrentId(current?.id ?? '');
        }

        // Fetch the story index directly from Storybook's index endpoint
        fetch('/index.json')
            .then(res => res.json())
            .then(data => {
                // Filter to only docs entries, preserve sidebar order
                const entries = Object.values(data.entries as Record<string, IndexEntry>)
                    .filter(entry => entry.type === 'docs');
                setAllEntries(entries);
            })
            .catch(() => {
                // Fallback: try stories.json for older Storybook versions
                fetch('/stories.json')
                    .then(res => res.json())
                    .then(data => {
                        const entries = Object.values(data.stories as Record<string, IndexEntry>)
                            .filter(entry => entry.type === 'docs');
                        setAllEntries(entries);
                    });
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
                    <span className="page-nav__label">Previous</span>
                    <span className="page-nav__title">← {prev.title.split('/').at(-1)}</span>
                </button>
            ) : null}
            {next ? (
                <button onClick={() => navigate(next.id)} className="page-nav__next">
                    <span className="page-nav__label">Next</span>
                    <span className="page-nav__title">{next.title.split('/').at(-1)} →</span>
                </button>
            ) : null}
        </nav>
    );
}
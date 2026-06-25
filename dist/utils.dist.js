function transformColorValueToKey(value) {
    if (!value || typeof value !== 'string') {
        return undefined;
    }
    if (value.startsWith('var(--color-')) {
        return value.replace('var(--color-', '').replace(')', '');
    }
    if (value.startsWith('var(--gradient-')) {
        return value.replace('var(--gradient-', '').replace(')', '');
    }
    if (value.startsWith('linear-gradient')) {
        const regex = /var\(--color-([a-zA-Z0-9]+)\)/g;
        const matches = [...value.matchAll(regex)]?.map((match) => match[1]);
        const uniqueMatches = [...new Set(matches)];
        if (uniqueMatches.length == 2) {
            return `${uniqueMatches[0]}-${uniqueMatches[1]}`;
        }
    }
    console.log('unmatched value', value);
    return value;
}
function transformColorKeyToValue(key) {
    if (!key || typeof key !== 'string') {
        return undefined;
    }
    if (key.includes('-')) {
        return `var(--gradient-${key})`;
    }
    return `var(--color-${key})`;
}
function transformValueKeyToPair(key) {
    if (!key || typeof key !== 'string' || !key.includes('')) {
        return undefined;
    }
    if (key.includes(' on ')) {
        const [foreground, background] = key.split(' on ');
        return {
            foreground: foreground.trim(),
            background: background.trim(),
        };
    }
    return {
        foreground: key.split('-')[0],
        background: key.split('-')[1],
    };
}
function transformColorPairsToPalette(pairs) {
    return pairs.map((pair) => ({
        name: `${pair.foreground} on ${pair.background}`,
        slug: `${pair.foreground}-${pair.background}`,
        // eslint-disable-next-line max-len
        gradient: `linear-gradient(135deg, var(--color-${pair.foreground}) 0%, var(--color-${pair.foreground}) 50%, var(--color-${pair.background}) 50%, var(--color-${pair.background}) 100%)`,
    }));
}
function difference(array1, array2) {
    return array1.filter(item => !array2.some(otherItem => otherItem.slug === item.slug));
}

export { difference, transformColorKeyToValue, transformColorPairsToPalette, transformColorValueToKey, transformValueKeyToPair };
//# sourceMappingURL=utils.dist.js.map

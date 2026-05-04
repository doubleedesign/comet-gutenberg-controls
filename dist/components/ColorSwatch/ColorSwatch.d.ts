import React from 'react';
import { ThemeColor } from '../../types';
export type ColorSwatchProps = {
    colorTheme?: ThemeColor;
    backgroundColor?: ThemeColor;
};
export declare function ColorSwatch({ colorTheme, backgroundColor }: ColorSwatchProps): React.JSX.Element | null;

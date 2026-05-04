import React from 'react';
import { ColorPair } from '../../../types';
export type ColorPairPaletteDropdownProps = {
    blockName: string;
    label?: string;
    value: ColorPair;
    onChange: (value: {
        foreground: string;
        background: string;
    }) => void;
};
export declare function ColorPairPaletteDropdown({ blockName, label, value, onChange }: {
    blockName: any;
    label?: string | undefined;
    value: any;
    onChange: any;
}): React.JSX.Element;

export type ColorPaletteDropdownProps = {
    label: string;
    value: string;
    palette: Array<{
        slug: string;
        name: string;
        color: string;
    }>;
    onChange: (value: string) => void;
    clearable?: boolean;
};
export declare function ColorPaletteDropdown({ label, value, palette, onChange, clearable }: ColorPaletteDropdownProps): JSX.Element;

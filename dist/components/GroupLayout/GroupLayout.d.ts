import { EditorControlProps } from '../types';
export type GroupLayoutProps = EditorControlProps & {
    attributes: {
        layout: 'list' | 'grid';
    };
};
export declare const GroupLayout: ({ attributes, setAttributes }: GroupLayoutProps) => JSX.Element | null;

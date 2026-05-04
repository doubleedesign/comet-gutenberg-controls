import { EditorControlProps } from '../types';
import { BackgroundOpacityProps } from './BackgroundOpacity/BackgroundOpacity';
import { BackgroundTypeProps } from './BackgroundType/BackgroundType';
export type BannerControlsProps = EditorControlProps & {
    attributes: BackgroundTypeProps['attributes'] & BackgroundOpacityProps['attributes'];
};
export declare function BannerControls(props: BannerControlsProps): JSX.Element | null;

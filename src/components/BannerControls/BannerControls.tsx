import { EditorControlProps } from '../types';
import { BackgroundOpacity, BackgroundOpacityProps } from './BackgroundOpacity/BackgroundOpacity';
import { BackgroundType, BackgroundTypeProps } from './BackgroundType/BackgroundType';
import { PanelBody } from '@wordpress/components';

export type BannerControlsProps = EditorControlProps & {
	attributes: BackgroundTypeProps['attributes'] & BackgroundOpacityProps['attributes'];
};

export function BannerControls(props: BannerControlsProps) {
	if (props.name !== 'comet/banner') {
		return null;
	}

	return (
		<PanelBody title="Banner Options" initialOpen={true}>
			<BackgroundOpacity {...props}/>
			<BackgroundType {...props} />
		</PanelBody>
	);
}

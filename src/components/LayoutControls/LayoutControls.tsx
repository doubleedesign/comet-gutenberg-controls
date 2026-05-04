/* global wp */
import { PanelBody } from '@wordpress/components';
import { ContainerSize } from './ContainerSize/ContainerSize';
import { GroupLayout } from './GroupLayout/GroupLayout';
import { VerticalAlignment } from './VerticalAlignment/VerticalAlignment';
import { HorizontalAlignment } from './HorizontalAlignment/HorizontalAlignment';
import { LayoutOrientation } from './LayoutOrientation/LayoutOrientation';
import { ContentMaxWidth } from './ContentMaxWidth/ContentMaxWidth';
import { MaxPerRow } from './MaxPerRow/MaxPerRow';
import { ItemCount } from './ItemCount/ItemCount';
import { NegativeMargins } from './NegativeMargins/NegativeMargins';
import { AspectRatio } from './AspectRatio/AspectRatio';
import { LayoutOrder } from './LayoutOrder/LayoutOrder';
import { EditorControlProps } from '../types';

export type LayoutControlsProps = EditorControlProps;

export const LayoutControls = (props: LayoutControlsProps) => {
	// If the block does not have any layout attributes, do not render the controls
	const componentDefault = Object.keys(comet?.defaults[props?.name?.replace('comet/', '')] ?? {}) ?? [];
	const currentAttributes = Object.keys(props.attributes) ?? [];
	if (componentDefault.length === 0 && currentAttributes.length === 0) {
		return null;
	}
	const layoutAttributes = [
		'size',
		'groupLayout',
		'orientation',
		'hAlign',
		'vAlign',
		'backgroundType'
	];
	const hasLayoutAttributes = [...componentDefault, ...currentAttributes].some((attr) => layoutAttributes.includes(attr));
	if (!hasLayoutAttributes) {
		return null;
	}

	return (
		<PanelBody title="Layout" initialOpen={true}>
			<ContainerSize {...props} />
			<AspectRatio {...props} />
			<ContentMaxWidth {...props}/>
			<NegativeMargins {...props} />
			<GroupLayout {...props} />
			<ItemCount {...props} />
			<MaxPerRow {...props} />
			<LayoutOrientation {...props} />
			<LayoutOrder {...props} />
			<HorizontalAlignment {...props} />
			<VerticalAlignment {...props} />
		</PanelBody>
	);
};

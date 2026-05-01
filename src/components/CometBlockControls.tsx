import { InspectorAdvancedControls, InspectorControls } from '@wordpress/block-editor';
import { LayoutControls } from './LayoutControls/LayoutControls';
import { PanelBody } from '@wordpress/components';
import { ColorControls } from './ColorControls/ColorControls';
import { BackgroundOpacity } from './BackgroundOpacity/BackgroundOpacity';
import { BackgroundType } from './BackgroundType/BackgroundType';
import { HtmlTag } from './HtmlTag/HtmlTag';

/**
 * Render BlockEdit component with controls for custom attributes
 * @param BlockEdit The original BlockEdit component
 * @param {Object} props The block edit props
 */
export function CometBlockControls({ BlockEdit, ...props }) {
	return (
		<>
			<div className="comet-plugin-blocks-custom-controls">
				<InspectorControls>
					<LayoutControls {...props} />
					{Object.keys(props?.attributes).some(attr => ['colorTheme', 'backgroundColor', 'backgroundOpacity', 'backgroundType'].includes(attr)) && (
						<PanelBody title="Colours" initialOpen={true}
							className={`comet-color-controls comet-color-controls--${props.name.split('/')[1]}`}>
							<ColorControls {...props} />
							<BackgroundOpacity {...props}/>
							<BackgroundType {...props} />
						</PanelBody>
					)} 
				</InspectorControls>
				<InspectorAdvancedControls>
					<HtmlTag {...props} />
				</InspectorAdvancedControls>
			</div>
			<BlockEdit {...props} />
		</>
	);
}
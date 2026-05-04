export type EditorControlProps = {
	/** The block name as per the WordPress block.json definition; no required/used by all control components */
	name: string;
	/** The current block attributes as provided by the WordPress block editor;
	 * 	should generally be overridden with a more specific definition for each control */
	attributes: Record<string, any>;
	/** The function to update block attributes that is provided by the WordPress block editor */
	setAttributes: (attributes: Record<string, any>) => void;
};
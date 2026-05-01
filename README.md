# Comet Gutenberg Controls

A collection of customised controls for the WordPress Block Editor intended for use with the [Comet Components](https://github.com/doubleedesign/comet-components) plugin. These have been separated out from the main plugin to enable simpler independent development and isolated testing of these control UI components.

---
## Development

Install dependencies:

```powershell
npm install
```

Run Storybook to see and test the available components:

```powershell
npm run storybook
```

When making changes, either set up Rollup to auto-compile on file changes, or run the build script after making changes:

```powershell
npm run build
```

### Unit testing

Still to come.

---
## Usage in WordPress

The below is an overview of how this package is implemented in the Comet Components plugin for the WordPress block editor, and could be adapted for other use cases.

Add to the dependencies in `package.json`:

```json
"dependencies": {
  "@doubleedesign/comet-gutenberg-controls": "github:doubleedesign/comet-gutenberg-controls"
}
```

Create a wrapping editor component like this:

```jsx
/* global wp */
import { addFilter } from '@wordpress/hooks';
import { CometBlockControls } from '@doubleedesign/comet-gutenberg-controls';

wp.domReady(() => {
	addFilter(
		'editor.BlockEdit',
		'comet-plugin-blocks/custom-controls',
		(BlockEdit) => (props) => {
			return (
				<div className="comet-block-edit-wrapper" data-block={props.name}>
					<CometBlockControls BlockEdit={BlockEdit} {...props} />
				</div>
			);
		});
});
```

Compile it using [Rollup](https://rollupjs.org/). Please see the current [build config](https://github.com/doubleedesign/comet-components/blob/master/packages/comet-plugin-blocks/rollup.config.js) in the Comet plugin for an example config file.

Add a build script to `package.json` like this:

```json
"scripts": {
  "build": "rollup -c"
}
```

And running it like so:

```powershell
npm run build
```

Load the compiled JavaScript into the block editor via the `enqueue_block_editor_assets` PHP hook:

```php
add_action('enqueue_block_editor_assets', function() {
    wp_enqueue_script(
        'comet-blocks-custom-controls',
        "$pluginDir/src/editor/CustomControls.dist.js",
        ['wp-blocks', 'wp-element', 'wp-editor', 'comet-block-registry'],
        '1.0.0',
        true
    );
});
```

You will also need to use `wp_localize_script` to define the global `comet` object and its values so the editor components know what options and values to display. You can find the definition of the object in [cometConfig.d.ts](./src/components/cometConfig.d.ts), and an example of `wp_localize_script` in the [BlockEditorConfig.php](https://github.com/doubleedesign/comet-components/blob/master/packages/comet-plugin-blocks/src/BlockEditorConfig.php) file in the Comet plugin.
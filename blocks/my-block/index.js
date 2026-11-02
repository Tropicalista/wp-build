import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import metadata from './block.json';
import './style.scss';

registerBlockType( metadata.name, {
	edit: ( { attributes, setAttributes } ) => (
		<div { ...useBlockProps() }>
			<RichText
				tagName="p"
				value={ attributes.message }
				onChange={ ( message ) => setAttributes( { message } ) }
			/>
		</div>
	),
	save: () => null, // blocco dinamico: il rendering è in render.php
} );
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import { useEffect, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';

function GreetingEdit() {
	const blockProps = useBlockProps();
	const [ message, setMessage ] = useState( '' );

	return (
		<p { ...blockProps }>
			{ message || __( 'Imposta il saluto nella pagina Saluto.', 'greeting-plugin' ) }
		</p>
	);
}

registerBlockType( 'greeting-plugin/greeting', {
	edit: GreetingEdit,
} );

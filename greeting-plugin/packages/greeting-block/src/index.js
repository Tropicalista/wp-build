import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';
import { useEffect, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';

function GreetingEdit() {
	const blockProps = useBlockProps();
	const [ message, setMessage ] = useState( '' );

	useEffect( () => {
		apiFetch( { path: '/wp/v2/settings' } )
			.then( ( settings ) => setMessage( settings.greeting_plugin_message ?? '' ) )
			.catch( () => setMessage( '' ) );
	}, [] );

	return (
		<p { ...blockProps }>
			{ message || __( 'Imposta il saluto nella pagina Saluto.', 'greeting-plugin' ) }
		</p>
	);
}

registerBlockType( 'greeting-plugin/greeting', {
	edit: GreetingEdit,
} );

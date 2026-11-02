import { useEffect, useState } from '@wordpress/element';
import { Button, Notice, Spinner, TextControl } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';

const OPTION_NAME = 'greeting_plugin_message';

type NoticeState = { status: 'success' | 'error'; text: string } | null;

export const stage = () => {
	const [ message, setMessage ] = useState( '' );
	const [ isLoading, setIsLoading ] = useState( true );
	const [ isSaving, setIsSaving ] = useState( false );
	const [ notice, setNotice ] = useState< NoticeState >( null );

	useEffect( () => {
		apiFetch< Record< string, unknown > >( { path: '/wp/v2/settings' } )
			.then( ( settings ) => {
				const value = settings[ OPTION_NAME ];
				setMessage( typeof value === 'string' ? value : '' );
			} )
			.catch( () =>
				setNotice( {
					status: 'error',
					text: __( 'Impossibile caricare il saluto.', 'greeting-plugin' ),
				} )
			)
			.finally( () => setIsLoading( false ) );
	}, [] );

	const handleSave = () => {
		setIsSaving( true );
		setNotice( null );
		apiFetch( {
			path: '/wp/v2/settings',
			method: 'POST',
			data: { [ OPTION_NAME ]: message },
		} )
			.then( () =>
				setNotice( {
					status: 'success',
					text: __( 'Saluto salvato.', 'greeting-plugin' ),
				} )
			)
			.catch( () =>
				setNotice( {
					status: 'error',
					text: __( 'Salvataggio non riuscito. Riprova.', 'greeting-plugin' ),
				} )
			)
			.finally( () => setIsSaving( false ) );
	};

	return (
		<div style={ { maxWidth: 560, padding: 24 } }>
			<h1 style={ { marginTop: 0 } }>{ __( 'Saluto', 'greeting-plugin' ) }</h1>
			<p>
				{ __(
					'Il testo impostato qui viene mostrato dal blocco Saluto nei tuoi contenuti.',
					'greeting-plugin'
				) }
			</p>

			{ isLoading ? (
				<Spinner />
			) : (
				<>
					<TextControl
						label={ __( 'Messaggio', 'greeting-plugin' ) }
						value={ message }
						onChange={ setMessage }
						disabled={ isSaving }
					/>
					<div style={ { marginTop: 16 } }>
						<Button variant="primary" onClick={ handleSave } isBusy={ isSaving } disabled={ isSaving }>
							{ __( 'Salva', 'greeting-plugin' ) }
						</Button>
					</div>
				</>
			) }

			{ notice && (
				<div style={ { marginTop: 16 } }>
					<Notice status={ notice.status } isDismissible={ false }>
						{ notice.text }
					</Notice>
				</div>
			) }
		</div>
	);
};

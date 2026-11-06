import { __ } from '@wordpress/i18n';
import {
	__experimentalInputControl as InputControl,
	Button,
	ExternalLink,
	Spinner,
	Notice,
} from '@wordpress/components';
import {
	useEntityProp,
	useEntityRecord,
	store as coreStore,
} from '@wordpress/core-data';
import { useDispatch, useSelect } from '@wordpress/data';
import {
	createInterpolateElement,
	useState,
	useRef,
	Fragment,
} from '@wordpress/element';

export const KeyInput = () => {
	const { record: settings, isResolving } = useEntityRecord( 'root', 'site' );
	const [ siteUrl ] = useEntityProp( 'root', 'site', 'url' );

	const [ message, setMessage ] = useState();
	const [ loading, setLoading ] = useState();

	const { saveEntityRecord } = useDispatch( coreStore );

	const inputRef = useRef( '' );

	const { canUserEdit } = useSelect( ( select ) => {
		return {
			canUserEdit: select( 'core' ).canUser( 'update', 'settings' ),
		};
	}, [] );

	const save = () => {
		saveEntityRecord( 'root', 'site', {
			pdf_embed: {
				...settings.pdf_embed,
				apiKey: inputRef.current.value,
			},
		} );
	};

	const validate = () => {
		setLoading( true );
		const url = 'https://viewlicense.adobe.io/viewsdklicense/jwt';

		const data = {
			client_id: inputRef.current.value,
			client_device_time: Date.now(),
			domain: siteUrl,
		};

		const response = fetch( url, {
			method: 'POST',
			mode: 'cors',
			redirect: 'follow',
			headers: {
				'X-Key-Pair-Version': 'v1',
				'Content-Type': 'application/json',
				'x-api-key': inputRef.current.value,
			},
			body: JSON.stringify( data ),
		} );

		response
			.then( () => {
				setMessage( 'success' );
				save();
			} )
			.catch( () => {
				setMessage( 'error' );
			} )
			.finally( () => {
				setLoading( false );
			} );

		return response;
	};

	if ( isResolving ) {
		return <Spinner />;
	}

	if ( ! canUserEdit ) {
		return (
			<p>
				{ __( 'Only admin can manage PDF Embed api key', 'pdf-embed' ) }
			</p>
		);
	}

	return (
		<Fragment spacing={ 4 } expanded={ true } width="100%">
			<InputControl
				label={ __( 'API Key', 'pdf-embed' ) }
				help={ createInterpolateElement(
					__(
						'Get your free API key on <a>Adobe Official site</a>.',
						'pdf-embed'
					),
					{
						a: (
							<ExternalLink
								href="https://www.adobe.io/apis/documentcloud/dcsdk/pdf-embed.html"
								target="_blank"
								rel="noreferrer"
							/>
						),
					}
				) }
				ref={ inputRef }
				suffix={
					<Button
						text={ __( 'Save' ) }
						onClick={ () => validate() }
						variant="primary"
						isBusy={ loading }
						disabled={ loading }
						aria-disabled={ loading }
						__next40pxDefaultSize
					/>
				}
				__next40pxDefaultSize
				__nextHasNoMarginBottom
			/>
			{ message && (
				<Notice
					status={ message }
					isDismissible={ true }
					onRemove={ () => setMessage( false ) }
				>
					{ 'error' === message && (
						<small>
							An error occurred: please check that you have
							enabled this domain for this key.
						</small>
					) }
					{ 'success' === message && (
						<small>The key is valid.</small>
					) }
				</Notice>
			) }
		</Fragment>
	);
};

import { __ } from '@wordpress/i18n';
import { store as coreDataStore, useEntityProp } from '@wordpress/core-data';
import { useDispatch, useSelect } from '@wordpress/data';
import { Card, Button, Stack } from '@wordpress/ui';
import { store as noticesStore } from '@wordpress/notices';
import './style.scss';

function Footer( { isValid }: { isValid: boolean } ) {
	const { isSaving, hasEdits, hasResolved } = useSelect(
		( select ) => ( {
			hasResolved: select( coreDataStore ).hasFinishedResolution(
				'getEntityRecord',
				[ 'root', 'site' ]
			),
			isSaving: select( coreDataStore ).isSavingEntityRecord(
				'root',
				'site'
			),
			hasEdits: select( coreDataStore ).hasEditsForEntityRecord(
				'root',
				'site',
				undefined
			),
		} ),
		[]
	);

	const { saveEditedEntityRecord } = useDispatch( coreDataStore );
	const { createNotice } = useDispatch( noticesStore );

	const saveSettings = () => {
		return saveEditedEntityRecord( 'root', 'site', undefined, {
			throwOnError: true,
		} )
			.then( () => {
				createNotice(
					'info',
					'🎯 ' + __( 'Settings saved.', 'pdf-embed' ),
					{
						type: 'snackbar',
					}
				);
			} )
			.catch( ( error ) => {
				createNotice( 'error', '⚠️ ' + error.message, {
					type: 'snackbar',
					explicitDismiss: true,
				} );
			} );
	};

	return (
		<div className="experiments-page__footer">
			<Stack gap="lg" align="flex-start">
				<Button
					type="submit"
					variant="solid"
					loading={ isSaving }
					disabled={ isSaving || ! hasEdits || ! isValid }
					onClick={ saveSettings }
				>
					{ __( 'Save settings', 'pdf-embed' ) }
				</Button>
			</Stack>
		</div>
	);
}

export { Footer };

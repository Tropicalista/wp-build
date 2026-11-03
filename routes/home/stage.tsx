import { Page } from '@wordpress/admin-ui';
import { __, sprintf } from '@wordpress/i18n';
import { RawHTML, useContext } from '@wordpress/element';
import { store as coreDataStore, useEntityProp } from '@wordpress/core-data';
import { useDispatch, useSelect } from '@wordpress/data';
import { Card } from '@wordpress/ui';
import logo from '../../assets/logo.svg';
import './style.scss';

function Stage() {
	const [ settings ] = useEntityProp( 'root', 'site', 'pdf_embed' );

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
				undefined,
				'pdf_embed'
			),
		} ),
		[]
	);

	return (
		<Page
			title={ __( 'Settings', 'pdf-embed' ) }
			subTitle={ __(
				'This is a minimal wp-build route that renders DataViews.',
				'pdf-embed'
			) }
			visual={ <img src={ logo } alt="" /> }
			hasPadding={ true }
			navigation={ {
				currentHref: '/overview',
				items: [
					{
						href: '/overview',
						label: 'Overview',
					},
					{
						href: '/products',
						label: 'Products',
					},
					{
						href: '/orders',
						label: 'Orders',
					},
					{
						href: '/customers',
						label: 'Customers',
					},
				],
			} }
		>
			<div className="experiments-page__form">
				<Card.Root>
					<Card.Header>
						<Card.Title>Heading</Card.Title>
					</Card.Header>
					<Card.Content>
						<p>Main content here.</p>
					</Card.Content>
				</Card.Root>
			</div>
		</Page>
	);
}

export { Stage as stage };

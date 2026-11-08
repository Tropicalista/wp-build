import { ExternalLink } from '@wordpress/components';
import { Card, Stack } from '@wordpress/ui';

import { __ } from '@wordpress/i18n';

export default function Help() {
	return (
		<Stack direction="column" gap="lg" className="ads-container">
			<Card.Root className="ads-container__help">
				<Card.Header>
					<Card.Title>{ __( 'Need help?', 'pdf-embed' ) }</Card.Title>
				</Card.Header>

				<Card.Content>
					<p>
						{ __(
							'Detailed documentation is available on the plugin website.',
							'pdf-embed'
						) }
					</p>

					<ExternalLink href="https://docs.formello.net">
						{ __( 'Documentation', 'pdf-embed' ) }
					</ExternalLink>
					<p>
						{ __(
							'We would love to help you out if you need any help.',
							'pdf-embed'
						) }
					</p>

					<ExternalLink href="https://wordpress.org/support/plugin/pdf-embed/">
						{ __( 'Ask a question', 'pdf-embed' ) }
					</ExternalLink>
				</Card.Content>
			</Card.Root>
			<Card.Root className="ads-container__reviews">
				<Card.Header>
					<Card.Title>
						{ __( 'Do you like the plugin?', 'pdf-embed' ) }
					</Card.Title>
				</Card.Header>

				<Card.Content>
					<p>
						{ __(
							'If you like PDF Embed plugin you can share a review to help us and spread some love!',
							'pdf-embed'
						) }
					</p>
					<ExternalLink href="https://wordpress.org/support/plugin/pdf-embed/reviews/#new-post">
						{ __( 'Rate 5 stars!', 'pdf-embed' ) }
					</ExternalLink>
				</Card.Content>
			</Card.Root>
		</Stack>
	);
}

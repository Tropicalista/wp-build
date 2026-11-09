import { fields } from '../../routes/home/constants.tsx';
import {
	SwitchControl,
	SelectControl,
	InputControl,
	Stack,
} from '@wordpress/ui';
import { Fragment } from 'react';

export const Settings = ( { attributes, setAttributes } ) => {
	const { config } = attributes;
	const data = config || pdf_embed;

	const handleChange = ( edits ) => {
		setAttributes( {
			config: {
				...config,
				...edits,
			},
		} );
	};

	const settingsFields = fields.filter(
		( field ) => field.type !== 'password'
	);

	return (
		<Stack gap="md" direction="column">
			{ settingsFields.map( ( field ) => (
				<Fragment key={ field.id }>
					{ field.type === 'boolean' && (
						<SwitchControl
							name={ field.id }
							label={ field.label }
							description={ field.description }
							checked={ Boolean( data?.[ field.id ] ) }
							onCheckedChange={ ( checked ) =>
								handleChange( { [ field.id ]: checked } )
							}
						/>
					) }
					{ field.elements && (
						<SelectControl
							label={ field.label }
							description={
								field.elements?.find(
									( item ) =>
										item.value === data?.[ field.id ]
								).description ?? null
							}
							onValueChange={ ( item ) =>
								handleChange( { [ field.id ]: item.value } )
							}
							items={ field.elements }
							value={ data?.[ field.id ] }
						/>
					) }
					{ field.id === 'measurementId' && (
						<InputControl
							name={ field.id }
							label={ field.label }
							description={ field.description }
							defaultValue={ data?.[ field.id ] }
							onValueChange={ ( val ) =>
								handleChange( { [ field.id ]: val } )
							}
							value={ data?.[ field.id ] }
						/>
					) }
				</Fragment>
			) ) }
		</Stack>
	);
};

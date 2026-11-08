import { PanelRow } from '@wordpress/components';
import { fields } from '../../routes/home/constants.tsx';
import { SwitchControl, SelectControl, InputControl } from '@wordpress/ui';

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
		<>
			{ settingsFields.map( ( field ) => (
				<p key={ field.id }>
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
							value={
								field.elements?.find(
									( item ) =>
										item.value === data?.[ field.id ]
								) ?? null
							}
						/>
					) }
					{ field.type === 'text' && (
						<InputControl
							name={ field.id }
							label={ field.label }
							description={ field.description }
							defaultValue={ data?.[ field.id ] }
							onValueChange={ ( val ) =>
								handleChange( { [ field.id ]: val } )
							}
						/>
					) }
				</p>
			) ) }
		</>
	);
};

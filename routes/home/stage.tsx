import {
	ProgressBar,
	Button,
	Icon,
	TextControl,
	Card,
	CardBody,
	CardHeader,
	Notice,
} from "@wordpress/components";
import { Page } from "@wordpress/admin-ui";
import { __, sprintf } from "@wordpress/i18n";
import { RawHTML, useContext } from "@wordpress/element";
import { addQueryArgs } from "@wordpress/url";
import { useNavigate } from "@wordpress/route";
import { Card } from "@wordpress/ui";
import logo from "../../assets/logo.svg";

function Stage() {
	const navigate = useNavigate();

	return (
		<Page
			title={__("Settings", "pdf-embed")}
			subTitle={__(
				"This is a minimal wp-build route that renders DataViews.",
				"pdf-embed",
			)}
			visual={<img src={logo} alt="" />}
			hasPadding={true}
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

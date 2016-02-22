// A React component that will wrap around the blaze template for accounts-ui
AccountsUIWrapper = React.createClass({
	componentDidMount() {
		// User Meteor Blaze to render login buttons
		this.view = Blaze.render(Template.loginButtons,
			React.findDOMNode(this.refs.container));
	},
	componentWillUnmount() {
		// Clean up Blaze view
		Blaze.remove(this.view);
	},
	render() {
		// Render a placeholder container that will house the Blaze template
		return <span ref="container" />;
	}
});
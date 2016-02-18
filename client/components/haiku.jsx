// Haiku component
Haiku = React.createClass({
  propTypes: {
    // component displays haiku through react prop
    haiku: React.PropTypes.object.isRequired
  },
  render() {
    return (
      <div>
        <h3>{this.props.haiku.title}</h3>
        <li>{this.props.haiku.line1}</li>
        <li>{this.props.haiku.line2}</li>
        <li>{this.props.haiku.line3}</li>
      </div>
    );
  }
});
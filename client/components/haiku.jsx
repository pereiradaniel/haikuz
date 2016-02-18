// Haiku component
Haiku = React.createClass({
  propTypes: {
    // component displays haiku through react prop
    haiku: React.PropTypes.object.isRequired
  },

  toggleChecked() {
    // set checked property to opposite of its current value
    Haikus.update(this.props.haiku._id, {
      $set: {checked: ! this.props.haiku.checked}
    });
  },

  render() {
    // toggle a className so that CSS can hide or display haikus
    const haikuClassName = this.props.haiku.checked ? "checked" : "";

    return (
      <div className={haikuClassName}>
        <h3>{this.props.haiku.title}</h3>
        <li>{this.props.haiku.line1}</li>
        <li>{this.props.haiku.line2}</li>
        <li>{this.props.haiku.line3}</li>
        <li>Mark as read
          <input type="checkbox"
            readOnly={true}
            checked={this.props.haiku.checked}
            onClick={this.toggleChecked} />
        </li>
      </div>
    );
  }
});
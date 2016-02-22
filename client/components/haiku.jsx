// Haiku component
Haiku = React.createClass({
  propTypes: {
    // component displays haiku through react prop
    haiku: React.PropTypes.object.isRequired
  },

  toggleChecked() {
    // Set checked property opposite of it's current value
    Meteor.call("setChecked", this.props.haiku._id, ! this.props.haiku.checked);
  },

  deleteHaiku() {
    Meteor.call("removeHaiku", this.props.haiku._id);
  },

  render() {
    // toggle a className so that CSS can hide or display haikus
    const haikuClassName = this.props.haiku.checked ? "checked" : "";

    return (
      <div className={haikuClassName}>
      
        <h3>{this.props.haiku.title}</h3>
        <h3>Author: {this.props.haiku.username}</h3>
        <p>{this.props.haiku.line1}</p>
        <p>{this.props.haiku.line2}</p>
        <p>{this.props.haiku.line3}</p>
        <p>Mark as read
          <input type="checkbox"
            readOnly={true}
            checked={this.props.haiku.checked}
            onClick={this.toggleChecked} />
        </p>
        <button className="delete-btn" onClick={this.deleteHaiku}>
          Delete
        </button>
      </div>
    );
  }
});
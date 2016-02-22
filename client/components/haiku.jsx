// Haiku component
Haiku = React.createClass({
  propTypes: {
    // component displays haiku through react prop
    haiku: React.PropTypes.object.isRequired,
    showPrivateButton: React.PropTypes.bool.isRequired
  },

  toggleChecked() {
    // Set checked property opposite of it's current value
    Meteor.call("setChecked", this.props.haiku._id, ! this.props.haiku.checked);
  },

  deleteHaiku() {
    Meteor.call("removeHaiku", this.props.haiku._id);
  },
  
  togglePrivate() {
    Meteor.call("setPrivate", this.props.haiku._id, ! this.props.haiku.private);
  },

  render() {
    // toggle a className so that CSS can hide or display haikus
    const haikuClassName = (this.props.haiku.checked ? "checked" : "") + " " +
      (this.props.haiku.private ? "private" : "");

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
        { this.props.showPrivateButton ? (
          <button className="toggle-private" onClick={this.togglePrivate}>
            { this.props.haiku.private ? "Private" : "Public" }
          </button>
            ) : '' }

        <button className="delete-btn" onClick={this.deleteHaiku}>
          Delete
        </button>
      </div>
    );
  }
});
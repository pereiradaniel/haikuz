// Root component for entire app
App = React.createClass({

  // Mixin to use ReactMeteorData
  mixins: [ReactMeteorData],

  // This function will set the properties of the component's state
  getInitialState() {
    return {
      // This component state is a boolean value that is toggled to true/false
      // by a checkbox inside the component's render function.
      hideRead: false
    }
  },

  // Loads haikus from collection "Haikus" into this.data.haikus
  getMeteorData() {
    // Creates an object called "query" that will later be used to insert
    // an object that will help the app filter haikus that are marked as read.
    let query = {};

    // This conditional runs if the component state "hideRead" evaluates to
    // "true".  It is set to true by the function toggleHideRead, which is
    // activated "onClick" by a checkbox rendered by this component.
    if (this.state.hideRead) {
      // Alter the query to filter out all haikus where the "checked" property
      // is equal to "true".  It will be true if the haiku is marked as read.
      query = {checked: {$ne: true}};
    }

    // Return all haikus, filtering out any that are marked as previously read.
    return {
      // 'haikus' will equal every object in the Haikus collection that matches
      // what is laid out in the "query" object.
      // If the component state "hideRead" is set to false, query will be
      // an empty object, and therefore all haikus will be returned.
      // In addition to matching the query, objects will be returned sorted
      // by newest first.
      haikus: Haikus.find(query, {sort: {createdAt: -1}}).fetch(),
      // returns variable unreadCount that is equal to the count of haikus that
      // are not checked as "read"
      unreadCount: Haikus.find({checked: {$ne: true}}).count(),
      // Get information about the logged in user
      currentUser: Meteor.user()
    };
  },

  // Function to map the array of haikus into the DOM
  renderHaikus() {
    // Maps the haikus into instances of the component called "Haiku"
    return this.data.haikus.map((haiku) => {
        const currentUserId = this.data.currentUser && this.data.currentUser._id;
        const showPrivateButton = haiku.owner === currentUserId;

        return <Haiku
          key={haiku._id}
          haiku={haiku}
          showPrivateButton={showPrivateButton} />;
    });
  },
  
  // Handle form submission for new haiku
  handleSubmit(event) {
  	event.preventDefault();

      // get values from input fields
      haiku = {
        title: React.findDOMNode(this.refs.title).value.trim(),
        line1: React.findDOMNode(this.refs.line1).value.trim(),
        line2: React.findDOMNode(this.refs.line2).value.trim(),
        line3: React.findDOMNode(this.refs.line3).value.trim()
      }
      Meteor.call("addHaiku", haiku);

      // clear input fields on the DOM
      React.findDOMNode(this.refs.title).value = "";
      React.findDOMNode(this.refs.line1).value = "";
      React.findDOMNode(this.refs.line2).value = "";
      React.findDOMNode(this.refs.line3).value = "";
  },

  toggleHideRead() {
    this.setState({
      hideRead: ! this.state.hideRead
    });
  },

  render() {
    return (
      <div className="container">
        <header>
          <h1>Haikuz</h1>
          <h3>{this.data.unreadCount} unread haikus</h3>
          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly={true}
              checked={this.state.hideRead}
              onClick={this.toggleHideRead} />
            Hide all marked as read
          </label>
        </header>

        <AccountsUIWrapper />

        { this.data.currentUser ?
        <form className="new-haiku" onSubmit={this.handleSubmit} >
          <p>
            <label htmlFor="title">Title</label>
              <input type="text" ref="title" />
          </p>
          <p>
            <label htmlFor="line1">Line 1 - 5 syllables</label>
              <input type="text" ref="line1" />
          </p>
          <p>
            <label htmlFor="line2">Line 2 - 7 syllables</label>
              <input type="text" ref="line2" />
          </p>
          <p>
            <label htmlFor="line3">Line 3 - 5 syllables</label>
              <input type="text" ref="line3" />
          </p>
          <button>Submit</button>
        </form> : ''
        }

        <ul>
          {this.renderHaikus()}
        </ul>
      </div>
    );
  }
});
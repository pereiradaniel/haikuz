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
      unreadCount: Haikus.find({checked: {$ne: true}}).count()
    };
  },

  // Function to map the array of haikus into the DOM
  renderHaikus() {
    // Maps the haikus into instances of the component called "Haiku"
    return this.data.haikus.map((haiku) => {
      return <Haiku key={haiku._id} haiku={haiku} />;
    });
  },
  
  // Handle form submission for new haiku
  handleSubmit(event) {
  	event.preventDefault();

      // get values from input fields
      var title = $('#title').val();
      var line1 = $('#line1').val();
      var line2 = $('#line2').val();
      var line3 = $('#line3').val();
      
      // clear input fields on the DOM
      $('#title').val("");
      $('#line1').val("");
      $('#line2').val("");
      $('#line3').val("");

      // add haiku to the haikus array
      Haikus.insert({
        title: title,
        line1: line1,
        line2: line2,
        line3: line3,
        createdAt: new Date()
      });
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
        </header>

        <AccountsUIWrapper />

				<form className="new-haiku" onSubmit={this.handleSubmit} >
					<p>
						<label htmlFor="title">Title</label>
							<input type="text" id="title" />
					</p>
					<p>
						<label htmlFor="line1">Line 1 - 5 syllables</label>
							<input type="text" id="line1" />
					</p>
					<p>
						<label htmlFor="line2">Line 2 - 7 syllables</label>
							<input type="text" id="line2" />
					</p>
					<p>
						<label htmlFor="line3">Line 3 - 5 syllables</label>
							<input type="text" id="line3" />
					</p>
				  <button>Submit</button>
			  </form>

        <label className="hide-completed">
          <input
            type="checkbox"
            readOnly={true}
            checked={this.state.hideRead}
            onClick={this.toggleHideRead} />
          Hide all marked as read
        </label>

        <ul>
          {this.renderHaikus()}
        </ul>
      </div>
    );
  }
});
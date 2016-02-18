// Root component for entire app
App = React.createClass({

  // mixin to use ReactMeteorData
  mixins: [ReactMeteorData],

  getInitialState() {
    return {
      hideRead: false
    }
  },

  // loads haikus from collection into this.data.haikus
  getMeteorData() {
    let query = {};

    if (this.state.hideRead) {
      // filter out haikus that are marked as read
      query = {checked: {$ne: true}};
    }

    return {
      haikus: Haikus.find(query, {sort: {createdAt: -1}}).fetch()
    };
  },

  renderHaikus() {
    // get haikus from this.data.haikus
    return this.data.haikus.map((haiku) => {
      return <Haiku key={haiku._id} haiku={haiku} />;
    });
  },

  // handle form submission for new haiku
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
        </header>

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
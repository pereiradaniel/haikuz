// Root component for entire app
App = React.createClass({

  // mixin to use ReactMeteorData
  mixins: [ReactMeteorData],

  // loads haikus from collection into this.data.haikus
  getMeteorData() {
    return {
      haikus: Haikus.find({}).fetch()
    }
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
        line3: line3
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
						<label for="title">Title</label>
							<input type="text" id="title" />
					</p>
					<p>
						<label for="line1">Line 1 - 5 syllables</label>
							<input type="text" id="line1" />
					</p>
					<p>
						<label for="line2">Line 2 - 7 syllables</label>
							<input type="text" id="line2" />
					</p>
					<p>
						<label for="line3">Line 3 - 5 syllables</label>
							<input type="text" id="line3" />
					</p>
				  <button>Submit</button>
			  </form>

        <ul>
          {this.renderHaikus()}
        </ul>
      </div>
    );
  }
});
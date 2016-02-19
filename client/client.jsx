// The code inside this conditional statement will run only on the client side
if (Meteor.isClient) {

  // This code runs when the app starts
  Meteor.startup(function () {
  	// ReactDOM.render() will render the component "App" in the DOM node with the
  	// id of "mount-point"

  	// This function takes two arguments:
  	//		<App />
  	//			This is the React component acting as the root of the app.
  	//		document.getElementById("mount-point")
  	//			Specifies the DOM node where the component is to be mounted
    ReactDOM.render(<App />, document.getElementById("mount-point"));
  });

}
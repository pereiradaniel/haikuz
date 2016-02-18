if (Meteor.isClient) {

  // render the root component after the page is ready
  Meteor.startup(function () {
    React.render(<App />, document.getElementById("mount-point"));
  });

}
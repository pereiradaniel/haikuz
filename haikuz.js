if (Meteor.isClient) {

  Template.body.helpers({
    haikus: function () {
      return Session.get('haikus');
    },
    getHaikus: function () {
      return Haikus.find({});
    }
  });

  Template.newhaiku.events({
    'submit': function (event) {
      
      // prevent haiku form submission
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
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

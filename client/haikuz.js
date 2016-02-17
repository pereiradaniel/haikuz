if (Meteor.isClient) {

  Template.body.helpers({
    getHaikus: function () {
      // sort haikus from newest to oldest
      return Haikus.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.newhaiku.events({
    // submit new-haiku form
    'submit .new-haiku': function (event) {
      
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

      // add haiku to the haikus collection
      Haikus.insert({
        title: title,
        line1: line1,
        line2: line2,
        line3: line3,
        createdAt: new Date()
      });
    }
  });
}
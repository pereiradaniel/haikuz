// create haikus collection
Haikus = new Mongo.Collection('haikus');

Meteor.methods({
	addHaiku(haiku) {
		// Make sure there is a user logged in before inserting haiku to database
		if ( ! Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}

    Haikus.insert({
      title: haiku.title,
      line1: haiku.line1,
      line2: haiku.line2,
      line3: haiku.line3,
      createdAt: new Date(),
      owner: Meteor.userId(),           // _id of logged in user
      username: Meteor.user().username  // username of logged in user
    });
	},

	removeHaiku(haikuId) {
		Haikus.remove(haikuId);
	},

	setChecked(haikuId, setChecked) {
		Haikus.update(haikuId, { $set: {checked: setChecked} });
	}
});
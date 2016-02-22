if (Meteor.isServer) {

	Meteor.publish("haikus", function () {
		return Haikus.find({
			$or: [
			{ private: {$ne: true} },
			{ owner: this.userId }
			]
		});
	});
}

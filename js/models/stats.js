// js/models/stats.js

var app = app || {};

// Stats Model
// ----------
// Our basic **Stats** model 

app.Question = Backbone.Model.extend({
	
	defaults: {
		service: '',
		completed: false,
		points: 0
	}
});
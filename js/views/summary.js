// js/views/summary.js

var app = app || {};

// The Summary
// ---------------

// Our overall **SummaryView** is the top-level piece of UI.
app.SummaryView = Backbone.View.extend({
	
	initialize: function( services ) {
		this.services = services;
		
		// Dynamically generate Questions Collection
		app.Questions = new app.QuestionList();
		
		// Load all LocalStorage copy of questions
		app.Questions.syncAllWithStorage();
		
		this.render();
	},
	
	render: function() {
		for (var i = 0; i < this.services.length; i++) {
			console.log(app.Questions.where({service: this.services[i]}));
			
			var statsView = new app.StatsView({
				model: app.Questions.where({service: this.services[i]})
			});
			
			this.$el.append(statsView.render(this.services[i]));
		}
	}
});
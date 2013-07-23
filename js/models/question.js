// js/models/question.js

var app = app || {};

// Question Model
// ----------
// Our basic **Question** model has 'title', 'completed', and 'answer' keys.

app.Question = Backbone.Model.extend({
	
	// Default attributes ensure that each todo created has 'title', 'completed', and 'answer' keys.
	defaults: {
		id: null,
		title: '',
		service: '',
		completed: false,
		answer: '',
		yesValue: 0,
		noValue: 0
	},
	
	// Clear the 'completed' state of this question.
	clear: function() {
		this.save({
			answer: '',
			completed: false
		});
	},
	
	// Answer the question 'true' or 'false'.
	// Mark this question as completed
	answer: function( newAnswer ) {
		console.log(this);
		this.save({
			answer: newAnswer,
			completed: true
		});
	},
	
	// Return value of answer
	value: function() {
		if (this.attributes.answer === 'yes'){
			return this.attributes.yesValue;
		}
		if (this.attributes.answer === 'no'){
			return this.attributes.noValue;
		}
		return 0;
	}
	
});
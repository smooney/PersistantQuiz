// js/views/question.js

var app = app || {};

// Question View
// --------------

// The DOM element for a question...
app.QuestionView = Backbone.View.extend({
	
	//... is a list tag.
	tagName: 'li',
	
	// Cache the template function for a single item.
	template: _.template( app.Templates.questionTemplate ),
	
	// The DOM events specific to an item
	events: {
		'click .yes': 'answerYes',
		'click .no': 'answerNo',
		'click .skip': 'skip',
		'click .clear': 'clear'
	},
	
	// The QuestionView listens for changes to its model, re-rendering. Since there's
	// a one-to-one correspondence between a **Question** and a **QuestionView** in this 
	// app, we set a direct reference on the model for convenience.
	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
	},
	
	render: function() {
		this.$el.html( this.template( this.model.toJSON() ) );
		
		// fire off question update event
		Backbone.trigger('question:update');
		
		return this;
	},
	
	answerYes: function() {
		this.model.answer('yes');
	},
	
	answerNo: function() {
		this.model.answer('no');
	},
	
	skip: function() { },
	
	// reset answer to null
    clear: function() {
		this.model.clear();
    },
	
	// Remove the item, destroy the model from *localStorage* and delete its view.
	remove: function() {
		this.model.destroy();
	},
});
// js/views/service.js

var app = app || {};

// The Application
// ---------------

// Our overall **ServiceView** is the top-level piece of UI.
app.ServiceView = Backbone.View.extend({
	
	// Instead of generating a new element, bind to the existing skeleton of
	// the App already present in the HTML.
	el: '#service',
	
	statsTemplate: _.template( app.Templates.serviceStatsTemplate ),
	
	// Delegated event for clearing service answers
	events: {
		'click #clear-all': 'clearAll',
		'click #next': 'skip'
	},
	
	// At initialization we bind to the relevant events on the 'Questions'
	// collection, when items are added or changed. Kick things off by
	// loading any preexisting questions that might be saved in *localStorage*.
	initialize: function( initialQuestions, service ) {
		this.$list = this.$('#questions');
		this.$stats = this.$('#stats');
		
		this.questionsLength = initialQuestions.length;
		this.service = service;
		
		// Dynamically generate Questions Collection
		app.Questions = new app.QuestionList();
		
		// Initialize questions from page (set from CMS)
		app.Questions.set( initialQuestions );
		
		this.questions = app.Questions.where({service: this.service});
		
		// render questions list
		this.listenTo(app.Questions, 'all', this.render());
		
		// listen for "question:update' event from QuestionView
		Backbone.on('question:update', this.renderStats, this);
		
		// Load LocalStorage copy of questions
		app.Questions.syncWithStorage(this.service);
		
		this.questions.forEach( function( question ) {
			question.save();
		}, this);
	},
	
	// Render service page
	render: function() {
		for (var i = 0; i < this.questions.length; i++) {
			this.renderQuestion( this.questions[i] );
		}
		
		// Initially render stats
		this.renderStats();
	},
	
	// Render individual questions
	renderQuestion: function( question ) {
		var questionView = new app.QuestionView({
			model: question
		});
		this.$list.append( questionView.render().el );
	},
	
	// Render statistics
	renderStats: function() {
		var completed = app.Questions.where({completed:true, service:this.service}).length;
		var points = app.Questions.pointsForService(this.service);
		
		this.$stats.html(this.statsTemplate({
			completed: completed,
			total: this.questionsLength,
			points: points
		}));
	},
	
	clearAll: function() {
		this.questions.forEach( function( question ) {
			this.clearQuestion( question );
		}, this);
		
	},
	
	clearQuestion: function( question ) {
		question.clear();
	},
	
	skip: function() { }
	
});
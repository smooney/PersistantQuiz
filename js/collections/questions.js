// js/collections/questions.js

var app = app || {};

// Questions Collection
// ---------------

// The collection of questions is backed by *localStorage* instead of a server.
app.QuestionList = Backbone.Collection.extend({

	// Reference to this collection's model.
	model: app.Question,
	
	// Save all of the question under the '*ed-site*' namespace.
	localStorage: new Backbone.LocalStorage('ed-site'),
	
	syncWithStorage: function(service) {
		// sync from local storage
		Backbone.LocalStorage.sync( 'read', this , {
			success: function(questions) {
				app.Questions.syncSuccess(questions);
			},
			error: function() {
				console.error('connection with local storage issue');
			}
		});
	},
	
	syncSuccess: function(questions) {
		// Extend current models (in JSON) with LocalStorage (already JSON)
		// Keep answers of existing questions, update question points and titles
		console.log(questions);
		var modelQ = app.Questions.toJSON( app.Questions.where({service:service}) ),
			modelQMod = [],
			saveQ = [],
			saveQMod = [],
			newQuestions = [];
		
		// model data
		// use _.omit to create a copy of an object without 'answer' and 'completed' props
		for (var i = 0; i < modelQ.length; i++) {
			modelQMod[i] = _.omit(modelQ[i], 'answer', 'completed');
		}
		
		// stored data - only this service
		saveQ = _.filter(questions, function(q) {
			return (q.service === service);
		}, this);
		// use _.omit to create a copy of an object without 'answer' and 'completed' props
		for (var i = 0; i < saveQ.length; i++) {
			saveQMod[i] = _.omit(saveQ[i], 'answer', 'completed');
		}
		
		for (var i = 0; i < modelQMod.length; i++) {
			newQuestions[i] = _.extend({}, saveQ[i], modelQMod[i]);
		}
		
		if (newQuestions.length < saveQ.length) {
			saveQ = _.rest(saveQ, newQuestions.length);
		}
		
		// Update or add accordingly
		app.Questions.set(newQuestions);
		
		console.log(app.Questions);
		
	},
	
	syncAllWithStorage: function() {
		Backbone.LocalStorage.sync( 'read', this , {
			success: function(questions) {
				app.Questions.set(questions);
			}
		});
	},
	completed: function() {
		return this.filter(function( question ) {
			return question.get('completed');
		});
	},
	
	remaining: function() {
		return this.without.apply( this, this.completed() );
	},
	
	points: function() {
		var completed = this.completed();
		var total = 0;
		for( var i = 0; i < completed.length; i++) {
			total += completed[i].value();
		}
		return total;
	},
	
	pointsForService: function(service) {
		var completed = this.completed();
		var total = 0;
		for( var i = 0; i < completed.length; i++) {
			if (completed[i].attributes.service == service) {
				total += completed[i].value();
			}
		}
		return total;
	},
	
	comparator: 'id'
	
});

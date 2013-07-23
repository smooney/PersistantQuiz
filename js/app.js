/* js/app.js */

var app = app || {};

$(function() {
	
	initialQuestions = window.initialQuestions || [];
	service = window.service || '';
	
	// Kick things off by creating the **App**.
	new app.ServiceView( initialQuestions, service );

});
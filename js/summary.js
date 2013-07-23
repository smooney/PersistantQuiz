/* js/summary.js */

var app = app || {};

$(function() {
	var services = window.services || [];
	// Kick things off by creating the **App**.
	new app.SummaryView(services);

});
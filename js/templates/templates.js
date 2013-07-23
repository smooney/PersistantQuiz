// js/templates/templates.js

var app = app || {};

// The Templates
// -------------

// Our underscore templates.
app.Templates = {
	
	// The template for each Question
	questionTemplate : [
		'<div class="question<%= completed === true ? " completed" : "" %>">',
			'<label><%- title %></label>',
			'<input type="radio" id="<%- id %>" class="no" <%= answer === "no" ? "checked" : "" %> value="no" />',
			'<input type="radio" id="<%- id %>" class="yes" <%= answer === "yes" ? "checked" : "" %> value="yes" />',
			'<a href="#" class="clear">clear</a>',
		'</div>'
	].join("\n"),
	
	serviceStatsTemplate : [
		'<div class="stats">',
			'<span>Completed <%- completed %> of <%- total %> : <%= completed / total * 100 %>%</span>',
			'<br/>',
			'<span>Points: <%- points %></span>',
		'</div>'
	].join("\n"),
	
	summaryStatsTemplate : [
		'<div class="summary">',
			'<span><%- service %><span>',
			'<span>: <%- points %> points</span><br/>',
			'<span> <%= completed / total * 100 %>% complete</span>',
		'</div>'
	].join("\n")
	
};
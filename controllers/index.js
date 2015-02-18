var js = require('jsonfile');

var indexController = {
	index: function(req, res) {
		res.render('index');
	},
	entry: function(req, res) {
		indexController.getsubmissions(function(err,data){
			res.render('entry', {full: (data.length > 7)});
		});
	},
	showSubmissions: function(req, res) {
		var submissions = indexController.getsubmissions(function(err, data){
			res.render('submissions', {submissions: data});
		});
	},
	submit: function(req, res){
		var body = indexController.addEmbed(req.body);
		indexController.addSubmission(body);
		res.redirect('/');
	},
	addEmbed: function(body){
		var url = body.url;
		url = url.replace(/(?:http:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g, 'www.youtube.com/embed/$1');
		body.embedUrl = url.replace(/&/g, '?');
		return body;
	},
	addSubmission: function(submission){
		indexController.getsubmissions(function(err, data){
			if (!err) {
				data.push(submission);
				js.writeFile('models/submissions.js', data);
			}
		});
	},
	getsubmissions: function(callback){
		return js.readFile('models/submissions.js', callback);
	}

};

module.exports = indexController;
var indexController = {
	index: function(req, res) {
		res.render('index');
	},
	entry: function(req, res) {
		res.render('entry');
	},

};

module.exports = indexController;
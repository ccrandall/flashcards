var fs = require('fs');
var express = require('express');
var router = express.Router();

/* GET add question page. */
router.get('/', function(req, res, next) {
  res.render('add_question', { title: 'JavaScript Flashcards' });
});

router.post('/', function(req, res, next) {
	var data = fs.readFileSync('./public/javascripts/data.json');
	data = JSON.parse(data);

	function readFinished(err) {
		if (err) {
			throw err;
		}
	}
	var question = req.body.question;
	var answer = req.body.answer;
	data[question] = answer
	fs.writeFile('./public/javascripts/data.json', JSON.stringify(data, null, 2), writeFinished);
	function writeFinished(err, data) {
		if (err) {
			throw err;
		}
	}
	res.render('add_question_new', { title: 'JavaScript Flashcards' });
});

module.exports = router;
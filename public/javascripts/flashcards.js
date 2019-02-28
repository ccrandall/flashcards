var flashcard_questions,
flashcards = [];
var request = new XMLHttpRequest();
request.onreadystatechange = function() {
	if (request.readyState == 4 && request.status == 200) {
		flashcard_questions = JSON.parse(request.responseText);
		for(var i in flashcard_questions) {
			flashcards.push([i, flashcard_questions[i]]);
		}
		loadFlashCard(0);
	}
}
request.open('GET', './javascripts/data.json', true);
request.send();

function loadFlashCard(index) {
  var cardHtml = '';
	var container = document.querySelector('#flip-card-inner-container');
	if (index > flashcards.length - 1) {
		return;
	}
	var question = flashcards[index][0];
	var answer = flashcards[index][1];
	cardHtml = '<div class="flip-card-front"><p>' + question + '</p></div><div class="flip-card-back"><p>' + answer + '</p></div>'; 
	container.innerHTML = cardHtml;
	document.getElementById('nextCard').setAttribute('data-card-index', parseInt(index)+1);
	document.getElementById('previousCard').setAttribute('data-card-index', (index == 0) ? 0 : parseInt(index)-1);
}

function loadNextCard() {
	document.querySelector('.flip-card').classList.remove('show-answer');
	var index = document.getElementById('nextCard').getAttribute('data-card-index');
	loadFlashCard(index);
}

function loadPreviousCard() {
	document.querySelector('.flip-card').classList.remove('show-answer');
	var index = document.getElementById('previousCard').getAttribute('data-card-index');
	loadFlashCard(index);
}

var card = document.querySelector('.flip-card');
card.addEventListener('click', function() {
	this.classList.toggle('show-answer');
});
window.addEventListener('keypress', function(e) {
	var key = e.which || e.keyCode;
	if (key == 13) {
		card.classList.toggle('show-answer');	
	}
	if (key == 39) { // right arrow, loadNextCard
		loadNextCard();
	}
	if (key == 37) { // left arrow, loadPreviousCard
		loadPreviousCard();
	}
});
document.getElementById('nextCard').addEventListener('click', loadNextCard);
document.getElementById('previousCard').addEventListener('click', loadPreviousCard);
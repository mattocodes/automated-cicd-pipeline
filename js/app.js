
//Global variables

const NUM_MATCHED = 16;			//number of matched cards

let openCardList = [];			//list of open cards
let matchCardList = [];			//list of matched cards
let moveCount = 0;				//move counter
let starCount = 3;				//number of stars
let time = sec = min = hr = 0;	//timer variables
let timerOff = true;			//intial state of timer - off state
let timerId;					//returned value of setInterval function



/*
 * Create a list that holds all of your cards
 */

 let cardList = [
	'<i class="fa fa-diamond"></i>',
	'<i class="fa fa-diamond"></i>',
	'<i class="fa fa-anchor"></i>',
	'<i class="fa fa-anchor"></i>',
	'<i class="fa fa-paper-plane-o"></i>',
	'<i class="fa fa-paper-plane-o"></i>',
	'<i class="fa fa-bolt"></i>',
	'<i class="fa fa-bolt"></i>',
	'<i class="fa fa-cube"></i>',
	'<i class="fa fa-cube"></i>',
	'<i class="fa fa-leaf"></i>',
	'<i class="fa fa-leaf"></i>',
	'<i class="fa fa-bicycle"></i>',
	'<i class="fa fa-bicycle"></i>',
	'<i class="fa fa-bomb"></i>',
	'<i class="fa fa-bomb"></i>'
];



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// populates webpage with cards
function populateCards() {
	let shuffledCards, cardDeck, listElement;
	shuffledCards = shuffle(cardList);  //shuffled cards
	cardDeck = document.querySelector('.deck');

	shuffledCards.forEach(function(elem) {
		listElement = document.createElement('li');
		listElement.className = 'card';
		listElement.innerHTML = elem;
		cardDeck.appendChild(listElement);
	});
}


//shows card's symbol when clicked
function showCard(card) {
	card.classList.add('show', 'open');
}


//adds card to an open card list
function addCard(card, arrayList) {
	arrayList.push(card);
}


//locks card in the matched open position if cards match
function lockCard() {
	openCardList.forEach(function(elem){
		elem.classList.add('match');
		elem.classList.remove('show');
	});
}


//removes card from list
function removeCard() {
	openCardList = [];		//remove cards from list
}


//hides card symbol when card don't match
function hideCard(){
	openCardList.forEach(function(elem){
		elem.classList.remove('show', 'open');	//hides card
	});
	removeCard(); 	//clears out open card list
}

//removes one star after certain number of moves
function removeStar() {
	let starTag = document.querySelector('.stars');

	if(moveCount === 12 || moveCount === 24 || moveCount === 48) {
		starTag.removeChild(starTag.firstElementChild);
		starCount = starCount - 1;
	}
}


//increments the move counter: matched or unmatched pairs constitues one move
function moveCounter() {
	let moveTag = document.querySelector('.moves');
	moveCount = moveCount + 1;
	moveTag.textContent = moveCount;
}


//verifies if two cards in list match
function checkMatch() {
	let firstCardType, secondCardType;

	firstCardType = openCardList[0].firstElementChild.classList[1];
	secondCardType = openCardList[1].firstElementChild.classList[1];

	if (firstCardType === secondCardType) {
		//cards match

		//ensures matched card are not re-added to matched card list
		if (!(openCardList[0].classList.contains('match') &&
			 openCardList[1].classList.contains('match'))) {

			// locks card to matched state
			lockCard();

			//adds card to matched list
			addCard(openCardList[0], matchCardList);
			addCard(openCardList[1], matchCardList);
		}
		//clears out open card list
		removeCard();

	} else {
		//cards do not match
		setTimeout(hideCard, 1000);		//hides card after a time period

	}
}


//***** timer section starts ********************

//displays time on page
function displayTimer(){
	let clock = document.querySelector('.timer');
	clock.innerHTML = `${hr}: ${min}: ${sec}`;
}


//starts timer
function startTimer() {

	timerId = setInterval(function(){
		time++;
		sec++;

		if(time % 60 === 0) {
			sec = 0;
			min++;
		}
		if(time % 3600 === 0) {
			min = 0;
			hr++;
		}
		displayTimer();

	}, 1000);
}


//stops timer
function stopTimer() {
	clearInterval(timerId);
}



//**************** modal section starts *********************

//turns modal on or off
function toggleModal() {
	let modalTag = document.querySelector('.modal');
	modalTag.classList.toggle('modal-on');
}


//gathers game statistics and appends to modal
function gameStats(){
	//appends game stats to modal
	let modalContent = document.querySelector('.modal-content');
	let modalBtn = document.createElement('button');
	modalBtn.className = 'modal-btn';
	modalBtn.innerHTML = 'Replay';

	let para = document.createElement('p');
	para.innerHTML = `Time: ${hr}: ${min}: ${sec}<br> Moves: ${moveCount}<br> Stars: ${starCount}<br>`;

	modalContent.appendChild(para);
	modalContent.appendChild(modalBtn);
}

//adds event listener to modal
function addModal() {
	let modalTag = document.querySelector('.modal');

	toggleModal(); //shows modal

	modalTag.addEventListener('click', function(event){

		if (event.target.classList.contains('modal-on')){
			toggleModal(); // hides modal

		}

	});
}


//********* reset section starts *******************************

//resets score panel to original state
function resetScorePanel() {
	//adds stars
	let starTag, moveTag, timerTag, card;
	card = '<i class="fa fa-star"></i>';
	starTag = document.querySelector('.stars');
	starTag.innerHTML = '';

	for (let i = 0; i < 3; i++) {
		listTag = document.createElement('li');
		listTag.innerHTML = card;
		starTag.appendChild(listTag);
	}

	//resest moves
	moveTag = document.querySelector('.moves');
	moveTag.innerHTML = '';

	//reset timer on page
	timerTag = document.querySelector('.timer');
	timerTag.innerHTML = `${hr}: ${min}: ${sec}`;
}

//resets the game
function resetGame() {

	//restore global variables to orginal state
	time = sec = min = hr = 0;
	openCardList = [];
	matchCardList = [];
	moveCount = 0;
	starCount = 3;
	timerOff = true;

	//stops timer
	stopTimer();

	//resets score panel
	resetScorePanel();

	//removes modal paragraph content & button
	let modalContent = document.querySelector('.modal-content');
	if(modalContent.childElementCount > 1) {
		document.querySelector('.modal-content p').remove();
		document.querySelector('.modal-btn').remove();

	}


	//clears game board
	let cardDeck = document.querySelector('.deck');
	cardDeck.innerHTML = '';

	//starts the game
	startGame();
}


//************** reset section ends *****************************





//restarts game when restart button is clicked
function restartButton() {
	let restartTag = document.querySelector('.restart');

	restartTag.addEventListener('click', function(event){
		if (event.target.nodeName = 'I'){
			console.log('restart button was clicked!');
			resetGame();
		}

	});

}

//adds event listener to replay button on modal
function addReplay(){
	let modalBtn = document.querySelector('.modal-btn');

	modalBtn.addEventListener('click', function(event) {

		event.preventDefault();
		resetGame();
		toggleModal();

	});
}



//starts the game
function startGame(){
	let cardDeck, card;

	populateCards();

	//activates restart button click event
	restartButton();

	//add event listener
	cardDeck = document.querySelector('.deck');
	cardDeck.addEventListener('click', flipCard);

	function flipCard (event){
		//ensures that two cards are captured and added to open card list
		if (event.target.nodeName === 'LI' && openCardList.length < 2) {
			card = event.target;
			//starts timer
			if (timerOff === true) {
				startTimer();
				timerOff = false;
			}

			//checks for unique card clicks
			if (!openCardList.includes(card)){
				showCard(card);					 //shows/opens card
				addCard(card, openCardList);	//adds card to open card list
			}

			//when two cards in list check for match
			if (openCardList.length === 2) {
				checkMatch();
				moveCounter();
				removeStar();
			}

			//determines whether all cards matched
			if (matchCardList.length === NUM_MATCHED) {
				stopTimer();
				gameStats();
				addModal();
				//stop event listener
				cardDeck.removeEventListener('click', flipCard);
				addReplay();
			}

		}
	};

}


startGame();




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another
 	  function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this
 	  functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the
 	  two cards match
 *    + if the cards do match, lock the cards in the open position
 		(put this functionality in another function that you call
 		from this one)
 *    + if the cards do not match, remove the cards from the list
 		and hide the card's symbol (put this functionality in another
 		function that you call from this one)
 *    + increment the move counter and display it on the page (put
 		this functionality in another function that you call from
 		this one)
 *    + if all cards have matched, display a message with the
 		final score (put this functionality in another function that
 		you call from this one)
 */






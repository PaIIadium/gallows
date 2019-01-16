'use strict';

const readline = require('readline-sync');
const arrPossibleLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const arrWrongLetters = [];

const isPossible = word => (word.split('').reduce((acc, value) => 
	(acc === true ? 
		arrPossibleLetters.indexOf(value) === -1 ? 
		false : true
	: false), 
	true
	)
);

const wordRequest = word => {
	if (!isPossible(word)) {
		console.log('This word has impossible letters. Try again');
		word = readline.question('Name the word: ').toLowerCase();
		return wordRequest(word);
	}
	return word;
}

const word = wordRequest(readline.question('Name the word: ').toLowerCase());
console.log('- \n'.repeat(20));

const arrUnknownLetters = ('*'.repeat(word.length)).split('');
const arrLetters = word.split('');
const attempts = Math.round(20 / arrUnknownLetters.length + 4); 

function check (answer) { // Возвращает массив с номерами букв, которые были угаданы или пустой, если не угаданы
	const guess = [];
	for (let i = 0; i < arrLetters.length; i++) {
		if (answer === arrLetters[i]) guess.push(i);
	}
	return guess;
}

console.log('The word: ' + arrUnknownLetters.join('') + ' | Attempts: ' + attempts);

for (let i = 1; i <= attempts; i++) {
	const letter = readline.question('Name the letter: ').toLowerCase();
	const guess = check(letter);
	if (arrPossibleLetters.indexOf(letter) === -1) {
		i--;
		console.log('This letter is impossible. Try again.');
	} else if (arrWrongLetters.indexOf(letter) !== -1 || arrUnknownLetters.indexOf(letter) !== -1) {
		i--;
		console.log('You already called this letter. Try again');
	} else if (guess.length !== 0) {
		i--;
		for (const number of guess) {
			arrUnknownLetters[number] = arrLetters[number];
			console.log('You guessed the letter number ' + (number + 1));
		}
		if (JSON.stringify(arrUnknownLetters) === JSON.stringify(arrLetters)) {
			console.log('You WIN! The word: ' + word + '. Attempts left: ' + (attempts - i));
			break;
		}
	} else {
		console.log('The word has not this letter');
		arrWrongLetters.push(letter);
		if (attempts - i === 0) {
			console.log('You LOSE! The word: ' + word + '. Wrong letters: ' + arrWrongLetters);
			break;
		}
	}
		console.log('Progress: ' + arrUnknownLetters.join('') + ' | Attempts left: ' + (attempts - i) + ' | Wrong letters: ' + arrWrongLetters);
}

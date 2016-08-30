var WORDS = require('./dialects/geordie/words.js');
var PHRASES = require('./dialects/geordie/phrases.js');
var Translator = require('./translator.js');
var $ = require('jquery');

function RenderMessage(words) {
  document.querySelector('#translation').innerText = words;
}


document.querySelector('#translate').onclick = function() {
  var message = document.querySelector('#text').value;
  RenderMessage(Translator(message, WORDS, PHRASES));
}


$(document).ready(function(){
//Speech Synth
window.speechSynthesis.onvoiceschanged = function() {
// console.log(window.speechSynthesis.onvoiceschanged);
var vo = window.speechSynthesis.getVoices();
Object.keys(vo).map(function(value) {
    $('select').append('<option value="'+ value + '">' + vo[value].name + ' ' + vo[value].lang + '</option>');
        if(vo[value].name == 'Daniel') {
    	$('option:last-child').attr('selected', 'selected');
    }
 });

};


//Speech Recog
var recog = new window.webkitSpeechRecognition();
recog.continuous = true;
recog.onresult = function(e) {
	var word = e.results[0][0].transcript;
	var v = $('select').val();
  var message = Translator(word, WORDS, PHRASES);
  talk(message, v);
};

function talk(gText, v) {
	var msg = new SpeechSynthesisUtterance();
	var voices = window.speechSynthesis.getVoices();
	msg.voice = voices[v]; // Note: some voices don't support altering params
	msg.volume = 1; // 0 to 1
	msg.rate = 1; // 0.1 to 10
	msg.pitch = 1; //0 to 2
	msg.text = gText;
	speechSynthesis.speak(msg);
	// reader(msg);
	// console.log(charIndex);
}


$('.record').on('mousedown', function(){
	recog.start();
});

$('.record').on('mouseup', function(){
	recog.stop();
});
});

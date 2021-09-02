//Challenge 1: Your age is.

function age_in_days(){
        var birth_year = prompt("What is your birth year?");
        var age = (2020-birth_year)*365;
        var h1 = document.createElement("h1");
        var textAnswer = document.createTextNode('You are '+ age + ' days old');
        h1.setAttribute("id",'age_in_days' );
        h1.appendChild(textAnswer);
        document.getElementById('flex-box-result').appendChild(h1);
}

function reset(){
    document.getElementById('age_in_days').remove();
}




//Challenge 2: Cat images Generator.

function generate_cat(){
    var image = document.createElement('img');
    var div = document.getElementById('flex-cat-gen');
    image.src= "https://media2.giphy.com/media/H4DjXQXamtTiIuCcRU/giphy.gif?cid=790b7611d6d5ae427bd587d2a508aa7b84ba62104851895a&rid=giphy.gif&ct=g";
    div.appendChild(image);
}


//Challenge 3: Rock, Paper, Scissors

function rpsGame(yourChoice){
    console.log(yourChoice.id);
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = numberToChoice(randToRpsInt());
    console.log('Computer choice:', botChoice);
    results = decideWinner(humanChoice,botChoice);  //[0,1] human lost | bot won
    console.log(results);
    message = finalMessage(results);
    console.log(message);
    rpsFrontEnd(yourChoice.id,botChoice,message);
}

function randToRpsInt(){
    return Math.floor(Math.random()*3);
}

function numberToChoice(number){
    return['rock','paper','scissors'] [number];
}

function decideWinner(yourChoice, computerChoice){
    var rpsDatabase = {
        'rock': {'scissors': 1, 'rock': 0.5, 'paper': 0},
        'paper': {'scissors': 0, 'rock': 1, 'paper': 0.5},
        'scissors': {'scissors': 0.5, 'rock': 0, 'paper': 1},
    }
    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerScore = rpsDatabase[computerChoice][yourChoice];

    return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]){
    if(yourScore === 0){
        return {'message': 'You Lost!', 'color': 'red'};
    }else if(yourScore === 0.5){
        return {'message': 'You Tied!', 'color': 'yellow'};
    }else{
        return{'message': 'You Won!', 'color': 'green'};
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage){
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper':  document.getElementById('paper').src,
        'scissors':  document.getElementById('scissors').src,
    }
    // lets, remove all the images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>"
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);

    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgb(173, 6, 6);'>"
    document.getElementById('flex-box-rps-div').appendChild(botDiv);

    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size:60px; padding; 30px; '>" + finalMessage['message'] + "</h1>"
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
}


//Challenge 4: Change the Color of All Buttons

var all_buttons = document.getElementsByTagName('button');


var copyAllButtons = [];
for(let i=0;i<all_buttons.length;i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
}

console.log(copyAllButtons);


function buttonColorChange(buttonThingy){
    if(buttonThingy.value === 'random'){
        randomColors();
    }
    else if(buttonThingy.value === 'red'){
        buttonsRed();
    }
    else if(buttonThingy.value === 'blue'){
        buttonsBlue();
    }
    else if(buttonThingy.value === 'green'){
        buttonsGreen();
    }
    else if(buttonThingy.value === 'yellow'){
        buttonsYellow();
    }
    else if(buttonThingy.value === 'reset'){
        buttonsReset();
    }
}

function buttonsRed(){
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonsBlue(){
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-primary');
    }
}

function buttonsGreen(){
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonsYellow(){
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-warning');
    }
}

function buttonsReset(){
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColors(){
    var choices = ['btn-primary','btn-danger','btn-success','btn-warning'];
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[Math.floor(Math.random()*4)]);
        console.log(choices[Math.floor(Math.random()*4)]);
    }
}



//Challenge 5: Blackjack

let blackjackGame = {
    'you': {'scoreSpan':'#your-blackjack-result','div': '#your-box','score': 0},
    'dealer': {'scoreSpan':'#dealer-blackjack-result','div': '#dealer-box','score': 0},
    'cards': ['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap': {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnOver': false,
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);

function blackjackHit() {
    if(blackjackGame['isStand'] === false){
        let card = randomCard();
        console.log(card);
        showCard(card,YOU);
        updateScore(card,YOU);
        showScore(YOU);
        console.log(YOU['score']);
    }
}


function randomCard(){
    let randomIndex = Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card,activePlayer) {
    if(activePlayer['score'] <= 21) {
       let cardImage = document.createElement('img');
       cardImage.src = `static/images/${card}.png`;
       document.querySelector(activePlayer['div']).appendChild(cardImage);
       hitSound.play();
    }
}

function blackjackDeal(){
    if(blackjackGame['turnsOver'] === true){
        blackjackGame['isStand'] = false;
        let yourImages = document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
        deleteImage(yourImages,YOU);
        deleteImage(dealerImages,DEALER);

        document.querySelector('#blackjack-result').textContent = "Let's Play Again";
        document.querySelector('#blackjack-result').style.color = "black";

        blackjackGame['turnsOver'] = true;
    }
    
}

function deleteImage(Images,activePlayer){
    for(let i=0;i<Images.length;i++){
        Images[i].remove();
    }
    activePlayer['score'] = 0;
    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector('#dealer-blackjack-result').textContent = 0;
    document.querySelector(activePlayer['scoreSpan']).style.color = 'black';
}

function updateScore(card, activePlayer) {
    if(card == 'A') {
        // If adding 11 keeps me below 21, add 11. Otherwise, 1
        if(activePlayer['score']+blackjackGame['cardsMap'][card][1] <= 21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        }else{
            activePlayer['score'] += blackjackGame['cardsMap'][card][0];
        }
    }else{
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer){
    if(activePlayer['score'] > 21) {
       document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
       document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

//Timer after 3 sec gap dealer will show his cards one by one.
function sleep(ms) {
   return new Promise(resolve => setTimeout(resolve, ms));
}


async function dealerLogic() {
    blackjackGame['isStand'] = true;
    while(DEALER['score'] < 16 && blackjackGame['isStand'] === true){
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }

    blackjackGame['turnsOver'] = true;
    let winner = computeWinner();
    showResult(winner);
}


//compute winner and return who just won.
//update the win, draws, and losses
function computeWinner() {
    let winner;

    if(YOU['score'] <= 21){
        //Condition: higher score than dealer or when dealer bust and you are under or equal in 21.
        if(YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)){
            blackjackGame['wins']++;
            winner = YOU;
        }else if(YOU['score'] < DEALER['score'] || (DEALER['score'] < 21)) {
            blackjackGame['losses']++;
            winner = DEALER;
        }else if(YOU['score'] === DEALER['score']) {
            blackjackGame['draws']++;
        }

    //Condition: when user busts but dealer doesn't
    }else if(YOU['score'] > 21 && DEALER['score'] <= 21) {
        blackjackGame['losses']++;
        winner = DEALER;
    //Condition: when you and dealer busts
    } else if(YOU['score'] > 21 && DEALER['score'] > 21){
        blackjackGame['draws']++;
    }
    console.log(blackjackGame);
    return winner;
}

function showResult(winner) {
  let message, messageColor;

  if(blackjackGame['turnsOver'] === true) {
    if(winner === YOU){
        document.querySelector('#wins').textContent = blackjackGame['wins'];
        message = 'You won!';
        messageColor = 'green';
        winSound.play();
    }else if(winner === DEALER){
      document.querySelector('#losses').textContent = blackjackGame['losses'];
      message = 'You lost!';
      messageColor= 'red';
      lossSound.play();
    }else{
      document.querySelector('#draws').textContent = blackjackGame['draws'];
      message = 'You drew!';
      messageColor= 'yellow';
    }
  
    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;
  }
}
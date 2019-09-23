/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, 
  it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores,
    roundScore,
    currentPlayer,
    inputScore,
    lastDice,
    lastDice2,
    isPlaying,
    currentScoreP1 = document.querySelector('#current-0'),
    currentScoreP2 = document.querySelector('#current-1'),
    diceDOM = document.querySelector('.dice');
    diceDOM2 = document.querySelector('.dice2');
    
reset();
hideDice();

//Start a New Game
document.querySelector('.btn-new').addEventListener('click', reset);

//Input round
document.querySelector('.input-score').addEventListener('submit', function() {
    inputScore = document.querySelector('.input-score').value;
});

//Form validation. If the value for the winning score is not entered, ask the user to input a value.


//Roll Dice Button
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (isPlaying = true) {
        let dice = Math.floor(Math.random() * 6) + 1;
        let dice2 = Math.floor(Math.random() * 6) + 1;
        diceDOM.style.display = 'block';
        diceDOM2.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        diceDOM2.src = 'dice-' + dice2 + '.png';
        //Validate input form. If no winning score is entered, ask user to enter the winning score.
        if (document.querySelector('.input-score').value === "") {
            alert("Enter a value!");
            reset();
        //Change the player's points to zero if they roll two 6s in a row
        }else if (dice === 6 && lastDice2 === 6) {
            scores[currentPlayer] = 0;
            document.querySelector('#score-' + currentPlayer).innerHTML = 0;
            nextPlayer();
        } else if (dice !== 1 && dice2 !==1) {
            roundScore += dice;
            roundScore += dice2;
            document.querySelector('#current-' + currentPlayer).innerHTML = roundScore; 
        } else {
            nextPlayer();
        }
        lastDice = dice;
        lastDice2 = dice2;
        
    }
});

//Hold Button
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (isPlaying = true) {
        inputScore = document.querySelector('.input-score').value;
        scores[currentPlayer] += roundScore;
        document.querySelector('#score-' + currentPlayer).innerHTML = scores[currentPlayer];
        if (scores[currentPlayer] >= inputScore) {
            document.querySelector('#name-' + currentPlayer).textContent = 'Winner!';
            document.querySelector('.player-' + currentPlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + currentPlayer + '-panel').classList.remove('active');
            isPlaying = false;
        } else {
            nextPlayer();
        }  
        hideDice();
    }
});

//Switch to other player, set round score to 0, and set both current scores to 0
function nextPlayer() {
    currentPlayer === 0 ? currentPlayer = 1 : currentPlayer = 0;
    roundScore = 0;
    currentScoreP1.innerHTML = 0;
    currentScoreP2.innerHTML = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
};

//Hide the dice from view
function hideDice() {
    diceDOM.style.display = 'none';
    diceDOM2.style.display = 'none';
}

//Reset & Initialize
function reset() {
    scores = [0,0]
    roundScore = 0;
    currentPlayer = 0;

    document.querySelector('#score-0').innerHTML = '0';
    document.querySelector('#score-1').innerHTML = '0';
    document.querySelector('#current-0').innerHTML = '0';
    document.querySelector('#current-1').innerHTML = '0';
    document.querySelector('#name-0').innerHTML = 'Player 1';
    document.querySelector('#name-1').innerHTML = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    hideDice();
};





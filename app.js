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
    currentScoreP1 = document.querySelector('#current-0'),
    currentScoreP2 = document.querySelector('#current-1'),
    diceDOM = document.querySelector('.dice');
    
reset();
hideDice();

//Start a New Game
document.querySelector('.btn-new').addEventListener('click', reset);

//Roll Dice Button
document.querySelector('.btn-roll').addEventListener('click', function() {
    let dice = Math.floor(Math.random() * 6) + 1;
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    if (dice !== 1) {
        roundScore += dice;
        document.querySelector('#current-' + currentPlayer).innerHTML = roundScore; 
    } else {
        nextPlayer();
    }
    winner(currentPlayer);
});

//Hold Button
document.querySelector('.btn-hold').addEventListener('click', function() {
    scores[currentPlayer] += roundScore;
    document.querySelector('#score-' + currentPlayer).innerHTML = scores[currentPlayer];
    winner(currentPlayer);
    nextPlayer();
    hideDice();
    roundScore = 0;
});

//Alert the winner
function winner(player) {
    if (scores[player] >= 100) {
        document.querySelector('#name-' + player).textContent = 'Winner!';
        document.querySelector('.player-' + player + '-panel').classList.add('winner');
        document.querySelector('.player-' + player + '-panel').classList.remove('active');
    }
};

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
};





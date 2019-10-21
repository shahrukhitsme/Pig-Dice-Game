/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores,tempScore,activePlayer,dice,diceURL,locked=true,winningScore;

function pageLoad()
{
    winningScore=50;
    scores=[0,0];
    activePlayer=0;
    tempScore=0;
    dice=7;
    setDiceURL();
    newGame();
}

function init()
{
    document.querySelector('#score-0').textContent=scores[0];
    document.querySelector('#score-1').textContent=scores[1];
    document.querySelector('#name-0').textContent="Player 1"
    document.querySelector('#name-1').textContent="Player 2"
    document.querySelector('.winScore').textContent="Winning Score = "+winningScore;
    if(activePlayer==0)
    {
        document.querySelector('#current-0').textContent=tempScore;
        document.querySelector('#current-1').textContent='PAUSED';
        document.querySelector('.player-0-panel').classList.add('active');
        document.querySelector('.player-1-panel').classList.remove('active');
    }
    else
    {
        document.querySelector('#current-0').textContent='PAUSED';
        document.querySelector('#current-1').textContent=tempScore;  
        document.querySelector('.player-1-panel').classList.add('active');
        document.querySelector('.player-0-panel').classList.remove('active');      
    }
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.dice').setAttribute('src',diceURL);
}

function newGame()
{
    locked=false;
    scores=[0,0];
    activePlayer=0;
    tempScore=0;
    dice=7;
    setDiceURL();
    var w=document.querySelector('#winningScore').value;
    document.querySelector('#winningScore').value="";
    if(w!="")
    {
        winningScore=w;
    }
    else
    winningScore=50;
    init();
}

function roll()
{
    if(!locked)
    {
        dice = Math.floor(6*Math.random())+1;
        setDiceURL();
        if(dice==1)
        {
            tempScore=0;
            hold();
        }
        else
        {
            tempScore+=dice;
            init();
            if(scores[activePlayer]+tempScore>=winningScore)
            {
                document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
                document.querySelector('#name-'+activePlayer).textContent="WINNER";
                locked=true;
            }
        }
    }
}

function hold()
{
    if(!locked)
    {
        scores[activePlayer]+=tempScore;
        tempScore=0;
        activePlayer=activePlayer==0?1:0;
        init();
    }
}

function setDiceURL()
{
    if(dice>=1 && dice<=6)
        diceURL='dice-'+dice+'.png';
    else
        diceURL='question-mark.png';
}
const Player = (name, team) => {
    name: name;
    team: team;

    return{ name, team, }
}

const Player1 = Player('Player1', 'x');
const Player2 = Player('Player2', 'o');

const gameboard = (function() {
    const boardDiv = document.getElementById('gameboard');
    let boardArray = [];
    
    const newBoard = () => {
        //empty out board array and boardDiv
        boardDiv.innerHTML = "";
        document.getElementById('instructions').innerHTML = "Click New Game to start";

        //loop 9 times to fill array
        for(let i = 0; i < 9; i++){
            boardArray[i] = "";
            let square = document.createElement('div');
            square.classList.add('board-square');
            square.setAttribute('data-key', i);
            square.setAttribute('onclick', `gameboard.setPick(${i})`)
            boardDiv.appendChild(square);
        }
    }

    // change board square depending on X or O
    const setPick = (key) => {
        //set team to equal the current player
        let team = this.currentPlayer.team;
        
        //retrive square with key & set array item to pick
        const pickedSquare = document.querySelector(`[data-key="${key}"]`);

        //check if square is empty before adding pick to square
        if(pickedSquare.innerHTML === ""){
            //set array item to equal letter
            boardArray[key] = team.toUpperCase();
            //clear out square before adding X or O to the square
            pickedSquare.innerHTML = "";
            //create p for 'x' or 'o' then add that to array and 
            //fill square with array item
            let playerPick = document.createElement('p');
            playerPick.classList.add('player-pick');
            playerPick.innerHTML = boardArray[key];
            pickedSquare.appendChild(playerPick);
            setTimeout(() => {gameflow.nextTurn()}, 50);
        }else{
            //if square is not empty, prompt player to choose again
            document.getElementById('instructions').innerHTML = "Pick another block";
        }
    }

    return { newBoard, setPick, boardArray }

})();

const gameflow = (() => {
    let currentPlayer = Player1;
    let _turnCount = 1;
    let gameOver = false;

    const newGame = () => {
        //reset turn count, set up new board and start the first turn
        _turnCount = 1;
        gameboard.newBoard(); 
        nextTurn();
    }

    const nextTurn = () => {
        //check if anybody has won
        if(checkIfOver(gameboard.boardArray)){
            gameEnd();
        }else{
            //determine whos turn it is
            if(_turnCount % 2 !== 0){
                this.currentPlayer = Player1;
            }else{
                this.currentPlayer = Player2;
            }
            //display instructions
            document.getElementById('instructions').innerHTML = 
            `Turn: <span style="color:black;">${_turnCount}</span>
            It is <span style="color:black;">${this.currentPlayer.name}'s</span> turn.`;
            _turnCount++;
        }
    }

    const checkIfOver = (gameArray) => {
        if(((gameArray.length > 0) && (gameArray[0] !== "") && gameArray[0] === gameArray[1] && gameArray[0] === gameArray[2]) 
        || ((gameArray.length > 0) && (gameArray[3] !== "") && gameArray[3] === gameArray[4] && gameArray[3] === gameArray[5]) 
        || ((gameArray.length > 0) && (gameArray[6] !== "") && gameArray[6] === gameArray[7] && gameArray[6] === gameArray[8]) 
        || ((gameArray.length > 0) && (gameArray[0] !== "") && gameArray[0] === gameArray[3] && gameArray[0] === gameArray[6]) 
        || ((gameArray.length > 0) && (gameArray[1] !== "") && gameArray[1] === gameArray[4] && gameArray[1] === gameArray[7]) 
        || ((gameArray.length > 0) && (gameArray[2] !== "") && gameArray[2] === gameArray[5] && gameArray[2] === gameArray[8]) 
        || ((gameArray.length > 0) && (gameArray[0] !== "") && gameArray[0] === gameArray[4] && gameArray[0] === gameArray[8]) 
        || ((gameArray.length > 0) && (gameArray[2] !== "") && gameArray[2] === gameArray[4] && gameArray[2] === gameArray[6]) 
        ){
            alert(`GAME OVER! ${this.currentPlayer.name} wins!`);
            return true;
        }else if(gameArray[0] !== "" 
        && gameArray[1] !== "" 
        && gameArray[2] !== "" 
        && gameArray[3] !== "" 
        && gameArray[4] !== "" 
        && gameArray[5] !== "" 
        && gameArray[6] !== "" 
        && gameArray[7] !== "" 
        && gameArray[8] !== ""
        && gameArray.length > 0){
            alert('GAME OVER! It was a tie!');
            return true;
        }
    }

    const gameEnd = (msg) => {
        newGame();
    }

    return {newGame, currentPlayer, nextTurn}
})();


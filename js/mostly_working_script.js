const Gameboard = (() => {
    let boardArray = [];
    const boardDiv = document.getElementById('gameboard');

    // create the game board and match each square to an array item
    const newBoard = () => {
        //initialise
        boardArray = [];
        boardDiv.innerHTML="";

        for(let i = 0; i < 9; i++){
            boardArray.push("");
            console.log(boardArray);//test
            
            let square = document.createElement('div');
            square.setAttribute('data-key', i);
            square.setAttribute('onclick', `Gameboard.squareClicked(${i})`)
            square.classList.add('board-square');
            boardDiv.appendChild(square);
        }
    }

    // runs when on the divs onlick method is triggered
    const squareClicked = (key) => {
        let team = this.currentPlayer.team;
        console.log(this.currentPlayer);
        setPick(key, team);
    }

    // change board square depending on X or O
    const setPick = (key, team) => {
        //retrive square with key
        const pickedSquare = document.querySelector(`[data-key="${key}"]`);

        // set array item to pick
        boardArray[key] = team.toUpperCase();

        //check if square is empty
        if(pickedSquare.innerHTML === ""){
            //create p element to add to square and add class for styling
            let playerPick = document.createElement('p');
            playerPick.classList.add('player-pick');
            //clear out square before adding X or O to the square
            pickedSquare.innerHTML = "";
            playerPick.innerHTML = boardArray[key];
            pickedSquare.appendChild(playerPick);
            if(Game.checkIfOver(boardArray)){
                Game.gameEnd();
            };
            Game.takeTurn();
        }else{
            document.getElementById('instructions').innerHTML = "Pick another block";
        }

    }

    return {newBoard, setPick, squareClicked, boardArray};
})();

const Player = (name, team) => {
    name: name;
    team: team;
    let wins = 0;

    return{ name, team }
}

const Player1 = Player('Player1', 'x');
const Player2 = Player('Player2', 'o');

const Game = (() => {
    let currentPlayer = Player1;
    let turnCount = 1;
    const button = document.getElementById('btn-start');
    const instructions = document.getElementById('instructions');
    const board = document.getElementById('gameboard');
    let gameOver = false;

    const newGame = () => {
        turnCount = 1;
        Gameboard.newBoard(); 
        takeTurn();
        // board.addEventListener('click', () => {
        // })    
    }

    const checkIfOver = (gameArray) => {
        if(((gameArray[0] !== "") && gameArray[0] === gameArray[1] && gameArray[0] === gameArray[2]) 
        || ((gameArray[3] !== "") && gameArray[3] === gameArray[4] && gameArray[3] === gameArray[5]) 
        || ((gameArray[6] !== "") && gameArray[6] === gameArray[7] && gameArray[6] === gameArray[8]) 
        || ((gameArray[0] !== "") && gameArray[0] === gameArray[3] && gameArray[0] === gameArray[6]) 
        || ((gameArray[1] !== "") && gameArray[1] === gameArray[4] && gameArray[1] === gameArray[1]) 
        || ((gameArray[2] !== "") && gameArray[2] === gameArray[5] && gameArray[2] === gameArray[8]) 
        || ((gameArray[0] !== "") && gameArray[0] === gameArray[4] && gameArray[0] === gameArray[8]) 
        || ((gameArray[2] !== "") && gameArray[2] === gameArray[4] && gameArray[2] === gameArray[6]) 
        ){
            return true;
        }
    }

    const gameEnd = () => {
        alert(`GAME OVER! ${this.currentPlayer} wins!`);
        this.currentPlayer.wins += 1;
        Gameboard.newBoard();
    }

    const takeTurn = () => {
        //determine whos turn it is
        if(turnCount % 2 !== 0){
            this.currentPlayer = Player1;
        }else{
            this.currentPlayer = Player2;
        }
        //display instructions
        instructions.innerHTML = 
        `Turn: ${turnCount}
        It is ${this.currentPlayer.name}'s turn.`;
        turnCount++;
    }

    return {newGame, currentPlayer, takeTurn, turnCount, checkIfOver, gameEnd}
})();


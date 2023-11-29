import { useEffect, useState } from "react";
import Board from "./Board";
import GameOver from "./GameOver";
import GameState from "./GameState";
import Reset from "./Reset";

const PLAYER_X = 'X';
const PLAYER_O = 'O';

const WINNING_COMBINATIONS = [
    // Rows
    {combination: [0, 1, 2], strikeClass: 'strike-row-1'},
    {combination: [3, 4, 5], strikeClass: 'strike-row-2'},
    {combination: [6, 7, 8], strikeClass: 'strike-row-3'},

    // Columns
    {combination: [0, 3, 6], strikeClass: 'strike-column-1'},
    {combination: [1, 4, 7], strikeClass: 'strike-column-2'},
    {combination: [2, 5, 8], strikeClass: 'strike-column-3'},

    // Diagonals
    {combination: [0, 4, 8], strikeClass: 'strike-diagonal-1'},
    {combination: [2, 4, 6], strikeClass: 'strike-diagonal-2'},
];

const TicTacToe = () => {
  const [tiles, setTiles] = useState([null,null,null,null,null,null,null,null,null]);
  const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
  const [strikeClass, setStrikeClass] = useState('');
  const [gameState, setGameState] = useState(GameState.inProgress);

  const handleTileClick = (index) => { // console.log(index);
    if (gameState !== GameState.inProgress) return;

    if (tiles[index] !== null) return;

    const newTiles = [...tiles]; // console.log(newTiles);
    newTiles[index] = playerTurn; // console.log(newTiles[index] = playerTurn);
    setTiles(newTiles); // console.log(setTiles(newTiles));

    if (playerTurn === PLAYER_X) {
        setPlayerTurn(PLAYER_O); 
    } else {
        setPlayerTurn(PLAYER_X);  
    }
  };

  const checkWinner = (tiles, setStrikeClass, setGameState) => {
    // console.log('Check Winner');
    for (const winningCombination of WINNING_COMBINATIONS) {
        // console.log(winningCombination);
        const { combination, strikeClass } = winningCombination;
        // console.log(combination, strikeClass);
        const tileValue1 = tiles[combination[0]]; // console.log(tileValue1);
        const tileValue2 = tiles[combination[1]]; // console.log(tileValue2);
        const tileValue3 = tiles[combination[2]]; // console.log(tileValue3);

        if (tileValue1 !== null && (tileValue1 === tileValue2) && (tileValue1 === tileValue3)) {
            setStrikeClass(strikeClass);
            if (tileValue1 === PLAYER_X) {
                setGameState(GameState.playerXWins);
            } else {
                setGameState(GameState.playerOWins);
            }
            return;
        }
    }

    const areAllTilesFilledIn = tiles.every((tile) => tile !== null);

    if (areAllTilesFilledIn) {
        setGameState(GameState.draw);
    }
  };

  const handleReset = () => {
    // console.log('reset');
    setGameState(GameState.inProgress);
    setTiles([null,null,null,null,null,null,null,null,null]);
    setPlayerTurn(PLAYER_X);
    setStrikeClass(null);
  };

  useEffect(() => {
    checkWinner(tiles, setStrikeClass, setGameState);
  }, [tiles]);

  return (
    <div>
        <h1>Tic Tac Toe</h1>
        <Board 
            tiles={tiles} 
            onTileClick={handleTileClick}
            playerTurn={playerTurn}
            strikeClass={strikeClass}
        />
        <GameOver gameState={gameState} />
        <Reset 
            gameState={gameState} 
            onReset={handleReset}
        />
    </div>
  );
};

export default TicTacToe;
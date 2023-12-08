import { useEffect, useState } from "react";
import GAME_STATE from "./GameState";

import Board from "./components/Board";
import GameOver from "./components/GameOver";
import Reset from "./components/Reset";

const PLAYER_X = 'X';
const PLAYER_O = 'O';

const WINNING_COMBINATIONS = [
    // Rows
    {combination: [0, 1, 2]},
    {combination: [3, 4, 5]},
    {combination: [6, 7, 8]},

    // Columns
    {combination: [0, 3, 6]},
    {combination: [1, 4, 7]},
    {combination: [2, 5, 8]},

    // Diagonals
    {combination: [0, 4, 8]},
    {combination: [2, 4, 6]},
];

const TicTacToe = () => {
  const [tiles, setTiles] = useState([null,null,null,null,null,null,null,null,null]);
  const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
  const [gameState, setGameState] = useState(GAME_STATE.inProgress);

  const handleTileClick = (index) => { // console.log(index);
    if (gameState !== GAME_STATE.inProgress) return;  

    if (tiles[index] !== null) return;

    const newTiles = [...tiles]; // console.log(newTiles);
    newTiles[index] = playerTurn; // console.log(newTiles[index] = playerTurn);
    setTiles(newTiles); // console.log(setTiles(newTiles));

    if (playerTurn === PLAYER_X) {
      setPlayerTurn(PLAYER_O); 
    } 
    else {
      setPlayerTurn(PLAYER_X);  
    }
  };

  const checkWinner = (tiles, setGameState) => { // console.log('Check Winner');
    for (const winningCombination of WINNING_COMBINATIONS) { // console.log(winningCombination);
      const { combination } = winningCombination;  // console.log(combination);
      const tileValue1 = tiles[combination[0]]; // console.log(tileValue1);
      const tileValue2 = tiles[combination[1]]; // console.log(tileValue2);
      const tileValue3 = tiles[combination[2]]; // console.log(tileValue3);

      if (tileValue1 !== null && (tileValue1 === tileValue2) && (tileValue1 === tileValue3)) {
        if (tileValue1 === PLAYER_X) {
          setGameState(GAME_STATE.playerXWins);
        } else {
          setGameState(GAME_STATE.playerOWins);
        }
        return;
      }
    }

    const areAllTilesFilledIn = tiles.every((tile) => { // console.log(tile);
      return tile !== null;
    });

    if (areAllTilesFilledIn) {
      setGameState(GAME_STATE.draw);
    }
  };

  const handleReset = () => { // console.log('reset');
    setGameState(GAME_STATE.inProgress);
    setTiles([null,null,null,null,null,null,null,null,null]);
    setPlayerTurn(PLAYER_X);
  };

  useEffect(() => {  // console.log('Check Winner');
    checkWinner(tiles, setGameState);
  }, [tiles]);

  return (
    <>
        <h1>Tic Tac Toe</h1>
        <Board 
            tiles={tiles} 
            onTileClick={handleTileClick}
            playerTurn={playerTurn}
        />
        <GameOver gameState={gameState} />
        <Reset 
            gameState={gameState} 
            onReset={handleReset}
        />
    </>
  );
};

export default TicTacToe;
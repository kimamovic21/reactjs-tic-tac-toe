import GAME_STATE from "../GameState";

const GameOver = ({ gameState }) => {
  // console.log(gameState);

  if (gameState === GAME_STATE.playerXWins) {
    return (
      <div className="game-over">X Wins</div>
    );
  };
  if (gameState === GAME_STATE.playerOWins) {
    return (
      <div className="game-over">O Wins</div>
    );
  };
  if (gameState === GAME_STATE.draw) {
    return (
      <div className="game-over">Draw</div>
    );
  };
};

export default GameOver;
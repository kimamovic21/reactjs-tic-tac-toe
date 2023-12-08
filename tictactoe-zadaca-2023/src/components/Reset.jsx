import GAME_STATE from "../GameState";

const Reset = ({ gameState, onReset }) => {
//   console.log(gameState);
//   console.log(onReset);
  if (gameState === GAME_STATE.inProgress) return;

  return (
    <button className="reset-button" onClick={onReset}>
      Reset
    </button>
  );
};

export default Reset;
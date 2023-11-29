const Tile = ({ className, value, onClick, playerTurn }) => {
  // console.log(className);
  // console.log(value);
  // console.log(onClick);
  // console.log(playerTurn);

  let hoverClass = null;

  if(value === null && playerTurn !== null) {
    hoverClass = `${playerTurn.toLowerCase()}-hover`;
  }

  return (
    <div className={`tile ${className} ${hoverClass}`} onClick={onClick}>
      {value}
    </div>
  );
};

export default Tile; 
const Tile = ({ className, value, onClick }) => {
  // console.log(className);
  // console.log(value);
  // console.log(onClick);

  return (
    <div className={`tile ${className}`} onClick={onClick}>
      {value}
    </div>
  );
};

export default Tile; 
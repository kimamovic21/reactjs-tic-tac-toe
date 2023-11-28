import React, { useState, useEffect } from 'react';
import { Patterns } from './Patterns';
import './App.css';
import Square from './components/Square';

const App = () => {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("O");
  const [result, setResult] = useState({winner:'none', state:'none'});

  useEffect(() => {
    checkWin();
    checkIfTie();
    
    if (player === 'X') {
      setPlayer('O');
    }
    else {
      setPlayer('X');
    };
  }, [board]);

  useEffect(() => {
    if (result.state !== 'none') {
      alert(`Game finished! Winning Player: ${result.winner}`);
      restartGame();
    }
  }, [result]);

  const chooseSquare = (square) => {
    setBoard(board.map((val, index) => {
      console.log(val);
      if (index === square && val === '') {
        return player
      };
      return val;
    }));
  };

  const checkWin = () => {
    Patterns.forEach((currentPattern) => {
      // console.log(currentPattern);
      const firstPlayer = board[currentPattern[0]];

      if (firstPlayer === '') return;

      let foundWinningPattern = true;

      currentPattern.forEach((index) => {
        if (board[index] !== firstPlayer) {
          foundWinningPattern = false;
        };
      });

      if (foundWinningPattern) {
        setResult({ winner:player, state:"Won" })
      };
    });
  };

  const checkIfTie = () => {
    let filled = true;
    board.forEach((square) => {
      if (square === '') {
        filled = false;
      }
    });

    if (filled) {
      setResult({ winner: 'No one', state: 'Tie' });
    }
  };

  const restartGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer('O');
  };

  return (
    <div className='App'>
      <div className='board'>
        <div className="row">
          {/* <Square val={board[0]} chooseSquare={() => {alert(0)}} /> */}
          {/* <Square val={board[1]} chooseSquare={() => {alert(1)}} /> */}
          {/* <Square val={board[2]} chooseSquare={() => {alert(2)}} /> */}
          <Square val={board[0]} chooseSquare={() => {chooseSquare(0)}} />
          <Square val={board[1]} chooseSquare={() => {chooseSquare(1)}} />
          <Square val={board[2]} chooseSquare={() => {chooseSquare(2)}} />
        </div>
        <div className="row">
          <Square val={board[3]} chooseSquare={() => {chooseSquare(3)}} />
          <Square val={board[4]} chooseSquare={() => {chooseSquare(4)}} />
          <Square val={board[5]} chooseSquare={() => {chooseSquare(5)}} />
        </div>
        <div className="row">
          <Square val={board[6]} chooseSquare={() => {chooseSquare(6)}} />
          <Square val={board[7]} chooseSquare={() => {chooseSquare(7)}} />
          <Square val={board[8]} chooseSquare={() => {chooseSquare(8)}} />
        </div>
      </div>
    </div>
  );
};

export default App;
import React, { useState } from 'react';
import './App.css';

const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    if (checkWinner(newBoard, currentPlayer)) {
      setWinner(currentPlayer);
    } else if (newBoard.every(cell => cell !== null)) {
      setWinner('draw');
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const checkWinner = (board, player) => {
    return WINNING_COMBOS.some((combo) =>
      combo.every((index) => board[index] === player)
    );
  };
          
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  const renderCell = (index) => {
    const cell = board[index];
    let className = 'cell';
    if (winner && WINNING_COMBOS.some((combo) => combo.includes(index))) {
      className += ' winner';
    }
    return (
      <div key={index} className={className} onClick={() => handleClick(index)}>
        {cell}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {board.map((_, index) => renderCell(index))}
      </div>
      <div className="status">
        {winner ? (
          winner === 'draw' ? (
            <p>It's a draw!</p>
          ) : (
            <p>Player {winner} wins!</p>
          )
        ) : (
          <p>Player {currentPlayer}'s turn</p>
        )}
      </div>
      <div className="buttons">
        <button className={winner === 'X' ? 'winner' : ''} onClick={resetGame}>
          Restart Game
        </button>
      </div>
    </div>
  );
};

export default App;

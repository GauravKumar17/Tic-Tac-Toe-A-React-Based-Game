import { useState } from "react";
import "./TicTac.css";
import cross from "./assets/cross.png";
import circle from "./assets/circle.png";

import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size'; // Optional, for full screen

function Square({ value, onSquareClick }) {
  return (
    <>
    
      <button className="btn" onClick={onSquareClick}>
        {value === "X" ? (
          <img src={cross} />
        ) : value === "O" ? (
          <img src={circle} />
        ) : null}
      </button>
    </>
  );
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [width, height] = useWindowSize(); // Optional: gets screen size

  // upon calling handleClick() it re renders the square useState through setSquares
  function handleClick(i) {
    if (checkWinner(squares) || squares[i]) {
      //checks whether the square is previously filled with some value,if yes then it returns the function
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = checkWinner(squares);
  let status;
  const noOfMoves = squares.filter(Boolean).length; // check the no. of not null entry (Boolean filters out null, undefined, or empty values.)
  if (winner) {
    status = (
      <>
        Congratulations 
        {winner === "X" ? (
          <img src={cross} className="xresult" />
        ) : (
          <img src={circle} className="oresult" />
        )}{" "}
        Won!
      </>
    );
  } else {
    status =
    noOfMoves === 9 ? "Draw !" : "Next Player: " + (xIsNext ? "X" : "O");
  }
  
  function resetHandler() {
    setSquares(Array(9).fill(null)); // Reset all squares
    setXIsNext(true); // Reset to 'X' as the starting player
  }
  
  return (
    <div className="page">
      {winner && <Confetti width={width} height={height} />}
      <h1 className="title">
        <div>
          Just Tic<span>Tac</span>Toe !{" "}
        </div>
        <div className="result">{status}</div>
      </h1>
      <div className="board">
        <div className="row1">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />{" "}
          {/* arrow function is used because it prevents handleClick(0) from calling immediately(since The handleClick(0) call will be a part of rendering the board component. Because handleClick(0) alters the state of the board component by calling setSquares, your entire board component will be re-rendered again. But this runs handleClick(0) again, leading to an infinite loop:.)*/}
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="row2">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="row3">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
        <button className="reset" onClick={() => resetHandler()}>
          Reset
        </button>
      </div>
    </div>
  );
}

function checkWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

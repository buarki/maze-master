"use client"

import React, { useState } from 'react';
import Cell from './cell.component';

interface GridProps {
  rows: number;
  cols: number;
}

const Grid: React.FC<GridProps> = ({ rows, cols }) => {
  const [grid, setGrid] = useState<Array<Array<boolean>>>(() =>
    Array.from({ length: rows }, () => Array(cols).fill(false))
  );

  const [isMousePressed, setMousePressed] = useState<boolean>(false);

  const handleCellClick = (row: number, col: number) => {
    const newGrid = [...grid];
    newGrid[row][col] = !newGrid[row][col];
    setGrid(newGrid);
  };

  const handleCellHover = (row: number, col: number) => {
    if (isMousePressed) {
      const newGrid = [...grid];
      newGrid[row][col] = true;
      setGrid(newGrid);
    }
  };

  return (
    <div
      className="grid grid-cols-1 gap-1"
      onMouseDown={() => setMousePressed(true)}
      onMouseUp={() => setMousePressed(false)}
    >
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((isWall, colIndex) => (
            <div key={colIndex} className='m-1'>
              <Cell
                isWall={isWall}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                onMouseOver={() => handleCellHover(rowIndex, colIndex)}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;

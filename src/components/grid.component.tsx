"use client"

import React, { useCallback, useEffect, useState } from 'react';
import Cell from './cell.component';
import { GRID_COLUMNS, GRID_ROWS } from '@path-craft/configs';

function randomNumberBetween(lowerBound: number, upperBound: number) {
  return Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
}

interface GridProps {
  rows: number;
  cols: number;
}

const invalidPoint = { x: -1, y: -1 };

const Grid: React.FC<GridProps> = ({ rows, cols }) => {
  const [grid, setGrid] = useState<Array<Array<boolean>>>(() =>
    Array.from({ length: rows }, () => Array(cols).fill(false))
  );
  const [origin, setOrigin] = useState<{x: number, y: number}>(invalidPoint);
  const [destination, setDestination] = useState<{x: number, y: number}>(invalidPoint);

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

  const reloadGrid = useCallback(() => {
    const newGrid = Array.from({ length: rows }, () => Array(cols).fill(false));

    let newOriginX = randomNumberBetween(0, GRID_ROWS - 1);
    let newOriginY = randomNumberBetween(0, GRID_COLUMNS - 1);

    let newDestinationX = randomNumberBetween(0, GRID_ROWS - 1);
    let newDestinationY = randomNumberBetween(0, GRID_COLUMNS - 1);

    while (newOriginX === newDestinationX && newOriginY === newDestinationY) {
      newOriginX = randomNumberBetween(0, GRID_ROWS - 1);
      newOriginY = randomNumberBetween(0, GRID_COLUMNS - 1);
      newDestinationX = randomNumberBetween(0, GRID_ROWS - 1);
      newDestinationY = randomNumberBetween(0, GRID_COLUMNS - 1);
    }

    setOrigin({ x: newOriginX, y: newOriginY });
    setDestination({ x: newDestinationX, y: newDestinationY });

    setGrid(newGrid);
  }, [cols, rows]);

  useEffect(() => {
    reloadGrid();
  }, [reloadGrid]);

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
                isOrigin={rowIndex === origin.x && colIndex === origin.y}
                isDestination={rowIndex == destination.x && colIndex === destination.y}
                isWall={isWall}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                onMouseOver={() => handleCellHover(rowIndex, colIndex)}
              />
            </div>
          ))}
        </div>
      ))}
      <div className='flex justify-center gap-12'>
        <button
          onClick={reloadGrid}
          className='bg-blue-500 hover:bg-blue-300 p-2 text-white font-bold'>Reload</button>
        <button
          className='bg-green-500 hover:bg-green-300 p-2 text-white font-bold'>Find Path</button>
      </div>
    </div>
  );
};

export default Grid;

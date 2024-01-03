"use client"

import React, { useCallback, useEffect, useState } from 'react';
import Cell from './cell.component';
import { GRID_COLUMNS, GRID_ROWS, SEARCH_SPEED } from '@maze-master/configs';

function randomNumberBetween(lowerBound: number, upperBound: number) {
  return Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
}

interface GridProps {
  rows: number;
  cols: number;
}

const invalidPoint = { x: -1, y: -1 };

const Grid: React.FC<GridProps> = ({ rows, cols }) => {
  const [grid, setGrid] = useState<Array<Array<{ isBlock: boolean, beingUsedDuringSearch: boolean }>>>(() =>
    Array.from({ length: rows }, () => Array(cols).fill(false))
  );
  const [origin, setOrigin] = useState<{x: number, y: number}>(invalidPoint);
  const [destination, setDestination] = useState<{x: number, y: number}>(invalidPoint);

  const [isMousePressed, setMousePressed] = useState<boolean>(false);

  const handleCellClick = (row: number, col: number) => {
    const newGrid = [...grid];
    newGrid[row][col] = {
      ...newGrid[row][col],
      isBlock: !newGrid[row][col].isBlock,
    };
    setGrid(newGrid);
  };

  const handleCellHover = (row: number, col: number) => {
    if (isMousePressed) {
      const newGrid = [...grid];
      newGrid[row][col] = {
        ...newGrid[row][col],
        isBlock: true,
      };
      setGrid(newGrid);
    }
  };

  const runPathFinding = () => {
    const visited = Array.from({ length: GRID_ROWS }, () => new Array(GRID_COLUMNS).fill(false));

    const queue = [{ x: origin.x, y: origin.y }];
    visited[origin.x][origin.y] = true;

    const dx = [0, 1, 0, -1];
    const dy = [-1, 0, 1, 0];

    const animateSearch = async () => {
      while (queue.length > 0) {
        const current = queue.shift()!;
        const { x, y } = current;

        const newGrid = [...grid];
        const currentCellIsNeitherTheOriginOrDestination = !((x === origin.x && y == origin.y) || (x === destination.x && y == destination.y));
        newGrid[x][y] = {
          ...newGrid[x][y],
          beingUsedDuringSearch: currentCellIsNeitherTheOriginOrDestination,
        };
        setGrid(newGrid);

        const reachedDestination = x === destination.x && y === destination.y;
        if (reachedDestination) {
          break;
        }

        for (let i = 0; i < 4; i++) {
          const nx = x + dx[i];
          const ny = y + dy[i];

          const movementIsValid = nx >= 0 && nx < GRID_ROWS && ny >= 0 && ny < GRID_COLUMNS && !visited[nx][ny] && !grid[nx][ny];
          if (movementIsValid) {
            queue.push({ x: nx, y: ny });
            visited[nx][ny] = true;
          }
        }

        await new Promise((resolve) => setTimeout(resolve, SEARCH_SPEED));
      }
    };

    animateSearch();
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
          {row.map(({
                  isBlock,
                  beingUsedDuringSearch,
              }, colIndex) => (
            <div key={colIndex} className='m-1'>
              <Cell
                beingUsedDuringSearch={beingUsedDuringSearch}
                isOrigin={rowIndex === origin.x && colIndex === origin.y}
                isDestination={rowIndex == destination.x && colIndex === destination.y}
                isWall={isBlock}
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
          onClick={runPathFinding}
          className='bg-green-500 hover:bg-green-300 p-2 text-white font-bold'>Find Path</button>
      </div>
    </div>
  );
};

export default Grid;

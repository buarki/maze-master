"use client"

import React, { useCallback, useEffect, useState } from 'react';
import Cell from './cell.component';
import { PathFindingParams, PathFindingResult } from '@maze-master/lib/path-finders/types';

function randomNumberBetween(lowerBound: number, upperBound: number) {
  return Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
}

interface GridProps {
  rows: number;
  cols: number;
  gridSpeed: number;
  findPath: (p: PathFindingParams) => Promise<PathFindingResult>;
}

const invalidPoint = { x: -1, y: -1 };

const Grid: React.FC<GridProps> = ({ rows, cols, gridSpeed, findPath }) => {
  const [grid, setGrid] = useState<Array<Array<{ isWall: boolean, beingUsedDuringSearch: boolean }>>>(() =>
    Array.from({ length: rows }, () => Array(cols).fill(false))
  );
  const [origin, setOrigin] = useState<{x: number, y: number}>(invalidPoint);
  const [destination, setDestination] = useState<{x: number, y: number}>(invalidPoint);
  const [isMousePressed, setMousePressed] = useState<boolean>(false);
  const [thereIsPath, setThereIsPath] = useState<boolean>(true);

  const [searchIsFinished, setSearchIsFinished] = useState(false);
  const [pathCells, setPathCells] = useState<Array<{ x: number; y: number }>>([]);
  const [isSearching, setIsSearching] = useState(false);


  const handleCellClick = (row: number, col: number) => {
    const newGrid = [...grid];
    newGrid[row][col] = {
      ...newGrid[row][col],
      isWall: !newGrid[row][col].isWall,
    };
    setGrid(newGrid);
  };

  const handleCellHover = (row: number, col: number) => {
    if (isMousePressed) {
      const newGrid = [...grid];
      newGrid[row][col] = {
        ...newGrid[row][col],
        isWall: true,
      };
      setGrid(newGrid);
    }
  };

  const runPathFinding = async () => {
    setIsSearching(true);
    const { pathWasFound, shortestPath } = await findPath({
      origin: origin,
      destination: destination,
      searchSpeed: gridSpeed,
      graph: {
        rows: rows,
        columns: cols,
        matrix: grid,
      },
      updateGrid: setGrid,
    });
    setIsSearching(false);
    setPathCells(shortestPath);
    setSearchIsFinished(true);
    setThereIsPath(pathWasFound);
  };

  const cleanGrid = () => {
    const currentOrigin = { ...origin };
    const currentDestination = { ...destination };
    reloadGrid();
    setOrigin(currentOrigin);
    setDestination(currentDestination);
  };

  const reloadGrid = useCallback(() => {
    const newGrid = Array.from({ length: rows }, () => Array(cols).fill(false));

    let newOriginX = randomNumberBetween(0, rows - 1);
    let newOriginY = randomNumberBetween(0, cols - 1);

    let newDestinationX = randomNumberBetween(0, rows - 1);
    let newDestinationY = randomNumberBetween(0, cols - 1);

    while (newOriginX === newDestinationX && newOriginY === newDestinationY) {
      newOriginX = randomNumberBetween(0, rows - 1);
      newOriginY = randomNumberBetween(0, cols - 1);
      newDestinationX = randomNumberBetween(0, rows - 1);
      newDestinationY = randomNumberBetween(0, cols - 1);
    }

    setOrigin({ x: newOriginX, y: newOriginY });
    setDestination({ x: newDestinationX, y: newDestinationY });

    setGrid(newGrid);
    setSearchIsFinished(false);
    setThereIsPath(false);
    setPathCells([]);
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
                  isWall,
                  beingUsedDuringSearch,
              }, colIndex) => (
            <div key={colIndex} className='m-1'>
              <Cell
                isOptimalPath={pathCells.some((point) => point.x === rowIndex && point.y === colIndex && !(rowIndex === destination.x && colIndex === destination.y))}
                beingUsedDuringSearch={beingUsedDuringSearch}
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
          disabled={isSearching}
          onClick={reloadGrid}
          className={`p-2 text-white font-bold ${isSearching ? 'bg-blue-200' : 'bg-blue-500 hover:bg-blue-300'} ${searchIsFinished && !thereIsPath ? 'vibrate' : ''}`}>
            Reload
        </button>
        <button
          disabled={isSearching}
          onClick={cleanGrid}
          className={`p-2 text-white font-bold ${isSearching ? 'bg-yellow-200' : 'bg-yellow-500 hover:bg-yellow-300'}`}>
            Clean grid
        </button>
        <button
          disabled={isSearching}
          onClick={runPathFinding}
          className='bg-green-500 hover:bg-green-300 p-2 text-white font-bold'>Find Path</button>
      </div>
    </div>
  );
};

export default Grid;

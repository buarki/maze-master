import { PathFindingParams, PathFindingResult, Point } from "./types";

export const dfs = async ({
  origin,
  destination,
  searchSpeed,
  graph: {
    rows,
    columns,
    matrix,
  },
  updateGrid,
}: PathFindingParams): Promise<PathFindingResult> => {
  const visited = Array.from({ length: rows }, () => new Array(columns).fill(false));
  const stack = [{ x: origin.x, y: origin.y }];
  const possibleMovements = 4;
  const dx = [0, 1, 0, -1];
  const dy = [-1, 0, 1, 0];
  let pathWasFound = false;
  const shortestPath: Point[] = [];

  const animateSearch = async () => {
    const previous = Array.from({ length: rows }, () => new Array(columns).fill(null));

    while (stack.length > 0) {
      const current = stack.pop()!;
      const { x, y } = current;

      const newGrid = [...matrix];
      const currentCellIsNeitherTheOriginOrDestination = !((x === origin.x && y === origin.y) || (x === destination.x && y === destination.y));
      newGrid[x][y] = {
        ...newGrid[x][y],
        beingUsedDuringSearch: currentCellIsNeitherTheOriginOrDestination,
      };
      updateGrid(newGrid);

      const reachedDestination = x === destination.x && y === destination.y;
      if (reachedDestination) {
        pathWasFound = true;
        let current = { x, y };
        while (current.x !== origin.x || current.y !== origin.y) {
          shortestPath.push({ x: current.x, y: current.y });
          current = previous[current.x][current.y];
        }
        break;
      }

      visited[x][y] = true;

      for (let i = 0; i < possibleMovements; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        const movementIsValid = nx >= 0 && nx < rows && ny >= 0 && ny < columns && !visited[nx][ny] && !matrix[nx][ny];
        if (movementIsValid) {
          stack.push({ x: nx, y: ny });
          previous[nx][ny] = { x, y };
        }
      }

      await new Promise((resolve) => setTimeout(resolve, searchSpeed));
    }
  };

  await animateSearch();

  return {
    pathWasFound,
    shortestPath: pathWasFound ? shortestPath.reverse() : [],
  };
};

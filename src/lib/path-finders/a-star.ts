import { PathFindingParams, PathFindingResult, Point } from "./types";

const euclideanDistance = (p1: Point, p2: Point) => {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
};

export const aStar = async ({
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
  const movementCost = 1;
  const openSet: Point[] = [{ x: origin.x, y: origin.y }];
  const cameFrom: { [key: string]: Point | null } = {};
  const gScore: { [key: string]: number } = {};
  const fScore: { [key: string]: number } = {};

  gScore[`${origin.x},${origin.y}`] = 0;
  fScore[`${origin.x},${origin.y}`] = euclideanDistance(origin, destination);

  const possibleMovements = 4;
  const dx = [0, 1, 0, -1];
  const dy = [-1, 0, 1, 0];

  let pathWasFound = false;
  const shortestPath: Point[] = [];

  const animateSearch = async () => {
    while (openSet.length > 0) {
      // finding node with the lowest fScore
      let current: Point | null = openSet[0];
      let minFScore = fScore[`${current.x},${current.y}`] || Infinity;
      for (const point of openSet) {
        const score = fScore[`${point.x},${point.y}`] || Infinity;
        if (score < minFScore) {
          minFScore = score;
          current = point;
        }
      }

      if (!current) break;
      const { x, y } = current;

      if (x === destination.x && y === destination.y) {
        pathWasFound = true;
        let currentPoint: Point = destination;
        while (currentPoint.x !== origin.x || currentPoint.y !== origin.y) {
          shortestPath.push({ x: currentPoint.x, y: currentPoint.y });
          currentPoint = cameFrom[`${currentPoint.x},${currentPoint.y}`]!;
        }
        break;
      }

      openSet.splice(openSet.indexOf(current), 1);

      const newGrid = [...matrix];
      const currentCellIsNeitherTheOriginOrDestination = !((x === origin.x && y === origin.y) || (x === destination.x && y === destination.y));
      newGrid[x][y] = {
        ...newGrid[x][y],
        beingUsedDuringSearch: currentCellIsNeitherTheOriginOrDestination,
      };
      updateGrid(newGrid);

      for (let i = 0; i < possibleMovements; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        if (nx < 0 || nx >= rows || ny < 0 || ny >= columns || matrix[nx][ny]) continue;

        const tentativeGScore = (gScore[`${x},${y}`] || 0) + movementCost;
        if (tentativeGScore < (gScore[`${nx},${ny}`] || Infinity)) {
          cameFrom[`${nx},${ny}`] = { x, y };
          gScore[`${nx},${ny}`] = tentativeGScore;
          fScore[`${nx},${ny}`] = tentativeGScore + euclideanDistance({ x: nx, y: ny }, destination);

          if (!openSet.some((point) => point.x === nx && point.y === ny)) {
            openSet.push({ x: nx, y: ny });
          }
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

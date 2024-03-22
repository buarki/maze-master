import { PathFindingParams, PathFindingResult, Point } from "./types";

interface PointWithDistance extends Point {
  dist: number;
}

export const dijkstra = async ({
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
  const distance = Array.from({ length: rows }, () => new Array(columns).fill(Number.MAX_SAFE_INTEGER));
  const visited = Array.from({ length: rows }, () => new Array(columns).fill(false));
  const possibleMovements = 4;
  const dx = [0, 1, 0, -1];
  const dy = [-1, 0, 1, 0];
  const priorityQueue: PointWithDistance[] = [];

  distance[origin.x][origin.y] = 0;
  priorityQueue.push({ x: origin.x, y: origin.y, dist: 0 });

  const animateSearch = async () => {
    while (priorityQueue.length > 0) {
      priorityQueue.sort((a, b) => a.dist - b.dist);
      const current = priorityQueue.shift()!;
      const { x, y } = current;

      if (visited[x][y]) continue;
      visited[x][y] = true;

      const newGrid = [...matrix];
      const currentCellIsNeitherTheOriginOrDestination = !((x === origin.x && y === origin.y) || (x === destination.x && y === destination.y));
      newGrid[x][y] = {
        ...newGrid[x][y],
        beingUsedDuringSearch: currentCellIsNeitherTheOriginOrDestination,
      };
      updateGrid(newGrid);

      if (x === destination.x && y === destination.y) break;

      for (let i = 0; i < possibleMovements; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];

        const movementIsValid =
          nx >= 0 && nx < rows && ny >= 0 && ny < columns && !visited[nx][ny] && !matrix[nx][ny];

        if (movementIsValid) {
          const newDist = distance[x][y] + 1; // using uniform cost for all edges :)
          if (newDist < distance[nx][ny]) {
            distance[nx][ny] = newDist;
            priorityQueue.push({ x: nx, y: ny, dist: newDist });
          }
        }
      }

      await new Promise((resolve) => setTimeout(resolve, searchSpeed));
    }
  };

  await animateSearch();

  const shortestPath = [];
  let current: Point = { x: destination.x, y: destination.y };
  while (current.x !== origin.x || current.y !== origin.y) {
    shortestPath.push({ x: current.x, y: current.y });
    let minDist = Number.MAX_SAFE_INTEGER;
    let next: Point;
    for (let i = 0; i < possibleMovements; i++) {
      const nx = current.x + dx[i];
      const ny = current.y + dy[i];

      if (nx >= 0 && nx < rows && ny >= 0 && ny < columns && distance[nx][ny] < minDist) {
        minDist = distance[nx][ny];
        next = { x: nx, y: ny };
      }
    }
    // @ts-ignore
    current = next;
  }

  return {
    pathWasFound: visited[destination.x][destination.y],
    shortestPath: shortestPath.reverse(),
  };
};

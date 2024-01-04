export interface Point {
  x: number;
  y: number;
}

export interface Graph {
  rows: number;
  columns: number;
  matrix: Array<Array<{ isWall: boolean, beingUsedDuringSearch: boolean }>>;
}

export interface PathFindingParams {
  origin: Point;
  destination: Point;
  searchSpeed: number;
  graph: Graph;
  updateGrid: Function;
}

export interface PathFindingResult {
  pathWasFound: boolean;
  shortestPath: Point[];
};

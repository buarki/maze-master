export interface Point {
  x: number;
  y: number;
}

export interface Graph {
  rows: number;
  columns: number;
  matrix: Array<Array<{ isBlock: boolean, beingUsedDuringSearch: boolean }>>;
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

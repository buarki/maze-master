import { aStar } from "./a-star";
import { bfs } from "./bfs";
import { dfs } from "./dfs";
import { dijkstra } from "./dijkstra";
import { PathFindingParams, PathFindingResult } from "./types";

export interface PathFindingAlgorithm {
  name: string;
  algorithm: (p: PathFindingParams) => Promise<PathFindingResult>;
}

export const pathFindingAlgorithms: PathFindingAlgorithm[] = [
  {
    name: "BFS",
    algorithm: bfs,
  },
  {
    name: "DFS",
    algorithm: dfs,
  },
  {
    name: "Dijkstra",
    algorithm: dijkstra,
  },
  {
    name: "A*",
    algorithm: aStar,
  },
];

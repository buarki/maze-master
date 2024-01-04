import { bfs } from "./bfs";
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
];

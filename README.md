# maze master


## Description
Maze master is a funny app to create mazes and solve them with famous graph algorithms. The list with algorithm available now and soon can be found bellow:

|Algorithm|available|
|:---:|:--:|
|BFS (Breadth-First Search)|YES|
|DFS (Depth-First Search)|YES|
|Dijkstra|YES|
|A*|YES|

## Running locally

```sh
npm i
npm run dev
```

## Adding a new algorithm

All contributions are wellcome! In case you want to add a new algorithm just add the implementation at the [path-finders](./src/lib/path-finders/) directory and update the list of [available algorithms](./src//lib/path-finders/index.ts). As long as your implementation respects the inteface **PathFindingAlgorithm** it should be fine. And a concrete example is the [BFS implementation](./src/lib/path-finders/bfs.ts).



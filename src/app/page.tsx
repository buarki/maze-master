"use client";

import React, { useState } from "react";
import Grid from "@maze-master/components/grid.component";
import { GRID_COLUMNS, GRID_ROWS } from "@maze-master/configs";
import { pathFindingAlgorithms } from "@maze-master/lib/path-finders";

export default function Home() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(pathFindingAlgorithms[0].name);
  const [pathFindingAlgorithmToUse, setPathFindingAlgorithmToUse] = useState(() => pathFindingAlgorithms[0].algorithm);

  const handleAlgorithmChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSelectedAlgorithm(event.target.value);
    pathFindingAlgorithms.find((x) => x.name === event.target.value);
    setPathFindingAlgorithmToUse(() => pathFindingAlgorithms.find((x) => x.name === event.target.value)!!.algorithm);
  };

  return (
    <main className="flex">
      <div className="flex flex-col items-start justify-start p-8">
        <label className="mb-2 text-lg font-bold">Select Algorithm:</label>
        <select
          value={selectedAlgorithm}
          onChange={handleAlgorithmChange}
          className="mb-4 p-2 border border-gray-400 rounded"
        >
          {pathFindingAlgorithms.map((algorithm, index) =>
              <option key={index} value={algorithm.name}>{algorithm.name}</option>)}
        </select>
        <a title="Visit the project repository on Github." href="https://github.com/buarki/maze-master" target="_blank" className="bg-blue-500 hover:bg-blue-300 font-bold text-white p-2">Github</a>
      </div>

      <div className="flex flex-col items-center justify-center p-8">
        <Grid
          findPath={pathFindingAlgorithmToUse}
          rows={GRID_ROWS}
          cols={GRID_COLUMNS} />
      </div>

      <div className="flex flex-col items-start justify-start p-8">
        <div className="mb-4">
          <div className="w-4 h-4 bg-destination mr-2 inline-block"></div>
          <span>Destination</span>
        </div>
        <div className="mb-4">
          <div className="w-4 h-4 bg-origin mr-2 inline-block"></div>
          <span>Origin</span>
        </div>
        <div className="mb-4">
          <div className="w-4 h-4 bg-wall mr-2 inline-block"></div>
          <span>Wall</span>
        </div>
        <div className="mb-4">
          <div className="w-4 h-4 bg-used-during-search mr-2 inline-block"></div>
          <span>Search path</span>
        </div>
        <div>
          <div className="w-4 h-4 bg-shortest-path mr-2 inline-block"></div>
          <span>Shortest Path</span>
        </div>
      </div>
    </main>
  );
}

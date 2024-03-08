"use client";

import React, { useState } from "react";
import Grid from "@maze-master/components/grid.component";
import { GRID_COLUMNS, GRID_ROWS, SEARCH_SPEED } from "@maze-master/configs";
import { pathFindingAlgorithms } from "@maze-master/lib/path-finders";
import { ColorsSubtitles } from "@maze-master/components/colors-subtitles.components";

export default function Home() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(pathFindingAlgorithms[0].name);
  const [pathFindingAlgorithmToUse, setPathFindingAlgorithmToUse] = useState(() => pathFindingAlgorithms[0].algorithm);

  const handleAlgorithmChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSelectedAlgorithm(event.target.value);
    pathFindingAlgorithms.find((x) => x.name === event.target.value);
    setPathFindingAlgorithmToUse(() => pathFindingAlgorithms.find((x) => x.name === event.target.value)!!.algorithm);
  };

  return (
    <main className="flex w-full relative">
      <div id="smallScreenAlert"></div>
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
      
        <ColorsSubtitles className="mt-10"/>
      </div>

      <div className="lg:visible hidden flex-grow lg:flex flex-col items-center justify-center p-8">
        <Grid
          findPath={pathFindingAlgorithmToUse}
          gridSpeed={SEARCH_SPEED}
          rows={GRID_ROWS}
          cols={GRID_COLUMNS} />
      </div>

      <div className="bg-red-100 lg:hidden text-center absolute inset-0 flex items-center justify-center text-3xl">
        <h1>Please use a Desktop in full screen for a better experience.</h1>
      </div>
    </main>
  );
}

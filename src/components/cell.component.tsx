"use client";

import React from 'react';

interface CellProps {
  isWall: boolean;
  isOrigin: boolean;
  isDestination: boolean;
  beingUsedDuringSearch: boolean;
  onClick: () => void;
  onMouseOver: () => void;
}

const Cell: React.FC<CellProps> = ({ isWall, isOrigin, isDestination, beingUsedDuringSearch, onClick, onMouseOver, }) => {
  const cellColor =
    beingUsedDuringSearch ? 'bg-gray-800' :
    isOrigin ? 'bg-yellow-200' :
    isDestination ? 'bg-green-300' : isWall ? 'bg-red-800' : 'bg-gray-200';
  return (
    <div
      className={`w-8 h-8 ${cellColor}`}
      onClick={onClick}
      onMouseOver={onMouseOver}
    />
  );
};

export default Cell;

"use client";

import React from 'react';

interface CellProps {
  isWall: boolean;
  isOrigin: boolean;
  isDestination: boolean;
  onClick: () => void;
  onMouseOver: () => void;
}

const Cell: React.FC<CellProps> = ({ isWall, isOrigin, isDestination, onClick, onMouseOver, }) => {
  const cellColor = isOrigin ? 'bg-red-300' : isDestination ? 'bg-green-300' : isWall ? 'bg-gray-800' : 'bg-gray-200';
  return (
    <div
      className={`w-8 h-8 ${cellColor}`}
      onClick={onClick}
      onMouseOver={onMouseOver}
    />
  );
};

export default Cell;

"use client";

import React from 'react';

interface CellProps {
  isWall: boolean;
  onClick: () => void;
  onMouseOver: () => void;
}

const Cell: React.FC<CellProps> = ({ isWall, onClick, onMouseOver }) => {
  return (
    <div
      className={`w-8 h-8 ${isWall ? 'bg-gray-800' : 'bg-gray-200'}`}
      onClick={onClick}
      onMouseOver={onMouseOver}
    />
  );
};

export default Cell;

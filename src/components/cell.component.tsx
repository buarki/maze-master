"use client";

interface CellProps {
  isWall: boolean;
  isOrigin: boolean;
  isDestination: boolean;
  beingUsedDuringSearch: boolean;
  isOptimalPath: boolean;
  onClick: () => void;
  onMouseOver: () => void;
}

const Cell: React.FC<CellProps> = ({
  isWall,
  isOrigin,
  isDestination,
  beingUsedDuringSearch,
  isOptimalPath,
  onClick,
  onMouseOver,
}) => {
  const cellColor =
    isOptimalPath
      ? 'bg-shortest-path' :
      beingUsedDuringSearch
      ? 'bg-used-during-search'
      : isOrigin
      ? 'bg-origin'
      : isDestination
      ? 'bg-destination'
      : isWall
      ? 'bg-wall'
      : 'bg-not-wall';

  return (
    <div
      className={`w-8 h-8 ${cellColor}`}
      onClick={onClick}
      onMouseOver={onMouseOver}
    />
  );
};

export default Cell;

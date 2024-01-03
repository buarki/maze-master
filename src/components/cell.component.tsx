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
    beingUsedDuringSearch
      ? 'bg-gray-800'
      : isOrigin
      ? 'bg-yellow-200'
      : isDestination
      ? 'bg-green-300'
      : isWall
      ? 'bg-red-500'
      : 'bg-gray-200';

  const optimalPathStyle = isOptimalPath ? 'bg-purple-500' : '';

  return (
    <div
      className={`w-8 h-8 ${cellColor} ${optimalPathStyle}`}
      onClick={onClick}
      onMouseOver={onMouseOver}
    />
  );
};

export default Cell;

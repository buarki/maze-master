export interface ColorsSubtitlesProps {
  className?: string;
}

export function ColorsSubtitles({ className }: ColorsSubtitlesProps) {
  return (
    <div className={`${className} text-sm flex flex-col items-start justify-start`}>
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
  );
}

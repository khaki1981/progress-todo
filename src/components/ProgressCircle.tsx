import type { ProgressSummary } from '../utils/progress';

export type ProgressSegment = {
  color: string;
  count: number;
};

type ProgressCircleProps = {
  color?: string;
  onAddTodo: () => void;
  progress: ProgressSummary;
  segments?: ProgressSegment[];
};

export function ProgressCircle({
  color,
  onAddTodo,
  progress,
  segments,
}: ProgressCircleProps) {
  const radius = 63;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;
  const progressOffset =
    circumference - (progress.percentage / 100) * circumference;
  const remainingCount = Math.max(
    progress.totalCount - progress.completedCount,
    0,
  );
  const message =
    progress.totalCount === 0
      ? 'タスクを追加して開始'
      : remainingCount === 0
        ? 'クリア！'
        : `あと${remainingCount}個でクリア`;

  let segmentStartCount = 0;
  const progressSegments =
    segments && progress.totalCount > 0
      ? segments.flatMap((segment) => {
          const remainingSegmentCount =
            progress.totalCount - segmentStartCount;
          const segmentCount = Math.min(
            Math.max(segment.count, 0),
            remainingSegmentCount,
          );

          if (segmentCount <= 0) {
            return [];
          }

          const startCount = segmentStartCount;
          segmentStartCount += segmentCount;

          return [
            {
              color: segment.color,
              dashLength: (segmentCount / progress.totalCount) * circumference,
              dashOffset: -(startCount / progress.totalCount) * circumference,
            },
          ];
        })
      : [];

  return (
    <section className="progress" aria-label="Project progress">
      <div className="progress__ring">
        <svg className="progress__chart" viewBox="0 0 150 150" role="img">
          <circle
            className="progress__track"
            cx="75"
            cy="75"
            fill="none"
            r={radius}
            strokeWidth={strokeWidth}
          />
          {segments ? (
            progressSegments.map((segment, index) => (
              <circle
                className="progress__value progress__value--segment"
                cx="75"
                cy="75"
                fill="none"
                key={`${segment.color}-${index}`}
                r={radius}
                strokeDasharray={`${segment.dashLength} ${
                  circumference - segment.dashLength
                }`}
                strokeDashoffset={segment.dashOffset}
                strokeLinecap="butt"
                strokeWidth={strokeWidth}
                style={{ stroke: segment.color }}
              />
            ))
          ) : (
            <circle
              className="progress__value"
              cx="75"
              cy="75"
              fill="none"
              r={radius}
              strokeDasharray={circumference}
              strokeDashoffset={progressOffset}
              strokeLinecap="round"
              strokeWidth={strokeWidth}
              style={color ? { stroke: color } : undefined}
            />
          )}
        </svg>
        <div className="progress__label">
          <strong>
            {progress.percentage}
            <span>%</span>
          </strong>
          <small>
            {progress.completedCount} / {progress.totalCount} 完了
          </small>
        </div>
      </div>
      {progress.totalCount === 0 ? (
        <button
          className="progress__message"
          onClick={onAddTodo}
          type="button"
        >
          {message}
        </button>
      ) : (
        <p className="progress__message">{message}</p>
      )}
    </section>
  );
}

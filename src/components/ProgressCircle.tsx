import type { ProgressSummary } from '../utils/progress';

type ProgressCircleProps = {
  color?: string;
  onAddTodo: () => void;
  progress: ProgressSummary;
};

export function ProgressCircle({
  color,
  onAddTodo,
  progress,
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

import type { ProgressSummary } from '../utils/progress';

type ProgressCircleProps = {
  progress: ProgressSummary;
};

export function ProgressCircle({ progress }: ProgressCircleProps) {
  const radius = 84;
  const strokeWidth = 18;
  const circumference = 2 * Math.PI * radius;
  const progressOffset =
    circumference - (progress.percentage / 100) * circumference;

  return (
    <section className="progress" aria-label="Project progress">
      <svg className="progress__chart" viewBox="0 0 200 200" role="img">
        <circle
          className="progress__track"
          cx="100"
          cy="100"
          fill="none"
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className="progress__value"
          cx="100"
          cy="100"
          fill="none"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={progressOffset}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
      </svg>
      <div className="progress__label">
        <strong>{progress.percentage}%</strong>
        <span>
          {progress.completedCount}/{progress.totalCount}
        </span>
      </div>
    </section>
  );
}

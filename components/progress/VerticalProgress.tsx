"use client";

interface VerticalProgressProps {
  progress: number;
  current: number;
  target: number;
  stats: {
    label: string;
    value: number;
    percentage: number;
  }[];
}

export function VerticalProgress({
  progress,
  current,
  target,
  stats,
}: VerticalProgressProps) {
  return (
    <div className="flex gap-8 h-[400px]">
      <div className="flex-1 space-y-4">
        <div className="relative h-full w-8 bg-muted rounded-full overflow-hidden">
          <div
            className="absolute bottom-0 w-full bg-[#FFD700] transition-all duration-700 rounded-full"
            style={{ height: `${progress}%` }}
          />
        </div>
      </div>
      <div className="flex-[2] space-y-8">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold">{progress}%</h3>
          <p className="text-sm text-muted-foreground">
            {current} / {target} Monthly Goal
          </p>
        </div>
        <div className="space-y-6">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{stat.label}</span>
                <span>{stat.percentage}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FFD700] transition-all duration-500"
                  style={{ width: `${stat.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
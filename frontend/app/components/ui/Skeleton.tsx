import { clsx } from "clsx";

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
}

export function Skeleton({ className, width, height }: SkeletonProps) {
  return (
    <div
      className={clsx("skeleton rounded-md", className)}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}

export function ActionCardSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 bg-[#202020] rounded-[14px] border border-[rgba(255,255,255,0.06)]">
      <Skeleton className="w-6 h-6 rounded-md flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3.5 w-3/4" />
        <Skeleton className="h-3 w-1/3" />
      </div>
      <Skeleton className="h-3 w-10 flex-shrink-0" />
    </div>
  );
}

export function TaskBreakdownSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <Skeleton className="h-6 w-28 rounded-full" />
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="p-4 rounded-[14px] border border-[rgba(255,255,255,0.06)] bg-[#202020] space-y-2 mb-6">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-3/5" />
      </div>
      <div className="space-y-3">
        <ActionCardSkeleton />
        <ActionCardSkeleton />
        <ActionCardSkeleton />
        <ActionCardSkeleton />
      </div>
    </div>
  );
}

export function RightPanelSkeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="p-4 bg-[#202020] rounded-[14px] border border-[rgba(255,255,255,0.06)] space-y-3"
        >
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-2 w-full rounded-full" />
        </div>
      ))}
    </div>
  );
}

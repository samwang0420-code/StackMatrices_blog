// Skeleton loading components for consistent loading states

export function CardSkeleton() {
  return (
    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 animate-pulse">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-slate-700"></div>
        <div className="w-10 h-10 rounded-full bg-slate-700"></div>
      </div>
      <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-slate-700 rounded w-1/2 mb-3"></div>
      <div className="h-3 bg-slate-700 rounded w-full mb-2"></div>
      <div className="flex justify-between items-center pt-3 border-t border-slate-700/50">
        <div className="h-6 bg-slate-700 rounded w-16"></div>
        <div className="h-8 bg-slate-700 rounded w-20"></div>
      </div>
    </div>
  );
}

export function DeploymentCardSkeleton() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden animate-pulse">
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="h-4 bg-slate-800 rounded w-24 mb-2"></div>
            <div className="h-6 bg-slate-800 rounded w-48"></div>
          </div>
          <div className="h-6 bg-slate-800 rounded w-20"></div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="h-12 bg-slate-800 rounded"></div>
          <div className="h-12 bg-slate-800 rounded"></div>
          <div className="h-12 bg-slate-800 rounded"></div>
        </div>
      </div>
      <div className="p-6 bg-slate-950/50">
        <div className="h-4 bg-slate-800 rounded w-32 mb-4"></div>
        <div className="h-20 bg-slate-800 rounded mb-4"></div>
        <div className="flex gap-3">
          <div className="h-10 bg-slate-800 rounded flex-1"></div>
          <div className="h-10 bg-slate-800 rounded flex-1"></div>
        </div>
      </div>
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-6 animate-pulse">
          <div className="flex items-center justify-between mb-2">
            <div className="h-4 bg-slate-800 rounded w-24"></div>
            <div className="w-5 h-5 bg-slate-800 rounded"></div>
          </div>
          <div className="h-8 bg-slate-800 rounded w-20"></div>
        </div>
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden animate-pulse">
      <div className="p-4 border-b border-slate-800">
        <div className="h-6 bg-slate-800 rounded w-32"></div>
      </div>
      <div className="divide-y divide-slate-800">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-800 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-slate-800 rounded w-1/3 mb-2"></div>
              <div className="h-3 bg-slate-800 rounded w-1/2"></div>
            </div>
            <div className="h-6 bg-slate-800 rounded w-20"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

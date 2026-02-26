import { Suspense } from 'react';
import DashboardContent from './DashboardContent';
import { StatsSkeleton, DeploymentCardSkeleton } from '@/components/skeletons';

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-6 h-6 bg-slate-800 rounded animate-pulse"/>
            <div className="h-8 bg-slate-800 rounded w-48 animate-pulse"/>
          </div>
          <div className="h-4 bg-slate-800 rounded w-64 animate-pulse"/>
        </div>
        
        {/* Stats Skeleton */}
        <StatsSkeleton />
        
        {/* Cards Skeleton */}
        <div className="mt-8 space-y-6">
          <DeploymentCardSkeleton />
          <DeploymentCardSkeleton />
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}
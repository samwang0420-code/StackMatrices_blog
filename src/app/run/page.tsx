'use client';

import { Suspense } from 'react';
import SkillRunnerContent from './SkillRunnerContent';

export default function SkillRunnerPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    }>
      <SkillRunnerContent />
    </Suspense>
  );
}

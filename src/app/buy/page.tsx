'use client';

import { Suspense } from 'react';
import BuyPageContent from './BuyPageContent';

export default function BuyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center">加载中...</div>}>
      <BuyPageContent />
    </Suspense>
  );
}

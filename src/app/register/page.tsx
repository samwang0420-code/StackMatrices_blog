'use client';

import { Suspense } from 'react';
import RegisterPageContent from './RegisterPageContent';

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center">加载中...</div>}>
      <RegisterPageContent />
    </Suspense>
  );
}

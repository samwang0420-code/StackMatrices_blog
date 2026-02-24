'use client';

import { Suspense } from 'react';
import LoginPageContent from './LoginPageContent';

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center">加载中...</div>}>
      <LoginPageContent />
    </Suspense>
  );
}

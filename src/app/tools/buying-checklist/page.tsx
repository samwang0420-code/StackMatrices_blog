import { Metadata } from 'next';
import BuyingChecklist from '@/components/tools/BuyingChecklist';

export const metadata: Metadata = {
  title: 'SaaS Buying Checklist PDF | Free Download | Stackmatrices',
  description: 'Download our comprehensive 20-point checklist for evaluating SaaS tools. Never miss hidden fees or critical features.',
  keywords: 'SaaS buying checklist, software evaluation, PDF download, due diligence checklist',
};

export default function BuyingChecklistPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-slate-900 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            SaaS Buying Checklist
          </h1>
          <p className="text-lg text-slate-300">
            20 essential questions to ask before buying any software
          </p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <BuyingChecklist />
      </div>
    </div>
  );
}

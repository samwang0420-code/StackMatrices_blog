import { Metadata } from 'next';
import TCOCalculator from '@/components/tools/TCOCalculator';

export const metadata: Metadata = {
  title: 'SaaS TCO Calculator | Total Cost of Ownership | Stackmatrices',
  description: 'Calculate the 3-year total cost of ownership for SaaS tools. Compare multiple tools side by side with hidden fees included.',
  keywords: 'TCO calculator, total cost of ownership, SaaS pricing, hidden fees, software comparison',
};

export default function TCOCalculatorPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="bg-slate-900 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            TCO Calculator
          </h1>
          <p className="text-lg text-slate-300">
            Calculate the true 3-year cost including hidden fees
          </p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <TCOCalculator />
      </div>
    </div>
  );
}

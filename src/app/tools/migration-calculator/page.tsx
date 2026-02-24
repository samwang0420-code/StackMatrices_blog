import { Metadata } from 'next';
import MigrationCalculator from '@/components/tools/MigrationCalculator';

export const metadata: Metadata = {
  title: 'SaaS Migration Cost Calculator | Free Tool | Stackmatrices',
  description: 'Estimate the real cost of switching SaaS tools. Includes data migration, training, downtime, and productivity loss.',
  keywords: 'migration cost calculator, switching SaaS, data migration cost, software transition',
};

export default function MigrationCalculatorPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="bg-slate-900 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Migration Cost Calculator
          </h1>
          <p className="text-lg text-slate-300">
            Calculate the true cost of switching between tools
          </p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <MigrationCalculator />
      </div>
    </div>
  );
}

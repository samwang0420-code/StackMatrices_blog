import { Metadata } from 'next';
import ROICalculator from '@/components/tools/ROICalculator';

export const metadata: Metadata = {
  title: 'SaaS ROI Calculator | Free Tool | Stackmatrices',
  description: 'Calculate the return on investment for any SaaS tool. Input your costs and time savings to see if it\'s worth it. Free calculator.',
  keywords: 'SaaS ROI calculator, return on investment, software ROI, cost savings calculator',
};

export default function ROICalculatorPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="bg-slate-900 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            SaaS ROI Calculator
          </h1>
          <p className="text-lg text-slate-300">
            Calculate your return on investment before buying any software
          </p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <ROICalculator />
      </div>
    </div>
  );
}

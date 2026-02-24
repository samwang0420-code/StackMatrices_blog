import { Metadata } from "next";
import { useTranslations } from "next-intl";
import Link from "next/link";

export const metadata: Metadata = {
  title: "API Services",
  description: "Choose your data service, pay per use",
};

const services = [
  {
    id: "single-research",
    key: "singleResearch",
    price: "¥19",
    unit: "per-use",
  },
  {
    id: "batch-compare",
    key: "batchCompare",
    price: "¥49",
    unit: "per-use",
    popular: true,
  },
  {
    id: "content-material",
    key: "contentMaterial",
    price: "¥29",
    unit: "per-use",
  },
  {
    id: "tco-analysis",
    key: "tcoAnalysis",
    price: "¥39",
    unit: "per-use",
  },
  {
    id: "competitor-monitor",
    key: "competitorMonitor",
    price: "¥99",
    unit: "month",
  },
  {
    id: "api-developer",
    key: "apiDeveloper",
    price: "¥299",
    unit: "month",
    popular: true,
  },
];

export default function PricingPage() {
  const t = useTranslations("pricing");

  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{t("title")}</h1>
          <p className="text-slate-600">{t("subtitle")}</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="border border-slate-200 rounded-lg p-6 hover:border-primary transition-colors"
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {t(`${service.key}.name`)}
                </h3>
                <p className="text-sm text-slate-600">{t(`${service.key}.description`)}\u003c/p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="text-lg font-bold text-slate-900">
                  {service.price}
                  <span className="text-sm font-normal text-slate-500 ml-1">
                    /{service.unit === 'month' ? '月' : '次'}
                  </span>
                </span>
                <Link
                  href={`/buy?service=${service.id}`}
                  className="px-4 py-2 bg-primary text-white text-sm font-medium rounded hover:bg-primary-hover transition-colors"
                >
                  {t("buy")}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Language Switch */}
        <div className="mt-12 flex gap-2">
          <Link href="/pricing" className="text-sm text-slate-500 hover:text-primary">中文</Link>
          <span className="text-slate-300">|</span>
          <Link href="/en/pricing" className="text-sm text-slate-500 hover:text-primary">English</Link>
        </div>
      </div>
    </div>
  );
}

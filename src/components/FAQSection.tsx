'use client';

import { useState } from 'react';

interface Question {
  q: string;
  a: string;
  sources: string[];
}

interface FAQSectionProps {
  category: string;
  questions: Question[];
}

export function FAQSection({ category, questions }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4">
        {category}
      </h2>
      <div className="space-y-4">
        {questions.map((item, idx) => (
          <div 
            key={idx}
            className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
            >
              <span className="font-medium pr-4">{item.q}</span>
              <span className="text-primary text-xl">
                {openIndex === idx ? '−' : '+'}
              </span>
            </button>
            {openIndex === idx && (
              <div className="px-6 pb-4">
                <p className="text-gray-300 mb-4">{item.a}</p>
                <div className="flex flex-wrap gap-2">
                  {item.sources.map((source, i) => (
                    <span 
                      key={i}
                      className="text-xs bg-white/10 px-2 py-1 rounded text-gray-400"
                    >
                      Source: {source}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

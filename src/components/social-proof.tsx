'use client';

import { useEffect, useState } from 'react';
import { Activity, User, ShoppingCart, Zap } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'purchase' | 'deploy' | 'review';
  user: string;
  skill: string;
  time: string;
  location?: string;
}

// Simulated real-time activity feed
const MOCK_ACTIVITIES: ActivityItem[] = [
  { id: '1', type: 'purchase', user: 'Alex K.', skill: 'Price Monitor', time: '2 min ago', location: 'San Francisco' },
  { id: '2', type: 'deploy', user: 'Sarah M.', skill: 'Review Analyzer', time: '5 min ago', location: 'London' },
  { id: '3', type: 'purchase', user: 'James L.', skill: 'Competitor Tracker', time: '8 min ago', location: 'Singapore' },
  { id: '4', type: 'deploy', user: 'Maria G.', skill: 'SEO Audit', time: '12 min ago', location: 'Berlin' },
  { id: '5', type: 'review', user: 'David W.', skill: 'Review Analyzer', time: '15 min ago', location: 'Toronto' },
  { id: '6', type: 'purchase', user: 'Lisa P.', skill: 'Price Monitor', time: '18 min ago', location: 'Sydney' },
];

function ActivityIcon({ type }: { type: ActivityItem['type'] }) {
  switch (type) {
    case 'purchase':
      return <ShoppingCart className="w-3 h-3 text-emerald-400" />;
    case 'deploy':
      return <Zap className="w-3 h-3 text-amber-400" />;
    case 'review':
      return <User className="w-3 h-3 text-blue-400" />;
    default:
      return <Activity className="w-3 h-3 text-slate-400" />;
  }
}

function ActivityText({ item }: { item: ActivityItem }) {
  switch (item.type) {
    case 'purchase':
      return (
        <>
          <span className="text-slate-300">{item.user}</span>
          <span className="text-slate-500"> purchased </span>
          <span className="text-emerald-400">{item.skill}</span>
        </>
      );
    case 'deploy':
      return (
        <>
          <span className="text-slate-300">{item.user}</span>
          <span className="text-slate-500"> deployed </span>
          <span className="text-amber-400">{item.skill}</span>
        </>
      );
    case 'review':
      return (
        <>
          <span className="text-slate-300">{item.user}</span>
          <span className="text-slate-500"> reviewed </span>
          <span className="text-blue-400">{item.skill}</span>
        </>
      );
  }
}

export function LiveActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>(MOCK_ACTIVITIES.slice(0, 3));
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Rotate activities every 8 seconds
    const interval = setInterval(() => {
      setActivities(prev => {
        const nextIndex = MOCK_ACTIVITIES.findIndex(a => a.id === prev[prev.length - 1].id) + 1;
        const nextActivity = MOCK_ACTIVITIES[nextIndex % MOCK_ACTIVITIES.length];
        return [...prev.slice(1), nextActivity];
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-sm">
      <div className="bg-slate-900/95 backdrop-blur border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium text-slate-300">Live Activity</span>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-slate-500 hover:text-slate-300 text-xs"
          >
            ×
          </button>
        </div>
        
        <div className="divide-y divide-slate-800">
          {activities.map((item) => (
            <div key={item.id} className="flex items-center gap-3 px-4 py-3">
              <div className="w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center shrink-0">
                <ActivityIcon type={item.type} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate">
                  <ActivityText item={item} />
                </p>
                <p className="text-xs text-slate-500">{item.time} • {item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Trust badges component
export function TrustBadges() {
  const stats = [
    { label: 'Skills Deployed', value: '1,247', icon: Zap },
    { label: 'Hours Saved', value: '50,000+', icon: Activity },
    { label: 'Active Users', value: '328', icon: User },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 py-8">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="flex items-center justify-center gap-2 text-emerald-400 mb-1">
            <stat.icon className="w-4 h-4" />
            <span className="text-2xl font-bold">{stat.value}</span>
          </div>
          <div className="text-xs text-slate-500">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

// Testimonial card
interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  skill: string;
  metric?: string;
}

export function TestimonialCard({ quote, author, role, company, skill, metric }: TestimonialProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      
      <blockquote className="text-slate-300 mb-4">"{quote}"</blockquote>
      
      {metric && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 mb-4">
          <span className="text-emerald-400 font-semibold">{metric}</span>
        </div>
      )}
      
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 font-semibold">
          {author.charAt(0)}
        </div>
        <div>
          <div className="font-medium text-white">{author}</div>
          <div className="text-sm text-slate-500">{role}, {company}</div>
        </div>
        <div className="ml-auto text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
          {skill}
        </div>
      </div>
    </div>
  );
}

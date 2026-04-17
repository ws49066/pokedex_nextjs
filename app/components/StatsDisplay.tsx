'use client';

import { Pokemon } from '@/app/types/pokemon';

interface StatsDisplayProps {
  stats: Pokemon['stats'];
}

export default function StatsDisplay({ stats }: StatsDisplayProps) {
  const maxStat = 150;

  const getStatColor = (value: number) => {
    if (value >= 120) return 'from-green-500 to-emerald-600';
    if (value >= 100) return 'from-blue-500 to-cyan-600';
    if (value >= 80) return 'from-yellow-500 to-orange-600';
    if (value >= 60) return 'from-orange-500 to-red-600';
    return 'from-red-500 to-rose-600';
  };

  return (
    <div className="space-y-6">
      {stats.map((stat, index) => {
        const percentage = (stat.value / maxStat) * 100;
        const color = getStatColor(stat.value);

        return (
          <div key={stat.name} className="fade-in" style={{ animationDelay: `${index * 50}ms` }}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 font-semibold capitalize">
                {stat.name.replace('-', ' ')}
              </span>
              <span className="text-gray-900 font-bold bg-gray-100 px-3 py-1 rounded-full text-sm">
                {stat.value}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
              <div
                className={`bg-gradient-to-r ${color} h-full rounded-full transition-all duration-700 ease-out shadow-lg`}
                style={{
                  width: `${Math.min(percentage, 100)}%`,
                  animation: `slideIn 0.8s ease-out ${index * 50}ms both`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

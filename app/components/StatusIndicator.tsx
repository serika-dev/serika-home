import React from 'react';

export type Status = 'operational' | 'downtime' | 'development';

interface StatusIndicatorProps {
  status: Status;
}

const statusConfig = {
  operational: {
    text: 'All systems operational',
    color: 'bg-green-500',
  },
  downtime: {
    text: 'Experiencing downtime',
    color: 'bg-red-500',
  },
  development: {
    text: 'In active development',
    color: 'bg-yellow-500',
  },
};

export function StatusIndicator({ status }: StatusIndicatorProps) {
  const { text, color } = statusConfig[status];

  return (
    <div className="flex items-center gap-2 mt-2">
      <div className={`w-2 h-2 rounded-full ${color}`} />
      <span className="text-xs text-gray-400">{text}</span>
    </div>
  );
}



'use client';

import { useEffect, useState } from 'react';
import { StatusIndicator, type Status } from './StatusIndicator';

interface ServiceCardProps {
  title: string;
  url?: string;
  description: string;
  brand?: { main: string; sub?: string };
  noLink?: boolean;
  status?: Status;
  noStatus?: boolean;
}

export function ServiceCard({ title, url, description, brand, noLink, status: initialStatus, noStatus }: ServiceCardProps) {
  const [status, setStatus] = useState<Status | undefined>(initialStatus);

  useEffect(() => {
    if (url && !noLink && !noStatus) {
      fetch(`/api/status?url=${url}`)
        .then((res) => res.json())
        .then((data) => {
          setStatus(data.status);
        });
    }
  }, [url, noLink, noStatus]);

  const CardContent = (
    <div className="relative z-10">
      <h3 className="text-lg font-semibold mb-2 flex flex-wrap items-center gap-2">
        {brand ? (
          <>
            {brand.main === 'Toka' ? (
              <span className="text-white">Toka</span>
            ) : (
              <>
                {brand.sub === 'dev' ? (
                  <>
                    <span className="text-white">serika</span>
                    <span className="text-[#8b5cf6]">.dev</span>
                  </>
                ) : (
                  <>
                    <span className="text-white">{brand.main}</span>
                    {brand.sub && (
                      <span className="text-[#8b5cf6]">{brand.sub}</span>
                    )}
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <span className="text-white">{title}</span>
        )}
      </h3>
      <p className="text-sm text-gray-400 mb-3">{description}</p>
      <div className="flex items-center justify-between">
        {url && (
          <code className="text-xs text-gray-500 font-mono bg-black/30 px-2 py-1 rounded">
            {url}
          </code>
        )}
      </div>
      {status && !noStatus && <StatusIndicator status={status} />}
    </div>
  );

  return noLink ? (
    <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm cursor-default shadow-sm text-card-foreground">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-blue-500/0 transition-all opacity-20" />
      {CardContent}
    </div>
  ) : (
    <a
      href={url ? `https://${url}` : undefined}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/10 backdrop-blur-sm shadow-sm text-card-foreground"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-blue-500/10 transition-all" />
      {CardContent}
    </a>
  );
}

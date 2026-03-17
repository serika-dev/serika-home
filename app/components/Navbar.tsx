'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, Code, Home, Zap } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  
  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/open-source', label: 'Open Source', icon: Code },
    { href: '/privacy', label: 'Privacy & Security', icon: Shield },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Zap className="h-5 w-5 text-[#8b5cf6]" />
          <span>Serika</span>
        </Link>
        <div className="flex gap-1 md:gap-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="h-4 w-4 hidden sm:block" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
import { BackgroundShapes } from '../components/BackgroundShapes';
import { Code, GitPullRequest, Scale, Share2 } from 'lucide-react';

export default function OpenSourcePage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <BackgroundShapes />
      
      <div className="relative z-10 min-h-screen px-4 py-20">
        <main className="w-full max-w-4xl mx-auto">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-white/10 mb-6">
              <Code className="h-8 w-8 text-[#8b5cf6]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Serika Open Source Initiative</h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              We build software licensed under the Serika FOSS License. Our license requires attribution, allowing teams to adopt, extend, and distribute software with minimal friction while preserving proper credit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-8 transition-all hover:bg-white/10 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <GitPullRequest className="h-6 w-6 text-[#8b5cf6] mb-4" />
              <h3 className="text-xl font-semibold mb-3">Open Development</h3>
              <p className="text-gray-400">Transparent roadmaps and community-friendly contribution workflows designed to scale with your organization.</p>
            </div>

            <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-8 transition-all hover:bg-white/10 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Scale className="h-6 w-6 text-pink-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Attribution-Only</h3>
              <p className="text-gray-400">Simple license terms that support commercial and community adoption without aggressive copyleft restrictions.</p>
            </div>

            <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-8 transition-all hover:bg-white/10 backdrop-blur-sm md:col-span-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Share2 className="h-6 w-6 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Deployment Flexibility</h3>
              <p className="text-gray-400 max-w-2xl">Cloud-hosted and self-hosted paths for every organization size. We believe you should have total control over where and how your software operates.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
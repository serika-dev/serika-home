import { BackgroundShapes } from '../components/BackgroundShapes';
import { Shield, EyeOff, Server, Lock } from 'lucide-react';

export default function PrivacyPage() {
  const principles = [
    {
      title: 'Privacy And Data Safety First',
      description: 'Product architecture and operations are designed to minimize data collection and keep sensitive information protected by default.',
      icon: Lock,
      color: 'text-emerald-400'
    },
    {
      title: 'No AI Data Training Policy',
      description: 'User content from Serika services is not used to train AI models. We maintain clear boundaries between product usage data and model training.',
      icon: EyeOff,
      color: 'text-amber-400'
    },
    {
      title: 'Self-Hosting Friendly',
      description: 'Where possible, we provide clear deployment paths so organizations and communities can run their own instances completely isolated from our infrastructure.',
      icon: Server,
      color: 'text-blue-400'
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <BackgroundShapes />
      
      <div className="relative z-10 min-h-screen px-4 py-20">
        <main className="w-full max-w-4xl mx-auto">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-white/10 mb-6">
              <Shield className="h-8 w-8 text-[#8b5cf6]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Security, Privacy & Control</h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Our products treat privacy as a fundamental human right. We explicitly protect user data from AI harvesting and offer full data autonomy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {principles.map((principle) => {
              const Icon = principle.icon;
              return (
                <div key={principle.title} className="group flex flex-col relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-8 transition-all hover:bg-white/10 backdrop-blur-sm">
                  <div className="mb-4 inline-flex items-center justify-center p-3 rounded-lg bg-black/40 border border-white/5 w-fit">
                    <Icon className={`h-6 w-6 ${principle.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 leading-tight text-white">{principle.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed flex-grow">{principle.description}</p>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
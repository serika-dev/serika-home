export function Hero() {
  return (
    <div className="mb-20 text-center">
      <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-gray-300 mb-6 backdrop-blur-sm">
        <span className="flex h-2 w-2 rounded-full bg-[#8b5cf6] mr-2"></span>
        Professional Platform Portfolio
      </div>
      <h1 className="text-5xl md:text-6xl font-bold tracking-tight flex flex-wrap items-center justify-center gap-2 mb-6">
        <span className="text-white">The Serika</span>
        <span className="text-[#8b5cf6]">Company</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
        Building reliable internet products with enterprise-grade privacy controls,
        no AI data training on user content, and practical self-hosting options.
      </p>
    </div>
  );
}

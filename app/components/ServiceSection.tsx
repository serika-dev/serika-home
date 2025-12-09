import { ServiceCard } from './ServiceCard';

interface Service {
  title: string;
  url: string;
  description: string;
  alias?: string;
}

interface ServiceSectionProps {
  title: string;
  services: Service[];
}

export function ServiceSection({ title, services }: ServiceSectionProps) {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold text-white mb-8 tracking-tight">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard key={service.url || service.title} {...service} />
        ))}
      </div>
    </div>
  );
}

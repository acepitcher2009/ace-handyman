import { Link } from 'react-router-dom';
import {
  Bath,
  DoorOpen,
  Hammer,
  Home,
  ListChecks,
  PackageOpen,
  Store,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

import { Card } from './Card';

import type { Service } from '../../data/services';
import { serviceImages } from '../../data/serviceImages';

// Map each Service.iconName (from services.ts) to its lucide-react icon.
// Wrench is the sensible fallback if a new iconName lands before this map is updated.
const iconMap: Record<string, LucideIcon> = {
  Wrench,
  Hammer,
  PackageOpen,
  DoorOpen,
  Bath,
  Home,
  Store,
  ListChecks,
};

interface ServiceCardProps {
  service: Service;
  className?: string;
}

export function ServiceCard({ service, className }: ServiceCardProps) {
  const Icon = iconMap[service.iconName] ?? Wrench;
  // Decorative, illustrative category photo (see serviceImages.ts / IMAGE-CREDITS.md).
  const image = serviceImages[service.slug];

  return (
    <Card
      as="article"
      padded={false}
      className={`group flex flex-col ${className ?? ''}`.trim()}
    >
      {/* Decorative media header — empty alt; the heading + link text carry the meaning. */}
      {image && (
        <div className="relative aspect-video overflow-hidden bg-mist">
          <img
            src={image}
            alt=""
            loading="lazy"
            className="size-full object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        {/* Decorative icon — aria-hidden so the descriptive link text carries the meaning. */}
        <Icon className="mb-4 size-8 text-trust" aria-hidden="true" />
        <h3 className="font-display text-2xl text-ink">{service.title}</h3>
        <p className="mt-3 text-base text-body">{service.summary}</p>
        <Link
          to={`/services/${service.slug}`}
          className="mt-4 inline-flex min-h-11 items-center font-sans font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {service.title}
        </Link>
      </div>
    </Card>
  );
}

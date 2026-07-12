import React from 'react';
import { event } from '../config/event';

export default function RegistryLink() {
    if (!event.giftsUrl) return null;

    return (
        <section className="mt-8 glass p-8 rounded-3xl shadow-lg animate-fade-in text-center" style={{ animationDelay: '0.8s' }}>
            <h3 className="text-4xl font-display text-[var(--color-primary)] mb-6">{event.giftsHeading}</h3>
            <p className="text-lg text-[var(--color-ink)] mb-8 max-w-2xl mx-auto">{event.giftsBlurb}</p>
            <a
                href={event.giftsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[var(--color-primary)] text-white font-semibold py-4 px-10 rounded-full hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
                {event.giftsCtaLabel}
            </a>
        </section>
    );
}

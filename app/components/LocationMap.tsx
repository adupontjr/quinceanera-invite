import React from 'react';
import { event } from '../config/event';

export default function LocationMap() {
    return (
        <section className="mt-8 glass p-8 rounded-3xl shadow-lg animate-fade-in text-center" style={{ animationDelay: '0.6s' }}>
            <h3 className="text-4xl font-display text-[var(--color-primary)] mb-4">The Location</h3>
            <div className="mb-8 space-y-1">
                <p className="text-xl font-semibold text-[var(--color-ink)]">{event.venueName}</p>
                <p className="text-lg text-[var(--color-ink)] opacity-80">{event.venueAddress}</p>
            </div>

            {event.mapEmbedSrc ? (
                <div className="aspect-video rounded-2xl overflow-hidden border-4 border-white/50 shadow-inner">
                    <iframe
                        src={event.mapEmbedSrc}
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full"
                        title={`Map to ${event.venueName}`}
                    />
                </div>
            ) : (
                <div className="aspect-video rounded-2xl border-4 border-dashed border-white/60 flex items-center justify-center text-[var(--color-ink)] opacity-60">
                    Map embed pending — add mapEmbedSrc in app/config/event.ts
                </div>
            )}
        </section>
    );
}

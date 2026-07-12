'use client';

import React from 'react';
import { useLang } from './LanguageProvider';
import { event, mapEmbedSrc, mapDirectionsUrl } from '../config/event';
import Reveal from './Reveal';

export default function LocationMap() {
    const { t } = useLang();

    return (
        <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
            <Reveal>
                <p className="eyebrow text-center">{t.locationTitle}</p>
                <hr className="rule mx-auto mt-6 w-16" />

                <div className="mt-10 text-center">
                    <p className="font-display text-3xl text-[var(--ink)]">{event.venueName}</p>
                    <p className="mt-2 text-[var(--ink-soft)]">{event.venueAddress}</p>
                </div>

                <div className="mt-10 overflow-hidden rounded-xl border border-[var(--rule)]">
                    <iframe
                        src={mapEmbedSrc}
                        title={`Map to ${event.venueAddress}`}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="h-[320px] w-full"
                        style={{ border: 0 }}
                        allowFullScreen
                    />
                </div>

                <div className="mt-8 text-center">
                    <a
                        href={mapDirectionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block border-b border-[var(--accent)] pb-1 text-[11px] uppercase tracking-[0.18em] text-[var(--accent)] transition hover:text-[var(--accent-deep)]"
                    >
                        {t.directions}
                    </a>
                </div>
            </Reveal>
        </section>
    );
}

'use client';

import React, { useState } from 'react';
import Countdown from './components/Countdown';
import LocationMap from './components/LocationMap';
import RegistryLink from './components/RegistryLink';
import RsvpForm from './components/RsvpForm';
import EnvelopeIntro from './components/EnvelopeIntro';
import { event } from './config/event';

export default function Home() {
    const [showIntro, setShowIntro] = useState(true);

    return (
        <>
            {showIntro && (
                <EnvelopeIntro onOpenComplete={() => setShowIntro(false)} />
            )}

            <main className="min-h-screen py-8 px-4 md:px-8 flex justify-center items-start">
                <div className="w-full max-w-4xl space-y-8">

                    {/* Main Invitation Card */}
                    <div className="glass rounded-3xl overflow-hidden relative animate-fade-in p-8 md:p-16 text-center">

                        {/* Shimmer overlay */}
                        <div className="absolute inset-0 z-0 pointer-events-none opacity-40 animate-shimmer" />

                        {/* Decorative layer — artwork drops in here once the design is locked */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-0" />

                        {/* Content */}
                        <div className="relative z-10 space-y-6">
                            <header className="animate-slide-up flex flex-col items-center">
                                <h1 className="font-display text-6xl md:text-8xl text-[var(--color-primary)] drop-shadow-sm">
                                    {event.headline}
                                </h1>
                            </header>

                            <div className="space-y-4 animate-slide-up delay-200">
                                <p className="text-lg md:text-2xl text-[var(--color-ink)] font-light tracking-wide">
                                    {event.tagline}
                                </p>
                                <h2 className="font-display text-4xl md:text-6xl text-[var(--color-secondary)] py-2">
                                    {event.honoreeFullName}
                                </h2>
                            </div>

                            <div className="pt-8 space-y-2 animate-slide-up delay-300">
                                <div className="inline-block glass px-8 py-4 rounded-full animate-pulse-soft">
                                    <p className="text-xl md:text-3xl font-semibold text-[var(--color-primary)]">
                                        {event.dateLabel}
                                    </p>
                                    <p className="text-lg md:text-xl text-[var(--color-ink)] mt-1">
                                        {event.timeLabel}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 animate-slide-up delay-500">
                        <Countdown />
                        <LocationMap />
                        <RegistryLink />
                        <RsvpForm />
                    </div>
                </div>
            </main>
        </>
    );
}

'use client';

import React, { useState } from 'react';
import CinematicIntro from './components/CinematicIntro';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import EventDetails from './components/EventDetails';
import LocationMap from './components/LocationMap';
import Gifts from './components/Gifts';
import RsvpForm from './components/RsvpForm';
import { LanguageToggle } from './components/LanguageProvider';

export default function Home() {
    const [introDone, setIntroDone] = useState(false);

    return (
        <>
            {!introDone && <CinematicIntro onDone={() => setIntroDone(true)} />}

            <LanguageToggle />

            <main>
                <Hero />
                <Countdown />
                <EventDetails />
                <LocationMap />
                <Gifts />
                <RsvpForm />

                <footer className="border-t border-[var(--rule)] py-12 text-center">
                    <p className="eyebrow">17 · 10 · 2026</p>
                </footer>
            </main>
        </>
    );
}

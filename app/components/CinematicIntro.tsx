'use client';

import React, { useEffect, useState } from 'react';
import { useLang } from './LanguageProvider';
import { photos } from '../config/event';
import Photo from './Photo';

export default function CinematicIntro({ onDone }: { onDone: () => void }) {
    const { t } = useLang();
    const [leaving, setLeaving] = useState(false);

    const dismiss = () => {
        if (leaving) return;
        setLeaving(true);
        setTimeout(onDone, 1200);
    };

    // Auto-advance, or let an impatient guest skip ahead.
    useEffect(() => {
        const timer = setTimeout(dismiss, 4200);
        const skip = () => dismiss();
        window.addEventListener('wheel', skip, { passive: true });
        window.addEventListener('touchstart', skip, { passive: true });
        window.addEventListener('click', skip);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('wheel', skip);
            window.removeEventListener('touchstart', skip);
            window.removeEventListener('click', skip);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [leaving]);

    return (
        <div
            className={`fixed inset-0 z-50 overflow-hidden bg-[var(--ink)] transition-all duration-1000 ease-in-out ${leaving ? 'pointer-events-none scale-105 opacity-0' : 'opacity-100'}`}
        >
            <Photo
                src={photos.hero}
                alt=""
                label=""
                className="absolute inset-0 h-full w-full"
                imgClassName="animate-ken-burns opacity-70"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(28,26,24,0.85)] via-[rgba(28,26,24,0.35)] to-[rgba(28,26,24,0.55)]" />

            <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
                <p className="animate-fade-up delay-300 text-[11px] uppercase tracking-[0.28em] text-white/70">
                    {t.introKicker}
                </p>

                <h1 className="animate-fade-up delay-500 font-display mt-5 text-5xl leading-[1.05] text-white md:text-7xl">
                    {t.introName}
                    <span className="block text-[var(--accent)]">{t.introEvent}</span>
                </h1>

                <div className="animate-fade-up delay-700 mt-8 h-px w-16 bg-white/40" />

                <p className="animate-fade-in delay-1000 mt-8 text-[11px] uppercase tracking-[0.2em] text-white/50">
                    {t.introHint}
                </p>
            </div>
        </div>
    );
}

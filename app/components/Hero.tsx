'use client';

import React from 'react';
import { useLang } from './LanguageProvider';
import { event, photos } from '../config/event';
import Photo from './Photo';

export default function Hero() {
    const { t } = useLang();

    return (
        <header className="relative">
            <div className="relative h-[78vh] min-h-[520px] w-full">
                <Photo
                    src={photos.hero}
                    alt={`${event.honoreeFirstName} on her fifteenth birthday`}
                    label="Hero photo"
                    className="absolute inset-0 h-full w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(28,26,24,0.78)] via-transparent to-transparent" />

                <div className="absolute inset-x-0 bottom-0 px-6 pb-12 md:px-16 md:pb-16">
                    <p className="animate-fade-up text-[11px] uppercase tracking-[0.28em] text-white/75">
                        {t.heroKicker}
                    </p>
                    <h1 className="animate-fade-up delay-200 font-display mt-3 text-6xl leading-none text-white md:text-8xl">
                        {event.honoreeFirstName}
                    </h1>
                </div>
            </div>

            <div className="mx-auto max-w-2xl px-6 py-16 text-center md:py-24">
                <p className="animate-fade-up delay-300 text-lg leading-relaxed text-[var(--ink-soft)] md:text-xl">
                    {t.heroInvite}
                </p>

                <div className="animate-fade-up delay-500 mt-12 flex items-stretch justify-center gap-8">
                    <div className="flex-1 text-right">
                        <p className="font-display text-2xl text-[var(--ink)] md:text-3xl">{t.dateWeekday}</p>
                        <p className="eyebrow mt-2">{t.dateDay}</p>
                    </div>
                    <div className="w-px bg-[var(--rule)]" />
                    <div className="flex-1 text-left">
                        <p className="font-display text-2xl text-[var(--ink)] md:text-3xl">{t.timeMain}</p>
                        <p className="eyebrow mt-2">{t.timeSub}</p>
                    </div>
                </div>
            </div>
        </header>
    );
}

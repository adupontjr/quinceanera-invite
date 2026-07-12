'use client';

import React from 'react';
import { useLang } from './LanguageProvider';
import { event, photos, ornaments } from '../config/event';
import Photo from './Photo';
import Ornament from './Ornament';

export default function Hero() {
    const { t } = useLang();

    return (
        <header className="relative overflow-hidden px-6 pb-16 pt-20 md:pb-24 md:pt-24">
            {/* Floral corners, straight off the printed invitation */}
            <Ornament
                src={ornaments.cornerLeft}
                className="absolute -left-8 -top-8 w-48 opacity-95 md:w-72"
            />
            <Ornament
                src={ornaments.cornerRight}
                className="absolute -right-8 -top-8 w-40 opacity-95 md:w-64"
            />

            <div className="relative mx-auto max-w-3xl text-center">
                <p className="animate-fade-up eyebrow">{t.introKicker}</p>

                <h1 className="animate-fade-up delay-200 font-script mt-4 text-6xl leading-[1.05] text-[var(--ink)] md:text-8xl">
                    {t.introName}
                    <span className="mt-1 block">{t.introEvent}</span>
                </h1>

                {/* Wreath framing her photo — the centerpiece of the print piece */}
                <div className="relative mx-auto mt-12 aspect-square w-full max-w-lg md:mt-16">
                    <div className="absolute inset-[18%] overflow-hidden rounded-full">
                        <Photo
                            src={photos.hero}
                            alt={`${event.honoreeFirstName} on her fifteenth birthday`}
                            label="Hero photo"
                            className="h-full w-full"
                        />
                    </div>

                    <Ornament
                        src={ornaments.wreath}
                        className="absolute inset-0 h-full w-full object-contain"
                    />
                </div>

                <p className="animate-fade-up delay-500 mx-auto mt-14 max-w-xl text-lg leading-relaxed text-[var(--ink-soft)]">
                    {t.heroInvite}
                </p>

                <div className="animate-fade-up delay-700 mt-10 flex items-stretch justify-center gap-8">
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

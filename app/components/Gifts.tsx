'use client';

import React from 'react';
import { useLang } from './LanguageProvider';
import Reveal from './Reveal';

export default function Gifts() {
    const { t } = useLang();

    return (
        <section className="bg-[var(--paper-warm)]">
            <div className="mx-auto max-w-2xl px-6 py-20 text-center md:py-24">
                <Reveal>
                    <p className="eyebrow">{t.giftsTitle}</p>
                    <p className="font-display mt-8 text-2xl leading-relaxed text-[var(--ink)] md:text-3xl">
                        {t.giftsBody}
                    </p>
                </Reveal>
            </div>
        </section>
    );
}

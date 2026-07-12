'use client';

import React from 'react';
import { useLang } from './LanguageProvider';
import { photos } from '../config/event';
import Photo from './Photo';
import Reveal from './Reveal';

export default function EventDetails() {
    const { t } = useLang();

    const items = [
        { title: t.punctualTitle, body: t.punctualBody },
        { title: t.dinnerTitle, body: t.dinnerBody },
        { title: t.dressTitle, body: t.dressBody },
    ];

    return (
        <section className="mx-auto max-w-5xl px-6 py-16 md:py-24">
            <Reveal>
                <p className="eyebrow text-center">{t.detailsTitle}</p>
                <hr className="rule mx-auto mt-6 w-16" />
            </Reveal>

            <div className="mt-14 grid gap-12 md:grid-cols-[1fr_1fr] md:items-center md:gap-16">
                <Reveal className="order-2 md:order-1">
                    <dl className="space-y-10">
                        {items.map((item) => (
                            <div key={item.title}>
                                <dt className="font-display text-2xl text-[var(--ink)]">{item.title}</dt>
                                <dd className="mt-2 leading-relaxed text-[var(--ink-soft)]">{item.body}</dd>
                            </div>
                        ))}
                    </dl>
                </Reveal>

                <Reveal className="order-1 md:order-2" delay={120}>
                    <Photo
                        src={photos.gallery[0]}
                        alt=""
                        label="Photo"
                        className="aspect-[3/4] w-full rounded-xl"
                    />
                </Reveal>
            </div>
        </section>
    );
}

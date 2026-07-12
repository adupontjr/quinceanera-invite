'use client';

import React, { useState, useEffect } from 'react';
import { useLang } from './LanguageProvider';
import { event } from '../config/event';

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number } | null;

function calculate(): TimeLeft {
    const diff = +new Date(event.startsAtLocal) - +new Date();
    if (diff <= 0) return null;
    return {
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
    };
}

const Unit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex-1 rounded-lg bg-[var(--paper-warm)] px-2 py-5 text-center">
        <div className="font-display text-3xl text-[var(--ink)] md:text-4xl">
            {String(value).padStart(2, '0')}
        </div>
        <div className="eyebrow mt-2 text-[10px]">{label}</div>
    </div>
);

export default function Countdown() {
    const { t } = useLang();
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setTimeLeft(calculate());
        const timer = setInterval(() => setTimeLeft(calculate()), 1000);
        return () => clearInterval(timer);
    }, []);

    const units = mounted && timeLeft ? timeLeft : { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (mounted && !timeLeft) {
        return (
            <section className="mx-auto max-w-2xl px-6 py-8 text-center">
                <p className="font-display text-3xl text-[var(--accent)]">{t.countdownOver}</p>
            </section>
        );
    }

    return (
        <section className="mx-auto max-w-2xl px-6 py-8">
            <p className="eyebrow mb-6 text-center">{t.countdownTitle}</p>
            <div className="flex gap-3">
                <Unit value={units.days} label={t.countdownDays} />
                <Unit value={units.hours} label={t.countdownHours} />
                <Unit value={units.minutes} label={t.countdownMinutes} />
                <Unit value={units.seconds} label={t.countdownSeconds} />
            </div>
        </section>
    );
}

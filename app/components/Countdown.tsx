'use client';

import React, { useState, useEffect } from 'react';
import { event } from '../config/event';

const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="glass p-4 rounded-xl glass-hover transform transition-all duration-300 hover:scale-105">
        <div className="text-4xl md:text-5xl font-bold text-[var(--color-primary)] font-display">{value}</div>
        <div className="text-sm uppercase tracking-widest text-[var(--color-ink)] mt-1 font-medium">{label}</div>
    </div>
);

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number } | null;

function calculateTimeLeft(): TimeLeft {
    const difference = +new Date(event.startsAtLocal) - +new Date();
    if (difference <= 0) return null;
    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
    };
}

export default function Countdown() {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        setTimeLeft(calculateTimeLeft());
        const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
        return () => clearInterval(timer);
    }, []);

    const units = isMounted && timeLeft ? timeLeft : { days: 0, hours: 0, minutes: 0, seconds: 0 };
    const isOver = isMounted && !timeLeft;

    return (
        <section className="mt-8 text-center glass p-8 rounded-3xl shadow-lg animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-4xl font-display text-[var(--color-primary)] mb-8">Until We Celebrate</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center max-w-2xl mx-auto">
                {isOver ? (
                    <div className="col-span-2 md:col-span-4 text-3xl font-display text-[var(--color-primary)]">
                        The celebration is here!
                    </div>
                ) : (
                    <>
                        <CountdownUnit value={units.days} label="Days" />
                        <CountdownUnit value={units.hours} label="Hours" />
                        <CountdownUnit value={units.minutes} label="Minutes" />
                        <CountdownUnit value={units.seconds} label="Seconds" />
                    </>
                )}
            </div>
        </section>
    );
}

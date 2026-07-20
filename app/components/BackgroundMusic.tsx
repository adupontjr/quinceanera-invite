'use client';

import React, { useEffect, useRef, useState } from 'react';
import { music } from '../config/event';

/**
 * Browsers block audio until a real user gesture, so we can't just autoplay.
 * Instead we listen for the same first click/touch/wheel that CinematicIntro
 * already uses to let an impatient guest skip the intro — that gesture is
 * what unlocks the music too.
 */
export default function BackgroundMusic() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        if (window.localStorage.getItem('musicOff') === '1') return;

        const start = () => {
            audioRef.current?.play().then(() => setPlaying(true)).catch(() => { });
        };
        window.addEventListener('click', start, { once: true });
        window.addEventListener('touchstart', start, { once: true, passive: true });
        window.addEventListener('wheel', start, { once: true, passive: true });
        return () => {
            window.removeEventListener('click', start);
            window.removeEventListener('touchstart', start);
            window.removeEventListener('wheel', start);
        };
    }, []);

    const toggle = () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (playing) {
            audio.pause();
            setPlaying(false);
            window.localStorage.setItem('musicOff', '1');
        } else {
            audio.play().then(() => {
                setPlaying(true);
                window.localStorage.removeItem('musicOff');
            }).catch(() => { });
        }
    };

    if (!music.background) return null;

    return (
        <>
            <audio ref={audioRef} src={music.background} loop preload="none" />
            <button
                onClick={toggle}
                aria-label={playing ? 'Mute music' : 'Play music'}
                className="fixed bottom-4 right-4 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--rule)] bg-[var(--paper)]/90 text-[var(--ink-soft)] backdrop-blur transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
                {playing ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
                        <path d="M11 5 6 9H3v6h3l5 4V5Z" strokeLinejoin="round" />
                        <path d="M15.5 8.5a5 5 0 0 1 0 7" strokeLinecap="round" />
                        <path d="M18 6a9 9 0 0 1 0 12" strokeLinecap="round" />
                    </svg>
                ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
                        <path d="M11 5 6 9H3v6h3l5 4V5Z" strokeLinejoin="round" />
                        <path d="m16 9 5 6M21 9l-5 6" strokeLinecap="round" />
                    </svg>
                )}
            </button>
        </>
    );
}

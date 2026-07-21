'use client';

import React, { useEffect, useRef, useState } from 'react';
import { music } from '../config/event';

/**
 * Browsers only allow audio to autoplay if it starts muted, so it always
 * starts that way and unmutes on the guest's first click or touch — unless
 * they've explicitly muted it before. Deliberately not "wheel": a scroll
 * gesture doesn't count as real user activation in most browsers, so an
 * unmute triggered by scrolling can get silently reverted.
 */
export default function BackgroundMusic() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [muted, setMuted] = useState(true);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || window.localStorage.getItem('musicOff') === '1') return;

        // The autoPlay attribute doesn't reliably fire on a React-rendered
        // <audio> element, so start it explicitly. Muted playback is always
        // allowed without a user gesture.
        audio.play().catch(() => { });

        const unmute = () => {
            audio.muted = false;
            // Re-assert playback from directly inside this gesture handler —
            // the most reliable way to get audio unlocked across browsers.
            audio.play().catch(() => { });
            setMuted(false);
        };
        window.addEventListener('click', unmute, { once: true });
        window.addEventListener('touchstart', unmute, { once: true, passive: true });
        return () => {
            window.removeEventListener('click', unmute);
            window.removeEventListener('touchstart', unmute);
        };
    }, []);

    const toggle = () => {
        const audio = audioRef.current;
        if (!audio) return;
        const next = !muted;
        audio.muted = next;
        setMuted(next);
        if (!next) audio.play().catch(() => { });
        if (next) {
            window.localStorage.setItem('musicOff', '1');
        } else {
            window.localStorage.removeItem('musicOff');
        }
    };

    if (!music.background) return null;

    return (
        <>
            <audio ref={audioRef} src={music.background} loop muted preload="auto" />
            <button
                onClick={toggle}
                aria-label={muted ? 'Unmute music' : 'Mute music'}
                className="fixed bottom-4 right-4 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--rule)] bg-[var(--paper)]/90 text-[var(--ink-soft)] backdrop-blur transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
                {!muted ? (
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

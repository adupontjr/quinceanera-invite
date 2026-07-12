'use client';

import React, { useState } from 'react';
import { event } from '../config/event';

interface EnvelopeIntroProps {
    onOpenComplete: () => void;
}

export default function EnvelopeIntro({ onOpenComplete }: EnvelopeIntroProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isFading, setIsFading] = useState(false);

    const handleOpen = () => {
        if (isOpen) return;
        setIsOpen(true);

        setTimeout(() => setIsFading(true), 1800);
        setTimeout(() => onOpenComplete(), 3300);
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-bg)] transition-all duration-1000 ease-in-out ${isFading ? 'opacity-0 pointer-events-none scale-110' : 'opacity-100 scale-100'}`}
        >
            <div className="perspective-1000 w-full max-w-md p-4">
                <div
                    className={`relative w-full aspect-[1.4] cursor-pointer group transition-transform duration-700 ease-out ${isOpen ? 'translate-y-32' : 'hover:-translate-y-2'}`}
                    onClick={handleOpen}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleOpen()}
                    aria-label="Open the invitation"
                >
                    {/* Envelope back */}
                    <div className="absolute inset-0 bg-[var(--color-primary)] rounded-lg shadow-2xl z-0" />

                    {/* Card preview */}
                    <div
                        className={`absolute inset-x-4 top-4 bottom-4 bg-white rounded shadow-md transition-all duration-1000 ease-in-out z-10 flex flex-col items-center justify-center p-6 text-center border border-stone-100 ${isOpen ? '-translate-y-[130%] scale-110' : 'translate-y-0'}`}
                    >
                        <div className="w-full h-full border border-[var(--color-secondary)]/30 p-4 flex flex-col items-center justify-center">
                            <p className="font-display text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-2">
                                {event.headline}
                            </p>
                            <p className="font-sans text-xs uppercase tracking-widest text-[var(--color-ink)]">
                                You are invited
                            </p>
                        </div>
                    </div>

                    {/* Side + bottom flaps */}
                    <div className="absolute inset-0 z-20 pointer-events-none">
                        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[var(--color-primary-dark)] rounded-b-lg"
                            style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }} />
                        <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-[var(--color-primary-light)] rounded-l-lg"
                            style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }} />
                        <div className="absolute top-0 bottom-0 right-0 w-1/2 bg-[var(--color-primary-light)] rounded-r-lg"
                            style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }} />
                    </div>

                    {/* Top flap */}
                    <div
                        className={`absolute top-0 left-0 right-0 h-1/2 bg-[var(--color-primary)] origin-top transition-transform duration-700 ease-in-out rounded-t-lg ${isOpen ? 'rotate-x-180 z-0' : 'rotate-x-0 z-30 delay-300'}`}
                        style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}
                    />

                    {/* Wax seal */}
                    <div
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 transition-all duration-500 ${isOpen ? 'opacity-0 scale-150' : 'opacity-100 scale-100'}`}
                    >
                        <div className="w-16 h-16 bg-[var(--color-accent)] rounded-full shadow-lg flex items-center justify-center border-4 border-white/40">
                            <span className="font-display text-2xl text-white">15</span>
                        </div>
                        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
                            <p className="text-[var(--color-ink)] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                Tap to open
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .perspective-1000 { perspective: 1000px; }
                .rotate-x-180 { transform: rotateX(180deg); }
                .rotate-x-0 { transform: rotateX(0deg); }
            `}</style>
        </div>
    );
}

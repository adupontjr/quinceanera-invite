'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { copy, Lang, Copy } from '../config/copy';

const LanguageContext = createContext<{
    lang: Lang;
    t: Copy;
    toggle: () => void;
}>({ lang: 'en', t: copy.en, toggle: () => { } });

export const useLang = () => useContext(LanguageContext);

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLang] = useState<Lang>('en');

    // Remember the guest's choice; fall back to their browser language.
    useEffect(() => {
        const saved = window.localStorage.getItem('lang') as Lang | null;
        if (saved === 'en' || saved === 'es') {
            setLang(saved);
        } else if (navigator.language?.toLowerCase().startsWith('es')) {
            setLang('es');
        }
    }, []);

    useEffect(() => {
        document.documentElement.lang = lang;
    }, [lang]);

    const toggle = () => {
        setLang((prev) => {
            const next: Lang = prev === 'en' ? 'es' : 'en';
            window.localStorage.setItem('lang', next);
            return next;
        });
    };

    return (
        <LanguageContext.Provider value={{ lang, t: copy[lang], toggle }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function LanguageToggle() {
    const { t, toggle } = useLang();
    return (
        <button
            onClick={toggle}
            className="fixed top-4 right-4 z-40 rounded-full border border-[var(--rule)] bg-[var(--paper)]/90 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-[var(--ink-soft)] backdrop-blur transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
            {t.switchTo}
        </button>
    );
}

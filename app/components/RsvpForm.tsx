'use client';

import React, { useState, FormEvent } from 'react';
import { db, isFirebaseConfigured } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { event, calendar } from '../config/event';
import { useLang } from './LanguageProvider';
import Reveal from './Reveal';

export default function RsvpForm() {
    const { t } = useLang();
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (!isFirebaseConfigured) {
            setError(t.rsvpErrorOffline);
            return;
        }

        setLoading(true);
        const data = new FormData(e.currentTarget);

        try {
            const timeout = new Promise((_, reject) =>
                setTimeout(() => reject(new Error(t.rsvpErrorTimeout)), 10000)
            );

            await Promise.race([
                addDoc(collection(db, event.rsvpCollection), {
                    name: data.get('name'),
                    email: data.get('email'),
                    phone: data.get('phone') || '',
                    guests: parseInt(data.get('guests') as string, 10),
                    attending: data.get('attending') === 'yes',
                    message: data.get('message') || '',
                    timestamp: serverTimestamp(),
                }),
                timeout,
            ]);

            setSubmitted(true);
        } catch (err) {
            console.error('RSVP failed:', err);
            setError(err instanceof Error ? err.message : t.rsvpErrorGeneric);
        } finally {
            setLoading(false);
        }
    };

    const cal = {
        title: encodeURIComponent(t.calendarTitle),
        details: encodeURIComponent(t.calendarDescription),
        location: encodeURIComponent(event.venueAddress),
    };

    const downloadIcs = () => {
        const ics = [
            'BEGIN:VCALENDAR', 'VERSION:2.0', 'BEGIN:VEVENT',
            'URL:' + window.location.href,
            'DTSTART:' + calendar.start,
            'DTEND:' + calendar.end,
            'SUMMARY:' + t.calendarTitle,
            'DESCRIPTION:' + t.calendarDescription,
            'LOCATION:' + event.venueAddress,
            'END:VEVENT', 'END:VCALENDAR',
        ].join('\r\n');

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
        link.setAttribute('download', 'annika-quinceanera.ics');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const field =
        'w-full border-b border-[var(--rule)] bg-transparent py-3 text-[var(--ink)] outline-none transition focus:border-[var(--accent)]';
    const label = 'eyebrow block';
    const calBtn =
        'border-b border-[var(--rule)] pb-1 text-[11px] uppercase tracking-[0.18em] text-[var(--ink-soft)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]';

    const phoneLine = (
        <p className="mt-10 text-center text-sm text-[var(--ink-faint)]">
            {t.rsvpPhonePrefix}{' '}
            <a
                href={`tel:${event.rsvpContactPhoneHref}`}
                className="whitespace-nowrap text-[var(--accent)] underline underline-offset-4"
            >
                {event.rsvpContactName} {t.rsvpPhoneSuffix} {event.rsvpContactPhone}
            </a>
        </p>
    );

    return (
        <section id="rsvp" className="mx-auto max-w-xl px-6 py-20 md:py-28">
            <Reveal>
                {!submitted ? (
                    <>
                        <div className="text-center">
                            <p className="eyebrow">{t.rsvpTitle}</p>
                            <p className="mt-4 text-[var(--ink-soft)]">{t.rsvpSubtitle}</p>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-12 space-y-8">
                            <div>
                                <label htmlFor="name" className={label}>{t.rsvpName}</label>
                                <input type="text" id="name" name="name" required
                                    placeholder={t.rsvpNamePlaceholder} className={field} suppressHydrationWarning />
                            </div>

                            <div>
                                <label htmlFor="email" className={label}>{t.rsvpEmail}</label>
                                <input type="email" id="email" name="email" required
                                    placeholder={t.rsvpEmailPlaceholder} className={field} suppressHydrationWarning />
                            </div>

                            <div>
                                <label htmlFor="phone" className={label}>{t.rsvpPhone}</label>
                                <input type="tel" id="phone" name="phone" required
                                    inputMode="tel" autoComplete="tel"
                                    placeholder={t.rsvpPhonePlaceholder} className={field} suppressHydrationWarning />
                            </div>

                            <div>
                                <label htmlFor="attending" className={label}>{t.rsvpAttending}</label>
                                <select id="attending" name="attending" defaultValue="yes" className={field} suppressHydrationWarning>
                                    <option value="yes">{t.rsvpYes}</option>
                                    <option value="no">{t.rsvpNo}</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="guests" className={label}>{t.rsvpGuests}</label>
                                <input type="number" id="guests" name="guests" min="1" max="20" defaultValue="1" required
                                    className={field} suppressHydrationWarning />
                            </div>

                            <div>
                                <label htmlFor="message" className={label}>{t.rsvpMessage}</label>
                                <textarea id="message" name="message" rows={3}
                                    placeholder={t.rsvpMessagePlaceholder} className={`${field} resize-none`} suppressHydrationWarning />
                            </div>

                            {error && (
                                <p className="border-l-2 border-[var(--accent)] bg-[var(--paper-warm)] px-4 py-3 text-sm text-[var(--ink-soft)]">
                                    {error}
                                </p>
                            )}

                            <button type="submit" disabled={loading}
                                className="w-full bg-[var(--accent)] py-4 text-[11px] uppercase tracking-[0.2em] text-white transition hover:bg-[var(--accent-deep)] disabled:opacity-60">
                                {loading ? t.rsvpSubmitting : t.rsvpSubmit}
                            </button>
                        </form>

                        {phoneLine}
                    </>
                ) : (
                    <div className="text-center">
                        <p className="eyebrow">{t.thanksTitle}</p>
                        <p className="font-display mt-6 text-3xl text-[var(--ink)]">{t.thanksBody}</p>

                        <hr className="rule mx-auto my-10 w-16" />

                        <p className="mb-6 text-sm text-[var(--ink-soft)]">{t.calendarPrompt}</p>
                        <div className="flex items-center justify-center gap-8">
                            <a className={calBtn} target="_blank" rel="noopener noreferrer"
                                href={`https://www.google.com/calendar/render?action=TEMPLATE&text=${cal.title}&dates=${calendar.start}/${calendar.end}&details=${cal.details}&location=${cal.location}`}>
                                {t.calendarGoogle}
                            </a>
                            <a className={calBtn} target="_blank" rel="noopener noreferrer"
                                href={`https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${cal.title}&startdt=${event.startsAtLocal}&enddt=${event.endsAtLocal}&body=${cal.details}&location=${cal.location}`}>
                                {t.calendarOutlook}
                            </a>
                            <button onClick={downloadIcs} className={calBtn}>{t.calendarApple}</button>
                        </div>
                    </div>
                )}
            </Reveal>
        </section>
    );
}

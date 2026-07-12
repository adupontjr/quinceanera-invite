'use client';

import React, { useState, FormEvent } from 'react';
import { db, isFirebaseConfigured } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { event, calendar } from '../config/event';

export default function RsvpForm() {
    const [isRsvpSubmitted, setIsRsvpSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleRsvpSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (!isFirebaseConfigured) {
            setError('RSVPs are not connected yet. Please try again later.');
            return;
        }

        setIsLoading(true);
        const formData = new FormData(e.currentTarget);

        try {
            const timeout = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Request timed out. Please check your connection.')), 10000)
            );

            await Promise.race([
                addDoc(collection(db, event.rsvpCollection), {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    guests: parseInt(formData.get('guests') as string, 10),
                    attending: formData.get('attending') === 'yes',
                    message: formData.get('message') || '',
                    timestamp: serverTimestamp(),
                }),
                timeout,
            ]);

            setIsRsvpSubmitted(true);
        } catch (err) {
            console.error('Error submitting RSVP:', err);
            setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const calendarParams = {
        title: encodeURIComponent(event.calendarTitle),
        details: encodeURIComponent(event.calendarDescription),
        location: encodeURIComponent(event.venueAddress),
    };

    const handleICalDownload = () => {
        const ics = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'BEGIN:VEVENT',
            'URL:' + window.location.href,
            'DTSTART:' + calendar.start,
            'DTEND:' + calendar.end,
            'SUMMARY:' + event.calendarTitle,
            'DESCRIPTION:' + event.calendarDescription,
            'LOCATION:' + event.venueAddress,
            'END:VEVENT',
            'END:VCALENDAR',
        ].join('\r\n');

        const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', 'quinceanera.ics');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const inputClass =
        'w-full px-4 py-3 rounded-xl bg-white/60 border border-white/60 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 outline-none transition-all';
    const labelClass = 'block text-sm font-semibold text-[var(--color-ink)] mb-2';
    const calBtnClass =
        'flex items-center justify-center w-full sm:w-auto bg-white/80 border border-white/60 text-[var(--color-ink)] font-semibold py-3 px-6 rounded-xl hover:bg-white transition duration-300 shadow-sm hover:shadow-md';

    return (
        <section className="mt-8 glass p-8 md:p-10 rounded-3xl shadow-lg animate-fade-in" style={{ animationDelay: '1.0s' }}>
            {!isRsvpSubmitted ? (
                <>
                    <div className="text-center mb-8">
                        <h3 className="text-4xl font-display text-[var(--color-primary)] mb-3">Kindly RSVP</h3>
                        <p className="text-lg text-[var(--color-ink)]">Let us know if you can make it.</p>
                    </div>

                    <form onSubmit={handleRsvpSubmit} className="max-w-md mx-auto space-y-6">
                        <div>
                            <label htmlFor="name" className={labelClass}>Full Name</label>
                            <input type="text" name="name" id="name" required className={inputClass}
                                placeholder="Enter your full name" suppressHydrationWarning />
                        </div>

                        <div>
                            <label htmlFor="email" className={labelClass}>Email</label>
                            <input type="email" name="email" id="email" required className={inputClass}
                                placeholder="Enter your email" suppressHydrationWarning />
                        </div>

                        <div>
                            <label htmlFor="attending" className={labelClass}>Will you be attending?</label>
                            <select name="attending" id="attending" defaultValue="yes" className={inputClass} suppressHydrationWarning>
                                <option value="yes">Joyfully accepts</option>
                                <option value="no">Regretfully declines</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="guests" className={labelClass}>Number of Guests</label>
                            <input type="number" name="guests" id="guests" min="1" defaultValue="1" required
                                className={inputClass} suppressHydrationWarning />
                        </div>

                        <div>
                            <label htmlFor="message" className={labelClass}>A note for {event.honoreeFirstName} (optional)</label>
                            <textarea name="message" id="message" rows={3} className={inputClass}
                                placeholder="Leave a message" suppressHydrationWarning />
                        </div>

                        {error && (
                            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>
                        )}

                        <button type="submit" disabled={isLoading}
                            className="w-full bg-[var(--color-primary)] text-white font-bold py-4 px-6 rounded-full hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0">
                            {isLoading ? 'Submitting…' : 'Submit RSVP'}
                        </button>
                    </form>
                </>
            ) : (
                <div className="mt-6 text-center">
                    <div className="mb-6">
                        <div className="w-16 h-16 bg-[var(--color-secondary)]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-[var(--color-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h4 className="text-3xl font-display text-[var(--color-secondary)] mb-2">¡Gracias!</h4>
                        <p className="text-lg text-[var(--color-ink)]">Thank you for your RSVP.</p>
                    </div>

                    <p className="text-[var(--color-ink)] mb-6 opacity-80">Add the celebration to your calendar:</p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href={`https://www.google.com/calendar/render?action=TEMPLATE&text=${calendarParams.title}&dates=${calendar.start}/${calendar.end}&details=${calendarParams.details}&location=${calendarParams.location}`}
                            target="_blank" rel="noopener noreferrer" className={calBtnClass}
                        >
                            Google Calendar
                        </a>
                        <a
                            href={`https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${calendarParams.title}&startdt=${event.startsAtLocal}&enddt=${event.endsAtLocal}&body=${calendarParams.details}&location=${calendarParams.location}`}
                            target="_blank" rel="noopener noreferrer" className={calBtnClass}
                        >
                            Outlook
                        </a>
                        <button onClick={handleICalDownload} className={calBtnClass}>
                            Apple / iCal
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}

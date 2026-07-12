'use client';

import React, { useState } from 'react';

/**
 * Decorative floral art from the printed invitation.
 * Purely ornamental: hidden from screen readers, and if the file isn't
 * there it renders nothing at all rather than a broken image icon.
 */
export default function Ornament({
    src,
    className = '',
}: {
    src: string;
    className?: string;
}) {
    const [failed, setFailed] = useState(false);
    if (!src || failed) return null;

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={src}
            alt=""
            aria-hidden="true"
            onError={() => setFailed(true)}
            className={`pointer-events-none select-none ${className}`}
        />
    );
}

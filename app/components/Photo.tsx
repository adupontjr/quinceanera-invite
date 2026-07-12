'use client';

import React, { useState } from 'react';

/**
 * Renders a photo, or a quiet placeholder panel if the file isn't there yet.
 * Lets the whole site work before the images land.
 */
export default function Photo({
    src,
    alt,
    className = '',
    imgClassName = '',
    label = 'Photo',
}: {
    src: string;
    alt: string;
    className?: string;
    imgClassName?: string;
    label?: string;
}) {
    const [failed, setFailed] = useState(false);

    if (!src || failed) {
        return (
            <div
                className={`flex items-center justify-center bg-[var(--paper-warm)] ${className}`}
                aria-hidden="true"
            >
                <span className="eyebrow">{label}</span>
            </div>
        );
    }

    return (
        <div className={`overflow-hidden bg-[var(--paper-warm)] ${className}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={src}
                alt={alt}
                onError={() => setFailed(true)}
                className={`h-full w-full object-cover ${imgClassName}`}
            />
        </div>
    );
}

/** Single source of truth for the event. Change it here, the whole site follows. */

export const event = {
    honoreeFirstName: "Annika",

    // Local ISO — drives the countdown and the calendar links.
    startsAtLocal: "2026-10-17T18:00:00",
    endsAtLocal: "2026-10-17T23:00:00",

    venueName: "Andrea Court",
    venueAddress: "18166 Andrea Court, Perris, CA 92570",

    // RSVP fallback for guests who would rather call or text.
    rsvpContactName: "Ann Marie",
    rsvpContactPhone: "+1 951-515-8039",
    rsvpContactPhoneHref: "+19515158039",

    rsvpCollection: "rsvps",
} as const;

/** Photos — drop files into public/images and list them here. Empty = placeholder shown. */
export const photos = {
    hero: "/images/annika-hero.jpg",
    gallery: [
        "/images/annika-1.jpg",
        "/images/annika-2.jpg",
    ],
} as const;

/**
 * Floral art lifted from the printed invitation.
 * Each is optional — a missing file simply renders nothing, never a broken image.
 */
export const ornaments = {
    wreath: "/images/wreath.png",
    cornerLeft: "/images/floral-corner-left.png",
    cornerRight: "/images/floral-corner-right.png",
} as const;

function toUtc(localIso: string): string {
    return new Date(localIso).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

export const calendar = {
    start: toUtc(event.startsAtLocal),
    end: toUtc(event.endsAtLocal),
};

export const mapEmbedSrc =
    "https://www.google.com/maps?q=" +
    encodeURIComponent(event.venueAddress) +
    "&output=embed";

export const mapDirectionsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent(event.venueAddress);

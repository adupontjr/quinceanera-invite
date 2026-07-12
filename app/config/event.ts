/**
 * Single source of truth for all event details.
 * Update these values and the whole invitation follows.
 */

export const event = {
    // --- Guest of honor ---
    honoreeFirstName: "TBD",
    honoreeFullName: "TBD",

    // --- Headline copy ---
    headline: "Mis Quince",
    tagline: "Please join us in celebrating the fifteenth birthday of",

    // --- Date & time ---
    // Local ISO datetime, used for the countdown.
    startsAtLocal: "2026-10-10T17:00:00",
    endsAtLocal: "2026-10-10T23:00:00",
    // Pretty strings shown on the card.
    dateLabel: "Saturday, October 10th, 2026",
    timeLabel: "at 5:00 PM",

    // --- Location ---
    venueName: "TBD Venue",
    venueAddress: "TBD Address",
    // Paste the "Embed a map" src from Google Maps here.
    mapEmbedSrc: "",

    // --- Gifts ---
    giftsHeading: "Gifts",
    giftsBlurb:
        "Your presence is the greatest gift. If you would like to contribute, the link below has the details.",
    giftsUrl: "",
    giftsCtaLabel: "View Gift Registry",

    // --- Calendar entry ---
    calendarTitle: "Quinceañera",
    calendarDescription: "A celebration of a fifteenth birthday.",

    // --- Firestore ---
    rsvpCollection: "rsvps",
} as const;

/** Converts the local ISO strings above into the UTC basic format calendars expect. */
export function toCalendarUtc(localIso: string): string {
    return new Date(localIso).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

export const calendar = {
    start: toCalendarUtc(event.startsAtLocal),
    end: toCalendarUtc(event.endsAtLocal),
};

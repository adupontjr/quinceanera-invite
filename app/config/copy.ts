/** Bilingual copy. Every guest-facing string lives here. */

export type Lang = "en" | "es";

const en = {
    switchTo: "Español",

    introKicker: "Please join us for",
    introName: "Annika's",
    introEvent: "Quinceañera",
    introHint: "Scroll to open",

    heroKicker: "Mis quince años",

    dateWeekday: "Saturday",
    dateDay: "October 17, 2026",
    timeMain: "Six o'clock",
    timeSub: "In the evening",

    countdownTitle: "Until we celebrate",
    countdownDays: "Days",
    countdownHours: "Hours",
    countdownMinutes: "Minutes",
    countdownSeconds: "Seconds",
    countdownOver: "The celebration is here",

    detailsTitle: "The evening",
    punctualTitle: "Please be on time",
    punctualBody: "The celebration begins promptly at 6:00 pm.",
    dinnerTitle: "Dinner at 6:30 pm",
    dinnerBody: "Dinner will be served shortly after we begin.",
    dressTitle: "Ranchero or cowboy style",
    dressBody: "Jeans and boots are welcome.",
    hotelTitle: "Where to stay",
    hotelBody: "A Hilton room block is available for guests traveling in.",
    hotelLink: "Reserve your room",

    locationTitle: "The location",
    directions: "Get directions",

    giftsTitle: "Gifts",
    giftsBody: "Your presence is present enough, but gift cards and cash are appreciated.",

    rsvpTitle: "Kindly reply",
    rsvpSubtitle: "Let us know if you can make it.",
    rsvpName: "Full name",
    rsvpNamePlaceholder: "Your full name",
    rsvpEmail: "Email",
    rsvpEmailPlaceholder: "you@example.com",
    rsvpPhone: "Phone number",
    rsvpPhonePlaceholder: "(951) 555-0123",
    rsvpAttending: "Will you be attending?",
    rsvpYes: "Joyfully accepts",
    rsvpNo: "Regretfully declines",
    rsvpGuests: "Number of guests",
    rsvpMessage: "A note for Annika (optional)",
    rsvpMessagePlaceholder: "Leave a message",
    rsvpSubmit: "Send reply",
    rsvpSubmitting: "Sending…",
    rsvpPhonePrefix: "Prefer to call or text?",
    rsvpPhoneSuffix: "at",
    rsvpErrorGeneric: "Something went wrong. Please try again.",
    rsvpErrorTimeout: "The request timed out. Please check your connection.",
    rsvpErrorOffline: "The form is not connected yet. Please call or text instead.",

    thanksTitle: "Thank you",
    thanksBody: "Your reply has been received.",
    calendarPrompt: "Add the celebration to your calendar",
    calendarGoogle: "Google",
    calendarOutlook: "Outlook",
    calendarApple: "Apple",

    calendarTitle: "Annika's Quinceañera",
    calendarDescription: "A celebration of Annika's fifteenth birthday.",
};

export type Copy = typeof en;

const es: Copy = {
    switchTo: "English",

    introKicker: "Acompáñanos a celebrar",
    introName: "Los quince años de",
    introEvent: "Annika",
    introHint: "Desliza para abrir",

    heroKicker: "Mis quince años",

    dateWeekday: "Sábado",
    dateDay: "17 de octubre, 2026",
    timeMain: "Seis de la tarde",
    timeSub: "6:00 pm",

    countdownTitle: "Faltan",
    countdownDays: "Días",
    countdownHours: "Horas",
    countdownMinutes: "Minutos",
    countdownSeconds: "Segundos",
    countdownOver: "¡Llegó el gran día!",

    detailsTitle: "La celebración",
    punctualTitle: "Por favor, sea puntual",
    punctualBody: "La celebración comienza puntualmente a las 6:00 pm.",
    dinnerTitle: "La cena a las 6:30 pm",
    dinnerBody: "La cena se servirá poco después de comenzar.",
    dressTitle: "Estilo ranchero o vaquero",
    dressBody: "Se permiten vaqueros y botas.",
    hotelTitle: "Dónde hospedarse",
    hotelBody: "Hay habitaciones reservadas en el Hilton para invitados de fuera.",
    hotelLink: "Reservar su habitación",

    locationTitle: "El lugar",
    directions: "Cómo llegar",

    giftsTitle: "Regalos",
    giftsBody: "Tu presencia es suficiente, pero se agradecen las tarjetas de regalo o dinero.",

    rsvpTitle: "Confirme su asistencia",
    rsvpSubtitle: "Díganos si nos puede acompañar.",
    rsvpName: "Nombre completo",
    rsvpNamePlaceholder: "Su nombre completo",
    rsvpEmail: "Correo electrónico",
    rsvpEmailPlaceholder: "usted@ejemplo.com",
    rsvpPhone: "Número de teléfono",
    rsvpPhonePlaceholder: "(951) 555-0123",
    rsvpAttending: "¿Nos acompañará?",
    rsvpYes: "Sí, con gusto",
    rsvpNo: "No podré asistir",
    rsvpGuests: "Número de invitados",
    rsvpMessage: "Un mensaje para Annika (opcional)",
    rsvpMessagePlaceholder: "Escriba un mensaje",
    rsvpSubmit: "Enviar respuesta",
    rsvpSubmitting: "Enviando…",
    rsvpPhonePrefix: "¿Prefiere llamar o enviar un mensaje?",
    rsvpPhoneSuffix: "al",
    rsvpErrorGeneric: "Algo salió mal. Inténtelo de nuevo.",
    rsvpErrorTimeout: "La solicitud tardó demasiado. Revise su conexión.",
    rsvpErrorOffline: "El formulario aún no está conectado. Por favor llame o envíe un mensaje.",

    thanksTitle: "Gracias",
    thanksBody: "Hemos recibido su respuesta.",
    calendarPrompt: "Agregue la celebración a su calendario",
    calendarGoogle: "Google",
    calendarOutlook: "Outlook",
    calendarApple: "Apple",

    calendarTitle: "Los quince de Annika",
    calendarDescription: "Una celebración de los quince años de Annika.",
};

export const copy: Record<Lang, Copy> = { en, es };

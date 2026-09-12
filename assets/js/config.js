/* Deployment knobs. Everything else in the page reads from here.

   SUBMIT_ENDPOINT — the inbox the form posts to (netlify/functions/submit.mjs,
   hosted on Netlify as ddx-side-events). Empty means "preview build": the page
   says so at the top and a submit is played back locally without saving. */
export const SUBMIT_ENDPOINT = 'https://ddx-side-events.netlify.app/api/submit';

export const SITE_URL = 'https://side-sandiego.ddxconference.com/';
export const TICKET_URL = 'https://luma.com/ddxsd';
export const POSTER_URL = 'https://share.ddxconference.com/';

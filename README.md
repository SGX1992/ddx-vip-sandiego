# DDX San Diego — side-event sign-up

One codebase, two hosts, chosen from the hostname at runtime (`assets/js/variant.js`):

- **side-sandiego.ddxconference.com** — the public page: two evenings, one form.
- **vip-sandiego.ddxconference.com** — the VIP page: the same two, plus a dinner
  and Don Norman's roundtable in front of them. Its events live in
  `assets/js/events-vip.js`, which the public deploy does not ship.
  `?vip=1` on localhost previews it.

| VIP only | When | Where | Writes to |
| --- | --- | --- | --- |
| Executive Roundtable, hosted by Don Norman & DNDA | Thu 17 Sep 2026, 9:15–9:45 AM | UC San Diego Park & Market, 1st floor | Notion → DDX → Side Event Sign-ups → *CRM San Diego Executive Roundtable* |
| VIP Dinner, powered by Edenspiekermann | Wed 16 Sep 2026, 7:30 PM | Nolita Hall, 2305 India St | Notion → DDX → Side Event Sign-ups → *CRM San Diego VIP Dinner* |

The public pair:

| Evening | When | Where | Writes to |
| --- | --- | --- | --- |
| Create Now, with Adobe | Wed 16 Sep 2026, 6–9 PM | The Lane, 900 Bayfront Ct | Notion → DDX → Side Event Sign-ups → *CRM San Diego - Pre-event* |
| Happy Hour, with Marvin & dscout | Thu 17 Sep 2026, 6–8:30 PM | UC San Diego Park & Market | Notion → DDX → Side Event Sign-ups → *CRM San Diego Happy Hour* |

Static site, no build step. Dev server:

```bash
node serve.mjs      # http://localhost:8794
```

## Files

```
index.html                the page shell; the cards are rendered from the event list
assets/css/style.css      DDX tokens + motion, carried over from the poster tool
assets/js/events.js       the two public evenings — dates, venues, copy, Notion targets
assets/js/events-vip.js   the VIP dinner and roundtable (VIP host only)
assets/js/variant.js      public vs VIP, and the hero/section copy for each
assets/js/logos.js        partner marks as markup
assets/js/render.js       one event object → one card
assets/js/config.js       SUBMIT_ENDPOINT and the outbound links
assets/js/main.js         selection, validation, submit, the done state, .ics files
netlify/functions/        submit.mjs — the only thing that talks to Notion (holds the token)
tools/build-artifact.mjs  folds everything into one HTML file for review as an Artifact
```

## Preview build vs live

`SUBMIT_ENDPOINT` in `config.js` empty → the page shows a yellow bar at the top
("sign-ups are not being saved yet") and a submit plays back locally. Set it to
the function URL and the bar goes away.

## The Notion side

The existing Notion forms and databases are **not touched**. The function writes
new rows into the same two databases the Notion forms already write to, using
the same property names, so the team's views keep working:

- Title `Full Name`; `Role`, `Company`, `Country` (text); `Phone`; `Anything else?`;
  `Ticket Confirmation` (checkbox).
- The email property is `Business Email` in the Happy Hour database and `Email`
  in the Pre-event one — `events.js` carries that per event.
- `VIP Invite Side Events` is left alone; its options are stale (June, Brooklyn).

Both databases must be shared with the integration, or every write is a 404.

## Sources

Adobe copy and agenda from the Create Now page on adobe.com/events; happy-hour
copy from the Notion form description. Logos: Adobe mark (simple-icons path),
Marvin white wordmark from heymarvin.com, dscout mark from dscout.com with the
wordmark set in the page's own type — dscout's site ships only the mark.
The hero background is the Sunset Cliffs shot from the poster tool, downsized.

## Testing the Notion write

```bash
node tools/dry-run-submit.mjs         # prints the exact Notion requests, no token needed
NOTION_TOKEN=ntn_xxx node serve.mjs   # dev server runs the function itself; the page posts for real
```

The token is an internal integration token from notion.so/profile/integrations;
share both databases with it first. A resend — same email **and** same name —
is recognised and not written twice. The same email with a different name is a
different guest (an assistant booking colleagues, a shared inbox) and gets its
own row.

## Going live

Both subdomains CNAME to `sgx1992.github.io`. `./deploy-pages.sh [public|vip|all]`
publishes to the matching repo (`ddx-side-sandiego`, `ddx-vip-sandiego`) with
HTTPS enforced. Pages cannot run the function — so either move the folder to
Netlify, or keep Pages and set `SUBMIT_ENDPOINT` to the function's absolute URL.

All four events have their own CRM under Side Event Sign-ups; the two VIP ones
were created on 2026-09-10 with the same columns as the public pair.

Logos: Edenspiekermann's wordmark is the SVG from edenspiekermann.com painted
white. The dscout and DNDA logos were supplied by Sebastian as dark-on-white
PNGs and recoloured to white-on-transparent (the DNDA gold kept) with
`tools/whiteout.swift`. Event photos were supplied too: the Park & Market
reception, the Create Now key visual, Nolita Hall, and the Don Norman portrait.

## How sign-ups reach Notion (the bridge)

There is no Notion token anywhere. The page posts to an **inbox** on Netlify
(`netlify/functions/submit.mjs`, site `ddx-side-events`, Netlify Blobs store
`signups`). A **scheduled task in the Claude desktop app** on Sebastian's Mac
runs every 15 minutes, pulls the inbox with `tools/inbox.mjs`, writes one row
per chosen evening into the matching CRM database through the app's Notion
connector (which acts as Sebastian), and acknowledges the sign-up so it leaves
the inbox. Duplicate rule: same email **and** same name = skip.

- `tools/inbox.mjs pull|ack` — the only client of `/api/inbox`; the shared key
  is in `~/.config/ddx-side-events/inbox-key` (not in the repo, not deployed).
- `bridge/log.jsonl` — one line per row created or skipped.
- Redeploy the inbox: ask the Netlify connector for `deploy-site` on site
  `11598eb5-d18a-4892-bf39-077c1d81e0c9` and run the command it prints inside
  this folder. Env var `INBOX_KEY` is set on the site; changing it needs a redeploy.

The bridge only runs while the Claude app is open on that Mac; a closed app
means sign-ups wait safely in the inbox and are carried over on the next run.

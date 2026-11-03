# Nivesh Track website — developer handoff

File: `nivesh-track-services.html`
Single self-contained file — all CSS and JS inline, Google Fonts loaded from the one `<link>`/`@import`. No build step, no dependencies, no framework. Any static host (Netlify, Vercel, S3+CloudFront, cPanel, GitHub Pages) will serve it as-is.

## What's fully functional
- Responsive layout (desktop nav collapses to a mobile menu under ~1040px), light/dark theme via `prefers-color-scheme`
- A Hindi/English language toggle (EN | हिं in the header) — swaps all visible text client-side via a `data-i18n` attribute system with no page reload; see "Hindi translation" below for a caveat on the translation itself
- All four calculators (Goal SIP, Retirement, Step-up SIP, SWP) — real formulas, computed client-side, no backend needed
- Risk-profile questionnaire — scores client-side, result text re-renders correctly if the visitor switches language after seeing their result
- All anchor navigation (nav links, dropdowns, footer links, CTA buttons)
- App Store / Play Store links (verify these are still current before launch):
  - https://apps.apple.com/in/app/nivesh-track/id6744318014
  - https://play.google.com/store/apps/details?id=com.niveshtrack.niveshtrack&hl=en_IN

This has been visually tested — loaded in an actual browser (not just written and assumed correct), with the language toggle, a calculator, and the risk-profile quiz exercised end to end and a screenshot pass on both languages. That's a basic smoke test, not a full QA pass — a developer should still check it across real devices and browsers before launch.

## What's placeholder / needs developer work
Three forms on the page (service-interest lead form in "Other services", the "Request a callback" form in the Relationship Manager section, and the awareness-session request) currently just build a `mailto:niveshtrack@gmail.com` link client-side on submit. That's a demo stand-in, not a production flow — it depends on the visitor having a configured mail client, and nothing is logged if it fails. Each is marked in the HTML with an inline comment-style dev note (search the file for "Draft-stage note" / "Draft note").

Before launch, wire these three forms to an actual endpoint — e.g. Formspree/Netlify Forms for something quick, or a webhook into whatever CRM the relationship managers use. Once that's in, the dev-note callouts can be deleted from the markup.

Also missing, standard production checklist items a developer can just do:
- Favicon
- Meta description / Open Graph tags for link previews
- robots.txt / sitemap.xml if SEO matters
- Analytics (GA4, Plausible, etc.) if you want visit data

## Hindi translation — needs the same review as the English compliance text
The Hindi strings (search for `var HI = {` in the `<script>` block) are a translation of the English copy, including the SEBI/AMFI disclaimer, the incidental-advice framing, and the commission-disclosure paragraph. This was translated by the same process as the English draft and has not been checked by anyone fluent in both Hindi and SEBI/AMFI terminology. Treat it as a draft that needs native-speaker and compliance review before launch, not as finished copy — the same flag as the English text below, not a lesser one.

Mechanically it's solid: every `data-i18n`-tagged element has a matching Hindi entry (verified programmatically — no missing keys), placeholders swap correctly, and the risk-quiz result text is language-aware. If new sections get added later, follow the existing pattern: tag the English element with `data-i18n="some_key"` (wrap inline text in a `<span>` if it sits next to a form control like a radio button, so swapping `innerHTML` doesn't destroy the control), then add `some_key` to both the `HI` object and, if it's an `<input placeholder>`, mirror it with `data-i18n-ph` in `HI_PLACEHOLDER`.

## What's NOT a developer task — needs business/compliance input first
The Trust & Compliance section has a status table with several rows marked "Needs info":

| Service | What's missing |
|---|---|
| PMS | APMI APRN number, which provider(s) you're empanelled with |
| AIF | Which fund manager(s) you're empanelled with (no blanket registration exists) |
| SIF | Confirmation of SEBI SIF-specific certification |
| Insurance | Registration type (Corporate Agent / Broker / POSP) and registration number, insurer panel |
| Tax Planning | Who actually delivers this — in-house, or a CA partner's name |
| Estate Planning | Name of the legal partner |
| GIFT City Investing | Name of the IFSCA-registered partner |

A developer cannot fill these in — only you can, and until they're resolved the honest move is to leave those services described only as "connect you with a specialist" (which is how the page currently frames them), not as confirmed in-house offerings.

Separately: all SEBI/AMFI compliance language on this page — the incidental-advice framing, the commission-disclosure wording, the disclaimer text, in both languages — was drafted based on public SEBI/AMFI guidance and adapted from wealthbees.in's own disclosure page. It has not been reviewed by a compliance officer or lawyer. That review should happen before this goes live; a regulated distributor publishing incorrect disclosures is a real regulatory exposure, not a cosmetic issue.

Also now live on the page: the facts strip and the Trust & Compliance paragraph both state "1,900+ families · ~₹500 Cr AUM" / "we serve over 1,900 investor families, with approximately ₹500 crore tracked across client portfolios." These numbers were supplied directly as fact, not independently verified, and are now a public trust claim — keep them current if the real figures move, the same way you'd keep any other regulatory disclosure current.

Also not yet addressed: there's no privacy policy or data-consent notice anywhere on the site, despite three forms collecting name, email and mobile number. Under India's DPDP Act, that's close to a hard requirement for any site collecting personal data this way. That's a content/legal gap for you to close (a developer can build the page once you have the text).

One more: the contact email used throughout is `niveshtrack@gmail.com`. Consider a domain-based address before launch — minor, but it reads less credibly for a live AMFI-registered distributor's site.

## Suggested order of operations
1. You: resolve the registration-status gaps in the table above, write/approve privacy-policy copy, get compliance and native-Hindi-speaker sign-off on the disclaimer language in both languages.
2. Developer: cross-browser/cross-device QA, add favicon/meta tags, wire the three forms to a real backend.
3. Developer: deploy to a domain with SSL.
4. You + compliance: final review of the live site, in both languages, before announcing it.

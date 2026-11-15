# voice-focus-public

Front-end code for the Voice Focus website, served by jsDelivr and pinned to a commit with Subresource Integrity (SRI).

| File | Loaded on |
|---|---|
| `src/css/site.css` | every page (site head) |
| `src/booking/booking-modal.css` | Home and Voice Therapy Appointments |
| `src/booking/booking-modal-runtime-2026-10-21.js` | Home and Voice Therapy Appointments |

The hero animation is served from [Woven-Thread-Shader](https://github.com/madewithpixels/Woven-Thread-Shader) and the navigation from [Smashburger-Webflow-Navbar](https://github.com/madewithpixels/Smashburger-Webflow-Navbar).

## Releasing
1. Commit and push to `main`.
2. Run `sh tools/make-loaders.sh` to print the pinned `<link>` and `<script>` tags for the commit.
3. Update the tags in Webflow and publish.

This repository holds code only. Project notes, content and site snapshots are kept elsewhere.

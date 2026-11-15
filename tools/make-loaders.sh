#!/bin/sh
# Prints the Webflow loader snippets for the Voice Focus custom code, pinned to a commit with SRI.
# Run AFTER the commit is pushed to GitHub (jsDelivr serves from GitHub). Usage: sh tools/make-loaders.sh [commit]
set -e
cd "$(dirname "$0")/.."
SHA="${1:-$(git rev-parse HEAD)}"
BASE="https://cdn.jsdelivr.net/gh/madewithpixels/voice-focus-public@$SHA"
sri() { printf 'sha384-%s' "$(curl -fsS "$BASE/$1" | openssl dgst -sha384 -binary | openssl base64 -A)"; }
echo "=== SITE HEAD ==="
echo "<link rel=\"stylesheet\" href=\"$BASE/src/css/site.css\" integrity=\"$(sri src/css/site.css)\" crossorigin=\"anonymous\">"
echo
echo "=== HOME + VOICE THERAPY APPOINTMENTS FOOTER ==="
echo "<link rel=\"stylesheet\" href=\"$BASE/src/booking/booking-modal.css\" integrity=\"$(sri src/booking/booking-modal.css)\" crossorigin=\"anonymous\">"
echo "<script src=\"$BASE/src/booking/booking-modal-runtime-2026-10-21.js\" integrity=\"$(sri src/booking/booking-modal-runtime-2026-10-21.js)\" crossorigin=\"anonymous\" defer></script>"

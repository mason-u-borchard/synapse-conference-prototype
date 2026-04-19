#!/usr/bin/env bash
# Build the Synapse prototype as a static site and drop it into the
# personal site's deploy tree. Run from this repo. Then cd to the
# personal site and run `bash deploy.sh` to push it live.
#
# Usage:
#   bash scripts/sync-to-personal-site.sh
#
# Output path is the subpath the main site's nginx will serve from,
# relative to the personal site's working tree:
#   ../masonborchard.com/synapse-conference-prototype/

set -euo pipefail

TARGET="${SYNAPSE_SYNC_TARGET:-../masonborchard.com/synapse-conference-prototype}"

if [[ ! -d "$(dirname "$TARGET")" ]]; then
  echo "Target parent directory $(dirname "$TARGET") does not exist." >&2
  echo "Set SYNAPSE_SYNC_TARGET if the personal site lives elsewhere." >&2
  exit 1
fi

echo "Building static export..."
npm run build:export >/dev/null

echo "Syncing to $TARGET"
mkdir -p "$TARGET"
rsync -a --delete out/ "$TARGET"/

# The export ships its own robots.txt under the subpath. Real crawlers
# look at the site root; delete the subpath copy to avoid confusion and
# rely on the root-level robots.txt already in the personal site.
rm -f "$TARGET/robots.txt"

echo
echo "Synced $(find "$TARGET" -type f | wc -l) files to $TARGET"
echo "Next: cd $(dirname "$TARGET") && bash deploy.sh"

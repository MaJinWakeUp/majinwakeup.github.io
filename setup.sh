#!/usr/bin/env bash
set -e

# =============================================================
# Academic Website Template — Quick Setup
# =============================================================

echo ""
echo "============================================="
echo "  Academic Website Template — Quick Setup"
echo "============================================="
echo ""

# Check for old-style config (migration detection)
if grep -q "^affiliation:" _config.yml 2>/dev/null; then
  echo "It looks like you have an old-style _config.yml."
  echo "See UPGRADING.md for migration instructions."
  echo ""
  exit 1
fi

# Gather info
read -rp "Your full name: " NAME
read -rp "Your title (e.g., Professor of Physics): " TITLE
read -rp "Your institution: " INSTITUTION
read -rp "Your email: " EMAIL

echo ""
echo "Updating _config.yml..."

# Use awk to safely replace placeholder values without injection risks
export NAME TITLE INSTITUTION EMAIL
awk '
  /^name: / { print "name: \"" ENVIRON["NAME"] "\""; next }
  /^title: / { print "title: \"" ENVIRON["TITLE"] "\""; next }
  /^institution: / { print "institution: \"" ENVIRON["INSTITUTION"] "\""; next }
  /^email: / { print "email: " ENVIRON["EMAIL"]; next }
  { print }
' _config.yml > _config.yml.tmp && mv _config.yml.tmp _config.yml

echo "Done!"
echo ""
echo "============================================="
echo "  Next steps:"
echo "============================================="
echo ""
echo "  1. Add your profile photo to images/"
echo "     (update 'photo' in _config.yml to match)"
echo ""
echo "  2. Add your links in _config.yml (Step 2)"
echo ""
echo "  3. Edit your publications in assets/ref.bib"
echo ""
echo "  4. Customize data files in _data/"
echo "     (news.yml, pi.yml, awards.yml, etc.)"
echo ""
echo "  5. Preview your site:"
echo "     bundle exec jekyll serve"
echo ""

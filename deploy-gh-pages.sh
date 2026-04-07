#!/bin/bash
# Deploy CloneMyVoice landing to GitHub Pages

set -e

echo "🚀 Building for GitHub Pages..."
cd apps/landing
rm -rf dist .next
npm run build

echo "📁 Copying build to docs folder..."
rm -rf ../../docs
mkdir -p ../../docs
cp -r dist/* ../../docs/

echo "✅ Build complete!"
echo ""
echo "Next steps:"
echo "1. git add docs/"
echo "2. git commit -m 'Deploy landing page'"
echo "3. git push origin main"
echo ""
echo "Make sure GitHub Pages is set to deploy from /docs folder in repo settings."

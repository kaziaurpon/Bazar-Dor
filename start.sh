#!/usr/bin/env bash
# One-command start for Git Bash / macOS / Linux:  bash start.sh
cd "$(dirname "$0")" || exit 1
if ! command -v node >/dev/null 2>&1; then
  echo "Node.js পাওয়া যায়নি। https://nodejs.org থেকে LTS ইনস্টল করুন।"; exit 1
fi
node scripts/check-node.mjs || exit 1
[ -d node_modules ] || npm install || exit 1
echo "➜ http://localhost:3000 খুলুন (বন্ধ করতে Ctrl + C)"
npm run dev

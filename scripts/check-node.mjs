// Friendly guard: this project needs Node.js 22.5 or newer (built-in SQLite, Next.js 16).
const [major, minor] = process.versions.node.split(".").map(Number);
if (major < 22 || (major === 22 && minor < 5)) {
  console.error(`
  ✖ আপনার Node.js ভার্সন ${process.versions.node} — এই প্রজেক্ট চালাতে Node.js 22 (LTS) বা নতুন লাগবে।
    Your Node.js version is ${process.versions.node}. This project needs Node.js 22 LTS or newer.

    ➜ https://nodejs.org থেকে "LTS" ভার্সন ইনস্টল করুন, তারপর টার্মিনাল বন্ধ করে নতুন করে খুলুন।
      Install the LTS version from https://nodejs.org, then reopen the terminal.
`);
  process.exit(1);
}

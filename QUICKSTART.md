# Quick Start Guide

Get Code Guardian running in **under 2 minutes**! ⚡

## TL;DR

```bash
git clone https://github.com/Xenonesis/code-guardian-report.git
cd code-guardian-report
npm install
npm run dev
```

Open http://localhost:3000 and start analyzing code! 🎉

---

## What You'll Get

✅ **Full code analysis** - 15+ programming languages  
✅ **Security scanning** - OWASP Top 10 vulnerability detection  
✅ **No configuration needed** - Works out of the box  
✅ **100% local** - Your code never leaves your browser  
✅ **Offline capable** - Progressive Web App support  

---

## Prerequisites

Before you start, make sure you have:

- **Node.js 22.x** - [Download here](https://nodejs.org/)
- **npm 9.0+** - Comes with Node.js
- **Git** - [Download here](https://git-scm.com/)

Check your versions:
```bash
node --version  # Should show v22.x.x
npm --version   # Should show 9.x.x or higher
```

---

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/Xenonesis/code-guardian-report.git
cd code-guardian-report
```

### 2. Install Dependencies

```bash
npm install
```

This takes about 2-3 minutes. Go grab a coffee ☕

**What's being installed:**
- Next.js framework
- React UI libraries
- Code analysis engines
- Security scanning tools
- TypeScript and dev tools

### 3. Start the Development Server

```bash
npm run dev
```

**Expected output:**
```
▲ Next.js 16.1.5
- Local:        http://localhost:3000
- Ready in 3.2s
```

### 4. Open in Your Browser

Visit: **http://localhost:3000**

You should see the Code Guardian home page! 🎊

---

## Try It Out

### Option 1: Upload a Single File

1. Click **"Upload Files"** or drag & drop
2. Select any code file (`.js`, `.py`, `.java`, etc.)
3. View the security analysis results instantly

### Option 2: Upload a ZIP Archive

1. Click **"Upload ZIP"**
2. Select a ZIP file containing your project
3. See comprehensive project analysis with:
   - Security vulnerabilities
   - Code quality metrics
   - Language detection
   - Complexity analysis

### Option 3: Analyze GitHub Repository (Optional)

> **Note:** Requires GitHub OAuth setup (see [Optional Features](#optional-features))

1. Go to **GitHub Analysis** page
2. Connect your GitHub account
3. Select a repository
4. Get detailed security report

---

## What Works Without Configuration?

Everything! The app uses intelligent defaults:

✅ **All code analysis features** - Full language support  
✅ **Security scanning** - All vulnerability checks  
✅ **PDF/JSON exports** - Report generation  
✅ **Offline mode** - Install as PWA  
✅ **Dark/Light themes** - UI customization  
✅ **Multi-file uploads** - Drag & drop support  

---

## Optional Features

Want to enable advanced features? See the [full setup guide](README.md#optional-configuration).

### 🤖 AI-Powered Features

Get intelligent fix suggestions and explanations:

1. Get an API key from [OpenAI](https://platform.openai.com/api-keys), [Anthropic](https://console.anthropic.com/), or [Google Gemini](https://makersuite.google.com/app/apikey)
2. Create `.env.local`:
   ```bash
   OPENAI_API_KEY=sk-your-key-here
   ```
3. Restart the dev server

### 🐙 GitHub Integration

Analyze GitHub repos directly:

1. Create OAuth App in [GitHub Settings](https://github.com/settings/developers)
2. Add to `.env.local`:
   ```bash
   NEXT_PUBLIC_GITHUB_CLIENT_ID=your_client_id
   GITHUB_CLIENT_SECRET=your_client_secret
   NEXT_PUBLIC_GITHUB_REDIRECT_URI=http://localhost:3000/api/auth/github/callback
   ```
3. Restart the dev server

### ☁️ Firebase Integration

Enable cloud storage and sync:

1. Create project at [Firebase Console](https://console.firebase.google.com/)
2. Copy configuration to `.env.local`
3. See [detailed Firebase setup](README.md#-firebase-configuration-optional)

---

## Troubleshooting

### Port 3000 is already in use

```bash
# Use a different port
PORT=3001 npm run dev
```

### `npm install` fails

```bash
# Clear cache and try again
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### App shows blank page

```bash
# Clear Next.js cache
npm run clean
npm run dev
```

### Still having issues?

1. Check [full troubleshooting guide](README.md#troubleshooting)
2. Search [existing issues](https://github.com/Xenonesis/code-guardian-report/issues)
3. Ask in [discussions](https://github.com/Xenonesis/code-guardian-report/discussions)

---

## Next Steps

Now that you're up and running:

1. **Read the [Usage Guide](README.md#usage-guide)** - Learn all features
2. **Check [API Reference](README.md#api-reference)** - Integrate with CI/CD
3. **Explore [Deployment Options](README.md#deployment)** - Deploy to production
4. **Join the community** - Star ⭐ the repo and contribute!

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Check code quality |
| `npm run test` | Run tests |
| `npm run clean` | Clear build cache |

---

## Support

- 📖 **Full Documentation:** [README.md](README.md)
- 🐛 **Report Issues:** [GitHub Issues](https://github.com/Xenonesis/code-guardian-report/issues)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/Xenonesis/code-guardian-report/discussions)
- 🔒 **Security:** [SECURITY.md](SECURITY.md)

---

**Happy Analyzing! 🚀**

# 🔗 RoxyLinks - Personal Link Hub

A beautiful, dark-themed personal link hub with auto-redirects built with Next.js and TailwindCSS. Perfect for creators, developers, and anyone who wants a centralized place for all their important links.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/RoxyLinks)

## ✨ Features

- **🚀 One-Click Deploy** - Deploy to Vercel with a single click
- **⚡ Auto-Redirects** - Instant redirects from short links to your destinations
- **🎨 Beautiful Dark Theme** - Modern, responsive design with smooth animations
- **📱 Mobile Responsive** - Looks great on all devices
- **⚙️ Easy Configuration** - Simple JSON file to manage all your links
- **🔍 SEO Optimized** - Proper meta tags and structure
- **💨 Fast Performance** - Built with Next.js for optimal speed
- **🛡️ Secure** - Security headers and best practices included
- **🎮 Discord Integration** - Show your Discord status and activity using Lanyard API
- **🖼️ Rich Metadata** - Perfect Open Graph and Twitter Card support for embeds
- **⭐ PWA Ready** - Progressive Web App capabilities with custom icons

## 🎯 Use Cases

Perfect for:
- Social media bio links
- Business card QR codes
- Email signatures
- Personal branding
- Link sharing
- Portfolio redirects

## 🚀 Quick Start

### Option 1: One-Click Deploy (Recommended)

1. Click the "Deploy with Vercel" button above
2. Fork/clone the repository
3. Edit `config.json` with your links
4. Commit and push - your site will auto-update!

### Option 2: Manual Setup

1. **Fork this repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/RoxyLinks.git
   cd RoxyLinks
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure your links**
   Edit `config.json`:
   ```json
   {
     "discordUserId": "YOUR_DISCORD_USER_ID",
     "discord": "https://discord.gg/your-server",
     "github": "https://github.com/yourusername",
     "youtube": "https://youtube.com/@yourchannel",
     "twitter": "https://twitter.com/yourusername",
     "linkedin": "https://linkedin.com/in/yourusername",
     "website": "https://yourwebsite.com"
   }
   ```

4. **Run locally**
   ```bash
   npm run dev
   ```

5. **Deploy to Vercel**
   - Connect your GitHub repo to Vercel
   - Deploy automatically on every push

## 📁 Project Structure

```
RoxyLinks/
├── pages/
│   ├── [slug].tsx      # Dynamic redirect handler
│   ├── index.tsx       # Landing page
│   ├── 404.tsx         # Custom 404 page
│   ├── _app.tsx        # App configuration
│   └── api/
│       └── health.ts   # Health check endpoint
├── styles/
│   └── globals.css     # Global styles with Tailwind
├── config.json         # Your links configuration
├── vercel.json         # Vercel deployment config
├── package.json        # Dependencies
└── README.md           # This file
```

## ⚙️ Configuration

### Adding Links

Edit `config.json` to add or modify your links:

```json
{
  "linkname": "https://destination-url.com",
  "discord": "https://discord.gg/your-server",
  "github": "https://github.com/yourusername",
  "custom-link": "https://any-url.com"
}
```

**Rules:**
- Keys become your short links (e.g., `yoursite.com/discord`)
- Values are the destination URLs
- Use lowercase letters, numbers, and hyphens only
- No spaces or special characters in keys

### Examples

With this config:
```json
{
  "discordUserId": "123456789012345678",
  "discord": "https://discord.gg/example",
  "gh": "https://github.com/yourusername",
  "yt": "https://youtube.com/@yourchannel"
}
```

Your links become:
- `yoursite.vercel.app/discord` → Discord server
- `yoursite.vercel.app/gh` → GitHub profile  
- `yoursite.vercel.app/yt` → YouTube channel
- Discord status displays automatically on your homepage

### Discord Integration

To show your Discord status and activity:

1. **Get your Discord User ID**:
   - Enable Developer Mode in Discord (Settings → Advanced → Developer Mode)
   - Right-click your profile → Copy ID

2. **Add to config.json**:
   ```json
   {
     "discordUserId": "YOUR_DISCORD_USER_ID_HERE",
     // ... your other links
   }
   ```

3. **The Lanyard API will automatically**:
   - Show your online status (online/idle/dnd/offline)
   - Display current activity (games, Spotify, etc.)
   - Update in real-time via WebSocket connection

## 🎨 Customization

### Styling
- Edit `styles/globals.css` for custom styles
- Modify `tailwind.config.js` for theme changes
- Update colors in component files

### Landing Page
- Edit `pages/index.tsx` to customize the home page
- Change title, description, and layout
- Add your own branding

### 404 Page
- Customize `pages/404.tsx` for your error page
- Match your brand colors and messaging

## 🔧 Advanced Configuration

### Environment Variables
Create `.env.local` for sensitive configuration:
```env
NEXT_PUBLIC_SITE_NAME=Your Site Name
NEXT_PUBLIC_SITE_URL=https://yoursite.vercel.app
```

### Custom Domain
1. Go to your Vercel dashboard
2. Navigate to your project settings
3. Add your custom domain
4. Update DNS records as instructed

### Analytics
Add analytics by modifying `pages/_app.tsx`:
```tsx
// Add Google Analytics, Plausible, etc.
```

## 📊 Monitoring

- Health check endpoint: `/health`
- Vercel Analytics automatically included
- Monitor redirects and performance in Vercel dashboard

## 🛠️ Development

### Local Development
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Testing
- Test redirects: Visit `localhost:3000/yourlink`
- Check 404 handling: Visit `localhost:3000/nonexistent`
- Verify landing page: Visit `localhost:3000`

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically
4. Configure custom domain (optional)

### Other Platforms
This is a standard Next.js app and can be deployed to:
- Netlify
- Railway
- AWS Amplify
- Any Node.js hosting

## 🔒 Security

- Security headers configured in `vercel.json`
- No sensitive data in client-side code
- Safe redirect validation
- XSS protection enabled

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## ❓ FAQ

**Q: Can I use a custom domain?**
A: Yes! Configure it in your Vercel dashboard.

**Q: How do I add more links?**
A: Edit `config.json` and redeploy. Changes are automatic on Vercel.

**Q: Is there a limit to the number of links?**
A: No technical limit, but keep it reasonable for good UX.

**Q: Can I track clicks?**
A: Yes, add analytics in `_app.tsx` or use Vercel Analytics.

**Q: How do I change the design?**
A: Edit the CSS files and component styling in the `pages/` directory.

## 🌟 Show Your Support

If you found this project helpful, please give it a ⭐ on GitHub!

---

**Built with ❤️ using Next.js, TailwindCSS, and deployed on Vercel**
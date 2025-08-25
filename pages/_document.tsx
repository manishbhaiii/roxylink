import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon and Icons */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icon-512.svg" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#9B5DE5" />
        <meta name="msapplication-TileColor" content="#9B5DE5" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="RoxyLinks" />
        <meta property="og:title" content="RoxyLinks - Personal Link Hub" />
        <meta property="og:description" content="Your personal link hub with auto-redirects. Beautiful dark theme, instant redirects, and one-click Vercel deployment." />
        <meta property="og:image" content="/og-image.svg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/svg+xml" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="RoxyLinks - Personal Link Hub" />
        <meta name="twitter:description" content="Your personal link hub with auto-redirects. Beautiful dark theme, instant redirects, and one-click Vercel deployment." />
        <meta name="twitter:image" content="/og-image.svg" />
        
        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="RoxyLinks" />
        <meta name="keywords" content="link hub, url shortener, redirects, personal links, social links, bio links" />
        
        {/* PWA */}
        <meta name="application-name" content="RoxyLinks" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="RoxyLinks" />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://cdn.discordapp.com" />
        <link rel="preconnect" href="https://api.lanyard.rest" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
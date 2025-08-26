import { GetStaticProps } from 'next';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import DiscordPresence from '@/components/DiscordPresence';

interface HomeProps {
  links: Record<string, string>;
}

export default function Home({ links }: HomeProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLinkClick = (slug: string) => {
    window.open(`/${slug}`, '_blank');
  };

  const formatSlugName = (slug: string) => {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <>
      <Head>
        <title>RoxyLinks - Personal Link Hub | Auto-Redirects & Beautiful Design</title>
        <meta name="description" content="Your personal link hub with instant auto-redirects. Beautiful dark theme, easy configuration, and one-click Vercel deployment. Perfect for social media bios and link sharing." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://roxylinks.vercel.app" />
        
        {/* Dynamic Open Graph based on links */}
        <meta property="og:url" content="https://roxylinks.vercel.app" />
        <meta property="og:title" content="RoxyLinks - Personal Link Hub" />
        <meta property="og:description" content={`Instant access to ${Object.keys(links).length} curated links. Your personal link hub with beautiful design and auto-redirects.`} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "RoxyLinks",
              "description": "Personal link hub with auto-redirects",
              "url": "https://roxylinks.vercel.app",
              "author": {
                "@type": "Person",
                "name": "RoxyLinks User"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://roxylinks.vercel.app/{search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent)] pointer-events-none"></div>
        
        <main className="relative z-10 container mx-auto px-4 py-16">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="mb-8">
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
                RoxyLinks
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            </div>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              A personal link hub with instant redirects
            </p>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              Share individual links like website.vercel.app/discord, insta, etc.{' '}
             <p> <a href="https://github.com/manishbhaiii/roxylink" target="_blank" rel="noopener noreferrer" className="text-blue-400 font-mono hover:text-blue-300 transition-colors cursor-pointer underline decoration-blue-400/50 hover:decoration-blue-300">This Project Link</a> </p>
            </p>
          </div>

          {/* Discord Presence Section */}
          <DiscordPresence />

          {/* Links Grid */}
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(links)
                .filter(([slug]) => slug !== 'discordUserId') // Filter out Discord user ID
                .map(([slug, url]) => (
                <div
                  key={slug}
                  onClick={() => handleLinkClick(slug)}
                  className="group cursor-pointer"
                >
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 transition-all duration-300 hover:bg-gray-700/50 hover:border-gray-600 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                        {formatSlugName(slug)}
                      </h3>
                      <div className="w-2 h-2 bg-green-500 rounded-full group-hover:bg-blue-500 transition-colors"></div>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-4 truncate">
                      {url}
                    </p>
                    
                    <div className="flex items-center text-blue-400 text-sm font-medium">
                      <span className="mr-2">/{slug}</span>
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links Section */}
          <div className="text-center mt-16 pt-12 border-t border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <a 
                href="https://discord.gg/hZf4j8GzzK" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-6 rounded-xl bg-gray-800/30 border border-gray-700 hover:bg-gray-700/40 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 fill-[#5865F2] group-hover:fill-blue-400 transition-colors" viewBox="0 0 24 24">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0003 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
                  </svg>
                </div>
                <div className="text-gray-300 group-hover:text-white transition-colors font-medium">Discord</div>
              </a>
              
              <a 
                href="https://github.com/manishbhaiii" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-6 rounded-xl bg-gray-800/30 border border-gray-700 hover:bg-gray-700/40 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 fill-gray-300 group-hover:fill-white transition-colors" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div className="text-gray-300 group-hover:text-white transition-colors font-medium">GitHub</div>
              </a>
              
              <a 
                href="https://www.youtube.com/@manish_boyy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-6 rounded-xl bg-gray-800/30 border border-gray-700 hover:bg-gray-700/40 hover:border-red-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-500/20"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 fill-[#FF0000] group-hover:fill-red-400 transition-colors" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
                <div className="text-gray-300 group-hover:text-white transition-colors font-medium">YouTube</div>
              </a>
            </div>
          </div>

          {/* Footer */}
          <footer className="text-center mt-16 text-gray-500">
            <p>
              Built with{' '}
              <span className="text-red-500">♥</span>
              {' '}by it&apos;s manish
            </p>
            <p className="mt-2 text-sm">
              Fork this project and customize your own link hub!
            </p>
          </footer>
        </main>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const config = require('../config.json');
    
    return {
      props: {
        links: config,
      },
      // Regenerate the page every 60 seconds in production
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error reading config:', error);
    return {
      props: {
        links: {},
      },
    };
  }
};

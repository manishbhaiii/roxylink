import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import Link from 'next/link';

interface RedirectPageProps {
  redirectUrl?: string;
  slug?: string;
  error?: string;
}

export default function RedirectPage({ redirectUrl, slug, error }: RedirectPageProps) {
  useEffect(() => {
    if (redirectUrl) {
      // Redirect immediately when component mounts
      window.location.href = redirectUrl;
    }
  }, [redirectUrl]);

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-white mb-2">Link Not Found</h2>
            <p className="text-gray-400 mb-6">
              The link <span className="text-blue-400">/{slug}</span> doesn&apos;t exist.
            </p>
          </div>
          
          <div className="space-y-4">
            <Link href="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300">
              ← Back to Home
            </Link>
          </div>
          
          <div className="mt-8 text-gray-500 text-sm">
            <p>Make sure the link is spelled correctly or check available links on the home page.</p>
          </div>
        </div>
      </div>
    );
  }

  // Show loading state while redirecting
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-white text-lg">Redirecting...</p>
        <p className="text-gray-400 text-sm mt-2">Taking you to your destination</p>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params!;
  
  try {
    // Import the config file
    const config = require('../config.json');
    
    // Check if the slug exists in config
    if (config[slug as string]) {
      const redirectUrl = config[slug as string];
      
      // Perform server-side redirect for better SEO
      return {
        redirect: {
          destination: redirectUrl,
          permanent: false, // Use 302 redirect
        },
      };
    }
    
    // If slug not found, return 404
    return {
      props: {
        error: 'not_found',
        slug,
      },
    };
  } catch (error) {
    console.error('Error reading config:', error);
    return {
      props: {
        error: 'config_error',
        slug,
      },
    };
  }
};
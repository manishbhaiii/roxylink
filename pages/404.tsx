import Link from 'next/link';
import Head from 'next/head';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | RoxyLinks</title>
        <meta name="description" content="The page you're looking for doesn't exist" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent)] pointer-events-none"></div>
        
        <div className="relative z-10 text-center px-4">
          {/* 404 Animation */}
          <div className="mb-8">
            <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-4 animate-pulse">
              404
            </div>
            <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-yellow-500 mx-auto rounded-full"></div>
          </div>

          {/* Error Message */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Oops! Page Not Found
            </h1>
            <p className="text-xl text-gray-300 mb-6 max-w-md mx-auto">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <p className="text-gray-500">
              You might want to check the URL or return to the home page.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link 
              href="/"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              ← Back to Home
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="inline-block bg-gray-800 hover:bg-gray-700 text-white font-medium py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 border border-gray-700 hover:border-gray-600"
            >
              Go Back
            </button>
          </div>

          {/* Helpful Links */}
          <div className="mt-16 pt-8 border-t border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4">
              Looking for something specific?
            </h3>
            <div className="text-gray-400 space-y-2">
              <p>• Check out our <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors">link hub</Link></p>
              <p>• Make sure the URL is spelled correctly</p>
              <p>• Try refreshing the page</p>
            </div>
          </div>

          {/* Fun Element */}
          <div className="mt-12 text-6xl">
            🔗💔
          </div>
        </div>
      </div>
    </>
  );
}
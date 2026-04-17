import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 text-center">
      <h1 className="font-headline text-9xl text-primary opacity-10 mb-4">404</h1>
      <div className="max-w-md">
        <h2 className="font-headline text-4xl text-primary mb-4">Sanctuary Not Found.</h2>
        <p className="text-on-surface-variant mb-10 font-body leading-relaxed">
          The page you are looking for has been moved or doesn't exist in our Kigali haven.
          Let us guide you back to restoration.
        </p>
        <Link
          to="/"
          className="inline-block bg-primary text-on-primary px-10 py-4 rounded-lg font-medium transition-all hover:bg-primary-container shadow-xl"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

import React from 'react';

const Press = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 px-8 bg-background">
      <div className="max-w-screen-2xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-secondary font-label tracking-[0.2em] mb-4 block uppercase text-sm">Media Resources</span>
          <h1 className="font-headline text-5xl text-primary">Press Kit</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          <div className="bg-white p-8 rounded-xl editorial-shadow text-center">
            <span className="material-symbols-outlined text-secondary text-5xl mb-4">image</span>
            <h3 className="font-headline text-2xl text-primary mb-2">High-Res Photos</h3>
            <p className="text-on-surface-variant text-sm mb-6">A curated gallery of our suites, dining venues, and skyline views.</p>
            <button className="text-secondary font-bold text-xs uppercase tracking-widest hover:underline">Download Gallery</button>
          </div>
          <div className="bg-white p-8 rounded-xl editorial-shadow text-center">
            <span className="material-symbols-outlined text-secondary text-5xl mb-4">description</span>
            <h3 className="font-headline text-2xl text-primary mb-2">Fact Sheet</h3>
            <p className="text-on-surface-variant text-sm mb-6">Detailed specifications of our property, history, and amenities.</p>
            <button className="text-secondary font-bold text-xs uppercase tracking-widest hover:underline">Download PDF</button>
          </div>
          <div className="bg-white p-8 rounded-xl editorial-shadow text-center">
            <span className="material-symbols-outlined text-secondary text-5xl mb-4">branding_watermark</span>
            <h3 className="font-headline text-2xl text-primary mb-2">Brand Assets</h3>
            <p className="text-on-surface-variant text-sm mb-6">Official logos and brand guidelines for media use.</p>
            <button className="text-secondary font-bold text-xs uppercase tracking-widest hover:underline">Download Logos</button>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl text-primary mb-8">Recent News</h2>
          <div className="space-y-8">
            <div className="border-b border-outline-variant/30 pb-8">
              <span className="text-xs font-label text-secondary uppercase tracking-widest mb-2 block">October 12, 2024</span>
              <h3 className="font-headline text-xl text-primary mb-2 hover:text-secondary cursor-pointer transition-colors">Gloria Hotel Awarded "Best Luxury City Hotel" in East Africa</h3>
              <p className="text-on-surface-variant leading-relaxed">Recognizing our commitment to excellence and authentic Rwandan hospitality...</p>
            </div>
            <div className="border-b border-outline-variant/30 pb-8">
              <span className="text-xs font-label text-secondary uppercase tracking-widest mb-2 block">September 28, 2024</span>
              <h3 className="font-headline text-xl text-primary mb-2 hover:text-secondary cursor-pointer transition-colors">Chef David Kwizera Joins 'The Summit' as Executive Chef</h3>
              <p className="text-on-surface-variant leading-relaxed">Bringing a new vision of pan-African fusion to Kigali's premier dining destination...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Press;

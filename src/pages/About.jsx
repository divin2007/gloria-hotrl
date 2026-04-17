import React from 'react';

const About = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img alt="Gloria Hotel Lobby" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQP-LeiIOyKIiBfzOtA1C8Fu3FytsKIKwV8Aa84RgbS4Qm6EMtK-K1NoHVmT6bf7R12ig9NXR3GXZypfUvQqK4vXpYofm14Scal8Fh44XPri3W6puWqR1u2y8q-4IukdifMN8ggnoY4LT188FaT4c5JNN22xgm4IThRtBopTKxF4N60KrLPuKd_ZSY2rBOH3PxCtbuyEEOOmeWExu0MWr4kHQ9qZOpuIpsfaV5CEePkkUpufkkliSzeAMHwug95RhLWfAmoB6sO_cR"/>
          <div className="absolute inset-0 bg-primary/60"></div>
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-8 w-full text-center">
          <span className="text-secondary-fixed text-sm font-label tracking-[0.2em] mb-4 block uppercase">Our Legacy</span>
          <h1 className="font-headline text-5xl md:text-7xl text-white leading-tight mb-6">About Gloria Hotel</h1>
          <p className="text-white/80 font-body text-lg max-w-2xl mx-auto leading-relaxed">
            A sanctuary of Rwandan heritage and modern architectural grace in the heart of Kigali.
          </p>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-24 bg-surface px-8">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-col md:flex-row gap-20 items-center">
            <div className="w-full md:w-1/2 relative">
              <div className="aspect-[4/5] rounded-xl overflow-hidden editorial-shadow">
                <img alt="Welcome to Gloria" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZ3t_lbFvwggJ4h_f6jYXnlfbH0Cz6JCjC0CIwEFfEpec30as6vrDqW9azqEC-U8pYwUqdpQA3kEiYNdNlGDaNYHUPCPDVP0TvsNepwkuW2AjCQSaf-FEG4LjS22jxOVKX6EH1x5csjRLdZUszQmQTsxX71lsbMCTbbGAqRfdhXMDSr9cxZ6-qoWT3DmZdG9pjYiZ0wJfWO7zZujfXbz6NhKxKjcN7cW58gXCgkyFxLpxTQyR0LVRuKM9Pmr1igxGxguD6Oxfa1E2T"/>
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-80 hidden lg:block rounded-xl overflow-hidden border-8 border-surface editorial-shadow">
                <img alt="Detail view" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuATuIwZ72SUadTjed3nt4cpteImb-9wrV28mQc3gw6wzybL6uWiFVmLToE7LYsJiM2n8T9mgj7mgj7mgj7mcFhQV4HajrR-wGLx3zLW3MWwTgdd1N8DjKv_2razD1YeHjYQCwD7bxuFrIdrhdZ6ME-0WTOGgaZOZMOfy-UOm0miqlPByAAIbqeAl-8TAktyGB_cZ2oQ421DDRarjBRb2bl0IBttGMOIjuCgWqS3tveK2ljyaK_s7l8A1VdYOXUkBXgCzwZINtS948Pn1nBR5Qtm"/>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="font-headline text-[2.75rem] leading-tight text-primary mb-6">Welcome to Gloria <br/><span className="italic font-normal">Your Kigali Sanctuary.</span></h2>
              <div className="w-20 h-1 bg-secondary mb-8"></div>
              <p className="font-body text-on-surface-variant text-lg leading-relaxed mb-8">
                Gloria Hotel stands as a beacon of modern Kigali—a city in bloom. We blend the rhythmic traditions of Rwanda with an international standard of luxury that caters to the global traveler and local tastemaker alike.
              </p>
              <p className="font-body text-on-surface-variant text-lg leading-relaxed mb-10">
                From our panoramic terrace views of the thousand hills to the curated Rwandan art in every room, every detail is an invitation to experience the "Quiet Authority" of our hospitality.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="font-serif text-2xl text-secondary mb-2">98</h4>
                  <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Bespoke Suites</p>
                </div>
                <div>
                  <h4 className="font-serif text-2xl text-secondary mb-2">3</h4>
                  <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Signature Venues</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Amenities Teaser */}
      <section className="bg-surface-container-low py-24 px-8">
        <div className="max-w-screen-2xl mx-auto text-center mb-16">
          <h3 className="font-headline text-4xl mb-4">The Gloria Standard</h3>
          <p className="text-on-surface-variant max-w-xl mx-auto">Beyond four walls, we provide a curated sanctuary of services tailored to the discerning traveler.</p>
        </div>
        <div className="max-w-screen-2xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 editorial-shadow">
              <span className="material-symbols-outlined text-primary text-4xl">spa</span>
            </div>
            <span className="font-headline text-xl block mb-2">Wellness Center</span>
            <p className="text-sm text-on-surface-variant">Traditional therapies meet modern science.</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 editorial-shadow">
              <span className="material-symbols-outlined text-primary text-4xl">pool</span>
            </div>
            <span className="font-headline text-xl block mb-2">Infinity Pool</span>
            <p className="text-sm text-on-surface-variant">Panoramic views of the thousand hills.</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 editorial-shadow">
              <span className="material-symbols-outlined text-primary text-4xl">restaurant_menu</span>
            </div>
            <span className="font-headline text-xl block mb-2">Artisan Dining</span>
            <p className="text-sm text-on-surface-variant">Sourced locally, prepared with passion.</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 editorial-shadow">
              <span className="material-symbols-outlined text-primary text-4xl">business_center</span>
            </div>
            <span className="font-headline text-xl block mb-2">Concierge Elite</span>
            <p className="text-sm text-on-surface-variant">Your gateway to the soul of Rwanda.</p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-primary text-white text-center px-8">
        <div className="max-w-3xl mx-auto">
          <span className="material-symbols-outlined text-secondary text-6xl mb-8">format_quote</span>
          <h2 className="font-headline text-3xl md:text-4xl mb-8 italic">
            "Our mission is to elevate the Kigali hospitality landscape by offering an experience that is as authentic as it is refined."
          </h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="font-label text-sm uppercase tracking-widest">The Gloria Management Team</p>
        </div>
      </section>
    </main>
  );
};

export default About;

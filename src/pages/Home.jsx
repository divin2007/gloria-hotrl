import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';

const Home = () => {
  const { addReservation } = useHotel();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCheckAvailability = () => {
    // Basic simulation of checking and adding a "lead" or reservation
    addReservation({
      guest: "Website Lead",
      room: "Checking Availability",
      amount: 0,
      checkIn: "TBD",
      checkOut: "TBD"
    });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[921px] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img alt="Gloria Hotel Lobby" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQP-LeiIOyKIiBfzOtA1C8Fu3FytsKIKwV8Aa84RgbS4Qm6EMtK-K1NoHVmT6bf7R12ig9NXR3GXZypfUvQqK4vXpYofm14Scal8Fh44XPri3W6puWqR1u2y8q-4IukdifMN8ggnoY4LT188FaT4c5JNN22xgm4IThRtBopTKxF4N60KrLPuKd_ZSY2rBOH3PxCtbuyEEOOmeWExu0MWr4kHQ9qZOpuIpsfaV5CEePkkUpufkkliSzeAMHwug95RhLWfAmoB6sO_cR"/>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-8 w-full">
          <div className="max-w-2xl">
            <span className="inline-block text-secondary-fixed-dim font-label text-sm tracking-[0.2em] mb-6 animate-pulse uppercase">EXPERIENCE KIGALI</span>
            <h1 className="font-headline text-[3.5rem] leading-[1.1] text-white mb-8">
              The Soul of Rwanda <br/>
              <span className="italic font-normal">Reimagined.</span>
            </h1>
            <p className="text-surface-container-high text-lg mb-10 font-body leading-relaxed opacity-90">
              High-altitude luxury meets local heart. Discover an editorial escape overlooking the vibrant hills of Kigali.
            </p>
            <div className="flex gap-4">
              <button className="bg-secondary text-on-secondary px-8 py-4 rounded-lg font-medium transition-all hover:bg-on-secondary-container shadow-xl">Explore Our Story</button>
              <Link to="/rooms" className="border border-white/30 backdrop-blur-md text-white px-8 py-4 rounded-lg font-medium hover:bg-white/10 transition-all">View Suites</Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-center z-20">
          <div className="bg-surface-container-lowest/90 backdrop-blur-xl p-8 rounded-xl editorial-shadow max-w-5xl w-full flex flex-wrap md:flex-nowrap gap-6 items-end">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-[10px] font-label text-secondary uppercase tracking-widest mb-2">Check In</label>
              <div className="flex items-center bg-surface-container-low px-4 py-3 rounded-lg">
                <span className="material-symbols-outlined text-secondary mr-2">calendar_month</span>
                <span className="font-body text-sm font-medium">Oct 12, 2024</span>
              </div>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-[10px] font-label text-secondary uppercase tracking-widest mb-2">Check Out</label>
              <div className="flex items-center bg-surface-container-low px-4 py-3 rounded-lg">
                <span className="material-symbols-outlined text-secondary mr-2">event</span>
                <span className="font-body text-sm font-medium">Oct 15, 2024</span>
              </div>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-[10px] font-label text-secondary uppercase tracking-widest mb-2">Guests</label>
              <div className="flex items-center bg-surface-container-low px-4 py-3 rounded-lg">
                <span className="material-symbols-outlined text-secondary mr-2">group</span>
                <span className="font-body text-sm font-medium">2 Adults, 1 Room</span>
              </div>
            </div>
            <div className="relative">
              {showSuccess && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-secondary text-on-secondary px-4 py-2 rounded shadow-lg text-xs whitespace-nowrap">
                  Request Sent to Front Desk!
                </div>
              )}
              <button
                onClick={handleCheckAvailability}
                className="signature-gradient text-on-primary px-10 py-3.5 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Check Availability
              </button>
            </div>
          </div>
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

      {/* Featured Rooms Section */}
      <section className="py-24 bg-surface-container-low px-8 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-secondary font-label text-sm tracking-widest uppercase mb-4 block">Accommodation</span>
              <h2 className="font-headline text-[2.75rem] text-primary">Featured Rooms</h2>
            </div>
            <Link to="/rooms" className="text-secondary font-medium flex items-center gap-2 group">
              View All Suites <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="group cursor-pointer">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-6 editorial-shadow">
                <img alt="Deluxe Room" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCjplAaw63v8B5YCyNF2jCfLgwhw-QsGfQiHz0HgzdlI0N0qOe1zMBrb2y-jWzVZagncUmK4UFQus5t5ONlPF_Iql4cF48ckyZSqkz_-RpUJkyzUQG0DcW5iQbwURQfo2FLckoWXuaRPnRUQq8UWr7LDxJ-95Se7lWh1vXGPx3iJnm91LyX5sJtGHvLYrlq2YdPYc-33v4bmWFaXy16_gPcjxzCe00R3OlwduUZTYR0eJ7Y86zSeGDZuquq9gbd5LHNkLLPVDC2F7M"/>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded text-[10px] font-label uppercase tracking-widest text-secondary font-bold">Recommended</div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-serif text-2xl text-primary mb-2">Deluxe Sanctuary</h3>
                  <p className="text-on-surface-variant font-body mb-4">42 SQM • City View • Rain Shower</p>
                  <div className="flex gap-4">
                    <span className="material-symbols-outlined text-outline text-lg">wifi</span>
                    <span className="material-symbols-outlined text-outline text-lg">ac_unit</span>
                    <span className="material-symbols-outlined text-outline text-lg">tv</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-serif text-2xl text-secondary">$240</p>
                  <p className="font-label text-[10px] uppercase text-on-surface-variant">Per Night</p>
                </div>
              </div>
            </div>
            <div className="group cursor-pointer">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-6 editorial-shadow">
                <img alt="Executive Suite" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8WjEKY6ImkKqmDHiyYVfO2UDMuypWqNRmjFdv_9Z45z8GcpRGCB0DV3Zlada-GkRBBu3WvM4Ofrd6y2uXDzWSTX0J9FY2jFgpO_EOVBEaDf48jsHwHsHvdVd4wB4C3zAWDxAFPMa06MHfwZkaMMcgGXaOahvxhO_1n3fv6HJP4SwvnXV7bagbjUmE15KL1idZ8ATZKxYGWSRciuHDletZOvy5kZ7KrJXNabpt8ljyuy1fxuFxj3YI_JBabfIh2YEHXYQbsVIET4ST"/>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-serif text-2xl text-primary mb-2">Executive Horizon</h3>
                  <p className="text-on-surface-variant font-body mb-4">78 SQM • Panoramic Views • Lounge Access</p>
                  <div className="flex gap-4">
                    <span className="material-symbols-outlined text-outline text-lg">local_bar</span>
                    <span className="material-symbols-outlined text-outline text-lg">bathtub</span>
                    <span className="material-symbols-outlined text-outline text-lg">coffee_maker</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-serif text-2xl text-secondary">$480</p>
                  <p className="font-label text-[10px] uppercase text-on-surface-variant">Per Night</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Culinary Arts Section */}
      <section className="py-24 px-8 signature-gradient text-white relative">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <span className="text-secondary-fixed font-label text-sm tracking-widest uppercase mb-4 block">Culinary Arts</span>
            <h2 className="font-headline text-[2.75rem] mb-8">Exquisite Dining <br/><span className="italic font-normal">at The Summit.</span></h2>
            <p className="font-body text-surface-variant text-lg leading-relaxed mb-10 opacity-90">
              Our flagship restaurant, The Summit, brings a refined touch to pan-African cuisine. Savor ingredients sourced from the volcanic soils of the north, paired with a world-class wine cellar and views that stretch across the Kigali skyline.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <span className="material-symbols-outlined text-secondary-fixed text-3xl">restaurant</span>
                <div>
                  <h4 className="font-serif text-xl mb-1">Chef’s Table</h4>
                  <p className="text-sm opacity-70">A 7-course journey through Rwanda's seasonal harvests.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <span className="material-symbols-outlined text-secondary-fixed text-3xl">local_bar</span>
                <div>
                  <h4 className="font-serif text-xl mb-1">Twilight Bar</h4>
                  <p className="text-sm opacity-70">Artisan cocktails inspired by Kigali’s vibrant night life.</p>
                </div>
              </div>
            </div>
            <Link to="/dining" className="inline-block mt-12 bg-secondary text-on-secondary px-8 py-4 rounded-lg font-medium transition-all hover:bg-secondary-container">Reserve a Table</Link>
          </div>
          <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
            <img alt="Dining Interior" className="rounded-xl aspect-square object-cover mt-12 editorial-shadow" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDL8d_ngibW6yrtlFn0ZWyRAw5gUUaW7xAC-Geo403qS13OuddQx2gmSycWTCJoGlBMmyFVMW9RTlyFM-dLkFEmfxDG3CrPZgXdasMveA6SjMSm9U9LfyRMWs1xEJ7iScU1_1-2NMKC2c0N02qj16F_vpajkqcC2ffI3S1KFcgHTsY2NU9PzzSbTOrW08np2IHJp8x7Ym61pTalWcPkjzyHTXYYBGCPRJHbfSbj9l73b7lqGJ7a1Ep7W_O0vu2BEKjpd5RsCxGIMdg0"/>
            <img alt="Gourmet Dish" className="rounded-xl aspect-square object-cover editorial-shadow" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8c-IN2J2LdmBx_9o_bE9ves6tCnN05uk8CmKp6TxDHNDaA7f04DfK7_8TfX8X53m0n4ogkAvqqT-5WlPID3fDgSWzN43ZXiVEYG5TmO14CJXWsEVMRi-mVBT5L_QQoOD9B-eophfrJl9k3y3PNp45n6eKKLqXE82Luvnx9W5RFsGc3GmGxjCmQV9bTZJzyfxBE0dpF5AX0yjUTNAS5CLdM9ZTGpbWVuyGcAp-VY4pRvXrnrN9KNBpwDJsCEyncW-2S9qXUWcsGs_-"/>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-24 bg-surface px-8">
        <div className="max-w-screen-2xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-secondary font-label text-sm tracking-widest uppercase mb-4 block">Events</span>
            <h2 className="font-headline text-[2.75rem] text-primary">Upcoming Events</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-surface-container-low rounded-xl overflow-hidden flex flex-col editorial-shadow">
              <div className="h-48 relative">
                <img alt="Jazz Night" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuYhXrkmG28QD14if9NHbO5YGHen6VRkNYOVZaLWvVzKbyFPNB2b0hiJws2wFf9fnqIiG_Zk9Rcf44t-jvA9jxrepopAXIIWh8nGy7c70i8pGS0-GDAyZLTFwBWAEkKQAmWIkDeBkpT3OrzVMYe_8xRtMUFFn0AfuhIRz8QhzXB5T6b1_aKlMUxDMWHhZfP9JSvMkirk2XtYvxEC-7UZM_eyz-sEEozXe5930c-PJ16vnj-awv_rLv6UWpggFnJy_lT4F9eW6ENatm"/>
              </div>
              <div className="p-8 flex-1">
                <div className="text-secondary font-label text-xs tracking-tighter mb-2">OCTOBER 15 • 8:00 PM</div>
                <h3 className="font-serif text-2xl text-primary mb-4">Kigali Jazz Collective</h3>
                <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">Join us for an intimate evening of soulful rhythms and vintage spirits at our Twilight Bar.</p>
                <Link to="/events" className="text-secondary font-medium text-sm flex items-center gap-2 group">
                  Learn More <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">chevron_right</span>
                </Link>
              </div>
            </div>
            <div className="bg-surface-container-low rounded-xl overflow-hidden flex flex-col editorial-shadow">
              <div className="h-48 relative">
                <img alt="Tech Summit" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4CrbYfYqL-8ayohLvHpKkguRWIwZdgL3pgUCveMPks5IFekeCqyghSF3ymKKos11jjBW7j13SMt60LNklXBZekRbjkz41WD2NFKdtCAcxSK55tUgKdhes2-Wn3WRdvO8XtZMv434E6sJrYlVBjaaYIP202WrpYpKe1pDBHdMSFhQUsdmMddQNFoyf467sjjMsSxxhGzzWnNmHeM-_IYIXfVd6cvMTPTlr-LteSNVuChmLHfuINu88foblbqZhzYh9BY3l49GZu3Vn"/>
              </div>
              <div className="p-8 flex-1">
                <div className="text-secondary font-label text-xs tracking-tighter mb-2">NOVEMBER 02 • 9:00 AM</div>
                <h3 className="font-serif text-2xl text-primary mb-4">Future of Rwanda Summit</h3>
                <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">A gathering of innovators and leaders shaping the digital landscape of the continent.</p>
                <Link to="/events" className="text-secondary font-medium text-sm flex items-center gap-2 group">
                  Learn More <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">chevron_right</span>
                </Link>
              </div>
            </div>
            <div className="bg-surface-container-low rounded-xl overflow-hidden flex flex-col editorial-shadow">
              <div className="h-48 relative">
                <img alt="Art Exhibition" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLQRfK-eScafxZ_bWIL-wrdxoU6BbKW699VsUqcg_iEFY19eeJNkBT1w7RGMeosKbZVs1VOh9qPPxY1dlezh6XZWSxKbfG9zftKPKTg4Sunzb9gq7XUAu560RxXrZwAVoIZzJJsxcGE-nG63bgdlOmqRmY1nmee1ind86lFBMXoWm_jUaMkjlWxwpg3gfgBGA-MUXqpe47QIAPm0Rh_z4AtP1ulmQ4vynUbjQtuevMYSN2ePJ_fnEdW0B--bOarbyXjRMEQI2sMNw6"/>
              </div>
              <div className="p-8 flex-1">
                <div className="text-secondary font-label text-xs tracking-tighter mb-2">NOVEMBER 10 • 6:00 PM</div>
                <h3 className="font-serif text-2xl text-primary mb-4">Hillside Gallery Opening</h3>
                <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">Showcasing the latest contemporary works from Rwanda’s rising abstract artists.</p>
                <Link to="/events" className="text-secondary font-medium text-sm flex items-center gap-2 group">
                  Learn More <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">chevron_right</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;

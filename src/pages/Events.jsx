import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import SEO from '../components/SEO';

const Events = () => {
  const { addReservation, catalogEvents } = useHotel();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'Corporate Conference',
    guests: '',
    requirements: ''
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addReservation({
      guest: formData.name,
      room: formData.type,
      type: "Event Inquiry",
      guests: parseInt(formData.guests) || 0,
      status: "Pending",
      amount: 0
    });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <main className="bg-background min-h-screen">
      <SEO title="Events & Celebrations" description="From intimate corporate retreats to grand matrimonial celebrations, Gloria Hotel Kigali provides the perfect canvas." />

      {/* Hero Section */}
      <section className="relative h-[716px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img alt="Grand ballroom" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7UQJR0eva_sFGXSaCC9cxAYEdNnBhapfR04a97xZNyyYm09l4oiAFCX7HEiAgJQIeYoi_MF1xMM5vsOadNqq2H5vcj45QjrL7NYKy_3eVIPEH2Vws3AXR5tmcFZ-KiHvozbn6ETrI4Xt9t3PnOXuzaoJ4_L73JDmC2Af01mkdyaXlF4wQjS-OgafmjaUYMAdXZMqCX6xQfZ25I5iW10wrhVwCPlslg86JTk31L5xUQ7Sqcl-caeIeF3O660crnLs3L3wJ0f_9eS7I"/>
          <div className="absolute inset-0 bg-primary/80 via-primary/40 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-8 w-full">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 bg-secondary text-on-secondary text-[10px] tracking-[0.2em] font-bold rounded mb-6 uppercase">Unforgettable Occasions</span>
            <h1 className="font-headline text-5xl md:text-7xl text-white leading-tight mb-6">Where Elegance Meets <span className="italic text-secondary-fixed">Excellence</span>.</h1>
            <p className="text-lg text-slate-200 font-body leading-relaxed max-w-lg mb-8">From intimate corporate retreats to grand matrimonial celebrations, Gloria Hotel Kigali provides the perfect canvas for your most significant moments.</p>
            <div className="flex space-x-4">
              <a className="bg-secondary text-on-secondary px-8 py-4 rounded-lg font-bold uppercase text-xs tracking-widest hover:brightness-110 transition-all shadow-xl" href="#inquiry">Start Planning</a>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Venue Showcase */}
      <section className="py-24 px-8 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-5 space-y-8">
            <div className="space-y-4">
                <h2 className="font-headline text-4xl text-primary leading-tight">Curated Spaces for Every Narrative</h2>
                <p className="text-on-surface-variant leading-relaxed">Our venues are architecturally designed to offer versatility without compromising on aesthetic integrity. Each room features state-of-the-art acoustics and lighting.</p>
            </div>

            {catalogEvents.slice(0, 1).map(venue => (
                <div key={venue.id} className="bg-surface-container-low p-8 rounded-2xl shadow-editorial group cursor-pointer transition-all duration-300 hover:translate-y-[-4px] border border-outline-variant/10">
                    <div className="flex justify-between items-start mb-6">
                        <h3 className="font-headline text-2xl text-primary">{venue.name}</h3>
                        <span className="material-symbols-outlined text-secondary">groups</span>
                    </div>
                    <img alt={venue.name} className="w-full h-56 object-cover rounded-xl mb-6 shadow-sm" src={venue.image} />
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-on-surface-variant border-t border-outline-variant/20 pt-6">
                        <span>Up to {venue.capacity} Guests</span>
                        <span className="text-secondary hover:underline transition-all">Explore Details →</span>
                    </div>
                </div>
            ))}
          </div>

          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {catalogEvents.slice(1).map(venue => (
                <div key={venue.id} className="bg-surface-container-lowest p-6 rounded-2xl shadow-editorial flex flex-col h-full border border-outline-variant/10 group">
                    <div className="aspect-square overflow-hidden rounded-xl mb-6">
                        <img alt={venue.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={venue.image} />
                    </div>
                    <h3 className="font-headline text-xl text-primary mb-2">{venue.name}</h3>
                    <p className="text-xs text-on-surface-variant mb-8 flex-grow leading-relaxed">{venue.description}</p>
                    <div className="flex items-center space-x-4 text-[10px] font-bold uppercase tracking-widest text-secondary-fixed-dim bg-primary px-4 py-2.5 rounded-lg shadow-md">
                        <span className="material-symbols-outlined text-sm">celebration</span>
                        <span>{venue.capacity} CAPACITY</span>
                    </div>
                </div>
            ))}

            <div className="sm:col-span-2 bg-primary text-on-primary p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between overflow-hidden relative shadow-2xl">
                <div className="relative z-10 md:w-1/2">
                    <h3 className="font-headline text-3xl mb-6">Elite Event Services</h3>
                    <ul className="space-y-5">
                        <li className="flex items-center space-x-4">
                            <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                                <span className="material-symbols-outlined text-sm">wifi_protected_setup</span>
                            </div>
                            <span className="text-sm font-medium opacity-90">Ultra-High Speed Network</span>
                        </li>
                        <li className="flex items-center space-x-4">
                            <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                                <span className="material-symbols-outlined text-sm">restaurant_menu</span>
                            </div>
                            <span className="text-sm font-medium opacity-90">Bespoke Executive Catering</span>
                        </li>
                    </ul>
                </div>
                <div className="mt-12 md:mt-0 md:w-1/3 flex justify-center">
                    <div className="relative">
                        <div className="border-2 border-secondary p-10 rounded-full animate-pulse">
                            <span className="material-symbols-outlined text-6xl text-secondary">verified</span>
                        </div>
                        <div className="absolute -top-4 -right-4 bg-secondary text-on-secondary px-3 py-1 rounded-full text-[8px] font-bold uppercase">Certified</div>
                    </div>
                </div>
                <span className="material-symbols-outlined text-[200px] text-white/5 absolute -right-10 -bottom-10 select-none">architecture</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container py-24 px-8" id="inquiry">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl text-primary mb-4">Begin Your Planning</h2>
            <div className="w-20 h-1 bg-secondary mx-auto"></div>
            <p className="mt-6 text-on-surface-variant">Tell us about your event, and our curation team will respond within 12 hours.</p>
          </div>
          {success ? (
            <div className="bg-white p-16 rounded-3xl shadow-editorial text-center max-w-2xl mx-auto border border-outline-variant/10">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-6">
                <span className="material-symbols-outlined text-4xl">send</span>
              </div>
              <h3 className="font-headline text-2xl text-primary mb-2">Inquiry Submitted</h3>
              <p className="text-on-surface-variant">Thank you for your interest. Our events team will reach out to {formData.email} shortly to begin the design process.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-10 md:p-16 rounded-3xl shadow-editorial grid grid-cols-1 md:grid-cols-2 gap-8 border border-outline-variant/10">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-primary uppercase tracking-widest block opacity-60">Full Name</label>
                <input
                  required
                  className="w-full bg-surface-container-high border-none border-b-2 border-transparent focus:ring-0 focus:border-secondary transition-all px-4 py-3 text-on-surface rounded-t-lg"
                  placeholder="Your name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-primary uppercase tracking-widest block opacity-60">Email Address</label>
                <input
                  required
                  className="w-full bg-surface-container-high border-none border-b-2 border-transparent focus:ring-0 focus:border-secondary transition-all px-4 py-3 text-on-surface rounded-t-lg"
                  placeholder="email@example.com"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-primary uppercase tracking-widest block opacity-60">Event Type</label>
                <select
                  className="w-full bg-surface-container-high border-none border-b-2 border-transparent focus:ring-0 focus:border-secondary transition-all px-4 py-3 text-on-surface rounded-t-lg"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  {catalogEvents.map(v => <option key={v.id} value={v.name}>{v.name}</option>)}
                  <option value="Wedding">Wedding Celebration</option>
                  <option value="Private Gala">Private Gala</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-primary uppercase tracking-widest block opacity-60">Guest Count</label>
                <input
                  required
                  className="w-full bg-surface-container-high border-none border-b-2 border-transparent focus:ring-0 focus:border-secondary transition-all px-4 py-3 text-on-surface rounded-t-lg"
                  placeholder="Approximate number"
                  type="number"
                  value={formData.guests}
                  onChange={(e) => setFormData({...formData, guests: e.target.value})}
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-bold text-primary uppercase tracking-widest block opacity-60">Special Requirements</label>
                <textarea
                  className="w-full bg-surface-container-high border-none border-b-2 border-transparent focus:ring-0 focus:border-secondary transition-all px-4 py-3 text-on-surface rounded-t-lg"
                  placeholder="Catering, AV needs, or specific dates..."
                  rows="4"
                  value={formData.requirements}
                  onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                ></textarea>
              </div>
              <div className="md:col-span-2 pt-4">
                <button className="w-full bg-primary text-on-primary py-5 rounded-xl font-bold uppercase text-xs tracking-widest hover:brightness-110 transition-all shadow-lg" type="submit">Submit Inquiry</button>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default Events;

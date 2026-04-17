import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';

const Events = () => {
  const { addReservation } = useHotel();
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
    <main>
      <section className="relative h-[716px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img alt="Grand ballroom" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7UQJR0eva_sFGXSaCC9cxAYEdNnBhapfR04a97xZNyyYm09l4oiAFCX7HEiAgJQIeYoi_MF1xMM5vsOadNqq2H5vcj45QjrL7NYKy_3eVIPEH2Vws3AXR5tmcFZ-KiHvozbn6ETrI4Xt9t3PnOXuzaoJ4_L73JDmC2Af01mkdyaXlF4wQjS-OgafmjaUYMAdXZMqCX6xQfZ25I5iW10wrhVwCPlslg86JTk31L5xUQ7Sqcl-caeIeF3O660crnLs3L3wJ0f_9eS7I"/>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-8 w-full">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 bg-secondary text-on-secondary text-[10px] tracking-[0.2em] font-semibold rounded mb-6 uppercase">Unforgettable Occasions</span>
            <h1 className="font-headline text-5xl md:text-7xl text-white leading-tight mb-6">Where Elegance Meets <span className="italic text-secondary-fixed">Excellence</span>.</h1>
            <p className="text-lg text-slate-200 font-body leading-relaxed max-w-lg mb-8">From intimate corporate retreats to grand matrimonial celebrations, Gloria Hotel Kigali provides the perfect canvas for your most significant moments.</p>
            <div className="flex space-x-4">
              <a className="bg-secondary text-on-secondary px-8 py-4 rounded-lg font-semibold hover:bg-on-secondary-container transition-colors" href="#inquiry">Start Planning</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 space-y-4">
            <h2 className="font-headline text-4xl text-primary leading-tight">Curated Spaces for Every Narrative</h2>
            <p className="text-on-surface-variant leading-relaxed pb-8">Our venues are architecturally designed to offer versatility without compromising on aesthetic integrity. Each room features state-of-the-art acoustics and lighting.</p>
            <div className="bg-surface-container-low p-8 rounded-xl shadow-editorial group cursor-pointer transition-all duration-300 hover:translate-y-[-4px]">
              <div className="flex justify-between items-start mb-6">
                <h3 className="font-headline text-2xl text-primary">The Virunga Ballroom</h3>
                <span className="material-symbols-outlined text-secondary">groups</span>
              </div>
              <img alt="Virunga Ballroom" className="w-full h-48 object-cover rounded-lg mb-6" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiF2tF8H3VepaVqJ28vg2_1zGplP2Q78r5d2ENONNxOqgKSgOHjtYx3nJ8RFqm5WvfOE8-flossu2Brz1y5DYG2-ikT3wbtadDvx-PGGnf-kCYdGdavIJylgRxVWbNs6baHomgNn_-qifLBQTLsTH9DL-AV8DUmRCiogMf7hps7Ie-i1ejQF-AiG_9M9v6UIh0E0ioEKLm7twebloBB-O-QzAllxG6d3e64-zU4vSP9zx3m0-ZB8qc3nPM6KorVUeOJU_mcgCNYv69"/>
              <div className="flex justify-between text-sm font-medium text-on-surface-variant border-t border-outline-variant/20 pt-4">
                <span>Up to 500 Guests</span>
                <span className="text-secondary">Explore Details →</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-editorial flex flex-col h-full">
              <div className="aspect-square overflow-hidden rounded-lg mb-6">
                <img alt="Skyline Terrace" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1kfqXw-qY06yFCxjo-et-ciQr3teyZj6Umkc_uOruw5bxHlfLLXzOP3UGoorOBNOaEbmoFlNzLG8IFjYoKRE0g7s_YxfZ3nmFOZ6oh555fVJR8I7T0oncYTnMYh2T2Z99wum4YMkO69pIBAecPTjZDqYPTXTXNwetQE0VeaWutY4RWK1QYz-cMJlK3qQmLdTbRjILF6K1Fw3fte_Ehd2IqhOPSQlf4ifhASU3PDwMP-y4-iCWKxMuOaCKpjX_KCNgspz0umScQAk-"/>
              </div>
              <h3 className="font-headline text-xl text-primary mb-2">The Skyline Terrace</h3>
              <p className="text-sm text-on-surface-variant mb-6 flex-grow">Open-air elegance for cocktail receptions and intimate evening celebrations.</p>
              <div className="flex items-center space-x-4 text-xs font-semibold text-secondary-fixed-dim bg-primary px-3 py-2 rounded">
                <span className="material-symbols-outlined text-sm">celebration</span>
                <span>150 CAPACITY</span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-editorial flex flex-col h-full">
              <div className="aspect-square overflow-hidden rounded-lg mb-6">
                <img alt="Executive Boardroom" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7V53_pVDNLi76yYfYhhmOAb-RiavzmbbIgcF7gtd-1BVpWp3WGYi0WvOYrDu-dZdYgVgFIbqfNBVTypben2HKwiyT58tbZaKJMvMaOcDdCbUYARabKwWL8fZY1bvzhJYrCwImrtZbF5EKqw2NexSD0L0MyehfgQhWfv1DPTY-AUm76NNha4HzJSPxjdEyki9HpCD4hjy1dq56T-j8cH4U9f3JNvo1bq5m1owaNQHvZpHKyqTylarpu3yu6F475kuz-Y-pD73trsq0"/>
              </div>
              <h3 className="font-headline text-xl text-primary mb-2">The Kigali Suite</h3>
              <p className="text-sm text-on-surface-variant mb-6 flex-grow">A high-tech executive environment designed for focused collaboration and privacy.</p>
              <div className="flex items-center space-x-4 text-xs font-semibold text-secondary-fixed-dim bg-primary px-3 py-2 rounded">
                <span className="material-symbols-outlined text-sm">laptop_mac</span>
                <span>25 CAPACITY</span>
              </div>
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
            <div className="bg-white p-16 rounded-xl shadow-editorial text-center max-w-2xl mx-auto">
              <span className="material-symbols-outlined text-secondary text-5xl mb-4">send</span>
              <h3 className="font-headline text-2xl text-primary mb-2">Inquiry Submitted</h3>
              <p className="text-on-surface-variant">Thank you for your interest. Our events team will reach out to {formData.email} shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-10 md:p-16 rounded-xl shadow-editorial grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-semibold text-primary uppercase tracking-widest block">Full Name</label>
                <input
                  required
                  className="w-full bg-surface-container-high border-none border-b-2 border-transparent focus:ring-0 focus:border-secondary transition-all px-0 py-3 text-on-surface"
                  placeholder="Your name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-semibold text-primary uppercase tracking-widest block">Email Address</label>
                <input
                  required
                  className="w-full bg-surface-container-high border-none border-b-2 border-transparent focus:ring-0 focus:border-secondary transition-all px-0 py-3 text-on-surface"
                  placeholder="email@example.com"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-semibold text-primary uppercase tracking-widest block">Event Type</label>
                <select
                  className="w-full bg-surface-container-high border-none border-b-2 border-transparent focus:ring-0 focus:border-secondary transition-all px-0 py-3 text-on-surface"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option>Corporate Conference</option>
                  <option>Wedding Celebration</option>
                  <option>Private Gala</option>
                  <option>Board Meeting</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-semibold text-primary uppercase tracking-widest block">Guest Count</label>
                <input
                  required
                  className="w-full bg-surface-container-high border-none border-b-2 border-transparent focus:ring-0 focus:border-secondary transition-all px-0 py-3 text-on-surface"
                  placeholder="Approximate number"
                  type="number"
                  value={formData.guests}
                  onChange={(e) => setFormData({...formData, guests: e.target.value})}
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-semibold text-primary uppercase tracking-widest block">Special Requirements</label>
                <textarea
                  className="w-full bg-surface-container-high border-none border-b-2 border-transparent focus:ring-0 focus:border-secondary transition-all px-0 py-3 text-on-surface"
                  placeholder="Catering, AV needs, or specific dates..."
                  rows="4"
                  value={formData.requirements}
                  onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                ></textarea>
              </div>
              <div className="md:col-span-2 pt-4">
                <button className="w-full bg-primary text-on-primary py-5 rounded-lg font-headline text-lg hover:shadow-xl hover:shadow-primary/20 transition-all" type="submit">Submit Inquiry</button>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default Events;

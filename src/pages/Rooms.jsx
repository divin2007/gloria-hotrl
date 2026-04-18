import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import SEO from '../components/SEO';

const Rooms = () => {
  const { addReservation, catalogRooms } = useHotel();
  const [successMessage, setSuccessMessage] = useState("");

  const handleBook = (roomName, price) => {
    addReservation({
      guest: "Guest from Web",
      room: roomName,
      amount: price,
      checkIn: "Oct 25",
      checkOut: "Oct 28"
    });
    setSuccessMessage(`Booking request for ${roomName} sent!`);
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  return (
    <main className="relative bg-background min-h-screen">
      <SEO title="Rooms & Suites" description="Exquisite sanctuaries and luxurious suites in the heart of Kigali." />
      {successMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] bg-secondary text-on-secondary px-8 py-4 rounded-full shadow-2xl font-bold uppercase text-xs tracking-widest animate-in fade-in slide-in-from-top-4 duration-300">
          {successMessage}
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-[614px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img alt="Luxurious hotel suite" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBv3EfWcDtjEbYlrkg1oilidMNsfuCe6OFTvdyXDjuW_aH2aae1_yW9j_HOrjVI6W_XdtrcacoOKskPu0f8REvJrviaUM0M3HVfL4tVNlmTZX8MTs4q0xRkCl7PR3W9F_CFGJAX14SpaIWUEohTdc6BOKUZj4RrPsiYgvMFhyYiMktRmKmerjH9YoA8aUjljlMTPEAT2105qRY7NXVfByUqdOJsBn5aBdUzEegpz05N2vmE9ab5b74hwd8irJQvxG-edVR965V3h07M"/>
          <div className="absolute inset-0 bg-primary/40 backdrop-brightness-75"></div>
        </div>
        <div className="relative z-10 max-w-screen-2xl mx-auto px-8 w-full">
          <div className="max-w-3xl">
            <span className="text-secondary-fixed text-sm font-label tracking-[0.2em] mb-4 block uppercase font-bold">EXQUISITE SANCTUARIES</span>
            <h1 className="font-headline text-5xl md:text-7xl text-white leading-tight mb-6">Rest Refined.</h1>
            <p className="text-white/80 font-body text-lg max-w-xl leading-relaxed">Experience the pinnacle of hospitality in the heart of Kigali. Each room is a curated blend of Rwandan heritage and modern architectural grace.</p>
          </div>
        </div>
      </section>

      {/* Room Listing */}
      <section className="py-24 px-8 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {catalogRooms.map((room, index) => {
              const isLarge = index % 3 === 0;
              return (
                  <div key={room.id} className={`${isLarge ? 'md:col-span-8' : 'md:col-span-4'} group`}>
                      <div className="bg-surface-container-lowest rounded-2xl h-full overflow-hidden shadow-editorial transition-all duration-500 hover:-translate-y-2 border border-outline-variant/10">
                          <div className={`grid grid-cols-1 ${isLarge ? 'md:grid-cols-2' : ''} h-full`}>
                              <div className="relative h-80 md:h-auto overflow-hidden">
                                  <img alt={room.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={room.image || room.image_url} />
                                  {room.popular || room.is_popular && (
                                      <div className="absolute top-4 left-4 bg-primary text-on-primary px-4 py-1.5 text-[10px] font-bold tracking-widest uppercase rounded">Popular Choice</div>
                                  )}
                                  {(room.topTier || room.is_top_tier) && (
                                      <div className="absolute top-4 left-4 bg-secondary text-on-secondary px-4 py-1.5 text-[10px] font-bold tracking-widest uppercase rounded">Top Tier</div>
                                  )}
                              </div>
                              <div className={`p-10 flex flex-col justify-between ${!isLarge ? 'flex-grow' : ''}`}>
                                  <div>
                                      <h2 className={`font-headline text-on-surface mb-3 ${isLarge ? 'text-3xl' : 'text-2xl'}`}>{room.name}</h2>
                                      <p className="text-on-surface-variant font-body mb-8 leading-relaxed text-sm">{room.description}</p>

                                      <div className="flex flex-wrap gap-6 mb-8">
                                          {(room.amenities || ['WiFi', 'Climate Control']).map(amenity => (
                                              <div key={amenity} className="flex items-center gap-2">
                                                  <span className="material-symbols-outlined text-secondary text-xl">
                                                      {amenity.toLowerCase().includes('wifi') ? 'wifi' :
                                                       amenity.toLowerCase().includes('climate') || amenity.toLowerCase().includes('ac') ? 'ac_unit' :
                                                       amenity.toLowerCase().includes('service') || amenity.toLowerCase().includes('butler') ? 'room_service' :
                                                       amenity.toLowerCase().includes('bar') ? 'local_bar' :
                                                       amenity.toLowerCase().includes('shuttle') || amenity.toLowerCase().includes('transport') ? 'airport_shuttle' :
                                                       'check_circle'}
                                                  </span>
                                                  <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">{amenity}</span>
                                              </div>
                                          ))}
                                      </div>
                                  </div>
                                  <div className="flex items-end justify-between border-t border-outline-variant/15 pt-8">
                                      <div>
                                          <span className="text-[10px] font-bold text-on-surface-variant tracking-widest block uppercase mb-1">Nightly from</span>
                                          <span className="text-2xl font-headline text-primary">${room.price} <span className="text-sm font-body text-on-surface-variant font-normal">/ Night</span></span>
                                      </div>
                                      <button
                                          onClick={() => handleBook(room.name, room.price)}
                                          className="bg-secondary text-on-secondary px-8 py-3.5 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:brightness-110 transition-all shadow-lg"
                                      >
                                          Reserve
                                      </button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              )
          })}
        </div>
      </section>

      {/* Signature Amenities Teaser */}
      <section className="bg-surface-container-low py-20 px-8">
        <div className="max-w-screen-2xl mx-auto text-center mb-16">
          <h3 className="font-headline text-3xl mb-4">The Gloria Standard</h3>
          <p className="text-on-surface-variant max-w-xl mx-auto">Beyond four walls, we provide a curated sanctuary of services tailored to the discerning traveler.</p>
        </div>
        <div className="max-w-screen-2xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
              { icon: 'spa', label: 'Wellness Center' },
              { icon: 'pool', label: 'Infinity Pool' },
              { icon: 'restaurant_menu', label: 'Artisan Dining' },
              { icon: 'business_center', label: 'Concierge Elite' }
          ].map(amenity => (
            <div key={amenity.label} className="text-center group">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-editorial group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                <span className="material-symbols-outlined text-3xl">{amenity.icon}</span>
              </div>
              <span className="font-headline text-lg block text-primary">{amenity.label}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Rooms;

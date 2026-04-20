import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';
import SEO from '../components/SEO';

const Rooms = () => {
  const { addReservation, catalogRooms } = useHotel();
  const [successMessage, setSuccessMessage] = useState("");

  const handleBook = (roomName, price) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 4);

    addReservation({
      guest: "Guest from Web",
      room: roomName,
      amount: price,
      checkIn: tomorrow.toISOString().split('T')[0],
      checkOut: dayAfter.toISOString().split('T')[0]
    });
    setSuccessMessage(`Booking for ${roomName} requested!`);
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
        <div className="flex flex-col gap-32">
          {catalogRooms.map((room, index) => {
              const isEven = index % 2 === 0;
              return (
                  <div key={room.id} className={`grid grid-cols-1 lg:grid-cols-12 gap-16 items-center group`}>
                      <div className={`lg:col-span-7 ${isEven ? 'lg:order-1' : 'lg:order-2'} relative`}>
                          <div className="aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 group-hover:shadow-primary/5 border border-outline-variant/10">
                            <img alt={room.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" src={room.image || room.image_url} />
                            {(room.popular || room.is_popular) && (
                                <div className="absolute top-8 left-8 bg-primary/90 backdrop-blur-md text-on-primary px-6 py-2 text-[10px] font-bold tracking-[0.2em] uppercase rounded shadow-xl">Guest Favorite</div>
                            )}
                            {(room.topTier || room.is_top_tier) && (
                                <div className="absolute top-8 left-8 bg-secondary/90 backdrop-blur-md text-on-secondary px-6 py-2 text-[10px] font-bold tracking-[0.2em] uppercase rounded shadow-xl">Signature Sanctuary</div>
                            )}
                          </div>
                          <div className={`absolute -bottom-10 ${isEven ? '-right-10' : '-left-10'} hidden xl:flex w-40 h-40 bg-background border border-outline-variant/30 rounded-full items-center justify-center p-4 shadow-xl z-20 group-hover:scale-110 transition-transform`}>
                              <div className="text-center">
                                <p className="text-[8px] font-bold uppercase tracking-widest text-on-surface-variant mb-1">Nightly</p>
                                <p className="text-2xl font-serif text-primary">${room.price}</p>
                              </div>
                          </div>
                      </div>

                      <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'} space-y-8`}>
                          <div className="space-y-4">
                            <div className="flex items-center gap-4">
                              <div className="h-px w-8 bg-secondary opacity-50"></div>
                              <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.3em]">Accommodation</span>
                            </div>
                            <h2 className="font-headline text-5xl text-primary leading-tight">{room.name}</h2>
                            <p className="text-on-surface-variant font-body text-lg leading-relaxed opacity-80">{room.description}</p>
                          </div>

                          <div className="flex flex-wrap gap-x-8 gap-y-4 py-8 border-y border-outline-variant/15">
                              {(room.features || ['WiFi', 'Climate Control', 'Room Service']).slice(0, 4).map(amenity => (
                                  <div key={amenity} className="flex items-center gap-3">
                                      <span className="material-symbols-outlined text-secondary text-xl opacity-70">
                                          {amenity.toLowerCase().includes('wifi') ? 'wifi' :
                                           amenity.toLowerCase().includes('climate') || amenity.toLowerCase().includes('ac') ? 'ac_unit' :
                                           amenity.toLowerCase().includes('service') || amenity.toLowerCase().includes('butler') ? 'room_service' :
                                           'check_circle'}
                                      </span>
                                      <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{amenity}</span>
                                  </div>
                              ))}
                          </div>

                          <div className="flex items-center gap-6 pt-4">
                              <Link
                                to={`/rooms/${room.id}`}
                                className="flex-1 bg-primary text-on-primary px-8 py-4 rounded-xl font-bold uppercase text-[10px] tracking-[0.2em] text-center hover:brightness-110 transition-all shadow-xl hover:shadow-primary/20"
                              >
                                View Details
                              </Link>
                              <button
                                  onClick={() => handleBook(room.name, room.price)}
                                  className="flex-1 border border-outline text-on-surface-variant px-8 py-4 rounded-xl font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-surface-container-low transition-all"
                              >
                                Quick Book
                              </button>
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

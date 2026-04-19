import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';
import SEO from '../components/SEO';

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { catalogRooms, addReservation } = useHotel();
  const [room, setRoom] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [bookingStatus, setBookingStatus] = useState(null);

  useEffect(() => {
    const foundRoom = catalogRooms.find(r => r.id.toString() === id);
    if (foundRoom) {
      setRoom(foundRoom);
    }
  }, [id, catalogRooms]);

  if (!room) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-background">
        <h2 className="font-headline text-3xl text-primary mb-4">Finding Sanctuary...</h2>
        <p className="text-on-surface-variant mb-8">One moment while we prepare your room preview.</p>
        <Link to="/rooms" className="text-secondary font-bold uppercase tracking-widest text-[10px] hover:underline">Return to Collection</Link>
      </div>
    );
  }

  const images = [room.image_url || room.image, ...(room.gallery || [])].filter(Boolean);

  const handleBook = () => {
    addReservation({
      guest: "Guest from Web",
      room: room.name,
      amount: room.price,
      checkIn: "Oct 25",
      checkOut: "Oct 28"
    });
    setBookingStatus("Booking Request Sent!");
    setTimeout(() => setBookingStatus(null), 5000);
  };

  return (
    <main className="bg-background min-h-screen pb-24">
      <SEO title={`${room.name} | Gloria Hotel`} description={room.description} />

      {/* Navigation & Header */}
      <nav className="px-8 py-6 max-w-screen-2xl mx-auto flex items-center justify-between">
        <Link to="/rooms" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors group">
          <span className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1">arrow_back</span>
          <span className="text-[10px] font-bold uppercase tracking-widest">Back to Collection</span>
        </Link>
        <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Available Sanctuary</span>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
        </div>
      </nav>

      <section className="max-w-screen-2xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Gallery Section */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-outline-variant/10">
            <img
              src={images[activeImage]}
              alt={room.name}
              className="w-full h-full object-cover transition-all duration-700 animate-in fade-in"
            />
            {room.is_top_tier && (
               <div className="absolute top-6 left-6 bg-secondary text-on-secondary px-4 py-2 text-[10px] font-bold tracking-widest uppercase rounded shadow-lg">Signature Suite</div>
            )}
          </div>

          <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-secondary' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="lg:col-span-5 space-y-10">
          <div>
            <h1 className="font-headline text-5xl text-primary mb-4 leading-tight">{room.name}</h1>
            <p className="text-on-surface-variant font-body leading-relaxed text-lg italic opacity-80">
              "{room.description}"
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 py-8 border-y border-outline-variant/15">
            <div>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block mb-2 opacity-60">Nightly Rate</span>
              <span className="text-3xl font-serif text-primary">${room.price}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block mb-2 opacity-60">Status</span>
              <span className="text-lg font-headline text-emerald-700">Immediate Access</span>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">In-Room Curations</h3>
            <div className="grid grid-cols-2 gap-y-4">
              {(room.features || ['High-speed WiFi', 'Climate Control', 'Artisan Bathing Amenities', 'Mini Bar', 'Daily Housekeeping', '24/7 Concierge']).map(feature => (
                <div key={feature} className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-lg">check_circle</span>
                  <span className="text-sm font-body text-on-surface-variant">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-8">
            <button
              onClick={handleBook}
              disabled={!!bookingStatus}
              className="w-full bg-primary text-on-primary py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:brightness-110 transition-all shadow-2xl flex items-center justify-center gap-3"
            >
              {bookingStatus ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-sm">sync</span>
                  {bookingStatus}
                </>
              ) : (
                'Secure Reservation'
              )}
            </button>
            <p className="text-center text-[10px] text-on-surface-variant mt-4 uppercase tracking-widest font-bold opacity-40">Guaranteed best rate when booking direct</p>
          </div>
        </div>
      </section>

      {/* Editorial Quote */}
      <section className="mt-24 bg-surface-container-low py-20">
         <div className="max-w-3xl mx-auto text-center px-8">
            <span className="material-symbols-outlined text-4xl text-secondary mb-6 opacity-30">format_quote</span>
            <p className="font-serif text-2xl text-primary leading-relaxed mb-8">
              "We believe true luxury isn't about what you have, but about the peace you find. Our {room.name} was designed as a sanctuary for the modern soul."
            </p>
            <div className="h-px w-12 bg-secondary mx-auto mb-4"></div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant">Gloria Management</p>
         </div>
      </section>
    </main>
  );
};

export default RoomDetails;

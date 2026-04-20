import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';
import SEO from '../components/SEO';

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { catalogRooms, addReservation, roomReviews, addRoomReview, user, profile } = useHotel();
  const [room, setRoom] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [bookingStatus, setBookingStatus] = useState(null);

  const [reviewData, setReviewData] = useState({ rating: 5, comment: '', guestName: '' });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

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

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewData.comment) return;
    setIsSubmittingReview(true);
    await addRoomReview({
        roomId: room.id,
        rating: reviewData.rating,
        comment: reviewData.comment,
        guestName: reviewData.guestName
    });
    setReviewData({ rating: 5, comment: '', guestName: '' });
    setIsSubmittingReview(false);
  };

  const currentReviews = roomReviews.filter(rev => rev.room_id === room.id);

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
          <div className="relative aspect-[4/3] rounded-none overflow-hidden shadow-2xl border border-outline-variant/10">
            <img
              src={images[activeImage]}
              alt={room.name}
              className="w-full h-full object-cover transition-all duration-700 animate-in fade-in"
            />
            {room.is_top_tier && (
               <div className="absolute top-6 left-6 bg-secondary text-on-secondary px-4 py-2 text-[10px] font-bold tracking-widest uppercase rounded-none shadow-lg">Signature Suite</div>
            )}
          </div>

          <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`relative aspect-square rounded-none overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-secondary' : 'border-transparent opacity-60 hover:opacity-100'}`}
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
              className="w-full bg-primary text-on-primary py-5 rounded-none font-bold uppercase tracking-[0.2em] text-xs hover:brightness-110 transition-all shadow-2xl flex items-center justify-center gap-3"
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

      {/* Reviews Section */}
      <section className="mt-24 max-w-screen-2xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 border-t border-outline-variant/15 pt-24">
          <div className="lg:col-span-4 space-y-8">
              <h3 className="font-headline text-3xl text-primary mb-2">Guest Reflections</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-8">Hear from fellow travelers who have found sanctuary in our {room.name}.</p>

              <div className="bg-surface-container-low p-8 rounded-none border border-outline-variant/30 shadow-lg">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest mb-6 text-secondary">Share Your Experience</h4>
                  <form onSubmit={handleReviewSubmit} className="space-y-6">
                      {!user && (
                        <input
                            required
                            placeholder="Your Name"
                            className="w-full bg-background border-none border-b border-outline-variant/30 focus:border-secondary focus:ring-0 px-0 py-2 text-sm transition-all"
                            value={reviewData.guestName}
                            onChange={e => setReviewData({...reviewData, guestName: e.target.value})}
                        />
                      )}
                      <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map(star => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => setReviewData({...reviewData, rating: star})}
                                className={`material-symbols-outlined text-2xl transition-colors ${reviewData.rating >= star ? 'text-amber-500 fill-1' : 'text-on-surface-variant opacity-30'}`}
                                style={{ fontVariationSettings: reviewData.rating >= star ? "'FILL' 1" : "'FILL' 0" }}
                              >
                                star
                              </button>
                          ))}
                      </div>
                      <textarea
                          required
                          placeholder="Your thoughts..."
                          rows="4"
                          className="w-full bg-background border-none border-b border-outline-variant/30 focus:border-secondary focus:ring-0 px-0 py-2 text-sm transition-all resize-none"
                          value={reviewData.comment}
                          onChange={e => setReviewData({...reviewData, comment: e.target.value})}
                      />
                      <button
                        type="submit"
                        disabled={isSubmittingReview}
                        className="w-full bg-primary text-on-primary py-3 font-bold uppercase tracking-widest text-[10px] hover:brightness-110 transition-all shadow-xl disabled:opacity-50"
                      >
                        {isSubmittingReview ? 'Syncing...' : 'Post Reflection'}
                      </button>
                  </form>
              </div>
          </div>

          <div className="lg:col-span-8">
              <div className="space-y-12">
                  {currentReviews.length === 0 ? (
                      <div className="py-20 text-center border border-dashed border-outline-variant/30 rounded-none bg-surface-container-lowest">
                          <span className="material-symbols-outlined text-on-surface-variant opacity-20 text-5xl mb-4">rate_review</span>
                          <p className="text-on-surface-variant font-body italic">Be the first to leave a reflection on this sanctuary.</p>
                      </div>
                  ) : currentReviews.map(rev => (
                      <div key={rev.id} className="group border-b border-outline-variant/10 pb-12 last:border-0">
                          <div className="flex justify-between items-start mb-4">
                              <div>
                                  <h5 className="font-bold text-primary uppercase tracking-widest text-[10px] mb-1">{rev.guest_name}</h5>
                                  <div className="flex gap-0.5">
                                      {[...Array(5)].map((_, i) => (
                                          <span key={i} className={`material-symbols-outlined text-xs ${i < rev.rating ? 'text-amber-500' : 'text-on-surface-variant opacity-20'}`} style={{ fontVariationSettings: i < rev.rating ? "'FILL' 1" : "'FILL' 0" }}>star</span>
                                      ))}
                                  </div>
                              </div>
                              <span className="text-[10px] text-on-surface-variant opacity-40 font-bold uppercase tracking-tighter">
                                  {new Date(rev.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                              </span>
                          </div>
                          <p className="text-on-surface font-body leading-relaxed max-w-2xl opacity-80">
                              "{rev.comment}"
                          </p>
                      </div>
                  ))}
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

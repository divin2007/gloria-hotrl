import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import SEO from '../components/SEO';

const Rooms = () => {
  const { addReservation } = useHotel();
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
    <main className="relative">
      <SEO title="Rooms & Suites" description="Exquisite sanctuaries and luxurious suites in the heart of Kigali." />
      {successMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] bg-secondary text-on-secondary px-6 py-3 rounded-full shadow-2xl font-medium animate-bounce">
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
            <span className="text-secondary-fixed text-sm font-label tracking-[0.2em] mb-4 block uppercase">EXQUISITE SANCTUARIES</span>
            <h1 className="font-headline text-5xl md:text-7xl text-white leading-tight mb-6">Rest Refined.</h1>
            <p className="text-white/80 font-body text-lg max-w-xl leading-relaxed">Experience the pinnacle of hospitality in the heart of Kigali. Each room is a curated blend of Rwandan heritage and modern architectural grace.</p>
          </div>
        </div>
      </section>

      {/* Room Listing */}
      <section className="py-24 px-8 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Room 1: Standard King */}
          <div className="md:col-span-8 group">
            <div className="bg-surface-container-lowest rounded-xl overflow-hidden editorial-shadow transition-transform duration-500 hover:-translate-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-96 md:h-full overflow-hidden">
                  <img alt="Standard King" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFrpyURkjBqTpsTRQpX2-9-zX-hrs3IWU3r3dX6GOIJMRp3e2kY9L5f1Pay5fGDWzf1XhGNIL-pBuoW7-_77M1hhNgAy3ob_6T3zIqm-9SWKitblQ8JmBh82y87PDNXSNT5lq2rK2NCRelYpTOJU2BdgV7-7GH-X8sr490Vco2vg3ZFBvju7WEnsS3P6wlFngfuyc4zlc1N6ByO0LT8ViXD6I2eyFzh9LlWp8gdtkQefzKhWFbJhZRUgUeTA7vNdvMvRxrjB3UqYze"/>
                  <div className="absolute top-4 left-4 bg-primary text-on-primary px-4 py-1 text-[10px] font-label tracking-widest uppercase">Popular Choice</div>
                </div>
                <div className="p-10 flex flex-col justify-between">
                  <div>
                    <h2 className="font-headline text-3xl text-on-surface mb-2">Standard King</h2>
                    <p className="text-on-surface-variant font-body mb-6 leading-relaxed">A serene escape featuring artisanal textures and a signature King-sized mattress designed for restoration.</p>
                    <div className="flex flex-wrap gap-6 mb-8">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-xl">wifi</span>
                        <span className="text-xs font-label uppercase tracking-wider text-on-surface-variant">WiFi</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-xl">ac_unit</span>
                        <span className="text-xs font-label uppercase tracking-wider text-on-surface-variant">Climate Control</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-xl">room_service</span>
                        <span className="text-xs font-label uppercase tracking-wider text-on-surface-variant">Service</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-end justify-between border-t border-outline-variant/15 pt-6">
                    <div>
                      <span className="text-xs font-label text-on-surface-variant tracking-widest block uppercase">Starts from</span>
                      <span className="text-2xl font-headline text-primary">$180 <span className="text-sm font-body text-on-surface-variant">/ Night</span></span>
                    </div>
                    <button
                      onClick={() => handleBook("Standard King", 180)}
                      className="bg-secondary text-on-secondary px-8 py-3 rounded-lg font-medium text-sm hover:bg-on-secondary-fixed-variant transition-colors"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Room 2: Deluxe Suite */}
          <div className="md:col-span-4 group">
            <div className="bg-surface-container-lowest rounded-xl h-full overflow-hidden editorial-shadow transition-transform duration-500 hover:-translate-y-2 flex flex-col">
              <div className="relative h-72 overflow-hidden">
                <img alt="Deluxe Suite" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGD8oZOP6zoeRii_iKG8cj-JldLoCoz_MZM0R6pFI7kUBEk9wSmgdhkyLX2I7lhAf16zYaytzY1CSeHgRpVfhPESii4CCrFlqbhGp5Wi9BdXFToNvL1WV_NTxBConRxM3aWiiHlcvqZEkoHBJJvoTIfiivIcuY9tteks8_bn_dxA8N6Gnf22XcxVRDRB5v0WnGYTV7jd5SmdMi64BT-DOODRCaS915r-J5Fy0ZRlbdDU3NjB4LiQkjT2YsoCWUn19UAYB815ZSuWd5"/>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <h2 className="font-headline text-2xl text-on-surface mb-2">Deluxe Suite</h2>
                <p className="text-on-surface-variant text-sm font-body mb-6 leading-relaxed">Extended living spaces with panoramic views of the Kigali hills. Includes a private bar and lounge area.</p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary text-lg">check_circle</span>
                    <span className="text-sm text-on-surface">Complimentary Airport Shuttle</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary text-lg">check_circle</span>
                    <span className="text-sm text-on-surface">Luxury Bathing Amenities</span>
                  </div>
                </div>
                <div className="mt-auto border-t border-outline-variant/15 pt-6 flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-headline text-primary">$320</span>
                    <span className="text-xs font-body text-on-surface-variant block">Per Night</span>
                  </div>
                  <button
                    onClick={() => handleBook("Deluxe Suite", 320)}
                    className="text-secondary font-label text-sm uppercase tracking-widest border-b border-secondary/0 hover:border-secondary transition-all"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Room 3: Executive Penthouse */}
          <div className="md:col-span-12 group mt-8">
            <div className="bg-primary rounded-xl overflow-hidden editorial-shadow flex flex-col md:flex-row relative">
              <div className="absolute top-8 right-8 z-20 text-white flex flex-col items-end">
                <span className="text-secondary font-label tracking-[0.3em] uppercase text-xs mb-1">Top Tier</span>
                <div className="h-px w-24 bg-secondary"></div>
              </div>
              <div className="md:w-3/5 h-[500px] md:h-auto overflow-hidden relative">
                <img alt="Executive Penthouse" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-[2s]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWPfF7IR_DRXEuineYUYowxsJuAn6BAnxQb0vc5MmRMlMK4UaozSp1Gt2hm3FH9bcyyJcRZtQ4h6I5gBoPmofbB4figYECbyFZZ8mAkBO9wxdIfvRh5gH54U4dpM9SqAWXOrLaZHiLIAe0t_OK5l2L1_dSRqqIyPFys116B6TPJtrmPqBimQrLiFAB7df-D9NuVXo6g_EgVHT5Axil1CU5jKVShZlg9hdwYXM5tK4OOTyGp9v_6C2KGuOl0240bQNexZkwyqbSEQ6p"/>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary"></div>
              </div>
              <div className="md:w-2/5 p-12 flex flex-col justify-center bg-primary text-white">
                <h2 className="font-headline text-4xl mb-4">Executive Penthouse</h2>
                <p className="text-primary-fixed/80 font-body mb-8 leading-relaxed">The ultimate expression of luxury. A two-story residence with a private terrace, 24/7 personal butler service, and exclusive access to the Sky Lounge.</p>
                <div className="grid grid-cols-2 gap-4 mb-10">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary">concierge</span>
                    <span className="text-sm font-label tracking-wide">Personal Butler</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary">balcony</span>
                    <span className="text-sm font-label tracking-wide">Private Terrace</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary">local_bar</span>
                    <span className="text-sm font-label tracking-wide">Premium Bar</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary">restaurant</span>
                    <span className="text-sm font-label tracking-wide">In-Room Dining</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="text-center sm:text-left">
                    <span className="text-3xl font-headline text-secondary-fixed">$1,200</span>
                    <span className="text-xs block text-primary-fixed uppercase tracking-widest mt-1">Starting Nightly</span>
                  </div>
                  <button
                    onClick={() => handleBook("Executive Penthouse", 1200)}
                    className="w-full sm:w-auto bg-secondary text-on-secondary py-4 px-12 rounded-lg font-semibold hover:shadow-lg hover:shadow-black/20 transition-all"
                  >
                    Request Stay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Amenities Teaser */}
      <section className="bg-surface-container-low py-20 px-8">
        <div className="max-w-screen-2xl mx-auto text-center mb-16">
          <h3 className="font-headline text-3xl mb-4">The Gloria Standard</h3>
          <p className="text-on-surface-variant max-w-xl mx-auto">Beyond four walls, we provide a curated sanctuary of services tailored to the discerning traveler.</p>
        </div>
        <div className="max-w-screen-2xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 editorial-shadow">
              <span className="material-symbols-outlined text-primary text-3xl">spa</span>
            </div>
            <span className="font-headline text-lg block">Wellness Center</span>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 editorial-shadow">
              <span className="material-symbols-outlined text-primary text-3xl">pool</span>
            </div>
            <span className="font-headline text-lg block">Infinity Pool</span>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 editorial-shadow">
              <span className="material-symbols-outlined text-primary text-3xl">restaurant_menu</span>
            </div>
            <span className="font-headline text-lg block">Artisan Dining</span>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 editorial-shadow">
              <span className="material-symbols-outlined text-primary text-3xl">business_center</span>
            </div>
            <span className="font-headline text-lg block">Concierge Elite</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Rooms;

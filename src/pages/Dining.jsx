import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import SEO from '../components/SEO';

const Dining = () => {
  const { addReservation, catalogMenu, catalogDining } = useHotel();
  const [activeTab, setActiveTab] = useState('experience'); // 'experience' or 'menu'
  const [formData, setFormData] = useState({
    name: '',
    guests: '2 Guests',
    date: '',
    time: '19:00',
    requests: ''
  });
  const [success, setSuccess] = useState(false);

  const venue = catalogDining[0] || { name: "The Umurage Room", description: "Our flagship restaurant." };

  const handleSubmit = (e) => {
    e.preventDefault();
    addReservation({
      guest: formData.name,
      room: venue.name,
      type: "Dining",
      guests: parseInt(formData.guests),
      time: formData.time,
      date: formData.date,
      status: "Pending"
    }).then(({ error }) => {
      if (!error) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 5000);
        setFormData({ name: '', guests: '2 Guests', date: '', time: '19:00', requests: '' });
      } else {
        alert("Reservation failed: " + error.message);
      }
    });
  };

  const menuCategories = [
    { id: 'Food', label: 'Culinary Creations', icon: 'restaurant' },
    { id: 'Drink', label: 'Refreshments', icon: 'local_cafe' },
    { id: 'Alcohol', label: 'Spirits & Cellar', icon: 'local_bar' },
    { id: 'Special', label: 'Hotel Specials', icon: 'auto_awesome' }
  ];

  return (
    <main className="bg-background min-h-screen">
      <SEO title="Dining & Culinary Arts" description="A curated culinary journey blending Rwandan seasonal ingredients with international techniques." />

      {/* Hero Section */}
      <section className="relative h-[700px] flex items-center overflow-hidden hero-gradient">
        <div className="absolute inset-0 opacity-40">
          <img className="w-full h-full object-cover" alt="Luxury restaurant" src={venue.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuAu9S8A2cR6MUK0t-LsP5_w6FQLSwjZbDhbLaMIBwN9n6K1Nwb8Mu0JjvpKyg78CixqNRXJHDKeKpM4ycMlirSPm3Bb5UMU6fgpbumwl7Z5y6xu3rZ0FeGboQGjq2UdED9696rNsNrC3MAnxBGGedXDRtcKjfOSO7DLdE32nbVMRxdoIEm7Ni58fq7PMaBQFdd24Peu4VbYzRitdb3Ewe6y7inoUFYQ6iHqjPiUzBul_qksRuxKZBbCFZidC7eb4YGHsltHADwMwddN"}/>
        </div>
        <div className="relative max-w-screen-2xl mx-auto px-8 w-full text-center">
          <div className="max-w-4xl mx-auto">
            <span className="text-secondary font-label tracking-[0.2em] mb-6 block uppercase text-sm">Epicurean Excellence</span>
            <h1 className="font-headline text-white text-6xl md:text-8xl leading-tight mb-8">Taste of the <br/><span className="italic">Thousand Hills</span></h1>

            <div className="flex justify-center gap-6">
              <button
                onClick={() => setActiveTab('experience')}
                className={`px-8 py-4 rounded-lg font-bold uppercase text-xs tracking-widest transition-all ${activeTab === 'experience' ? 'bg-secondary text-on-secondary shadow-xl' : 'bg-white/10 text-white backdrop-blur-md hover:bg-white/20'}`}
              >
                The Experience
              </button>
              <button
                onClick={() => setActiveTab('menu')}
                className={`px-8 py-4 rounded-lg font-bold uppercase text-xs tracking-widest transition-all ${activeTab === 'menu' ? 'bg-secondary text-on-secondary shadow-xl' : 'bg-white/10 text-white backdrop-blur-md hover:bg-white/20'}`}
              >
                View Menu
              </button>
            </div>
          </div>
        </div>
      </section>

      {activeTab === 'experience' ? (
        <>
          <section className="py-24 px-8">
            <div className="max-w-screen-2xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
                <div className="md:col-span-5 flex flex-col justify-center">
                  <h2 className="font-headline text-primary text-4xl md:text-5xl mb-6">{venue.name}</h2>
                  <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
                    {venue.description} Our flagship venue offers a sophisticated atmosphere defined by hand-carved woodwork and panoramic views of the hills.
                  </p>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 text-on-surface p-4 rounded-xl bg-surface-container-low">
                      <span className="material-symbols-outlined text-secondary text-3xl">schedule</span>
                      <div className="font-body">
                        <p className="font-semibold">Operating Hours</p>
                        <p className="text-sm text-on-surface-variant">{venue.hours || "06:30 AM — 11:00 PM"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-on-surface p-4 rounded-xl bg-surface-container-low">
                      <span className="material-symbols-outlined text-secondary text-3xl">restaurant_menu</span>
                      <div className="font-body">
                        <p className="font-semibold">Dinner Service</p>
                        <p className="text-sm text-on-surface-variant">Formal Attire Recommended</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-7 grid grid-cols-2 gap-4">
                  <div className="rounded-xl overflow-hidden h-96 shadow-ambient">
                    <img className="w-full h-full object-cover" alt="Gourmet dish" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEHkrDss2l38B4-Wv8vw_5VwA2UD7r1nfTjZbFo2Le4rMy_-D07brhVpbZj9iS1d0MlKNF1jzjDjMpda4InKv6q75A1_xjN88NFlfLLR9N0nfSPKJwgbJWzfGaJjJZOeGVLSmmDZOIQaxeSrm3WJFurfEse0c0BCgrohmwEx2lxNl_7547KCF1-q2Z12vIhR-1kyd1TO2t3xVO4csDnvD9ZCYIxcL8v-RaIC2m0aj4Rcxi4z7AVzR0x1k9fDrKe9m_vksKYaM6V1nd"/>
                  </div>
                  <div className="rounded-xl overflow-hidden h-[30rem] mt-12 shadow-ambient">
                    <img className="w-full h-full object-cover" alt="Bar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNmML1are6mdjF-v958rkhDZ7ywsu5OxAsQgof1vq8mBQjEmKbVl1M_AIiy3jTl4Z084b7s6fsnfTtHhXcgbn8BdaAalqfNvB1H66CDW9O6kWRW1jwKaiZugio5kLQBlhfcpXgx0pkf8AY6Ku-3ikav-2GTEIeUU00ZWBxfQuwlQFjFIlnIj1UUuWnOJaTsxrUTjPJjhJ6AaRdrn5FlsA8_xTQ0bvhnIrNJ6Wd737grEGm-diWuf_HXR0Hj1D7CypXbp5PSvBd8maP"/>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-24 bg-surface-container-low" id="reserve">
            <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <img className="w-full aspect-[4/5] object-cover rounded-xl shadow-ambient" alt="Private dining" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCldaRybNsCnIFnr_ZROwcdhkGpzDmxbQbwaTc11pSdJ5iWulRQ2rAUjNcwsDIpLUiG3PtUaaey4K5JdTfMIybGDuWp4rB6XDYDSXCqsIZt11bef4yzoCu7Gm5cZsVtN9eh8Z3Qsrzq4TQEeuOGQbgRKfkSVn9jr_g5Ns3xjoabX1tfDCKUyhNBg8ZhWr3KK6cygnuRUVjTt4Qg9vq3-s2mxnjxc4lFewzVwRBZIADhbVfE9UbCN5pTcpEKFFDI36y1L7Dqpb3nRjog"/>
                <div className="absolute -bottom-8 -right-8 bg-primary p-8 rounded-lg text-white hidden md:block max-w-xs shadow-ambient">
                  <p className="font-headline text-xl mb-2">Private Dining</p>
                  <p className="text-sm text-surface-variant mb-4 leading-relaxed">Host your intimate gatherings in our secluded Ivory Suite for groups up to 12.</p>
                  <a className="text-secondary font-medium text-sm flex items-center gap-2" href="#">Inquire Now <span className="material-symbols-outlined text-sm">open_in_new</span></a>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-10 border border-outline-variant/30 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary opacity-[0.03] translate-x-1/2 -translate-y-1/2 rounded-full"></div>

                <h2 className="font-headline text-4xl text-primary mb-2">Reserve a Table</h2>
                <p className="text-on-surface-variant text-sm mb-10 opacity-70">Experience culinary mastery. Select your preferred evening.</p>

                {success ? (
                  <div className="py-12 text-center animate-in fade-in zoom-in duration-500">
                    <span className="material-symbols-outlined text-secondary text-6xl mb-6">workspace_premium</span>
                    <h3 className="font-headline text-2xl text-primary mb-2">Inquiry Received</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed">Our concierge will verify table availability and contact you shortly to confirm your booking.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold tracking-[0.2em] text-on-surface-variant uppercase opacity-50">Guest Name</label>
                      <input
                        required
                        className="w-full bg-surface-container-low border border-outline-variant/30 focus:border-secondary focus:ring-1 focus:ring-secondary/20 px-5 py-4 text-sm transition-all font-medium"
                        placeholder="Johnathan Doe"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-[0.2em] text-on-surface-variant uppercase opacity-50">Party Size</label>
                        <select
                          className="w-full bg-surface-container-low border border-outline-variant/30 focus:border-secondary focus:ring-1 focus:ring-secondary/20 px-5 py-4 text-sm transition-all font-medium"
                          value={formData.guests}
                          onChange={(e) => setFormData({...formData, guests: e.target.value})}
                        >
                          <option>1 Guest</option>
                          <option>2 Guests</option>
                          <option>4 Guests</option>
                          <option>6 Guests</option>
                          <option>8+ Guests</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-[0.2em] text-on-surface-variant uppercase opacity-50">Preferred Date</label>
                        <input
                          required
                          className="w-full bg-surface-container-low border border-outline-variant/30 focus:border-secondary focus:ring-1 focus:ring-secondary/20 px-5 py-4 text-sm transition-all font-medium"
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({...formData, date: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-[0.2em] text-on-surface-variant uppercase opacity-50">Requested Time</label>
                        <select
                          className="w-full bg-surface-container-low border border-outline-variant/30 focus:border-secondary focus:ring-1 focus:ring-secondary/20 px-5 py-4 text-sm transition-all font-medium"
                          value={formData.time}
                          onChange={(e) => setFormData({...formData, time: e.target.value})}
                        >
                          <option>18:30</option>
                          <option>19:00</option>
                          <option>19:30</option>
                          <option>20:00</option>
                          <option>20:30</option>
                          <option>21:00</option>
                        </select>
                      </div>
                    <button className="w-full bg-primary text-on-primary py-5 font-bold uppercase tracking-[0.2em] text-xs hover:brightness-110 transition-all shadow-2xl hover:shadow-primary/20" type="submit">
                        Secure Table Inquiry
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="py-24 px-8 max-w-screen-2xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-secondary font-label tracking-widest text-xs uppercase mb-4 block">Seasonal Selection</span>
            <h2 className="font-headline text-primary text-5xl">Curated Menu</h2>
            <p className="mt-4 text-on-surface-variant italic max-w-2xl mx-auto">"A dialogue between the fertile soils of Musanze and global gastronomy."</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {menuCategories.map(cat => (
              <div key={cat.id} className="space-y-8">
                <div className="border-b border-outline-variant/30 pb-4 flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary">{cat.icon}</span>
                  <h3 className="font-headline text-2xl text-primary">{cat.label}</h3>
                </div>
                <div className="space-y-10">
                  {catalogMenu.filter(item => item.category === cat.id).map(item => (
                    <div key={item.id} className="group">
                      {(item.image || item.image_url) && (
                        <div className="aspect-video mb-4 overflow-hidden rounded-xl shadow-sm">
                          <img
                            src={item.image || item.image_url}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                      )}
                      <div className="flex justify-between items-baseline mb-2">
                        <h4 className="font-body font-bold text-on-surface group-hover:text-secondary transition-colors">{item.name}</h4>
                        <span className="text-secondary font-bold text-sm shrink-0 ml-4">{item.price}</span>
                      </div>
                      <p className="text-sm text-on-surface-variant leading-relaxed">{item.description}</p>
                      {item.subcategory && (
                          <span className="inline-block mt-3 px-2 py-0.5 bg-surface-container-high text-[10px] font-bold uppercase tracking-widest text-on-surface-variant rounded">
                              {item.subcategory}
                          </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 p-12 bg-primary rounded-3xl text-on-primary flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl overflow-hidden relative">
              <div className="relative z-10">
                  <h3 className="font-headline text-3xl mb-2">Sommelier's Reserve</h3>
                  <p className="opacity-70 max-w-md">Our cellar houses over 200 rare vintages curated to complement our pan-African flavor profiles. Inquire for our full wine list.</p>
              </div>
              <button className="relative z-10 bg-secondary text-on-secondary px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:brightness-110 transition-all shadow-lg shrink-0">
                  View Private Cellar
              </button>
              <div className="absolute top-0 right-0 opacity-10 scale-150 translate-x-1/4 translate-y-1/4">
                  <span className="material-symbols-outlined text-[300px]">wine_bar</span>
              </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default Dining;

import React, { useState } from 'react';
import SEO from '../components/SEO';

const Gallery = () => {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Suites', 'Dining', 'Events', 'Wellness', 'Architecture'];

  const images = [
    {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFrpyURkjBqTpsTRQpX2-9-zX-hrs3IWU3r3dX6GOIJMRp3e2kY9L5f1Pay5fGDWzf1XhGNIL-pBuoW7-_77M1hhNgAy3ob_6T3zIqm-9SWKitblQ8JmBh82y87PDNXSNT5lq2rK2NCRelYpTOJU2BdgV7-7GH-X8sr490Vco2vg3ZFBvju7WEnsS3P6wlFngfuyc4zlc1N6ByO0LT8ViXD6I2eyFzh9LlWp8gdtkQefzKhWFbJhZRUgUeTA7vNdvMvRxrjB3UqYze',
      cat: 'Suites',
      title: 'Standard King'
    },
    {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGD8oZOP6zoeRii_iKG8cj-JldLoCoz_MZM0R6pFI7kUBEk9wSmgdhkyLX2I7lhAf16zYaytzY1CSeHgRpVfhPESii4CCrFlqbhGp5Wi9BdXFToNvL1WV_NTxBConRxM3aWiiHlcvqZEkoHBJJvoTIfiivIcuY9tteks8_bn_dxA8N6Gnf22XcxVRDRB5v0WnGYTV7jd5SmdMi64BT-DOODRCaS915r-J5Fy0ZRlbdDU3NjB4LiQkjT2YsoCWUn19UAYB815ZSuWd5',
      cat: 'Suites',
      title: 'Deluxe Suite Living'
    },
    {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWPfF7IR_DRXEuineYUYowxsJuAn6BAnxQb0vc5MmRMlMK4UaozSp1Gt2hm3FH9bcyyJcRZtQ4h6I5gBoPmofbB4figYECbyFZZ8mAkBO9wxdIfvRh5gH54U4dpM9SqAWXOrLaZHiLIAe0t_OK5l2L1_dSRqqIyPFys116B6TPJtrmPqBimQrLiFAB7df-D9NuVXo6g_EgVHT5Axil1CU5jKVShZlg9hdwYXM5tK4OOTyGp9v_6C2KGuOl0240bQNexZkwyqbSEQ6p',
      cat: 'Suites',
      title: 'Penthouse View'
    },
    {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDL8d_ngibW6yrtlFn0ZWyRAw5gUUaW7xAC-Geo403qS13OuddQx2gmSycWTCJoGlBMmyFVMW9RTlyFM-dLkFEmfxDG3CrPZgXdasMveA6SjMSm9U9LfyRMWs1xEJ7iScU1_1-2NMKC2c0N02qj16F_vpajkqcC2ffI3S1KFcgHTsY2NU9PzzSbTOrW08np2IHJp8x7Ym61pTalWcPkjzyHTXYYBGCPRJHbfSbj9l73b7lqGJ7a1Ep7W_O0vu2BEKjpd5RsCxGIMdg0',
      cat: 'Dining',
      title: 'The Summit Interior'
    },
    {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8c-IN2J2LdmBx_9o_bE9ves6tCnN05uk8CmKp6TxDHNDaA7f04DfK7_8TfX8X53m0n4ogkAvqqT-5WlPID3fDgSWzN43ZXiVEYG5TmO14CJXWsEVMRi-mVBT5L_QQoOD9B-eophfrJl9k3y3PNp45n6eKKLqXE82Luvnx9W5RFsGc3GmGxjCmQV9bTZJzyfxBE0dpF5AX0yjUTNAS5CLdM9ZTGpbWVuyGcAp-VY4pRvXrnrN9KNBpwDJsCEyncW-2S9qXUWcsGs_-',
      cat: 'Dining',
      title: 'Gourmet Selection'
    },
    {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiF2tF8H3VepaVqJ28vg2_1zGplP2Q78r5d2ENONNxOqgKSgOHjtYx3nJ8RFqm5WvfOE8-flossu2Brz1y5DYG2-ikT3wbtadDvx-PGGnf-kCYdGdavIJylgRxVWbNs6baHomgNn_-qifLBQTLsTH9DL-AV8DUmRCiogMf7hps7Ie-i1ejQF-AiG_9M9v6UIh0E0ioEKLm7twebloBB-O-QzAllxG6d3e64-zU4vSP9zx3m0-ZB8qc3nPM6KorVUeOJU_mcgCNYv69',
      cat: 'Events',
      title: 'Virunga Ballroom'
    },
    {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1kfqXw-qY06yFCxjo-et-ciQr3teyZj6Umkc_uOruw5bxHlfLLXzOP3UGoorOBNOaEbmoFlNzLG8IFjYoKRE0g7s_YxfZ3nmFOZ6oh555fVJR8I7T0oncYTnMYh2T2Z99wum4YMkO69pIBAecPTjZDqYPTXTXNwetQE0VeaWutY4RWK1QYz-cMJlK3qQmLdTbRjILF6K1Fw3fte_Ehd2IqhOPSQlf4ifhASU3PDwMP-y4-iCWKxMuOaCKpjX_KCNgspz0umScQAk-',
      cat: 'Events',
      title: 'Skyline Terrace'
    },
    {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQP-LeiIOyKIiBfzOtA1C8Fu3FytsKIKwV8Aa84RgbS4Qm6EMtK-K1NoHVmT6bf7R12ig9NXR3GXZypfUvQqK4vXpYofm14Scal8Fh44XPri3W6puWqR1u2y8q-4IukdifMN8ggnoY4LT188FaT4c5JNN22xgm4IThRtBopTKxF4N60KrLPuKd_ZSY2rBOH3PxCtbuyEEOOmeWExu0MWr4kHQ9qZOpuIpsfaV5CEePkkUpufkkliSzeAMHwug95RhLWfAmoB6sO_cR',
      cat: 'Architecture',
      title: 'The Grand Lobby'
    },
    {
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZ3t_lbFvwggJ4h_f6jYXnlfbH0Cz6JCjC0CIwEFfEpec30as6vrDqW9azqEC-U8pYwUqdpQA3kEiYNdNlGDaNYHUPCPDVP0TvsNepwkuW2AjCQSaf-FEG4LjS22jxOVKX6EH1x5csjRLdZUszQmQTsxX71lsbMCTbbGAqRfdhXMDSr9cxZ6-qoWT3DmZdG9pjYiZ0wJfWO7zZujfXbz6NhKxKjcN7cW58gXCgkyFxLpxTQyR0LVRuKM9Pmr1igxGxguD6Oxfa1E2T',
      cat: 'Wellness',
      title: 'Wellness Sanctuary'
    }
  ];

  const filteredImages = filter === 'All' ? images : images.filter(img => img.cat === filter);

  return (
    <div className="bg-background min-h-screen">
      <SEO title="Visual Gallery" description="Explore the exquisite sanctuaries and culinary wonders of Gloria Hotel through our visual narrative." />

      <section className="pt-32 pb-20 px-8 text-center max-w-screen-xl mx-auto">
        <span className="text-secondary font-label tracking-[0.3em] uppercase text-xs mb-4 block">Visual Narrative</span>
        <h1 className="font-headline text-5xl md:text-7xl text-primary mb-8 tracking-tight">Exquisite <span className="italic font-normal">Glimpses</span></h1>
        <div className="w-24 h-px bg-secondary mx-auto mb-8"></div>
        <p className="text-on-surface-variant max-w-2xl mx-auto leading-relaxed text-lg font-body opacity-80">
          A curated collection of moments from across our sanctuary. Experience the "Quiet Authority" of Kigali's premier hospitality destination.
        </p>
      </section>

      <section className="px-8 pb-32 max-w-screen-2xl mx-auto">
        <div className="flex flex-wrap justify-center gap-8 mb-20">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-sm font-label tracking-widest uppercase pb-2 transition-all border-b-2 ${
                filter === cat
                ? 'text-secondary border-secondary'
                : 'text-on-surface-variant/40 border-transparent hover:text-on-surface-variant'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {filteredImages.map((img, idx) => (
            <div
              key={idx}
              className="group relative aspect-[4/5] overflow-hidden bg-surface-container-high cursor-crosshair transition-all duration-700"
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center text-white p-8">
                <span className="text-[10px] font-label tracking-[0.4em] uppercase mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{img.cat}</span>
                <h3 className="font-headline text-2xl text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{img.title}</h3>
                <div className="w-12 h-px bg-secondary mt-6 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-150"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Aesthetic Quote Section */}
      <section className="py-32 bg-primary text-white text-center px-8">
        <div className="max-w-3xl mx-auto">
          <span className="material-symbols-outlined text-secondary text-5xl mb-8 opacity-50">auto_awesome</span>
          <blockquote className="font-headline text-3xl md:text-4xl leading-snug italic opacity-90">
            "Every frame tells a story of Rwandan heritage blended with modern architectural grace."
          </blockquote>
          <cite className="not-italic block mt-8 font-label tracking-widest uppercase text-xs text-secondary-fixed">Gloria Editorial Team</cite>
        </div>
      </section>
    </div>
  );
};

export default Gallery;

import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 px-8 bg-background">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <span className="text-secondary font-label tracking-[0.2em] mb-4 block uppercase text-sm">Get in Touch</span>
            <h1 className="font-headline text-5xl text-primary mb-8">Contact Us</h1>
            <p className="text-on-surface-variant text-lg leading-relaxed mb-12">
              Our concierge team is dedicated to making your stay exceptional. Whether you have questions about a booking, special requests, or need recommendations in Kigali, we are here to assist.
            </p>

            <div className="space-y-8">
              <div className="flex gap-6">
                <span className="material-symbols-outlined text-secondary text-3xl">location_on</span>
                <div>
                  <h3 className="font-headline text-xl text-primary mb-1">Address</h3>
                  <p className="text-on-surface-variant">Plot 24, KN 29 St, Kigali, Rwanda</p>
                </div>
              </div>
              <div className="flex gap-6">
                <span className="material-symbols-outlined text-secondary text-3xl">call</span>
                <div>
                  <h3 className="font-headline text-xl text-primary mb-1">Reservations</h3>
                  <p className="text-on-surface-variant">+250 788 123 456</p>
                </div>
              </div>
              <div className="flex gap-6">
                <span className="material-symbols-outlined text-secondary text-3xl">mail</span>
                <div>
                  <h3 className="font-headline text-xl text-primary mb-1">Email</h3>
                  <p className="text-on-surface-variant">stay@gloriakigali.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-xl editorial-shadow">
            <h2 className="font-headline text-2xl text-primary mb-6">Send a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-label text-xs tracking-wider text-on-surface-variant uppercase">Name</label>
                  <input className="w-full bg-surface-container-high border-none border-b-2 border-transparent focus:border-secondary focus:ring-0 rounded-t-lg px-4 py-3 font-body" type="text" placeholder="Your Name" />
                </div>
                <div className="space-y-2">
                  <label className="font-label text-xs tracking-wider text-on-surface-variant uppercase">Email</label>
                  <input className="w-full bg-surface-container-high border-none border-b-2 border-transparent focus:border-secondary focus:ring-0 rounded-t-lg px-4 py-3 font-body" type="email" placeholder="Email Address" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-label text-xs tracking-wider text-on-surface-variant uppercase">Subject</label>
                <input className="w-full bg-surface-container-high border-none border-b-2 border-transparent focus:border-secondary focus:ring-0 rounded-t-lg px-4 py-3 font-body" type="text" placeholder="How can we help?" />
              </div>
              <div className="space-y-2">
                <label className="font-label text-xs tracking-wider text-on-surface-variant uppercase">Message</label>
                <textarea className="w-full bg-surface-container-high border-none border-b-2 border-transparent focus:border-secondary focus:ring-0 rounded-t-lg px-4 py-3 font-body" rows="5" placeholder="Your message..."></textarea>
              </div>
              <button className="w-full bg-primary text-on-primary py-4 rounded-lg font-medium hover:bg-primary-container transition-all">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

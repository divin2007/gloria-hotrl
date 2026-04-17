import React from 'react';

const Terms = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <span className="text-secondary font-label tracking-[0.2em] mb-4 block uppercase text-sm">Agreement</span>
        <h1 className="font-headline text-5xl text-primary mb-12">Terms of Service</h1>

        <div className="space-y-12 text-on-surface-variant leading-relaxed font-body">
          <section>
            <h2 className="text-primary font-headline text-2xl mb-4">1. Booking & Cancellation</h2>
            <p>All reservations must be guaranteed with a valid credit card. Cancellations must be made at least 48 hours prior to arrival to avoid a penalty of one night's room charge plus tax.</p>
          </section>

          <section>
            <h2 className="text-primary font-headline text-2xl mb-4">2. Check-in & Check-out</h2>
            <p>Check-in time is 3:00 PM and check-out time is 11:00 AM. Early check-in or late check-out is subject to availability and may incur additional charges.</p>
          </section>

          <section>
            <h2 className="text-primary font-headline text-2xl mb-4">3. Guest Conduct</h2>
            <p>Gloria Hotel maintains a smoke-free environment. Guests are expected to respect the tranquility of other guests and the property. Any damage to hotel property will be charged to the guest's account.</p>
          </section>

          <section>
            <h2 className="text-primary font-headline text-2xl mb-4">4. Liability</h2>
            <p>The hotel is not responsible for any personal items left in rooms. Safes are provided in each room for the security of valuables.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;

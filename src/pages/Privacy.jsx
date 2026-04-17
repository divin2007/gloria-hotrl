import React from 'react';

const Privacy = () => {
  return (
    <div className="min-h-screen pt-32 pb-24 px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <span className="text-secondary font-label tracking-[0.2em] mb-4 block uppercase text-sm">Transparency</span>
        <h1 className="font-headline text-5xl text-primary mb-12">Privacy Policy</h1>

        <div className="space-y-12 text-on-surface-variant leading-relaxed font-body">
          <section>
            <h2 className="text-primary font-headline text-2xl mb-4">1. Data Collection</h2>
            <p>At Gloria Hotel, we are committed to protecting the privacy of our guests. We collect personal information during the booking process, check-in, and through your interactions with our website to provide a personalized hospitality experience.</p>
          </section>

          <section>
            <h2 className="text-primary font-headline text-2xl mb-4">2. Usage of Information</h2>
            <p>Your data is used to manage your reservations, process payments, and improve our services. We may also use your contact information to send you news and offers related to Gloria Hotel, which you can opt out of at any time.</p>
          </section>

          <section>
            <h2 className="text-primary font-headline text-2xl mb-4">3. Data Security</h2>
            <p>We implement robust technical and organizational measures to safeguard your personal data against unauthorized access, disclosure, or destruction. Your financial information is encrypted using industry-standard protocols.</p>
          </section>

          <section>
            <h2 className="text-primary font-headline text-2xl mb-4">4. Third Parties</h2>
            <p>We do not sell your data. We only share information with trusted partners (such as payment processors and housekeeping software) necessary to fulfill our service obligations to you.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;

import React, { useContext } from 'react';
import { HotelContext } from '../context/HotelContext';
import Sidebar from '../components/Sidebar';

const AdminReservations = () => {
  const {
    reservations,
    diningReservations,
    eventInquiries,
    loading,
    updateReservationStatus
  } = useContext(HotelContext);

  return (
    <div className="flex bg-background min-h-screen font-body text-on-surface">
      <Sidebar active="reservations" />
      <main className="flex-1 ml-64 p-8 lg:p-12 overflow-y-auto">
        <header className="mb-12">
          <h1 className="font-headline text-4xl text-primary mb-2">Reservations Manifest</h1>
          <p className="text-on-surface-variant font-body tracking-wide opacity-80 uppercase text-[10px] font-bold">Full master list of guest bookings across all channels.</p>
        </header>

        <div className="space-y-16">
          {/* Room Reservations */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-headline text-2xl text-primary">Room Bookings</h2>
              <span className="bg-secondary/10 text-secondary px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest">{reservations.length} Active</span>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden shadow-editorial">
              <table className="w-full text-left">
                <thead className="bg-surface-container-low/30 border-b border-outline-variant/15">
                  <tr className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
                    <th className="px-8 py-4">Guest</th>
                    <th className="px-8 py-4">Room Type</th>
                    <th className="px-8 py-4">Dates</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4 text-right">Total</th>
                    <th className="px-8 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {loading ? (
                    <tr><td colSpan="6" className="px-8 py-10 text-center text-on-surface-variant italic">Loading manifest...</td></tr>
                  ) : reservations.length > 0 ? reservations.map((res) => (
                    <tr key={res.id} className="hover:bg-surface-container-low/20 transition-colors">
                      <td className="px-8 py-5 text-sm text-on-surface font-bold">{res.name}</td>
                      <td className="px-8 py-5 text-sm text-on-surface-variant font-medium">{res.roomType}</td>
                      <td className="px-8 py-5 text-sm text-on-surface-variant font-medium">{res.dates}</td>
                      <td className="px-8 py-5">
                        <span className={`inline-flex px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                          res.status === 'Settled' ? 'bg-emerald-50 text-emerald-700' :
                          res.status === 'Cancelled' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'
                        }`}>
                          {res.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-sm text-on-surface text-right font-serif font-bold">{res.price}</td>
                      <td className="px-8 py-5 text-right">
                        {res.status === 'Pending' && (
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => updateReservationStatus(res.id, 'Settled')}
                              className="text-[10px] font-bold uppercase tracking-tighter text-emerald-600 hover:text-emerald-800"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => updateReservationStatus(res.id, 'Cancelled')}
                              className="text-[10px] font-bold uppercase tracking-tighter text-red-600 hover:text-red-800"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan="5" className="px-8 py-10 text-center text-on-surface-variant italic">No room reservations found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Dining Reservations */}
          <section>
            <h2 className="font-headline text-2xl text-primary mb-6">Dining Bookings</h2>
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden shadow-editorial">
              <table className="w-full text-left">
                <thead className="bg-surface-container-low/30 border-b border-outline-variant/15">
                  <tr className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
                    <th className="px-8 py-4">Guest</th>
                    <th className="px-8 py-4">Venue</th>
                    <th className="px-8 py-4">Time</th>
                    <th className="px-8 py-4">Guests</th>
                    <th className="px-8 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {diningReservations.map((res) => (
                    <tr key={res.id} className="hover:bg-surface-container-low/20 transition-colors">
                      <td className="px-8 py-5 text-sm text-on-surface font-bold">{res.name}</td>
                      <td className="px-8 py-5 text-sm text-on-surface-variant font-medium">{res.venue}</td>
                      <td className="px-8 py-5 text-sm text-on-surface-variant font-medium">{res.time}</td>
                      <td className="px-8 py-5 text-sm text-on-surface-variant font-medium">{res.guests}</td>
                      <td className="px-8 py-5">
                        <span className={`inline-flex px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                          res.status === 'Settled' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                        }`}>
                          {res.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Event Inquiries */}
          <section>
            <h2 className="font-headline text-2xl text-primary mb-6">Event Inquiries</h2>
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden shadow-editorial">
              <table className="w-full text-left">
                <thead className="bg-surface-container-low/30 border-b border-outline-variant/15">
                  <tr className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
                    <th className="px-8 py-4">Client</th>
                    <th className="px-8 py-4">Event Type</th>
                    <th className="px-8 py-4">Attendees</th>
                    <th className="px-8 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {eventInquiries.map((res) => (
                    <tr key={res.id} className="hover:bg-surface-container-low/20 transition-colors">
                      <td className="px-8 py-5 text-sm text-on-surface font-bold">{res.name}</td>
                      <td className="px-8 py-5 text-sm text-on-surface-variant font-medium">{res.type}</td>
                      <td className="px-8 py-5 text-sm text-on-surface-variant font-medium">{res.guests}</td>
                      <td className="px-8 py-5">
                        <span className="inline-flex px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest bg-amber-50 text-amber-700">
                          {res.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminReservations;

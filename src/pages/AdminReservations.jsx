import React, { useContext } from 'react';
import { HotelContext } from '../context/HotelContext';
import Sidebar from '../components/Sidebar';

const AdminReservations = () => {
  const { reservations, diningReservations, eventInquiries } = useContext(HotelContext);

  return (
    <div className="flex h-screen overflow-hidden bg-primary">
      <Sidebar active="reservations" />
      <main className="flex-1 ml-64 overflow-y-auto p-10">
        <header className="mb-12">
          <h1 className="font-headline text-4xl text-secondary-fixed mb-2">Reservations Manifest</h1>
          <p className="text-on-primary-container font-body tracking-wide opacity-80">Full overview of guest bookings across all departments.</p>
        </header>

        <div className="space-y-12">
          {/* Room Reservations */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-headline text-2xl text-surface-bright">Room Bookings</h2>
              <span className="bg-primary-container text-secondary-fixed-dim px-3 py-1 rounded text-xs font-bold uppercase">{reservations.length} Active</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-950 border-b border-slate-800">
                  <tr className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                    <th className="px-8 py-4">Guest</th>
                    <th className="px-8 py-4">Room Type</th>
                    <th className="px-8 py-4">Dates</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {reservations.map((res) => (
                    <tr key={res.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-8 py-4 text-sm text-slate-300 font-medium">{res.name}</td>
                      <td className="px-8 py-4 text-sm text-slate-400">{res.roomType}</td>
                      <td className="px-8 py-4 text-sm text-slate-400">{res.dates}</td>
                      <td className="px-8 py-4">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tighter ${
                          res.status === 'Approved' ? 'bg-blue-900/40 text-blue-300' : 'bg-amber-900/40 text-amber-300'
                        }`}>
                          {res.status}
                        </span>
                      </td>
                      <td className="px-8 py-4 text-sm text-slate-200 text-right font-serif">{res.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Dining Reservations */}
          <section>
            <h2 className="font-headline text-2xl text-surface-bright mb-6">Dining Bookings</h2>
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-950 border-b border-slate-800">
                  <tr className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                    <th className="px-8 py-4">Guest</th>
                    <th className="px-8 py-4">Venue</th>
                    <th className="px-8 py-4">Time</th>
                    <th className="px-8 py-4">Guests</th>
                    <th className="px-8 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {diningReservations.map((res) => (
                    <tr key={res.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-8 py-4 text-sm text-slate-300 font-medium">{res.name}</td>
                      <td className="px-8 py-4 text-sm text-slate-400">{res.venue}</td>
                      <td className="px-8 py-4 text-sm text-slate-400">{res.time}</td>
                      <td className="px-8 py-4 text-sm text-slate-400">{res.guests}</td>
                      <td className="px-8 py-4">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tighter ${
                          res.status === 'Approved' ? 'bg-blue-900/40 text-blue-300' : 'bg-amber-900/40 text-amber-300'
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
            <h2 className="font-headline text-2xl text-surface-bright mb-6">Event Inquiries</h2>
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-950 border-b border-slate-800">
                  <tr className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                    <th className="px-8 py-4">Client</th>
                    <th className="px-8 py-4">Event Type</th>
                    <th className="px-8 py-4">Attendees</th>
                    <th className="px-8 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {eventInquiries.map((res) => (
                    <tr key={res.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-8 py-4 text-sm text-slate-300 font-medium">{res.name}</td>
                      <td className="px-8 py-4 text-sm text-slate-400">{res.type}</td>
                      <td className="px-8 py-4 text-sm text-slate-400">{res.guests}</td>
                      <td className="px-8 py-4">
                        <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tighter bg-amber-900/40 text-amber-300">
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

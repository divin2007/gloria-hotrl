import React, { useState, useMemo } from 'react';
import Sidebar from '../components/Sidebar';
import { useHotel } from '../context/HotelContext';
import { SkeletonTable } from '../components/LoadingSkeleton';

const AdminReports = () => {
  const {
    reservations,
    catalogRooms,
    catalogEvents,
    profile,
    guestCharges,
    tasks,
    inventoryUsage,
    inventoryItems,
    pricingLog,
    loading
  } = useHotel();

  const [activeTab, setActiveTab] = useState('occupancy');

  const userRole = profile?.role || 'staff';
  const isManager = userRole === 'manager' || userRole === 'admin';

  // --- Analytics Logic ---

  // 1. Occupancy Analytics
  const occupancyStats = useMemo(() => {
    const total = catalogRooms.length;
    if (total === 0) return { rate: 0, total: 0, Clean: 0, Dirty: 0, Maintenance: 0, Occupied: 0, trend: [] };

    const now = new Date();
    const occupied = reservations.filter(r =>
      now >= new Date(r.checkIn) && now <= new Date(r.checkOut) && r.status === 'Settled'
    ).length;

    const statusCounts = catalogRooms.reduce((acc, room) => {
      const status = room.status || 'Clean';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, { Clean: 0, Dirty: 0, Maintenance: 0, Occupied: occupied });

    // Calculate actual weekly occupancy trend
    const trend = [...Array(7)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        const dateStr = d.toISOString().split('T')[0];
        const dayOccupied = reservations.filter(r =>
           r.status === 'Settled' && dateStr >= r.checkIn && dateStr <= r.checkOut
        ).length;
        return Math.round((dayOccupied / total) * 100);
    });

    return {
      rate: Math.round((occupied / total) * 100),
      total,
      occupied,
      trend,
      ...statusCounts
    };
  }, [catalogRooms, reservations]);

  // 2. Revenue Analytics (RBAC)
  const revenueStats = useMemo(() => {
    if (!isManager) return null;

    const totalRevenue = guestCharges.reduce((sum, c) => sum + (parseFloat(c.amount) || 0), 0);
    const totalAvailableRooms = catalogRooms.length || 1;

    // ADR: Total Room Revenue / Rooms Sold
    const roomCharges = guestCharges.filter(c => c.category === 'Room');
    const roomRevenue = roomCharges.reduce((sum, c) => sum + (parseFloat(c.amount) || 0), 0);
    const roomsSold = roomCharges.length;

    const adr = roomsSold > 0 ? roomRevenue / roomsSold : 0;
    const revpar = roomRevenue / totalAvailableRooms;

    // Actual revenue trend for the last 7 days
    const revenueTrend = [...Array(7)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        const dateStr = d.toISOString().split('T')[0];
        return guestCharges
            .filter(c => c.created_at?.startsWith(dateStr))
            .reduce((sum, c) => sum + (parseFloat(c.amount) || 0), 0);
    });

    return {
      totalRevenue,
      adr: adr.toFixed(2),
      revpar: revpar.toFixed(2),
      revenueTrend,
      pricingHistory: pricingLog.slice(-5).reverse()
    };
  }, [guestCharges, catalogRooms, pricingLog, isManager]);

  // 3. Housekeeping Analytics
  const housekeepingStats = useMemo(() => {
    const cleaningTasks = tasks.filter(t => t.category?.toLowerCase().includes('cleaning') || t.category?.toLowerCase().includes('housekeeping'));
    const completed = cleaningTasks.filter(t => t.status === 'Completed' && t.completed_at);

    const totalTurnoverTime = completed.reduce((sum, t) => {
      const start = new Date(t.created_at);
      const end = new Date(t.completed_at);
      return sum + (end - start);
    }, 0);

    const avgTurnover = completed.length > 0 ? Math.round(totalTurnoverTime / completed.length / 60000) : 0; // minutes

    // Inventory usage summary
    const usageSummary = inventoryItems.map(item => {
      const used = inventoryUsage
        .filter(u => u.item_id === item.id)
        .reduce((sum, u) => sum + (u.quantity || 0), 0);
      return { ...item, used };
    });

    return {
      completionRate: Math.round((completed.length / (cleaningTasks.length || 1)) * 100),
      avgTurnover,
      usageSummary
    };
  }, [tasks, inventoryItems, inventoryUsage]);

  // 4. Financial Summary (RBAC)
  const financialSummary = useMemo(() => {
    if (!isManager) return null;

    const categories = ['Room', 'Room Service', 'Spa', 'Laundry', 'Dining'];
    const breakdown = categories.map(cat => ({
      category: cat,
      total: guestCharges.filter(c => c.category === cat).reduce((sum, c) => sum + (parseFloat(c.amount) || 0), 0),
      tax: guestCharges.filter(c => c.category === cat).reduce((sum, c) => sum + (parseFloat(c.tax_amount) || 0), 0)
    }));

    const outstanding = guestCharges
      .filter(c => c.status === 'Unpaid')
      .reduce((sum, c) => sum + (parseFloat(c.amount) || 0), 0);

    return {
      breakdown,
      outstanding,
      totalTax: breakdown.reduce((sum, b) => sum + b.tax, 0)
    };
  }, [guestCharges, isManager]);

  const exportCSV = (data, filename) => {
    let rows = [];
    if (Array.isArray(data)) {
      if (data.length > 0) {
        const headers = Object.keys(data[0]);
        rows.push(headers.join(","));
        data.forEach(item => {
          rows.push(headers.map(header => {
            const val = item[header];
            return typeof val === 'string' ? `"${val.replace(/"/g, '""')}"` : val;
          }).join(","));
        });
      }
    } else {
      const headers = Object.keys(data);
      rows.push(headers.join(","));
      rows.push(headers.map(header => {
        const val = data[header];
        return typeof val === 'string' ? `"${val.replace(/"/g, '""')}"` : val;
      }).join(","));
    }

    const csvContent = "data:text/csv;charset=utf-8," + rows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex bg-background min-h-screen font-body text-on-surface">
      <Sidebar active="reports" />
      <main className="flex-1 ml-64 p-8 lg:p-12 overflow-y-auto">
        <header className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="font-headline text-4xl text-primary mb-2">Operational Analytics</h1>
            <p className="text-on-surface-variant font-body tracking-wide opacity-80 uppercase text-[10px] font-bold">
               Real-time reporting & strategic data manifest
            </p>
          </div>
          <div className="flex gap-2 bg-surface-container-high p-1 rounded-xl border border-outline-variant/30">
            <button
              onClick={() => setActiveTab('occupancy')}
              className={`px-6 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'occupancy' ? 'bg-primary text-on-primary shadow-lg' : 'text-on-surface-variant hover:bg-surface-container-low'}`}
            >
              Occupancy
            </button>
            <button
              onClick={() => setActiveTab('housekeeping')}
              className={`px-6 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'housekeeping' ? 'bg-primary text-on-primary shadow-lg' : 'text-on-surface-variant hover:bg-surface-container-low'}`}
            >
              Housekeeping
            </button>
            {isManager && (
              <>
                <button
                  onClick={() => setActiveTab('revenue')}
                  className={`px-6 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'revenue' ? 'bg-primary text-on-primary shadow-lg' : 'text-on-surface-variant hover:bg-surface-container-low'}`}
                >
                  Revenue
                </button>
                <button
                  onClick={() => setActiveTab('financials')}
                  className={`px-6 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'financials' ? 'bg-primary text-on-primary shadow-lg' : 'text-on-surface-variant hover:bg-surface-container-low'}`}
                >
                  Financials
                </button>
              </>
            )}
          </div>
        </header>

        {loading ? <SkeletonTable rows={5} /> : (
          <div className="space-y-8 animate-in fade-in duration-500">

            {/* OCCUPANCY TAB */}
            {activeTab === 'occupancy' && (
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest p-10 rounded-2xl border border-outline-variant/30 shadow-editorial">
                  <div className="flex justify-between items-center mb-10">
                    <h3 className="font-headline text-2xl text-primary">Live Inventory Status</h3>
                    <button onClick={() => exportCSV(occupancyStats, 'occupancy_report')} className="text-secondary font-bold text-[10px] uppercase tracking-widest hover:underline">Export CSV</button>
                  </div>

                  <div className="flex items-center gap-16 mb-12">
                    <div className="relative w-48 h-48">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="16" fill="transparent" className="text-surface-container-high" />
                        <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="16" fill="transparent"
                          strokeDasharray={2 * Math.PI * 80}
                          strokeDashoffset={2 * Math.PI * 80 * (1 - occupancyStats.rate / 100)}
                          className="text-secondary" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-headline text-primary">{occupancyStats.rate}%</span>
                        <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">Occupied</span>
                      </div>
                    </div>
                    <div className="flex-grow grid grid-cols-2 gap-6">
                      <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/10">
                        <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest mb-1 opacity-60">Clean</p>
                        <p className="text-2xl font-headline text-primary">{occupancyStats.Clean}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/10">
                        <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest mb-1 opacity-60">Dirty</p>
                        <p className="text-2xl font-headline text-amber-700">{occupancyStats.Dirty}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/10">
                        <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest mb-1 opacity-60">Maintenance</p>
                        <p className="text-2xl font-headline text-red-700">{occupancyStats.Maintenance}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/10">
                        <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest mb-1 opacity-60">Total Keys</p>
                        <p className="text-2xl font-headline text-primary">{occupancyStats.total}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-12 lg:col-span-4 space-y-6">
                   <div className="bg-primary p-8 rounded-2xl text-on-primary shadow-2xl relative overflow-hidden group">
                      <div className="relative z-10">
                        <h4 className="text-[10px] font-bold text-secondary-fixed uppercase tracking-widest mb-2">Daily Movement</h4>
                        <p className="text-3xl font-headline mb-6">{reservations.filter(r => r.checkIn === new Date().toISOString().split('T')[0]).length} Arrivals</p>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                           <div className="bg-secondary h-full w-[70%]"></div>
                        </div>
                      </div>
                   </div>
                   <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/30 shadow-editorial">
                      <h4 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-6 opacity-60">Weekly Occupancy Trend</h4>
                      <div className="flex items-end justify-between h-32 gap-2">
                         {occupancyStats.trend.map((h, i) => (
                           <div key={i} title={`${h}% Occupied`} className="flex-1 bg-secondary/10 rounded-t-sm hover:bg-secondary/30 transition-all cursor-help relative group" style={{ height: `${Math.max(h, 5)}%` }}>
                              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-white text-[8px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">{h}%</div>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
              </div>
            )}

            {/* HOUSEKEEPING TAB */}
            {activeTab === 'housekeeping' && (
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12 lg:col-span-4 space-y-6">
                   <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/30 shadow-editorial text-center">
                      <span className="material-symbols-outlined text-4xl text-secondary mb-4">timer</span>
                      <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1 opacity-60">Avg. Turnover Time</p>
                      <p className="text-5xl font-headline text-primary">
                        {housekeepingStats.avgTurnover || '--'}
                        {housekeepingStats.avgTurnover > 0 && <span className="text-sm font-sans font-medium text-on-surface-variant ml-2">min</span>}
                      </p>
                   </div>
                   <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/30 shadow-editorial text-center">
                      <span className="material-symbols-outlined text-4xl text-secondary mb-4">task_alt</span>
                      <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1 opacity-60">Completion Rate</p>
                      <p className="text-5xl font-headline text-primary">{housekeepingStats.completionRate}%</p>
                   </div>
                </div>

                <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-editorial overflow-hidden">
                  <div className="p-8 border-b border-outline-variant/15 flex justify-between items-center bg-surface-container-low/20">
                    <h3 className="font-headline text-xl text-primary">Inventory Usage Summary</h3>
                    <button onClick={() => exportCSV(housekeepingStats.usageSummary, 'inventory_report')} className="text-secondary font-bold text-[10px] uppercase tracking-widest hover:underline">Export CSV</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant border-b border-outline-variant/15">
                          <th className="px-8 py-4">Item Name</th>
                          <th className="px-8 py-4">Category</th>
                          <th className="px-8 py-4 text-center">In Stock</th>
                          <th className="px-8 py-4 text-center">Used (MTD)</th>
                          <th className="px-8 py-4 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-outline-variant/10 font-body">
                        {housekeepingStats.usageSummary.length === 0 ? (
                           <tr><td colSpan="5" className="px-8 py-12 text-center text-sm text-on-surface-variant italic">No inventory data available</td></tr>
                        ) : housekeepingStats.usageSummary.map(item => (
                          <tr key={item.id} className="hover:bg-surface-container-low/50">
                            <td className="px-8 py-4 font-medium">{item.name}</td>
                            <td className="px-8 py-4 text-xs text-on-surface-variant">{item.category}</td>
                            <td className="px-8 py-4 text-center text-sm">{item.current_stock} {item.unit}</td>
                            <td className="px-8 py-4 text-center text-sm text-secondary font-bold">{item.used}</td>
                            <td className="px-8 py-4 text-right">
                               <span className={`text-[10px] font-bold px-2 py-1 rounded ${item.current_stock < 10 ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                 {item.current_stock < 10 ? 'LOW' : 'STABLE'}
                               </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* REVENUE TAB (RBAC) */}
            {activeTab === 'revenue' && isManager && (
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12 bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/30 shadow-editorial mb-4">
                   <h4 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-8 opacity-60">Revenue Performance (Last 7 Days)</h4>
                   <div className="flex items-end justify-between h-48 gap-4">
                      {revenueStats.revenueTrend.map((val, i) => {
                        const max = Math.max(...revenueStats.revenueTrend, 1);
                        const h = (val / max) * 100;
                        return (
                          <div key={i} title={`$${val.toLocaleString()}`} className="flex-1 bg-primary/10 rounded-t-md hover:bg-primary/30 transition-all cursor-help relative group" style={{ height: `${Math.max(h, 2)}%` }}>
                             <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-secondary text-on-secondary text-[9px] font-bold px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-lg">${val.toLocaleString()}</div>
                          </div>
                        );
                      })}
                   </div>
                </div>
                <div className="col-span-12 lg:col-span-4 bg-primary rounded-2xl p-10 text-on-primary shadow-2xl flex flex-col justify-between">
                   <div>
                     <p className="text-[10px] font-bold text-secondary-fixed uppercase tracking-widest mb-10">Revenue Yield</p>
                     <div className="space-y-8">
                        <div>
                          <p className="text-sm opacity-70 mb-1">RevPAR</p>
                          <p className="text-5xl font-headline">${revenueStats.revpar}</p>
                        </div>
                        <div>
                          <p className="text-sm opacity-70 mb-1">Average Daily Rate (ADR)</p>
                          <p className="text-5xl font-headline">${revenueStats.adr}</p>
                        </div>
                     </div>
                   </div>
                   <button onClick={() => exportCSV(revenueStats, 'revenue_performance')} className="mt-12 bg-white/10 py-3 rounded-xl border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-white/20">Full Analytics Export</button>
                </div>

                <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest p-10 rounded-2xl border border-outline-variant/30 shadow-editorial">
                   <h3 className="font-headline text-2xl text-primary mb-10">Dynamic Pricing History</h3>
                   <div className="space-y-6">
                      {revenueStats.pricingHistory.length === 0 ? (
                        <p className="text-center py-20 text-on-surface-variant italic text-sm">No recent price adjustments recorded.</p>
                      ) : revenueStats.pricingHistory.map(log => (
                        <div key={log.id} className="flex items-center justify-between p-6 rounded-xl bg-surface-container-low border border-outline-variant/10">
                           <div className="flex items-center gap-6">
                              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${log.new_price > log.old_price ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                 <span className="material-symbols-outlined">{log.new_price > log.old_price ? 'trending_up' : 'trending_down'}</span>
                              </div>
                              <div>
                                 <p className="text-sm font-semibold text-primary">{log.reason || 'Seasonal Adjustment'}</p>
                                 <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold opacity-60">
                                   {new Date(log.created_at).toLocaleDateString()} • Room ID: {log.room_id}
                                 </p>
                              </div>
                           </div>
                           <div className="text-right">
                              <p className="text-lg font-headline text-primary">${log.new_price}</p>
                              <p className="text-xs text-on-surface-variant line-through opacity-50">${log.old_price}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            )}

            {/* FINANCIALS TAB (RBAC) */}
            {activeTab === 'financials' && isManager && (
              <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-editorial overflow-hidden">
                <div className="p-8 border-b border-outline-variant/15 flex justify-between items-center bg-surface-container-low/20">
                  <div>
                    <h3 className="font-headline text-2xl text-primary">Financial Summary</h3>
                    <p className="text-xs text-on-surface-variant mt-1 font-medium italic">Outstanding Folio Balance: <span className="text-red-700 font-bold">${financialSummary.outstanding.toLocaleString()}</span></p>
                  </div>
                  <button onClick={() => exportCSV(financialSummary.breakdown, 'financial_summary')} className="bg-secondary text-on-secondary px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg hover:brightness-110 transition-all">Download Audit PDF</button>
                </div>
                <div className="overflow-x-auto">
                   <table className="w-full text-left">
                     <thead>
                       <tr className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant border-b border-outline-variant/15">
                         <th className="px-8 py-6">Revenue Category</th>
                         <th className="px-8 py-6 text-right">Net Revenue</th>
                         <th className="px-8 py-6 text-right">Taxes Collected</th>
                         <th className="px-8 py-6 text-right font-headline text-primary">Total Gross</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-outline-variant/10 font-body">
                        {financialSummary.breakdown.map((row, i) => (
                          <tr key={i} className="hover:bg-surface-container-low/50">
                            <td className="px-8 py-6">
                               <div className="flex items-center gap-4">
                                  <div className="w-8 h-8 rounded bg-primary/5 flex items-center justify-center text-primary">
                                     <span className="material-symbols-outlined text-sm">
                                       {row.category === 'Room' ? 'bed' : row.category === 'Dining' ? 'restaurant' : 'payments'}
                                     </span>
                                  </div>
                                  <span className="font-semibold text-primary">{row.category}</span>
                               </div>
                            </td>
                            <td className="px-8 py-6 text-right text-sm">${row.total.toLocaleString()}</td>
                            <td className="px-8 py-6 text-right text-sm text-on-surface-variant">${row.tax.toLocaleString()}</td>
                            <td className="px-8 py-6 text-right text-lg font-headline text-primary font-bold">${(row.total + row.tax).toLocaleString()}</td>
                          </tr>
                        ))}
                        <tr className="bg-surface-container-high/30">
                           <td className="px-8 py-8 font-headline text-xl text-primary">Consolidated Total</td>
                           <td className="px-8 py-8 text-right font-headline text-xl text-primary">${financialSummary.breakdown.reduce((s, b) => s + b.total, 0).toLocaleString()}</td>
                           <td className="px-8 py-8 text-right font-headline text-xl text-primary">${financialSummary.totalTax.toLocaleString()}</td>
                           <td className="px-8 py-8 text-right font-headline text-3xl text-secondary">${(financialSummary.breakdown.reduce((s, b) => s + b.total + b.tax, 0)).toLocaleString()}</td>
                        </tr>
                     </tbody>
                   </table>
                </div>
              </div>
            )}

          </div>
        )}
      </main>
    </div>
  );
};

export default AdminReports;

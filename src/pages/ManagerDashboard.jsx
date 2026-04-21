import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHotel } from '../context/HotelContext';
import Sidebar from '../components/Sidebar';
import { SkeletonCard, SkeletonTable, SkeletonLine } from '../components/LoadingSkeleton';
import SEO from '../components/SEO';
import Modal from '../components/Modal';

const ManagerDashboard = () => {
  const {
    staff,
    staffRequests,
    approveStaffRequest,
    denyStaffRequest,
    addTask,
    tasks,
    catalogRooms,
    catalogEvents,
    catalogDining,
    catalogMenu,
    addCatalogItem,
    loading: hotelLoading
  } = useHotel();
  const [loading, setLoading] = useState(true);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showCatalogModal, setShowCatalogModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [catalogType, setCatalogType] = useState('Rooms');

  const [newTask, setNewTask] = useState({
    title: '',
    category: 'General',
    priority: 'Standard',
    icon: 'assignment'
  });

  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Food',
    subcategory: '',
    capacity: '',
    hours: '',
    image: '',
    popular: false,
    topTier: false,
    amenities: []
  });

  useEffect(() => {
    if (!hotelLoading) setLoading(false);
  }, [hotelLoading]);

  const handleOpenTaskModal = (member = null) => {
    setSelectedStaff(member);
    setShowTaskModal(true);
  };

  const handleAssignTask = (e) => {
    e.preventDefault();
    addTask({
      ...newTask,
      assignedTo: selectedStaff ? selectedStaff.name : 'Unassigned',
      reporter: 'Manager Alexandre',
      status: 'Assigned'
    });
    setShowTaskModal(false);
    setNewTask({ title: '', category: 'General', priority: 'Standard', icon: 'assignment' });
  };

  const handleAddCatalogItem = (e) => {
    e.preventDefault();
    addCatalogItem(catalogType, {
        ...newItem,
        image: newItem.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop'
    });
    setShowCatalogModal(false);
    setNewItem({
      name: '',
      description: '',
      price: '',
      category: 'Food',
      subcategory: '',
      capacity: '',
      hours: '',
      image: '',
      popular: false,
      topTier: false,
      amenities: []
    });
  };

  const pendingRequests = staffRequests.filter(req => req.status === 'Pending');

  return (
    <div className="flex bg-background min-h-screen font-body text-on-surface">
      <SEO title="Manager Dashboard" noindex />
      <Sidebar />
      <main className="ml-64 flex-1 p-8 lg:p-12">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="font-headline text-4xl text-primary mb-2">Executive Overview</h1>
            <p className="text-on-surface-variant font-body tracking-wide opacity-80 uppercase text-[10px] font-bold">Gloria Hotel Kigali • Management Dashboard</p>
          </div>
          <div className="flex space-x-6 items-center">
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest text-secondary font-bold">Current Occupancy</p>
              <p className="text-2xl font-serif text-primary">94.2%</p>
            </div>
            <div className="h-10 w-px bg-outline-variant/30"></div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Duty Manager</p>
                <p className="font-headline text-lg text-primary">Alexandre K.</p>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-secondary/20 bg-surface-container-high flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined">person</span>
              </div>
            </div>
          </div>
        </header>

        {/* Action Bar */}
        <section className="flex gap-4 mb-10 overflow-x-auto pb-2">
            <button
              onClick={() => { setCatalogType('Rooms'); setShowCatalogModal(true); }}
              className="bg-primary text-on-primary px-6 py-3 rounded-lg flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest hover:brightness-110 shrink-0 shadow-lg transition-all"
            >
              <span className="material-symbols-outlined text-sm">add_home</span> Add Room
            </button>
            <button
              onClick={() => { setCatalogType('Events'); setShowCatalogModal(true); }}
              className="bg-primary text-on-primary px-6 py-3 rounded-lg flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest hover:brightness-110 shrink-0 shadow-lg transition-all"
            >
              <span className="material-symbols-outlined text-sm">event</span> Add Event Space
            </button>
            <button
              onClick={() => { setCatalogType('Dining'); setShowCatalogModal(true); }}
              className="bg-primary text-on-primary px-6 py-3 rounded-lg flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest hover:brightness-110 shrink-0 shadow-lg transition-all"
            >
              <span className="material-symbols-outlined text-sm">restaurant</span> Add Dining Venue
            </button>
            <button
              onClick={() => { setCatalogType('Menu'); setShowCatalogModal(true); }}
              className="bg-secondary text-on-secondary px-6 py-3 rounded-lg flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest hover:brightness-110 shrink-0 shadow-lg transition-all"
            >
              <span className="material-symbols-outlined text-sm">menu_book</span> Add Menu Item
            </button>
        </section>

        {/* Performance Metrics Grid */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {loading ? [...Array(4)].map((_, i) => <SkeletonCard key={i} />) : (
            <>
              <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 shadow-editorial border-l-4 border-l-secondary">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Guest Satisfaction</p>
                <div className="flex items-end justify-between mt-2">
                  <span className="font-headline text-3xl text-primary">94%</span>
                  <span className="text-secondary text-xs font-bold">+2.4%</span>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 shadow-editorial">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Inventory Assets</p>
                <div className="flex items-end justify-between mt-2">
                  <span className="font-headline text-3xl text-primary">{catalogRooms.length + catalogEvents.length + catalogDining.length}</span>
                  <span className="text-on-surface-variant text-xs font-bold uppercase">Managed</span>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 shadow-editorial">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Staff On-Duty</p>
                <div className="flex items-end justify-between mt-2">
                  <span className="font-headline text-3xl text-primary">{staff.length}</span>
                  <span className="text-on-surface-variant text-xs font-bold">{pendingRequests.length} Pending</span>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 shadow-editorial">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Active Tasks</p>
                <div className="flex items-end justify-between mt-2">
                  <span className="font-headline text-3xl text-primary">{tasks.length}</span>
                  <span className="text-secondary text-xs font-bold uppercase tracking-widest">Optimal</span>
                </div>
              </div>
            </>
          )}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Staff Approval Requests */}
          <section className="lg:col-span-1 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-headline text-2xl text-primary">Approval Queue</h3>
              <span className="px-2 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-bold rounded uppercase">
                {pendingRequests.length} Pending
              </span>
            </div>
            <div className="space-y-4">
              {loading ? [...Array(2)].map((_, i) => <SkeletonCard key={i} />) : (
                pendingRequests.length === 0 ? (
                  <div className="p-8 text-center bg-surface-container-low rounded-xl border border-dashed border-outline-variant">
                    <p className="text-sm text-on-surface-variant">No pending requests</p>
                  </div>
                ) : (
                  pendingRequests.map(req => (
                    <div key={req.id} className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/20 hover:border-secondary transition-colors duration-300 shadow-sm">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-secondary">
                          <span className="material-symbols-outlined">person</span>
                        </div>
                        <div>
                          <h4 className="font-body font-semibold text-primary">{req.name}</h4>
                          <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-tight">{req.role}</p>
                        </div>
                      </div>
                      <p className="text-sm text-on-surface-variant mb-4 font-light leading-relaxed italic">"{req.request}"</p>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => approveStaffRequest(req.id)}
                          className="flex-1 py-2 bg-secondary text-on-secondary text-xs font-bold uppercase rounded-lg hover:brightness-110 transition-all"
                        >Approve</button>
                        <button
                          onClick={() => denyStaffRequest(req.id)}
                          className="flex-1 py-2 bg-surface-container-high text-on-surface-variant text-xs font-bold uppercase rounded-lg hover:bg-outline-variant/20 transition-all"
                        >Deny</button>
                      </div>
                    </div>
                  ))
                )
              )}
            </div>
          </section>

          {/* Workers Management & Tasks */}
          <section className="lg:col-span-2 space-y-8">
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden shadow-editorial">
              <div className="px-8 py-6 border-b border-outline-variant/15 flex justify-between items-center bg-surface-container-low/30">
                <h3 className="font-serif text-lg text-primary">Workers Management</h3>
                <button
                  onClick={() => handleOpenTaskModal()}
                  className="text-[10px] uppercase tracking-widest text-secondary hover:text-amber-700 transition-colors font-bold flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  Quick Assign
                </button>
              </div>
              <div className="overflow-x-auto">
                {loading ? <SkeletonTable rows={5} /> : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface-container-low/50">
                        <th className="px-6 py-4 text-[10px] font-bold uppercase text-on-surface-variant tracking-widest">Worker</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase text-on-surface-variant tracking-widest">Department</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase text-on-surface-variant tracking-widest">Status</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase text-on-surface-variant tracking-widest text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/10">
                      {staff.map((member) => (
                        <tr key={member.id} className="hover:bg-surface-container-low transition-colors">
                          <td className="px-6 py-5">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                                <span className="material-symbols-outlined text-sm">person</span>
                              </div>
                              <div>
                                <div className="font-body font-medium text-on-surface">{member.name}</div>
                                <div className="text-[10px] text-on-surface-variant font-bold">LVL {member.level || 1}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <span className="text-sm text-on-surface-variant">{member.role}</span>
                          </td>
                          <td className="px-6 py-5">
                            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-100 uppercase tracking-tighter">
                              {member.status}
                            </span>
                          </td>
                          <td className="px-6 py-5 text-right">
                            <button
                              onClick={() => handleOpenTaskModal(member)}
                              className="text-secondary hover:text-amber-700 transition-colors text-xs font-bold uppercase tracking-widest"
                            >
                              Assign Task
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* Catalog Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 shadow-editorial">
                    <h3 className="font-headline text-lg text-primary mb-4">Inventory Overview</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-on-surface-variant">Rooms & Suites</span>
                            <span className="font-bold">{catalogRooms.length}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-on-surface-variant">Event Spaces</span>
                            <span className="font-bold">{catalogEvents.length}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-on-surface-variant">Dining Venues</span>
                            <span className="font-bold">{catalogDining.length}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-on-surface-variant">Menu Items</span>
                            <span className="font-bold">{catalogMenu.length}</span>
                        </div>
                    </div>
                </div>
                <div className="bg-primary p-6 rounded-xl shadow-editorial text-on-primary flex flex-col justify-center items-center text-center space-y-3">
                    <span className="material-symbols-outlined text-4xl text-secondary">hotel_class</span>
                    <h4 className="font-headline text-lg">Inventory Portal</h4>
                    <p className="text-xs opacity-70">Add and manage hotel offerings dynamically.</p>
                </div>
            </div>
          </section>
        </div>
      </main>

      {/* Catalog Modal */}
      <Modal
        isOpen={showCatalogModal}
        onClose={() => setShowCatalogModal(false)}
        title={`Add New ${catalogType === 'Menu' ? 'Menu Item' : (catalogType === 'Dining' ? 'Dining Venue' : catalogType.slice(0, -1))}`}
      >
        <form onSubmit={handleAddCatalogItem} className="space-y-4 p-2 max-h-[70vh] overflow-y-auto staff-scroll">
            <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Name</label>
                <input required className="w-full bg-surface-container-low border-none border-b-2 border-transparent focus:ring-0 focus:border-secondary transition-all px-4 py-3 rounded-t-lg" placeholder="Name" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} />
            </div>

            <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Image URL</label>
                <input className="w-full bg-surface-container-low border-none border-b-2 border-transparent focus:ring-0 focus:border-secondary transition-all px-4 py-3 rounded-t-lg" placeholder="https://images.unsplash.com/..." value={newItem.image} onChange={e => setNewItem({...newItem, image: e.target.value})} />
            </div>

            <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Description</label>
                <textarea required className="w-full bg-surface-container-low border-none border-b-2 border-transparent focus:ring-0 focus:border-secondary transition-all px-4 py-3 rounded-t-lg" rows="2" placeholder="Detailed description for guests" value={newItem.description} onChange={e => setNewItem({...newItem, description: e.target.value})} />
            </div>

            {catalogType === 'Rooms' && (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Price per Night ($)</label>
                            <input required type="number" className="w-full bg-surface-container-low border-none border-b-2 border-transparent focus:ring-0 focus:border-secondary transition-all px-4 py-3 rounded-t-lg" placeholder="180" value={newItem.price} onChange={e => setNewItem({...newItem, price: e.target.value})} />
                        </div>
                        <div className="flex flex-col justify-center space-y-2">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input type="checkbox" checked={newItem.popular} onChange={e => setNewItem({...newItem, popular: e.target.checked})} className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" />
                                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">Popular</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input type="checkbox" checked={newItem.topTier} onChange={e => setNewItem({...newItem, topTier: e.target.checked})} className="w-4 h-4 rounded border-outline-variant text-secondary focus:ring-secondary" />
                                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">Top Tier</span>
                            </label>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Amenities (comma separated)</label>
                        <input className="w-full bg-surface-container-low border-none border-b-2 border-transparent focus:ring-0 focus:border-secondary transition-all px-4 py-3 rounded-t-lg" placeholder="WiFi, AC, Minibar, Balcony" value={newItem.amenityInput || ''} onChange={e => setNewItem({...newItem, amenityInput: e.target.value, amenities: e.target.value.split(',').map(s => s.trim())})} />
                    </div>
                </div>
            )}

            {catalogType === 'Events' && (
                <div className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Guest Capacity</label>
                        <input required type="number" className="w-full bg-surface-container-low border-none border-b-2 border-transparent focus:ring-0 focus:border-secondary transition-all px-4 py-3 rounded-t-lg" placeholder="500" value={newItem.capacity} onChange={e => setNewItem({...newItem, capacity: e.target.value})} />
                    </div>
                </div>
            )}

            {catalogType === 'Dining' && (
                <div className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Operating Hours</label>
                        <input required className="w-full bg-surface-container-low border-none border-b-2 border-transparent focus:ring-0 focus:border-secondary transition-all px-4 py-3 rounded-t-lg" placeholder="06:30 AM — 11:00 PM" value={newItem.hours} onChange={e => setNewItem({...newItem, hours: e.target.value})} />
                    </div>
                </div>
            )}

            {catalogType === 'Menu' && (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Category</label>
                            <select className="w-full bg-surface-container-low border-none border-b-2 border-transparent focus:ring-0 focus:border-secondary transition-all px-4 py-3 rounded-t-lg" value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})}>
                                <option value="Food">Food</option>
                                <option value="Drink">Drink</option>
                                <option value="Alcohol">Alcoholic Beverage</option>
                                <option value="Special">Hotel Special</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Price Tag</label>
                            <input required className="w-full bg-surface-container-low border-none border-b-2 border-transparent focus:ring-0 focus:border-secondary transition-all px-4 py-3 rounded-t-lg" placeholder="12k RWF" value={newItem.price} onChange={e => setNewItem({...newItem, price: e.target.value})} />
                        </div>
                    </div>
                    {newItem.category === 'Food' && (
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-widest opacity-60">Menu Subcategory</label>
                            <input className="w-full bg-surface-container-low border-none border-b-2 border-transparent focus:ring-0 focus:border-secondary transition-all px-4 py-3 rounded-t-lg" placeholder="e.g. Starters, Main Course, Confections" value={newItem.subcategory} onChange={e => setNewItem({...newItem, subcategory: e.target.value})} />
                        </div>
                    )}
                </div>
            )}

            <button type="submit" className="w-full bg-secondary text-on-secondary py-4 rounded-lg font-bold uppercase tracking-widest hover:brightness-110 transition-all mt-4 shadow-xl">
                Add to Official Catalog
            </button>
        </form>
      </Modal>

      {/* Task Assignment Modal */}
      <Modal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        title={selectedStaff ? `Assign Task to ${selectedStaff.name}` : "Quick Task Assignment"}
      >
        <form onSubmit={handleAssignTask} className="space-y-6 p-2">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block">Task Title</label>
            <input
              required
              className="w-full bg-surface-container-low border-none border-b-2 border-transparent focus:ring-0 focus:border-secondary transition-all px-4 py-3 text-on-surface rounded-t-lg"
              placeholder="e.g. Repair AC in Suite 302"
              value={newTask.title}
              onChange={(e) => setNewTask({...newTask, title: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block">Category</label>
              <select
                className="w-full bg-surface-container-low border-none border-b-2 border-transparent focus:ring-0 focus:border-secondary transition-all px-4 py-3 text-on-surface rounded-t-lg"
                value={newTask.category}
                onChange={(e) => setNewTask({...newTask, category: e.target.value, icon: e.target.value === 'Maintenance' ? 'handyman' : (e.target.value === 'Housekeeping' ? 'cleaning_services' : 'assignment')})}
              >
                <option value="General">General</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Housekeeping">Housekeeping</option>
                <option value="Dining">Dining</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block">Priority</label>
              <select
                className="w-full bg-surface-container-low border-none border-b-2 border-transparent focus:ring-0 focus:border-secondary transition-all px-4 py-3 text-on-surface rounded-t-lg"
                value={newTask.priority}
                onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
              >
                <option value="Low Priority">Low</option>
                <option value="Standard">Standard</option>
                <option value="High Priority">High</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>
          </div>

          {!selectedStaff && (
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block">Assign To</label>
              <select
                className="w-full bg-surface-container-low border-none border-b-2 border-transparent focus:ring-0 focus:border-secondary transition-all px-4 py-3 text-on-surface rounded-t-lg"
                onChange={(e) => setSelectedStaff(staff.find(s => s.name === e.target.value))}
              >
                <option value="">Unassigned</option>
                {staff.map(s => <option key={s.id} value={s.name}>{s.name} ({s.role})</option>)}
              </select>
            </div>
          )}

          <div className="pt-4">
            <button type="submit" className="w-full bg-primary text-on-primary py-4 rounded-lg font-bold uppercase tracking-widest hover:bg-primary-container transition-all shadow-lg">
              Confirm Assignment
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManagerDashboard;

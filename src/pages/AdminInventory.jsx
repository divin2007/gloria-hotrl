import React, { useState } from 'react';
import { useHotel } from '../context/HotelContext';
import Sidebar from '../components/Sidebar';
import { SkeletonCard } from '../components/LoadingSkeleton';
import Modal from '../components/Modal';

const AdminInventory = () => {
  const { catalogRooms, updateCatalogItem, deleteCatalogItem, loading } = useHotel();
  const [editingRoom, setEditingRoom] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    status: 'Clean',
    image: '',
    popular: false,
    topTier: false,
    amenities: []
  });

  const handleEditClick = (room) => {
    setEditingRoom(room);
    setFormData({
      name: room.name,
      description: room.description,
      price: room.price,
      status: room.status || 'Clean',
      image: room.image_url,
      popular: room.is_popular,
      topTier: room.is_top_tier,
      amenityInput: room.features?.join(', ') || '',
      amenities: room.features || [],
      gallery: room.gallery || []
    });
    setShowEditModal(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    await updateCatalogItem('Rooms', editingRoom.id, formData);
    setShowEditModal(false);
  };

  const handleDeleteClick = (room) => {
    setRoomToDelete(room);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    await deleteCatalogItem('Rooms', roomToDelete.id);
    setShowDeleteConfirm(false);
    setRoomToDelete(null);
  };

  return (
    <div className="flex bg-background min-h-screen font-body text-on-surface">
      <Sidebar active="inventory" />
      <main className="ml-64 flex-1 p-8 lg:p-12">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <span className="text-secondary font-bold uppercase tracking-[0.3em] text-[10px] mb-2 block">Asset Management</span>
            <h1 className="font-headline text-4xl text-primary mb-2">Hotel Sanctuary Catalog</h1>
            <p className="text-on-surface-variant font-body tracking-wide opacity-80 uppercase text-[10px] font-bold italic">Curating the guest experience through physical asset oversight.</p>
          </div>
          <div className="flex gap-4">
             <div className="bg-surface-container-low px-6 py-3 rounded-xl border border-outline-variant/30 flex items-center gap-3 shadow-sm">
                <span className="text-[10px] font-bold uppercase text-on-surface-variant opacity-60">Total Assets</span>
                <span className="font-headline text-2xl text-primary">{catalogRooms.length}</span>
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {loading ? [...Array(3)].map((_, i) => <SkeletonCard key={i} />) : (
            catalogRooms.map(room => (
              <div key={room.id} className="bg-surface-container-lowest rounded-3xl overflow-hidden border border-outline-variant/20 shadow-editorial group transition-all hover:border-secondary/30">
                <div className="relative h-64 overflow-hidden">
                  <img src={room.image_url} alt={room.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                    <div>
                       <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest text-white backdrop-blur-md ${
                         room.status === 'Clean' ? 'bg-emerald-500/40' : (room.status === 'Dirty' ? 'bg-amber-500/40' : 'bg-red-500/40')
                       }`}>
                         {room.status || 'Clean'}
                       </span>
                       <h3 className="text-white font-headline text-2xl mt-2">{room.name}</h3>
                    </div>
                    <div className="text-white text-right">
                       <p className="text-[9px] uppercase font-bold tracking-widest opacity-70">Price / Night</p>
                       <p className="text-xl font-headline">${room.price}</p>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                   <p className="text-sm text-on-surface-variant line-clamp-2 mb-6 leading-relaxed font-light italic">"{room.description}"</p>
                   <div className="flex flex-wrap gap-2 mb-8">
                      {room.features?.slice(0, 3).map((f, i) => (
                        <span key={i} className="bg-surface-container-high px-3 py-1 rounded text-[9px] font-bold uppercase tracking-tighter text-on-surface-variant">{f}</span>
                      ))}
                      {room.features?.length > 3 && <span className="text-[9px] font-bold text-secondary">+{room.features.length - 3} More</span>}
                   </div>
                   <div className="flex gap-4 pt-6 border-t border-outline-variant/15">
                      <button
                        onClick={() => handleEditClick(room)}
                        className="flex-1 bg-primary text-on-primary py-3.5 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2"
                      >
                        <span className="material-symbols-outlined text-sm">edit_square</span>
                        Update Details
                      </button>
                      <button
                        onClick={() => handleDeleteClick(room)}
                        className="w-12 h-12 rounded-xl border border-error/20 flex items-center justify-center text-error hover:bg-error/5 transition-all"
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                   </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Sanctuary"
      >
        <form onSubmit={handleUpdateSubmit} className="space-y-6 p-2 max-h-[75vh] overflow-y-auto staff-scroll">
            <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-70">Official Name</label>
                <input required className="w-full bg-surface-container-low border border-outline-variant/30 focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition-all px-4 py-3 rounded-xl font-medium" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-70">Base Price ($)</label>
                    <input required type="number" className="w-full bg-surface-container-low border border-outline-variant/30 focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition-all px-4 py-3 rounded-xl font-bold text-primary" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-70">Current Condition</label>
                    <select className="w-full bg-surface-container-low border border-outline-variant/30 focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition-all px-4 py-3 rounded-xl text-sm" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                        <option value="Clean">Clean (Ready)</option>
                        <option value="Dirty">Dirty (Needs Care)</option>
                        <option value="Maintenance">Under Maintenance</option>
                        <option value="Occupied">Occupied</option>
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-70">Asset Description</label>
                <textarea required className="w-full bg-surface-container-low border border-outline-variant/30 focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition-all px-4 py-3 rounded-xl text-sm min-h-[100px]" rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-70">Cover Image Asset</label>
                    <input required className="w-full bg-surface-container-low border border-outline-variant/30 focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition-all px-4 py-3 rounded-xl text-xs" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-70">Gallery (Comma Separated)</label>
                    <input className="w-full bg-surface-container-low border border-outline-variant/30 focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition-all px-4 py-3 rounded-xl text-xs" placeholder="url1, url2..." value={formData.galleryInput || ''} onChange={e => setFormData({...formData, galleryInput: e.target.value, gallery: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})} />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-70">Amenities (Comma Separated)</label>
                <input className="w-full bg-surface-container-low border border-outline-variant/30 focus:border-secondary focus:ring-1 focus:ring-secondary/20 transition-all px-4 py-3 rounded-xl text-sm" placeholder="WiFi, Minibar, AC..." value={formData.amenityInput || ''} onChange={e => setFormData({...formData, amenityInput: e.target.value, amenities: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})} />
            </div>

            <div className="flex gap-6 px-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={formData.popular} onChange={e => setFormData({...formData, popular: e.target.checked})} className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary transition-all" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant group-hover:text-primary transition-colors">Popularity Status</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked={formData.topTier} onChange={e => setFormData({...formData, topTier: e.target.checked})} className="w-4 h-4 rounded border-outline-variant text-secondary focus:ring-secondary transition-all" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant group-hover:text-secondary transition-colors">Premium Designation</span>
                </label>
            </div>

            <button type="submit" className="w-full bg-secondary text-on-secondary py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:brightness-110 transition-all mt-6 shadow-xl shadow-secondary/10">
                Commit Changes to Ledger
            </button>
        </form>
      </Modal>

      {/* Delete confirmation */}
      <Modal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        title="Retire Asset"
        actions={
          <>
            <button onClick={confirmDelete} className="flex-1 bg-error text-white py-3 rounded-xl font-bold uppercase text-[10px] tracking-widest shadow-lg shadow-error/10">Confirm Removal</button>
            <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 bg-surface-container-high text-on-surface-variant py-3 rounded-xl font-bold uppercase text-[10px] tracking-widest">Cancel</button>
          </>
        }
      >
        Are you certain you wish to permanently remove <strong>{roomToDelete?.name}</strong> from the active hotel inventory? This action cannot be undone.
      </Modal>
    </div>
  );
};

export default AdminInventory;

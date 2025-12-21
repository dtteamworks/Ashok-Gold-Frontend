'use client';

import { useState } from 'react';
import { FiEdit, FiTrash2, FiSearch, FiPlus, FiFilter } from 'react-icons/fi';
import AddBannerModal from './Modals/AddBannerModal';

// Import data from the same source
const { banners: initialBanners } = require('@/components/Data/data');

const BannerListComponent = () => {
  const [banners, setBanners] = useState(initialBanners);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, active, inactive
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [formData, setFormData] = useState({ name: '', image: '', active: true });

  // Filter banners based on search and status
  const filteredBanners = banners.filter(banner => {
    const matchesSearch = banner.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'active' && banner.active) ||
      (filterStatus === 'inactive' && !banner.active);
    return matchesSearch && matchesStatus;
  });

  const toggleStatus = (id) => {
    setBanners(banners.map(cat => 
      cat.id === id ? { ...cat, active: !cat.active } : cat
    ));
  };

  const handleEdit = (banner) => {
    setEditingBanner(banner);
    setFormData({
      name: banner.name,
      image: banner.image,
      active: banner.active
    });
    setShowAddModal(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this banner?')) {
      setBanners(banners.filter(cat => cat.id !== id));
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.image) {
      alert('Please fill in all fields');
      return;
    }

    const newBanner = {
      id: editingBanner ? editingBanner.id : Date.now(),
      name: formData.name,
      image: formData.image,
      active: formData.active
    };

    if (editingBanner) {
      setBanners(banners.map(cat => 
        cat.id === editingBanner.id ? newBanner : cat
      ));
    } else {
      setBanners([...banners, newBanner]);
    }

    console.log(newBanner)

    closeModal();
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingBanner(null);
    setFormData({ name: '', image: '', active: true });
  };

  const openAddModal = () => {
    setEditingBanner(null);
    setFormData({ name: '', image: '', active: true });
    setShowAddModal(true);
  };

  const stats = {
    total: banners.length,
    active: banners.filter(c => c.active).length,
    inactive: banners.filter(c => !c.active).length
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Banner Management</h1>
          <p className="text-gray-600">Manage your product banners efficiently</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Controls */}
          <div className="p-4 md:p-6 border-b border-gray-200 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search banners..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Filter & Add Button */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                  <button
                    onClick={() => setFilterStatus('all')}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                      filterStatus === 'all' 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilterStatus('active')}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                      filterStatus === 'active' 
                        ? 'bg-white text-green-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => setFilterStatus('inactive')}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                      filterStatus === 'inactive' 
                        ? 'bg-white text-red-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Inactive
                  </button>
                </div>

                <button 
                  onClick={openAddModal}
                  className="bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
                >
                  <FiPlus className="w-4 h-4" />
                  <span className="hidden sm:inline">Add Banner</span>
                  <span className="sm:hidden">Add</span>
                </button>
              </div>
            </div>

            {/* Results Count */}
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredBanners.length}</span> of {banners.length} banners
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Banner
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell">
                    Image
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 md:px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBanners.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <FiSearch className="w-12 h-12 mb-3" />
                        <p className="text-lg font-medium text-gray-900">No Banners found</p>
                        <p className="text-sm mt-1">Try adjusting your search or filter criteria</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredBanners.map((banner) => (
                    <tr key={banner.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            className="h-10 w-10 rounded-lg object-cover sm:hidden border border-gray-200"
                            src={banner.image}
                            alt={banner.name}
                          />
                          <div className="text-sm font-semibold text-gray-900">{banner.name}</div>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 hidden sm:table-cell">
                        <img
                          className="size-10 object-cover rounded-full"
                          src={banner.image}
                          alt={banner.name}
                        />
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <button
                          onClick={() => toggleStatus(banner.id)}
                          className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                            banner.active
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-red-100 text-red-700 hover:bg-red-200'
                          }`}
                        >
                          
                          {banner.active ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(banner)}
                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-200"
                            title="Edit banner"
                          >
                            <FiEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(banner.id)}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-all duration-200"
                            title="Delete banner"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add/Edit Modal */}
        {showAddModal && (
         <AddBannerModal  handleSave={handleSave} closeModal={closeModal} formData={formData} setFormData={setFormData} editingBanner={editingBanner} />
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default BannerListComponent;
import React, { useEffect, useState } from 'react';
import { societiesAPI } from '../../api';
import { 
  Users, Plus, Pencil, Trash2, Save, X, UserCircle, Phone, 
   MapPin, Calendar, Award,
} from 'lucide-react';

const AdminSocietiesPage = () => {
  const [societies, setSocieties] = useState([]);
  const [form, setForm] = useState({
    name: '',
    head: '',
    contact: '',
    description: '',
    category: '',
    location: '',
    establishedYear: '',
    membersCount: '',
    
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = ['Academic', 'Cultural', 'Sports', 'Technical', 'Social', 'Arts', 'Entrepreneurship', 'Other'];

  useEffect(() => { load(); }, []);
  
  const load = () => {
    societiesAPI.getAll()
      .then(data => {
        setSocieties(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Validate required fields
    if (!form.name.trim()) {
      setError('Society name is required');
      setLoading(false);
      return;
    }
    if (!form.head.trim()) {
      setError('Head name is required');
      setLoading(false);
      return;
    }

    try {
      const submitData = {
        ...form,
        membersCount: form.membersCount ? parseInt(form.membersCount) : 0,
        establishedYear: form.establishedYear ? parseInt(form.establishedYear) : undefined
      };

      if (editId) {
        await societiesAPI.update(editId, submitData);
        setSuccess('Society updated successfully!');
        setEditId(null);
      } else {
        await societiesAPI.create(submitData);
        setSuccess('Society added successfully!');
      }
      
      // Reset form
      setForm({
        name: '',
        head: '',
        contact: '',
        description: '',
        category: '',
        location: '',
        establishedYear: '',
        membersCount: '',
      });
      
      load();
      setLoading(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message || 'Failed to save society');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this society?')) return;
    try {
      await societiesAPI.delete(id);
      setSocieties(prev => prev.filter(s => s._id !== id));
      setSuccess('Society deleted successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (s) => {
    setForm({
      name: s.name || '',
      head: s.head || '',
      contact: s.contact || '',
      description: s.description || '',
      category: s.category || '',
      location: s.location || '',
      establishedYear: s.establishedYear || '',
      membersCount: s.membersCount || '',

    });
    setEditId(s._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setError('');
    setSuccess('');
  };


  const handleCancel = () => {
    setEditId(null);
    setForm({
      name: '',
      head: '',
      contact: '',
      description: '',
      category: '',
      location: '',
      establishedYear: '',
      membersCount: '',
    });
    setError('');
    setSuccess('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-24 px-4 sm:px-6 lg:px-8">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease forwards;
          opacity: 0;
        }

        .animate-slideIn {
          animation: slideIn 0.4s ease forwards;
          opacity: 0;
        }

        .form-card {
          background: linear-gradient(145deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.9));
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          padding: 32px;
          border-left: 4px solid #fbbf24;
        }

        .society-card {
          background: linear-gradient(145deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.9));
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 24px;
          text-align: center;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: default;
        }

        .society-card:hover {
          transform: translateY(-6px);
          border-color: rgba(251, 191, 36, 0.3);
          box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.6);
        }

        .society-logo {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(251, 191, 36, 0.2);
          margin: 0 auto 14px;
          display: block;
          transition: all 0.3s ease;
        }

        .society-card:hover .society-logo {
          border-color: rgba(251, 191, 36, 0.6);
          transform: scale(1.05);
        }

        .society-avatar {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(251, 191, 36, 0.05));
          border: 2px solid rgba(251, 191, 36, 0.2);
          margin: 0 auto 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .society-card:hover .society-avatar {
          border-color: rgba(251, 191, 36, 0.6);
          transform: scale(1.05);
        }

        .form-input {
          width: 100%;
          padding: 10px 14px;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 10px;
          color: #f1f5f9;
          font-size: 14px;
          outline: none;
          transition: all 0.2s ease;
        }

        .form-input:focus {
          border-color: #fbbf24;
          box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.1);
        }

        .form-input::placeholder {
          color: #64748b;
        }

        .form-label {
          display: block;
          font-size: 11px;
          font-weight: 600;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 6px;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 24px;
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          color: #0f172a;
          font-weight: 700;
          font-size: 14px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(251, 191, 36, 0.3);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #94a3b8;
          font-size: 14px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #f1f5f9;
        }

        .btn-edit {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background: rgba(251, 191, 36, 0.1);
          border: 1px solid rgba(251, 191, 36, 0.2);
          color: #fbbf24;
          border-radius: 8px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .btn-edit:hover {
          background: rgba(251, 191, 36, 0.2);
          transform: translateY(-2px);
        }

        .btn-delete {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #f87171;
          border-radius: 8px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .btn-delete:hover {
          background: rgba(239, 68, 68, 0.2);
          transform: translateY(-2px);
        }

        .category-tag {
          display: inline-block;
          font-size: 10px;
          font-weight: 600;
          padding: 3px 12px;
          border-radius: 99px;
          background: rgba(251, 191, 36, 0.1);
          color: #fbbf24;
          border: 1px solid rgba(251, 191, 36, 0.15);
          margin-bottom: 8px;
        }

        .social-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: #94a3b8;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .social-link:hover {
          background: rgba(251, 191, 36, 0.1);
          border-color: rgba(251, 191, 36, 0.3);
          color: #fbbf24;
          transform: translateY(-2px);
        }

        .detail-link {
          color: #94a3b8;
          transition: all 0.2s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .detail-link:hover {
          color: #fbbf24;
        }

        .delay-1 { animation-delay: 0.05s; }
        .delay-2 { animation-delay: 0.1s; }
        .delay-3 { animation-delay: 0.15s; }
        .delay-4 { animation-delay: 0.2s; }
        .delay-5 { animation-delay: 0.25s; }
        .delay-6 { animation-delay: 0.3s; }

        @media (max-width: 640px) {
          .form-card {
            padding: 20px;
          }
          .society-card {
            padding: 16px;
          }
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-1 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full"></div>
            <span className="text-yellow-500 text-xs font-semibold tracking-widest uppercase bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20 flex items-center gap-2">
              <Users className="w-3 h-3" />
              Admin Panel
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-3">
            {editId ? 'Edit Society' : 'Manage Societies'}
            <span className="text-sm font-medium text-yellow-400 bg-yellow-500/10 px-3 py-1 rounded-full">
              {societies.length}
            </span>
          </h1>
          <p className="text-gray-400 text-sm flex items-center gap-2">
            <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
            Add, edit or remove college societies
          </p>
        </div>

        {/* Form */}
        <div className="form-card mb-8 animate-fadeInUp">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Society Name */}
              <div>
                <label className="form-label">Society Name *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g., Robotics Club"
                  value={form.name}
                  required
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
              </div>

              {/* Head Name */}
              <div>
                <label className="form-label">Head Name *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Full name of head"
                  value={form.head}
                  required
                  onChange={e => setForm({ ...form, head: e.target.value })}
                />
              </div>

              {/* Contact */}
              <div>
                <label className="form-label">Contact Number</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="+91 XXXXXXXXXX"
                  value={form.contact}
                  onChange={e => setForm({ ...form, contact: e.target.value })}
                />
              </div>


              {/* Category */}
              <div>
                <label className="form-label">Category</label>
                <select
                  className="form-input"
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="form-label">Location</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Building/Room number"
                  value={form.location}
                  onChange={e => setForm({ ...form, location: e.target.value })}
                />
              </div>

              {/* Established Year */}
              <div>
                <label className="form-label">Established Year</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="2024"
                  min="1900"
                  max={new Date().getFullYear()}
                  value={form.establishedYear}
                  onChange={e => setForm({ ...form, establishedYear: e.target.value })}
                />
              </div>

              {/* Members Count */}
              <div className="sm:col-span-2">
                <label className="form-label">Members Count</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="50"
                  min="0"
                  value={form.membersCount}
                  onChange={e => setForm({ ...form, membersCount: e.target.value })}
                />
              </div>

              {/* Description */}
              <div className="sm:col-span-2">
                <label className="form-label">Description</label>
                <textarea
                  className="form-input"
                  rows="3"
                  placeholder="Brief description of the society..."
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                />
              </div>

            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 mt-6">
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : editId ? (
                  <><Save className="w-4 h-4" /> Update Society</>
                ) : (
                  <><Plus className="w-4 h-4" /> Add Society</>
                )}
              </button>
              {editId && (
                <button type="button" className="btn-secondary" onClick={handleCancel}>
                  <X className="w-4 h-4" /> Cancel
                </button>
              )}
            </div>

            {/* Messages */}
            {error && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm">
                {success}
              </div>
            )}
          </form>
        </div>

        {/* Societies List */}
        {societies.length > 0 && (
          <>
            <h3 className="text-lg font-semibold text-gray-300 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              All Societies ({societies.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {societies.map((society, i) => (
                <div key={society._id} className={`society-card animate-fadeInUp delay-${(i % 6) + 1}`}>
                  {/* Logo or Avatar */}
                  {society.logoUrl ? (
                    <img src={society.logoUrl} alt={society.name} className="society-logo" />
                  ) : (
                    <div className="society-avatar">
                      <Users className="w-8 h-8 text-yellow-400" />
                    </div>
                  )}

                  {/* Name */}
                  <h4 className="text-base font-bold text-white mb-1">{society.name}</h4>

                  {/* Category */}
                  {society.category && (
                    <span className="category-tag">{society.category}</span>
                  )}

                  {/* Details */}
                  <div className="space-y-1.5 text-sm border-t border-white/5 pt-3">
                    <div className="flex items-center justify-center gap-2 text-gray-300">
                      <UserCircle className="w-3.5 h-3.5 text-yellow-500" />
                      <span className="text-xs">{society.head}</span>
                    </div>

                    {society.contact && (
                      <a href={`tel:${society.contact}`} className="detail-link text-xs justify-center">
                        <Phone className="w-3.5 h-3.5 text-yellow-500" />
                        {society.contact}
                      </a>
                    )}

               

                  

                    {society.location && (
                      <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
                        <MapPin className="w-3.5 h-3.5 text-yellow-500" />
                        {society.location}
                      </div>
                    )}

                    {society.establishedYear && (
                      <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
                        <Calendar className="w-3.5 h-3.5 text-yellow-500" />
                        Est. {society.establishedYear}
                      </div>
                    )}
                  </div>



                  {/* Actions */}
                  <div className="flex justify-center gap-2 mt-3 pt-3 border-t border-white/5">
                    <button className="btn-edit" onClick={() => handleEdit(society)}>
                      <Pencil className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(society._id)}>
                      <Trash2 className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Empty State */}
        {societies.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-yellow-500/10 border-2 border-yellow-500/20 flex items-center justify-center mx-auto mb-4">
              <Users className="w-10 h-10 text-yellow-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No Societies Added</h3>
            <p className="text-gray-400 text-sm">Start by adding your first society using the form above.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSocietiesPage;

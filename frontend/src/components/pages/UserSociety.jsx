import React, { useEffect, useState } from 'react';
import { societiesAPI } from '../../api';
import { Users, UserCircle, MapPin, Calendar, Users as UsersIcon
} from 'lucide-react';

const UserSocietiesPage = () => {
  const [societies, setSocieties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    societiesAPI.getAll()
      .then(data => {
        // Ensure each society has default values for missing fields
        const enhancedData = data.map(society => ({
          ...society,
          category: society.category || 'General',
          description: society.description || '',
          location: society.location || '',
          establishedYear: society.establishedYear || null,
          membersCount: society.membersCount || 0,
         
        }));
        setSocieties(enhancedData);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Get unique categories for filter
  const categories = ['All', ...new Set(societies.map(s => s.category).filter(Boolean))];
  
  // Filter societies by category
  const filteredSocieties = selectedCategory === 'All' 
    ? societies 
    : societies.filter(s => s.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-24 px-4 sm:px-6 lg:px-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .society-card {
          background: linear-gradient(145deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.9));
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          padding: 28px 24px;
          text-align: center;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .society-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(251, 191, 36, 0.05), transparent 50%);
          opacity: 0;
          transition: opacity 0.4s ease;
          border-radius: 20px;
        }

        .society-card:hover::before {
          opacity: 1;
        }

        .society-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(251, 191, 36, 0.3);
          box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(251, 191, 36, 0.15);
        }

        .society-logo {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(251, 191, 36, 0.2);
          margin: 0 auto 16px;
          display: block;
          transition: all 0.4s ease;
        }

        .society-card:hover .society-logo {
          border-color: rgba(251, 191, 36, 0.6);
          transform: scale(1.05) rotate(-3deg);
        }

        .society-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(251, 191, 36, 0.05));
          border: 2px solid rgba(251, 191, 36, 0.2);
          margin: 0 auto 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s ease;
        }

        .society-card:hover .society-avatar {
          border-color: rgba(251, 191, 36, 0.6);
          transform: scale(1.05) rotate(-3deg);
          background: linear-gradient(135deg, rgba(251, 191, 36, 0.25), rgba(251, 191, 36, 0.1));
        }

        .society-name {
          font-size: 1.2rem;
          font-weight: 700;
          color: #f1f5f9;
          margin-bottom: 6px;
          letter-spacing: -0.01em;
        }

        .society-type {
          display: inline-block;
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 4px 12px;
          border-radius: 99px;
          margin-bottom: 12px;
          background: rgba(251, 191, 36, 0.1);
          color: #fbbf24;
          border: 1px solid rgba(251, 191, 36, 0.15);
        }

        .society-detail {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 13px;
          color: #94a3b8;
          padding: 4px 0;
          transition: color 0.2s ease;
        }

        .society-detail:hover {
          color: #e2e8f0;
        }

        .society-link {
          color: #fbbf24;
          text-decoration: none;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 13px;
          font-weight: 500;
          padding: 6px 14px;
          border-radius: 99px;
          background: rgba(251, 191, 36, 0.08);
          border: 1px solid rgba(251, 191, 36, 0.1);
        }

        .society-link:hover {
          background: rgba(251, 191, 36, 0.15);
          border-color: rgba(251, 191, 36, 0.3);
          transform: translateX(4px);
          color: #fcd34d;
        }

        .society-link svg {
          transition: transform 0.2s ease;
        }

        .society-link:hover svg {
          transform: translateX(2px);
        }

        .skeleton-card {
          background: linear-gradient(145deg, rgba(30, 41, 59, 0.5), rgba(15, 23, 42, 0.5));
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 20px;
          padding: 28px 24px;
          text-align: center;
          animation: shimmer 2s infinite;
          background-size: 200% 100%;
        }

        .skeleton-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          margin: 0 auto 16px;
        }

        .skeleton-text {
          height: 12px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 6px;
          margin: 6px auto;
          width: 80%;
        }

        .skeleton-text-short {
          width: 60%;
        }

        .category-filter {
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 6px 16px;
          border-radius: 99px;
          color: #94a3b8;
          transition: all 0.3s ease;
          cursor: pointer;
          font-size: 13px;
          white-space: nowrap;
        }

        .category-filter:hover {
          background: rgba(251, 191, 36, 0.1);
          border-color: rgba(251, 191, 36, 0.3);
          color: #fbbf24;
        }

        .category-filter.active {
          background: rgba(251, 191, 36, 0.15);
          border-color: rgba(251, 191, 36, 0.4);
          color: #fbbf24;
        }

        .social-icon {
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
        }

        .social-icon:hover {
          background: rgba(251, 191, 36, 0.1);
          border-color: rgba(251, 191, 36, 0.3);
          color: #fbbf24;
          transform: translateY(-2px);
        }

        .delay-1 { animation-delay: 0.05s; }
        .delay-2 { animation-delay: 0.1s; }
        .delay-3 { animation-delay: 0.15s; }
        .delay-4 { animation-delay: 0.2s; }
        .delay-5 { animation-delay: 0.25s; }
        .delay-6 { animation-delay: 0.3s; }

        @media (max-width: 640px) {
          .society-card {
            padding: 20px 16px;
          }
          .category-filter {
            font-size: 12px;
            padding: 4px 12px;
          }
        }

        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #0f172a;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #fbbf24, #f59e0b);
          border-radius: 99px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #fbbf24;
        }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-1 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full"></div>
            <span className="text-yellow-500 text-xs font-semibold tracking-widest uppercase bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20 flex items-center gap-2">
              <Users className="w-3 h-3" />
              Student Life
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 flex items-center gap-3">
            College Societies
            <span className="text-sm font-medium text-yellow-400 bg-yellow-500/10 px-3 py-1 rounded-full">
              {filteredSocieties.length}
            </span>
          </h1>
          <p className="text-gray-400 text-sm flex items-center gap-2">
            <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
            Explore clubs and student organizations
          </p>
        </div>

        {/* Category Filter */}
        {!loading && societies.length > 0 && categories.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`category-filter ${selectedCategory === cat ? 'active' : ''}`}
              >
                {cat === 'All' ? '🏛️ All' : cat}
              </button>
            ))}
          </div>
        )}

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
              <div key={i} className="skeleton-card">
                <div className="skeleton-avatar"></div>
                <div className="skeleton-text" style={{ width: '70%' }}></div>
                <div className="skeleton-text skeleton-text-short"></div>
                <div className="skeleton-text" style={{ width: '50%' }}></div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredSocieties.length === 0 && (
          <div className="text-center py-20 px-4">
            <div className="w-24 h-24 rounded-full bg-yellow-500/10 border-2 border-yellow-500/20 flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10 text-yellow-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {selectedCategory === 'All' ? 'No Societies Yet' : `No ${selectedCategory} Societies`}
            </h3>
            <p className="text-gray-400 text-sm max-w-md mx-auto">
              {selectedCategory === 'All' 
                ? 'Societies are being added. Check back soon to explore student organizations and clubs.'
                : `No societies found in the "${selectedCategory}" category. Try selecting a different category.`}
            </p>
            {selectedCategory !== 'All' && (
              <button 
                onClick={() => setSelectedCategory('All')}
                className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 rounded-full hover:bg-yellow-500/20 transition-all text-sm font-medium"
              >
                View All Societies
              </button>
            )}
          </div>
        )}

        {/* Societies Grid */}
        {!loading && filteredSocieties.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSocieties.map((society, index) => (
              <div
                key={society._id || index}
                className={`society-card animate-fadeInUp delay-${(index % 6) + 1}`}
              >
                {/* Logo or Avatar */}
                {society.logoUrl ? (
                  <img
                    src={society.logoUrl}
                    alt={society.name}
                    className="society-logo"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                ) : (
                  <div className="society-avatar">
                    <Users className="w-8 h-8 text-yellow-400" />
                  </div>
                )}
                <div className="society-avatar" style={{ display: 'none' }}>
                  <Users className="w-8 h-8 text-yellow-400" />
                </div>

                {/* Society Name */}
                <h3 className="society-name">{society.name}</h3>

                {/* Head/Leader */}
                {society.head && (
                  <div className="society-detail">
                    <UserCircle className="w-4 h-4 text-yellow-500" />
                    <span className="font-medium text-gray-300">{society.head}</span>
                  </div>
                )}

                {/* Description - Only show if exists */}
                {society.description && (
                  <p className="text-gray-400 text-xs leading-relaxed my-3 px-2 line-clamp-3 flex-1">
                    {society.description}
                  </p>
                )}

                {/* Additional Info - Only show if data exists */}
                {(society.location || society.establishedYear || society.membersCount > 0) && (
                  <div className="space-y-1.5 mt-2 pt-3 border-t border-white/5">
                    {society.location && (
                      <div className="society-detail text-xs">
                        <MapPin className="w-3.5 h-3.5 text-yellow-500" />
                        <span>{society.location}</span>
                      </div>
                    )}

                    {society.establishedYear && (
                      <div className="society-detail text-xs">
                        <Calendar className="w-3.5 h-3.5 text-yellow-500" />
                        <span>Est. {society.establishedYear}</span>
                      </div>
                    )}

                    {society.membersCount > 0 && (
                      <div className="society-detail text-xs">
                        <UsersIcon className="w-3.5 h-3.5 text-yellow-500" />
                        <span>{society.membersCount} members</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Footer Note */}
        {!loading && filteredSocieties.length > 0 && (
          <div className="mt-12 text-center text-gray-500 text-xs border-t border-white/5 pt-6">
            <p className="flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
              Connect with your college community
              <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSocietiesPage;

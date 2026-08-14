import React, { useState, useEffect } from 'react';
import { CATEGORIES, INITIAL_REELS } from './data/sampleData';
import { parseBulkInput } from './utils/categorizer';

export default function App() {
  const [reels, setReels] = useState(() => {
    const saved = localStorage.getItem('osaka_reels_data_v2');
    if (!saved) {
      localStorage.setItem('osaka_reels_data_v2', JSON.stringify(INITIAL_REELS));
      return INITIAL_REELS;
    }
    try {
      const parsed = JSON.parse(saved);
      return parsed.length > 0 ? parsed : INITIAL_REELS;
    } catch {
      return INITIAL_REELS;
    }
  });

  const [selectedPrimary, setSelectedPrimary] = useState('all');
  const [selectedSub, setSelectedSub] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('category'); // 'category', 'favorite'

  // Save to LocalStorage & Check URL query params for 1-Click Collector
  useEffect(() => {
    localStorage.setItem('osaka_reels_data_v2', JSON.stringify(reels));
  }, [reels]);

  // Handle URL query parameter bulk import (1-Click Collector background handler)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const bulkData = params.get('bulk');
    if (bulkData) {
      const parsed = parseBulkInput(decodeURIComponent(bulkData));
      if (parsed.length > 0) {
        setReels(prev => [...parsed, ...prev]);
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, []);

  const handlePrimaryChange = (catId) => {
    setSelectedPrimary(catId);
    setSelectedSub('all');
  };

  // Filter reels
  const filteredReels = reels.filter(reel => {
    if (selectedPrimary !== 'all' && reel.primaryCategory !== selectedPrimary) return false;
    if (selectedSub !== 'all' && reel.subCategory !== selectedSub) return false;
    if (selectedRegion !== 'all' && reel.region !== selectedRegion) return false;
    if (activeTab === 'favorite' && !reel.isFavorite) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = reel.title.toLowerCase().includes(q);
      const matchMemo = reel.memo.toLowerCase().includes(q);
      const matchRegion = reel.region.toLowerCase().includes(q);
      if (!matchTitle && !matchMemo && !matchRegion) return false;
    }

    return true;
  });

  const toggleFavorite = (id) => {
    setReels(prev => prev.map(r => r.id === id ? { ...r, isFavorite: !r.isFavorite } : r));
  };

  const deleteReel = (id, e) => {
    e.stopPropagation();
    if (window.confirm('이 릴스를 목록에서 삭제하시겠습니까?')) {
      setReels(prev => prev.filter(r => r.id !== id));
    }
  };

  // Get current subcategories
  const currentSubList = selectedPrimary === 'all' 
    ? Object.values(CATEGORIES.subcategories).flat()
    : (CATEGORIES.subcategories[selectedPrimary] || []);

  const getPrimaryCategoryObj = (catId) => CATEGORIES.primary.find(c => c.id === catId) || CATEGORIES.primary[0];
  const getSubCategoryObj = (subId) => Object.values(CATEGORIES.subcategories).flat().find(s => s.id === subId) || { name: subId, icon: '📌' };

  return (
    <div className="app-viewport emulator-mode">
      <div className="phone-frame">
        <div className="phone-notch"></div>

        {/* Status Bar */}
        <div className="phone-status-bar">
          <span>09:41</span>
          <div className="status-right">
            <span>5G</span>
            <span>📶</span>
            <span>🔋</span>
          </div>
        </div>

        {/* Minimalist Apple Header */}
        <header className="app-header">
          <div className="header-title-group">
            <h1>🇯🇵 오사카 릴스 큐레이션</h1>
            <p>카테고리별로 정돈된 오사카 여행 릴스 & 핵심 가이드</p>
          </div>

          {/* Search & Region Filter Bar */}
          <div className="search-filter-box" style={{ marginTop: '10px' }}>
            <div className="search-input-wrapper">
              <span className="search-icon">🔍</span>
              <input 
                type="text" 
                placeholder="릴스 제목 또는 설명 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select 
              className="region-select"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              <option value="all">📍 지역 전체</option>
              <option value="난바">난바</option>
              <option value="도톤보리">도톤보리</option>
              <option value="우메다">우메다</option>
              <option value="신사이바시">신사이바시</option>
              <option value="USJ">USJ</option>
              <option value="교토">교토</option>
              <option value="간사이공항">간사이공항</option>
            </select>
          </div>
        </header>

        {/* Primary Categories Slider */}
        <nav className="primary-cat-nav">
          {CATEGORIES.primary.map(cat => (
            <button
              key={cat.id}
              className={`cat-tab-btn ${selectedPrimary === cat.id ? 'active' : ''}`}
              onClick={() => handlePrimaryChange(cat.id)}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </nav>

        {/* Subcategory Chips */}
        <div className="sub-cat-chips">
          <button
            className={`sub-chip-btn ${selectedSub === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedSub('all')}
          >
            <span>✨ 전체</span>
          </button>
          {currentSubList.map(sub => (
            <button
              key={sub.id}
              className={`sub-chip-btn ${selectedSub === sub.id ? 'active' : ''}`}
              onClick={() => setSelectedSub(sub.id)}
            >
              <span>{sub.icon}</span>
              <span>{sub.name}</span>
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <main className="main-content-scroll">
          <div className="stats-summary">
            <span>
              {activeTab === 'favorite' ? '❤️ 북마크한 릴스' : '🗂️ 릴스 목록'} 
              <span className="stats-count"> ({filteredReels.length}개)</span>
            </span>
          </div>

          {filteredReels.length > 0 ? (
            filteredReels.map(reel => {
              const pCatObj = getPrimaryCategoryObj(reel.primaryCategory);
              const sCatObj = getSubCategoryObj(reel.subCategory);

              return (
                <div key={reel.id} className="reel-card">
                  <div className="card-top-tags">
                    <div className="badge-group">
                      <span className="badge badge-primary">
                        {pCatObj.icon} {pCatObj.name}
                      </span>
                      <span className="badge badge-sub">
                        {sCatObj.icon} {sCatObj.name}
                      </span>
                      <span className="badge badge-region">
                        📍 {reel.region}
                      </span>
                    </div>

                    <div className="card-btn-group">
                      <button 
                        className={`favorite-btn ${reel.isFavorite ? 'active' : ''}`}
                        onClick={() => toggleFavorite(reel.id)}
                        title="북마크"
                      >
                        {reel.isFavorite ? '❤️' : '🤍'}
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={(e) => deleteReel(reel.id, e)}
                        title="삭제"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  <h2 className="reel-title">{reel.title}</h2>

                  {reel.memo && (
                    <div className="reel-memo">
                      💬 {reel.memo}
                    </div>
                  )}

                  <div className="card-meta-bar">
                    <span className="stars">{'★'.repeat(reel.rating)}</span>
                    <span>{reel.createdAt}</span>
                  </div>

                  <div className="card-actions">
                    <a 
                      href={reel.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="action-link-btn action-insta"
                    >
                      <span>🎬</span> 인스타 릴스 보기
                    </a>
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('오사카 ' + reel.region + ' ' + reel.title)}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="action-link-btn action-map"
                    >
                      <span>📍</span> 구글 지도
                    </a>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">⛩️</div>
              <h3>등록된 릴스가 없습니다</h3>
              <p>다른 카테고리나 지역 필터를 선택해 보세요.</p>
            </div>
          )}
        </main>

        {/* Minimalist Bottom Bar */}
        <nav className="bottom-nav">
          <button 
            className={`nav-item ${activeTab === 'category' ? 'active' : ''}`}
            onClick={() => setActiveTab('category')}
          >
            <span className="nav-item-icon">🗂️</span>
            <span>전체 릴스</span>
          </button>

          <button 
            className={`nav-item ${activeTab === 'favorite' ? 'active' : ''}`}
            onClick={() => setActiveTab('favorite')}
          >
            <span className="nav-item-icon">❤️</span>
            <span>북마크</span>
          </button>
        </nav>

      </div>
    </div>
  );
}

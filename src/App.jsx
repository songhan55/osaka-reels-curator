import React, { useState, useEffect } from 'react';
import { CATEGORIES, DEFAULT_GROUPS } from './data/sampleData';
import InteractiveMap from './components/InteractiveMap';

export default function App() {
  // Load groups from localStorage or use DEFAULT_GROUPS
  const [groups, setGroups] = useState(() => {
    const saved = localStorage.getItem('tripreels_groups_data_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    localStorage.setItem('tripreels_groups_data_v2', JSON.stringify(DEFAULT_GROUPS));
    return DEFAULT_GROUPS;
  });

  // Current active group slug (from URL param or default)
  const [currentGroupSlug, setCurrentGroupSlug] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const g = params.get('g');
    if (g) return g;
    return DEFAULT_GROUPS[0].slug;
  });

  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDestination, setNewGroupDestination] = useState('오사카');
  const [copiedToast, setCopiedToast] = useState('');

  // Selected filters
  const [selectedPrimary, setSelectedPrimary] = useState('all');
  const [selectedSub, setSelectedSub] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('category'); // 'category', 'map', 'favorite'

  // Sync groups to localStorage
  useEffect(() => {
    localStorage.setItem('tripreels_groups_data_v2', JSON.stringify(groups));
  }, [groups]);

  // Sync URL query param when group changes
  const switchGroup = (slug) => {
    setCurrentGroupSlug(slug);
    setSelectedPrimary('all');
    setSelectedSub('all');
    setSelectedRegion('all');
    setIsGroupModalOpen(false);

    const url = new URL(window.location.href);
    url.searchParams.set('g', slug);
    window.history.replaceState({}, '', url.toString());
  };

  const currentGroup = groups.find(g => g.slug === currentGroupSlug) || groups[0];
  const reels = currentGroup.reels || [];

  // Toggle favorite for a reel in current group
  const toggleFavorite = (reelId) => {
    setGroups(prev => prev.map(grp => {
      if (grp.id !== currentGroup.id) return grp;
      return {
        ...grp,
        reels: grp.reels.map(r => r.id === reelId ? { ...r, isFavorite: !r.isFavorite } : r)
      };
    }));
  };

  // Vote for a reel ("가고 싶어요!")
  const handleVote = (reelId) => {
    setGroups(prev => prev.map(grp => {
      if (grp.id !== currentGroup.id) return grp;
      return {
        ...grp,
        reels: grp.reels.map(r => r.id === reelId ? { ...r, votes: (r.votes || 0) + 1 } : r)
      };
    }));
    showToast('❤️ [가고 싶어요!] 투표가 반영되었습니다!');
  };

  // Delete a reel from current group
  const deleteReel = (reelId, e) => {
    e.stopPropagation();
    if (window.confirm('이 릴스를 목록에서 삭제하시겠습니까?')) {
      setGroups(prev => prev.map(grp => {
        if (grp.id !== currentGroup.id) return grp;
        return {
          ...grp,
          reels: grp.reels.filter(r => r.id !== reelId)
        };
      }));
    }
  };

  // Create a new travel group board
  const createNewGroup = (e) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;

    const slug = `trip-${Date.now().toString(36)}`;
    const newGroup = {
      id: slug,
      slug: slug,
      name: newGroupName.trim(),
      destination: newGroupDestination,
      membersCount: 1,
      badge: '신규 단톡방',
      reels: []
    };

    setGroups(prev => [newGroup, ...prev]);
    setNewGroupName('');
    switchGroup(slug);
    showToast('🎉 새로운 여행 지도가 생성되었습니다!');
  };

  // Copy share invite link
  const copyInviteLink = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?g=${currentGroup.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      showToast('🔗 일행 초대 링크가 복사되었습니다!');
    } else {
      showToast(shareUrl);
    }
  };

  const showToast = (msg) => {
    setCopiedToast(msg);
    setTimeout(() => setCopiedToast(''), 2500);
  };

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
      const matchMemo = (reel.memo || '').toLowerCase().includes(q);
      const matchRegion = (reel.region || '').toLowerCase().includes(q);
      if (!matchTitle && !matchMemo && !matchRegion) return false;
    }

    return true;
  });

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

        {/* Toast Notification */}
        {copiedToast && (
          <div className="toast-msg">
            {copiedToast}
          </div>
        )}

        {/* Group Info Header Bar */}
        <div className="group-top-banner">
          <div className="group-info-main" onClick={() => setIsGroupModalOpen(true)}>
            <span className="group-badge">👥 {currentGroup.badge || '인스타 단톡방'}</span>
            <div className="group-title-row">
              <h2 className="group-name">{currentGroup.name}</h2>
              <span className="group-switch-icon">▾</span>
            </div>
          </div>
          <button className="invite-share-btn" onClick={copyInviteLink} title="일행 초대 링크 복사">
            <span>🔗 초대</span>
          </button>
        </div>

        {/* Search & Region Filter Bar */}
        <header className="app-header">
          <div className="search-filter-box">
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

        {/* Primary Categories Slider (Only in List/Favorite views) */}
        {activeTab !== 'map' && (
          <>
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
          </>
        )}

        {/* Main Content Area */}
        {activeTab === 'map' ? (
          <InteractiveMap 
            reels={filteredReels} 
            onToggleFavorite={toggleFavorite}
            onVote={handleVote}
          />
        ) : (
          <main className="main-content-scroll">
            <div className="stats-summary">
              <span>
                {activeTab === 'favorite' ? '❤️ 북마크한 릴스' : '🗂️ 수집된 여행 릴스'} 
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
                          className="vote-badge-btn"
                          onClick={() => handleVote(reel.id)}
                          title="가고 싶어요 투표"
                        >
                          ❤️ {reel.votes || 0}
                        </button>
                        <button 
                          className={`favorite-btn ${reel.isFavorite ? 'active' : ''}`}
                          onClick={() => toggleFavorite(reel.id)}
                          title="북마크"
                        >
                          {reel.isFavorite ? '★' : '☆'}
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
                      <span className="shared-badge">👤 <strong>{reel.sharedBy || '단톡방'}</strong> 공유</span>
                      <span>{reel.createdAt}</span>
                    </div>

                    <div className="card-actions">
                      <a 
                        href={reel.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="action-link-btn action-insta"
                      >
                        <span>🎬</span> 인스타 릴스
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
                <p>인스타 단톡방에 릴스를 공유하면 여기에 자동으로 정리됩니다!</p>
              </div>
            )}
          </main>
        )}

        {/* Bottom Navigation */}
        <nav className="bottom-nav">
          <button 
            className={`nav-item ${activeTab === 'category' ? 'active' : ''}`}
            onClick={() => setActiveTab('category')}
          >
            <span className="nav-item-icon">🗂️</span>
            <span>리스트</span>
          </button>

          <button 
            className={`nav-item ${activeTab === 'map' ? 'active' : ''}`}
            onClick={() => setActiveTab('map')}
          >
            <span className="nav-item-icon">🗺️</span>
            <span>지도 뷰</span>
          </button>

          <button 
            className={`nav-item ${activeTab === 'favorite' ? 'active' : ''}`}
            onClick={() => setActiveTab('favorite')}
          >
            <span className="nav-item-icon">❤️</span>
            <span>북마크</span>
          </button>

          <button 
            className="nav-item"
            onClick={() => setIsGroupModalOpen(true)}
          >
            <span className="nav-item-icon">👥</span>
            <span>단톡방 목록</span>
          </button>
        </nav>

        {/* Group Switcher / Creation Modal */}
        {isGroupModalOpen && (
          <div className="modal-overlay" onClick={() => setIsGroupModalOpen(false)}>
            <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>👥 여행 단톡방 목록</h2>
                <button className="icon-btn" onClick={() => setIsGroupModalOpen(false)}>✕</button>
              </div>

              {/* Group List */}
              <div className="group-modal-list">
                {groups.map(grp => (
                  <div 
                    key={grp.id} 
                    className={`group-list-item ${grp.slug === currentGroupSlug ? 'active' : ''}`}
                    onClick={() => switchGroup(grp.slug)}
                  >
                    <div className="group-item-text">
                      <strong>{grp.name}</strong>
                      <span>📍 {grp.destination} · 🎬 릴스 {grp.reels?.length || 0}개</span>
                    </div>
                    {grp.slug === currentGroupSlug && <span className="check-mark">✓ 선택됨</span>}
                  </div>
                ))}
              </div>

              {/* Create New Group Form */}
              <form onSubmit={createNewGroup} className="new-group-form">
                <label>➕ 새 여행 지도 만들기</label>
                <div className="new-group-inputs">
                  <input 
                    type="text" 
                    placeholder="여행 이름 (예: 후쿠오카 온천 여행)"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                  />
                  <select 
                    value={newGroupDestination}
                    onChange={(e) => setNewGroupDestination(e.target.value)}
                  >
                    <option value="오사카">오사카</option>
                    <option value="교토">교토</option>
                    <option value="후쿠오카">후쿠오카</option>
                    <option value="도쿄">도쿄</option>
                    <option value="삿포로">삿포로</option>
                    <option value="기타">기타</option>
                  </select>
                </div>
                <button type="submit" className="submit-btn">
                  여행 지도 생성하기
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

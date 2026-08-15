import React, { useState } from 'react';

const REGION_COORDS = {
  '난바': { lat: 34.6655, lng: 135.5015, name: '🏮 난바' },
  '도톤보리': { lat: 34.6687, lng: 135.5013, name: '🏮 도톤보리' },
  '우메다': { lat: 34.7025, lng: 135.4959, name: '🏙️ 우메다' },
  '신사이바시': { lat: 34.6750, lng: 135.5005, name: '🛍️ 신사이바시' },
  'USJ': { lat: 34.6654, lng: 135.4323, name: '🎢 USJ' },
  '교토': { lat: 35.0037, lng: 135.7681, name: '⛩️ 교토' },
  '아라시야마': { lat: 35.0116, lng: 135.6777, name: '🎋 아라시야마' },
  '간사이공항': { lat: 34.4320, lng: 135.2304, name: '🛫 간사이공항' },
  '신세카이': { lat: 34.6525, lng: 135.5064, name: '🗼 신세카이' }
};

export default function InteractiveMap({ reels, onToggleFavorite, onVote }) {
  const [selectedRegionTab, setSelectedRegionTab] = useState('all');
  const [activePinReel, setActivePinReel] = useState(null);

  // Ensure all reels have valid coordinates (using region fallback + pseudo scatter)
  const preparedReels = reels.map((reel, idx) => {
    let lat = reel.lat;
    let lng = reel.lng;

    if (!lat || !lng) {
      const regKey = Object.keys(REGION_COORDS).find(k => (reel.region || '').includes(k)) || '난바';
      const base = REGION_COORDS[regKey];
      // Slight scatter so duplicate spots don't overlap exactly
      const offsetLat = ((idx % 5) - 2) * 0.004;
      const offsetLng = (((idx * 3) % 5) - 2) * 0.004;
      lat = base.lat + offsetLat;
      lng = base.lng + offsetLng;
    }

    return { ...reel, lat, lng };
  });

  // Filter by selected region tab
  const displayReels = selectedRegionTab === 'all'
    ? preparedReels
    : preparedReels.filter(r => (r.region || '').includes(selectedRegionTab));

  // Bounds for Kansai (lat: 34.35 ~ 35.08, lng: 135.20 ~ 135.85)
  const minLat = 34.38;
  const maxLat = 35.06;
  const minLng = 135.20;
  const maxLng = 135.85;

  const getPinPos = (lat, lng) => {
    const x = ((lng - minLng) / (maxLng - minLng)) * 82 + 9;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 80 + 10;
    return { 
      left: `${Math.max(6, Math.min(94, x))}%`, 
      top: `${Math.max(6, Math.min(94, y))}%` 
    };
  };

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'sightseeing': return '#00A699';
      case 'dining': return '#FF385C';
      case 'shopping': return '#E06836';
      case 'transit': return '#2B87D1';
      default: return '#FF9500';
    }
  };

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'sightseeing': return '🏛️';
      case 'dining': return '🍽️';
      case 'shopping': return '🛍️';
      case 'transit': return '🚌';
      default: return '📍';
    }
  };

  const regionsList = [
    { id: 'all', label: '📍 전체 지역' },
    { id: '난바', label: '🏮 난바' },
    { id: '도톤보리', label: '🍜 도톤보리' },
    { id: '우메다', label: '🏙️ 우메다' },
    { id: '신사이바시', label: '🛍️ 신사이바시' },
    { id: 'USJ', label: '🎢 USJ' },
    { id: '교토', label: '⛩️ 교토' },
    { id: '간사이공항', label: '🛫 공항' }
  ];

  return (
    <div className="map-view-wrapper">
      {/* 1. Region Quick Filter Tabs */}
      <div className="map-region-slider">
        {regionsList.map(reg => (
          <button
            key={reg.id}
            className={`map-reg-chip ${selectedRegionTab === reg.id ? 'active' : ''}`}
            onClick={() => {
              setSelectedRegionTab(reg.id);
              setActivePinReel(null);
            }}
          >
            {reg.label}
          </button>
        ))}
      </div>

      {/* 2. Map Legend Bar */}
      <div className="map-legend-bar">
        <div className="legend-item"><span className="dot dot-sight"></span>관광 ({displayReels.filter(r => r.primaryCategory === 'sightseeing').length})</div>
        <div className="legend-item"><span className="dot dot-dining"></span>맛집 ({displayReels.filter(r => r.primaryCategory === 'dining').length})</div>
        <div className="legend-item"><span className="dot dot-shop"></span>쇼핑 ({displayReels.filter(r => r.primaryCategory === 'shopping').length})</div>
        <div className="legend-item"><span className="dot dot-transit"></span>교통 ({displayReels.filter(r => r.primaryCategory === 'transit').length})</div>
      </div>

      {/* 3. Visual Map Canvas */}
      <div className="map-canvas-area">
        {/* Visual landmark labels */}
        <div className="map-zone-tag zone-kyoto">⛩️ 교토 / 기온</div>
        <div className="map-zone-tag zone-umeda">🏙️ 우메다역</div>
        <div className="map-zone-tag zone-namba">🏮 난바 / 도톤보리</div>
        <div className="map-zone-tag zone-usj">🎢 USJ 테마파크</div>
        <div className="map-zone-tag zone-rinku">🛫 간사이공항</div>

        {/* Map Pins */}
        {displayReels.map((reel) => {
          const pos = getPinPos(reel.lat, reel.lng);
          const isSelected = activePinReel?.id === reel.id;

          return (
            <button
              key={reel.id}
              className={`interactive-map-pin ${isSelected ? 'selected-pin' : ''}`}
              style={{
                left: pos.left,
                top: pos.top,
                backgroundColor: getCategoryColor(reel.primaryCategory)
              }}
              onClick={() => setActivePinReel(reel)}
              title={`${reel.title} (${reel.region})`}
            >
              <span className="pin-symbol">{getCategoryIcon(reel.primaryCategory)}</span>
              {reel.votes > 0 && (
                <span className="pin-vote-badge">+{reel.votes}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* 4. Active Selected Pin Detail Sheet or Region Places Drawer */}
      <div className="map-bottom-drawer">
        <div className="drawer-header">
          <span className="drawer-title">
            {activePinReel ? `📌 선택된 장소` : `🗺️ ${selectedRegionTab === 'all' ? '전체' : selectedRegionTab} 릴스 장소 (${displayReels.length}곳)`}
          </span>
          {activePinReel && (
            <button className="drawer-close-btn" onClick={() => setActivePinReel(null)}>
              전체 보기 ✕
            </button>
          )}
        </div>

        <div className="drawer-places-scroll">
          {(activePinReel ? [activePinReel] : displayReels).map(reel => (
            <div key={reel.id} className="drawer-place-card">
              <div className="drawer-card-top">
                <span className="drawer-badge" style={{ color: getCategoryColor(reel.primaryCategory) }}>
                  {getCategoryIcon(reel.primaryCategory)} {reel.region}
                </span>
                <button 
                  className="drawer-vote-btn"
                  onClick={() => onVote && onVote(reel.id)}
                >
                  ❤️ {reel.votes || 0}
                </button>
              </div>

              <h4 className="drawer-card-name">{reel.title}</h4>
              {reel.memo && <p className="drawer-card-memo">{reel.memo}</p>}

              <div className="drawer-card-actions">
                <a 
                  href={reel.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="drawer-action-btn action-insta"
                >
                  🎬 인스타 릴스
                </a>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('오사카 ' + reel.region + ' ' + reel.title)}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="drawer-action-btn action-map"
                >
                  📍 구글 지도 길찾기
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';

export default function InteractiveMap({ reels, onToggleFavorite, onVote }) {
  const [activePinReel, setActivePinReel] = useState(null);

  // Group reels with coords
  const mapReels = reels.filter(r => r.lat && r.lng);

  // Bounds for Osaka/Kansai region (lat: 34.35 ~ 35.05, lng: 135.25 ~ 135.85)
  const minLat = 34.38;
  const maxLat = 35.04;
  const minLng = 135.28;
  const maxLng = 135.82;

  const getPinPos = (lat, lng) => {
    const x = ((lng - minLng) / (maxLng - minLng)) * 86 + 7; // % from left
    const y = ((maxLat - lat) / (maxLat - minLat)) * 82 + 9; // % from top (inverted)
    return { left: `${Math.max(5, Math.min(95, x))}%`, top: `${Math.max(5, Math.min(95, y))}%` };
  };

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'sightseeing': return '#00A699';
      case 'dining': return '#FF385C';
      case 'shopping': return '#E06836';
      case 'transit': return '#2B87D1';
      default: return '#F39C12';
    }
  };

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'sightseeing': return '🏛️';
      case 'dining': return '🍽️';
      case 'shopping': return '🛍️';
      case 'transit': return '🚌';
      default: return '💡';
    }
  };

  return (
    <div className="map-view-container">
      {/* Map Header & Legend */}
      <div className="map-legend-bar">
        <div className="legend-item"><span className="dot dot-sight"></span>관광</div>
        <div className="legend-item"><span className="dot dot-dining"></span>맛집</div>
        <div className="legend-item"><span className="dot dot-shop"></span>쇼핑</div>
        <div className="legend-item"><span className="dot dot-transit"></span>교통</div>
      </div>

      {/* Interactive Map Canvas */}
      <div className="map-canvas">
        {/* Background Regional Guides */}
        <div className="map-zone-label zone-kyoto">⛩️ 교토 / 아라시야마</div>
        <div className="map-zone-label zone-umeda">🏙️ 우메다</div>
        <div className="map-zone-label zone-namba">🏮 난바 / 도톤보리</div>
        <div className="map-zone-label zone-rinku">🛫 간사이공항 / 린쿠</div>

        {/* Map Pins */}
        {mapReels.map((reel) => {
          const pos = getPinPos(reel.lat, reel.lng);
          const isSelected = activePinReel?.id === reel.id;

          return (
            <button
              key={reel.id}
              className={`map-pin-btn ${isSelected ? 'active-pin' : ''}`}
              style={{
                left: pos.left,
                top: pos.top,
                backgroundColor: getCategoryColor(reel.primaryCategory)
              }}
              onClick={() => setActivePinReel(reel)}
              title={reel.title}
            >
              <span className="pin-icon">{getCategoryIcon(reel.primaryCategory)}</span>
              {reel.votes > 0 && <span className="pin-vote-badge">+{reel.votes}</span>}
            </button>
          );
        })}
      </div>

      {/* Floating Pin Card Preview */}
      {activePinReel && (
        <div className="map-floating-card">
          <div className="floating-card-header">
            <span className="badge badge-primary">
              {getCategoryIcon(activePinReel.primaryCategory)} {activePinReel.region}
            </span>
            <button className="close-pin-btn" onClick={() => setActivePinReel(null)}>✕</button>
          </div>

          <h3 className="floating-title">{activePinReel.title}</h3>
          <p className="floating-memo">{activePinReel.memo}</p>

          <div className="floating-meta">
            <span>👤 {activePinReel.sharedBy} 공유</span>
            <button 
              className="vote-btn" 
              onClick={() => onVote && onVote(activePinReel.id)}
            >
              ❤️ 가고 싶어요 ({activePinReel.votes || 0})
            </button>
          </div>

          <div className="floating-actions">
            <a 
              href={activePinReel.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="action-link-btn action-insta"
            >
              <span>🎬</span> 릴스
            </a>
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('오사카 ' + activePinReel.region + ' ' + activePinReel.title)}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="action-link-btn action-map"
            >
              <span>📍</span> 길찾기
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

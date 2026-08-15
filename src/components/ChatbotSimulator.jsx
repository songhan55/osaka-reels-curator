import React, { useState } from 'react';
import { addReelToDb } from '../lib/supabase';

// AI Auto Categorization Rules for Simulator
const KEYWORD_RULES = [
  { primary: 'sightseeing', sub: 'spot', keywords: ['관광', '명소', '동네', '거리', '나카자키초', '호리에', '기타하마', '사찰', '절', '신사', '교토', '청수사', '아라시야마', '오사카성', '도톤보리', '코스', '가볼만한곳'] },
  { primary: 'sightseeing', sub: 'theme', keywords: ['유니버설', 'usj', '닌텐도', '해리포터', '익스프레스', '테마파크'] },
  { primary: 'dining', sub: 'meal', keywords: ['라멘', '스시', '초밥', '야키니쿠', '고기', '장어', '장어덮밥', '오코노미야키', '돈카츠', '우동', '소바', '맛집', '식당', '점심', '저녁', '식사', '이자카야', '맥주', '하이볼', '돈테키', '중화소바'] },
  { primary: 'dining', sub: 'snack', keywords: ['간식', '디저트', '카페', '파르페', '타코야키', '푸딩', '빵', '베이커리', '아이스크림', '편의점', '세븐일레븐', '로손', '당고', '말차', '커피'] },
  { primary: 'shopping', sub: 'fashion', keywords: ['폴로', '옷', '패션', '빈티지', '스트릿', '슈프림', '스투시', '신발', '스니커즈', '아울렛', '린쿠', '베이프', '브랜드'] },
  { primary: 'shopping', sub: 'shoplist', keywords: ['돈키호테', '마트', '슈퍼', '쇼핑', '드럭스토어', '화장품', '의약품', '면세', '빅카메라', '요도바시', '추천템', '라이프', '코스트코', '에디온'] },
  { primary: 'transit', sub: 'pass', keywords: ['교통', '패스', '주유패스', '라피트', '이코카', 'icoca', '지하철', '버스', '기차', '신칸센', '간사이', '승차권'] },
  { primary: 'transit', sub: 'comm', keywords: ['유심', 'esim', '이심', '와이파이', '통신', '환전', '트래블로그', '트래블월렛', '동전', '자동정산기', '엔화'] },
  { primary: 'tips', sub: 'tip', keywords: ['꿀팁', '팁', '주의', '필수', '준비물', '입국', '수속', '예약', '실수', '주의사항'] }
];

const SAMPLE_REELS = [
  {
    title: '오사카 난바 심야 라멘 현지인 1티어 맛집 🍜',
    url: 'https://www.instagram.com/reel/D_sample_ramen1/',
    memo: '진한 돈코츠 육수에 차슈 추가 필수! 새벽 2시까지 영업해서 야식 코스로 강력 추천.',
    region: '난바',
    lat: 34.6680,
    lng: 135.5010
  },
  {
    title: '우메다 헵파이브 근처 감성 빈티지 편집숍 👗',
    url: 'https://www.instagram.com/reel/D_sample_fashion1/',
    memo: '유니크한 스트릿 브랜드와 아메카지 빈티지 의류 득템 가능한 숨은 패션 성지.',
    region: '우메다',
    lat: 34.7040,
    lng: 135.5000
  },
  {
    title: '교토 후시미이나리 신사 새벽 감성 포토존 ⛩️',
    url: 'https://www.instagram.com/reel/D_sample_kyoto1/',
    memo: '붉은 토리이 터널 인생샷 명소! 오전 8시 전에 방문하면 사람 없이 힐링 사진 가능.',
    region: '교토',
    lat: 34.9671,
    lng: 135.7727
  }
];

export default function ChatbotSimulator({ isOpen, onClose, currentGroup, onReelAdded }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      name: 'TripReels Bot',
      text: `✈️ 안녕하세요! [${currentGroup?.name || '여행 단톡방'}] 큐레이터 봇입니다.\n이 대화방에 인스타그램 릴스를 공유하면 알아서 관광/맛집/쇼핑별로 정리해 드려요! 🗺️`
    },
    {
      id: 2,
      sender: 'user',
      name: '민수',
      text: '여기 인스타에서 본 오사카 라멘집인데 다들 어때?'
    }
  ]);

  const [inputUrl, setInputUrl] = useState('');
  const [inputMemo, setInputMemo] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const categorize = (text) => {
    const lower = text.toLowerCase();
    for (const rule of KEYWORD_RULES) {
      for (const kw of rule.keywords) {
        if (lower.includes(kw)) return { primary: rule.primary, sub: rule.sub };
      }
    }
    return { primary: 'dining', sub: 'meal' };
  };

  const handleSendReel = async (customSample = null) => {
    const sample = customSample || {
      title: inputMemo || '인스타에서 공유된 오사카 추천 장소',
      url: inputUrl || 'https://www.instagram.com/reel/D_custom_reel/',
      memo: inputMemo || '단톡방 멤버가 공유한 여행 추천 릴스 정보',
      region: '난바',
      lat: 34.6670,
      lng: 135.5020
    };

    if (!sample.url.trim()) return;

    setIsProcessing(true);

    // 1. Add User Message to Chat
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      name: '나 (동행자)',
      text: `🎬 [릴스 공유] ${sample.title}\n🔗 ${sample.url}`
    };
    setMessages(prev => [...prev, userMsg]);
    setInputUrl('');
    setInputMemo('');

    // 2. AI Processing Simulation (0.6s)
    setTimeout(async () => {
      const cat = categorize(sample.title + ' ' + sample.memo);

      const newReel = {
        id: `reel-${Date.now()}`,
        url: sample.url,
        title: sample.title,
        memo: sample.memo,
        primaryCategory: cat.primary,
        subCategory: cat.sub,
        region: sample.region || '오사카 전체',
        lat: sample.lat || 34.6690,
        lng: sample.lng || 135.5010,
        votes: 1,
        rating: 5,
        sharedBy: '나',
        isFavorite: false,
        createdAt: new Date().toISOString().split('T')[0]
      };

      // Save to Supabase Cloud DB
      if (currentGroup?.id) {
        await addReelToDb(currentGroup.id, newReel);
      }

      // Trigger Parent State update
      if (onReelAdded) {
        onReelAdded(newReel);
      }

      // 3. Bot Confirmation Message
      const botReply = {
        id: Date.now() + 1,
        sender: 'bot',
        name: 'TripReels Bot',
        text: `✨ [${cat.primary.toUpperCase()} > ${cat.sub}] '${sample.title}' 등록 완료!\n💬 요약: ${sample.memo}\n📍 지역: ${sample.region}\n\n👉 우리 여행 지도에 0.1초 만에 실시간 반영되었습니다! 🗺️`
      };

      setMessages(prev => [...prev, botReply]);
      setIsProcessing(false);
    }, 600);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet dm-simulator-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Instagram DM Header */}
        <div className="dm-header">
          <div className="dm-header-title">
            <span className="dm-ig-icon">📸</span>
            <div>
              <h3>인스타 단톡방 챗봇 시뮬레이터</h3>
              <p>👥 {currentGroup?.name || '우리 여행 단톡방'}</p>
            </div>
          </div>
          <button className="icon-btn" onClick={onClose}>✕</button>
        </div>

        {/* Chat Messages Body */}
        <div className="dm-chat-body">
          {messages.map((msg) => (
            <div key={msg.id} className={`dm-message-bubble ${msg.sender}`}>
              <span className="dm-sender-name">{msg.name}</span>
              <div className="dm-bubble-content">
                {msg.text.split('\n').map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            </div>
          ))}

          {isProcessing && (
            <div className="dm-message-bubble bot typing">
              <span className="dm-sender-name">TripReels Bot</span>
              <div className="dm-bubble-content">
                <span>🤖 AI가 릴스 본문을 분석하고 분류 중입니다... ⚡</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Sample Buttons */}
        <div className="dm-quick-samples">
          <span>⚡ 원클릭 샘플 릴스 전송:</span>
          <div className="dm-sample-chips">
            {SAMPLE_REELS.map((sample, idx) => (
              <button 
                key={idx} 
                className="dm-chip-btn"
                disabled={isProcessing}
                onClick={() => handleSendReel(sample)}
              >
                {sample.title.slice(0, 18)}...
              </button>
            ))}
          </div>
        </div>

        {/* Custom Input Box */}
        <div className="dm-input-area">
          <input 
            type="text" 
            placeholder="릴스 제목/장소 (예: 도톤보리 타코야키 맛집)"
            value={inputMemo}
            onChange={(e) => setInputMemo(e.target.value)}
          />
          <div className="dm-input-row">
            <input 
              type="text" 
              placeholder="인스타그램 릴스 링크 (URL)"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
            />
            <button 
              className="dm-send-btn" 
              disabled={isProcessing || !inputMemo.trim()}
              onClick={() => handleSendReel()}
            >
              전송 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

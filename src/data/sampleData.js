export const CATEGORIES = {
  primary: [
    { id: 'all', name: '전체', icon: '✨' },
    { id: 'aviation', name: '항공 관련', icon: '🛫', color: '#0066CC' },
    { id: 'dining', name: '식사/맛집', icon: '🍽️', color: '#FF385C' },
    { id: 'shopping', name: '쇼핑', icon: '🛍️', color: '#E06836' },
    { id: 'transit', name: '교통/통신', icon: '🚌', color: '#2B87D1' },
    { id: 'sightseeing', name: '관광/일정', icon: '🏛️', color: '#00A699' },
    { id: 'lodging', name: '숙소', icon: '🏨', color: '#8E44AD' },
    { id: 'tips', name: '여행 꿀팁', icon: '💡', color: '#F39C12' },
  ],
  subcategories: {
    aviation: [
      { id: 'ticket', name: '항공권/특가', icon: '✈️' },
      { id: 'luggage', name: '수하물/공항팁', icon: '🧳' },
    ],
    dining: [
      { id: 'meal', name: '식사 (메인요리)', icon: '🍲' },
      { id: 'snack', name: '간식 (디저트/카페)', icon: '🍧' },
    ],
    shopping: [
      { id: 'shoplist', name: '쇼핑리스트', icon: '🛍️' },
      { id: 'fashion', name: '패션/잡화', icon: '👗' },
    ],
    transit: [
      { id: 'pass', name: '교통권/패스', icon: '🚍' },
      { id: 'comm', name: '통신/환전/꿀팁', icon: '📶' },
    ],
    sightseeing: [
      { id: 'spot', name: '관광명소', icon: '⛩️' },
      { id: 'photo', name: '포토스팟/체험', icon: '📸' },
    ],
    lodging: [
      { id: 'hotel', name: '호텔/료칸', icon: '🏢' },
    ],
    tips: [
      { id: 'tip', name: '꿀팁/주의사항', icon: '💡' },
    ]
  }
};

export const INITIAL_REELS = [
  {
    "id": "tg-reel-1786723625",
    "title": "Instagram",
    "url": "https://www.instagram.com/reel/DazC_GYpMoy/?igsh=Z3psbDAzOTZtZW80",
    "primaryCategory": "tips",
    "subCategory": "tip",
    "region": "난바",
    "rating": 5,
    "memo": "인스타그램 릴스에서 공유된 오사카 여행 꿀팁 정보",
    "isFavorite": true,
    "createdAt": "2026-08-15",
    "sharedBy": "텔레그램봇"
  },
  {
    "id": "tg-reel-1786723350",
    "title": "오사카 수집 릴스",
    "url": "https://www.instagram.com/reel/DbcEwYOlIaG/?igsh=MWlnYnNhOW84eDFuaw==",
    "primaryCategory": "dining",
    "subCategory": "meal",
    "region": "난바",
    "rating": 5,
    "memo": "텔레그램 봇으로 전송된 릴스",
    "isFavorite": true,
    "createdAt": "2026-08-15",
    "sharedBy": "텔레그램봇"
  }
];

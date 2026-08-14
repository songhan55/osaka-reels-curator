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
    "id": "tg-reel-1786724578",
    "title": "오사카 여행 필수 코스, 551 호라이(551 HORAI) 만두 🥟",
    "url": "https://www.instagram.com/reel/Db53hJcTV6X/?igsh=MWN0bm0yamZoYnR6NQ==",
    "primaryCategory": "aviation",
    "subCategory": "ticket",
    "region": "난바",
    "rating": 5,
    "memo": "가장 빠르게 구매하는 방법🤗 시내에서 줄 서다 시간 다 보내지 마시고 간사이공항 제1터미널 도착층(1F)으로 가세요! ✈️ 난바나 우메다 본점은 언제나 긴 줄로 악명 높은데",
    "isFavorite": true,
    "createdAt": "2026-08-15",
    "sharedBy": "텔레그램봇"
  }
];

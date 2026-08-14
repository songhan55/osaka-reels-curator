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
    "id": "tg-reel-1",
    "title": "오사카 85년 노포 전설의 장어덮밥 (우오토요) 🍱",
    "url": "https://www.instagram.com/reel/DbSokSxyWiB/",
    "primaryCategory": "dining",
    "subCategory": "meal",
    "region": "난바",
    "rating": 5,
    "memo": "구로몬시장 80대 할머니가 운영하는 85년 노포! 9시 오픈 1시간 전 웨이팅 필수, 포장 전용 무조건 1마리 추천.",
    "isFavorite": true,
    "createdAt": "2026-08-15",
    "sharedBy": "텔레그램봇"
  },
  {
    "id": "tg-reel-2",
    "title": "오사카 폴로 랄프로렌 70% 할인 아울렛 🛍️",
    "url": "https://www.instagram.com/reel/DazC_GYpMoy/",
    "primaryCategory": "shopping",
    "subCategory": "fashion",
    "region": "간사이공항",
    "rating": 5,
    "memo": "린쿠 프리미엄 아울렛 폴로 랄프로렌 팩토리 스토어! 영업시간 10:00~20:00, 최대 70% 할인 득템 명소.",
    "isFavorite": true,
    "createdAt": "2026-08-15",
    "sharedBy": "텔레그램봇"
  },
  {
    "id": "tg-reel-3",
    "title": "현지인이 알려준 일본 마트 추천 쇼핑템 🛒",
    "url": "https://www.instagram.com/reel/DbcEwYOlIaG/",
    "primaryCategory": "shopping",
    "subCategory": "shoplist",
    "region": "난바",
    "rating": 5,
    "memo": "라이프, 오케이스토어 등 일본 현지 마트에서 꼭 사야 할 가성비 해산물, 모둠 초밥, 밥도둑 꿀템 총정리.",
    "isFavorite": true,
    "createdAt": "2026-08-15",
    "sharedBy": "텔레그램봇"
  },
  {
    id: 'reel-0',
    title: '간사이공항 T2 피치항공 vs T1 대한항공 수하물 규정 & 공항팁 🛫',
    url: 'https://www.instagram.com/reel/C0a1b2c3d4e/',
    primaryCategory: 'aviation',
    subCategory: 'ticket',
    region: '간사이공항',
    rating: 5,
    memo: '피치항공은 2터미널(T2) 이용! 셔틀버스 10분 소요되니 최소 2시간 반 전 도착 필수',
    isFavorite: true,
    createdAt: '2026-08-14',
    sharedBy: '민수'
  },
  {
    id: 'reel-1',
    title: '오사카 현지인 강력 추천! 난바 라멘 웨이팅 없이 먹는 비밀 맛집 🍜',
    url: 'https://www.instagram.com/reel/C2a3b4c5d6e/',
    primaryCategory: 'dining',
    subCategory: 'meal',
    region: '난바',
    rating: 5,
    memo: '이치란보다 맛있고 웨이팅 15분 미만. 차슈 추가 필수!',
    isFavorite: true,
    createdAt: '2026-08-10',
    sharedBy: '민수'
  },
  {
    id: 'reel-6',
    title: '유니버설 스튜디오 재팬(USJ) 닌텐도 월드 확약권 없이 들어가는 법! ⛩️',
    url: 'https://www.instagram.com/reel/C7c1d2e3f4g/',
    primaryCategory: 'sightseeing',
    subCategory: 'spot',
    region: 'USJ',
    rating: 5,
    memo: '오픈런 7:30 도착 필수. 들어가자마자 USJ 앱으로 정리권 등록하기!',
    isFavorite: true,
    createdAt: '2026-08-13',
    sharedBy: '민수'
  }
];

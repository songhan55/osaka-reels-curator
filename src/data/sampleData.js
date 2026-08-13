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
    id: 'reel-0',
    title: '간사이공항 T2 피치항공 vs T1 대한항공 수하물 규정 & 위탁화물 꿀팁 🛫',
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
    id: 'reel-2',
    title: '도톤보리 필수 디저트 갓 구운 파르페 & 타코야키 비교 🍧',
    url: 'https://www.instagram.com/reel/C3f4g5h6j7k/',
    primaryCategory: 'dining',
    subCategory: 'snack',
    region: '도톤보리',
    rating: 4,
    memo: '앗치치혼포 타코야키 파얹은 맛 추천! 줄 길면 맞은편 고기타코야키도 괜찮음.',
    isFavorite: true,
    createdAt: '2026-08-11',
    sharedBy: '지은'
  },
  {
    id: 'reel-3',
    title: '오사카 돈키호테 2026년 최신 털어야 할 필수 쇼핑리스트 TOP 10 🛍️',
    url: 'https://www.instagram.com/reel/C4k8m9n0p1q/',
    primaryCategory: 'shopping',
    subCategory: 'shoplist',
    region: '우메다',
    rating: 5,
    memo: '5% 쿠폰 챙기기, 면세 15,000엔 이상 받아야 할인 적용됨!',
    isFavorite: true,
    createdAt: '2026-08-12',
    sharedBy: '민수'
  },
  {
    id: 'reel-4',
    title: '간사이 공항에서 난바까지 34분! 라피트 특급 열차 할인 교환 꿀팁 🚍',
    url: 'https://www.instagram.com/reel/C5r2t3u4v5w/',
    primaryCategory: 'transit',
    subCategory: 'pass',
    region: '간사이공항',
    rating: 5,
    memo: '클룩 미리 구매 후 QR으로 지정석 탑승. 현장 구매보다 3,000원 쌈',
    isFavorite: false,
    createdAt: '2026-08-08',
    sharedBy: '본인'
  },
  {
    id: 'reel-5',
    title: '일본 여행 필수! eSIM vs 포켓와이파이 속도 비교 & 무료 환전소 위치 📶',
    url: 'https://www.instagram.com/reel/C6x7y8z9a0b/',
    primaryCategory: 'transit',
    subCategory: 'comm',
    region: '전체',
    rating: 4,
    memo: '트래블로그 카드 가져가면 세븐일레븐 ATM 수수료 무료!',
    isFavorite: false,
    createdAt: '2026-08-09',
    sharedBy: '지은'
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
  },
  {
    id: 'reel-7',
    title: '우메다 스카이빌딩 360도 야경 최적 방문 시간 & 인생샷 팁 📸',
    url: 'https://www.instagram.com/reel/C8h5j6k7l8m/',
    primaryCategory: 'sightseeing',
    subCategory: 'photo',
    region: '우메다',
    rating: 4,
    memo: '주유패스 무료 입장은 16시 이전까지만 가능! 일몰 30분 전 탑승 추천',
    isFavorite: false,
    createdAt: '2026-08-13',
    sharedBy: '지은'
  },
  {
    id: 'reel-8',
    title: '난바역 도보 3분! 대목욕탕까지 있는 가성비 10만원대 신축 호텔 추천 🏢',
    url: 'https://www.instagram.com/reel/C9n0p1q2r3s/',
    primaryCategory: 'lodging',
    subCategory: 'hotel',
    region: '난바',
    rating: 5,
    memo: '칸데오 호텔 or 온센 호텔. 한국어 가능한 직원 상주.',
    isFavorite: true,
    createdAt: '2026-08-07',
    sharedBy: '본인'
  },
  {
    id: 'reel-9',
    title: 'Visit Japan Web(VJW) 입국 수속 5분 만에 끝내는 사전등록 꿀팁 💡',
    url: 'https://www.instagram.com/reel/D0t4u5v6w7x/',
    primaryCategory: 'tips',
    subCategory: 'tip',
    region: '전체',
    rating: 5,
    memo: '출국 전날 미리 캡처본 스마트폰에 저장해 둘 것 (공항 와이파이 느림)',
    isFavorite: false,
    createdAt: '2026-08-06',
    sharedBy: '민수'
  }
];

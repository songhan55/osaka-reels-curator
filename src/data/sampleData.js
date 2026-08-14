export const CATEGORIES = {
  primary: [
    { id: 'all', name: '전체', icon: '✨' },
    { id: 'sightseeing', name: '관광/명소', icon: '🏛️', color: '#00A699' },
    { id: 'dining', name: '맛집/카페', icon: '🍽️', color: '#FF385C' },
    { id: 'shopping', name: '쇼핑', icon: '🛍️', color: '#E06836' },
    { id: 'transit', name: '교통/통신', icon: '🚌', color: '#2B87D1' },
    { id: 'aviation', name: '항공/준비', icon: '🛫', color: '#0066CC' },
    { id: 'lodging', name: '숙소', icon: '🏨', color: '#8E44AD' },
    { id: 'tips', name: '여행 꿀팁', icon: '💡', color: '#F39C12' },
  ],
  subcategories: {
    sightseeing: [
      { id: 'spot', name: '관광명소/코스', icon: '⛩️' },
      { id: 'theme', name: 'USJ/테마파크', icon: '🎢' },
      { id: 'photo', name: '포토스팟/야경', icon: '📸' },
    ],
    dining: [
      { id: 'meal', name: '식사/맛집', icon: '🍲' },
      { id: 'snack', name: '간식/디저트/편의점', icon: '🍧' },
    ],
    shopping: [
      { id: 'shoplist', name: '쇼핑리스트/마트', icon: '🛒' },
      { id: 'fashion', name: '패션/아울렛/잡화', icon: '👗' },
    ],
    transit: [
      { id: 'pass', name: '교통패스/열차', icon: '🚍' },
      { id: 'comm', name: '통신/환전/동전', icon: '📶' },
    ],
    aviation: [
      { id: 'ticket', name: '항공권/특가', icon: '✈️' },
      { id: 'luggage', name: '수하물/공항팁', icon: '🧳' },
    ],
    lodging: [
      { id: 'hotel', name: '호텔/료칸', icon: '🏢' },
    ],
    tips: [
      { id: 'tip', name: '필수팁/주의사항', icon: '💡' },
    ]
  }
};

export const INITIAL_REELS = [
  // --- 🏛️ 관광/명소 (4개) ---
  {
    id: 'reel-sightseeing-1',
    title: '오사카 현지인 추천 로컬 동네 8곳 🏙️',
    url: 'https://www.instagram.com/p/DcBLOQIE6PB/',
    primaryCategory: 'sightseeing',
    subCategory: 'spot',
    region: '우메다',
    rating: 5,
    memo: '나카자키초 카페거리, 호리에 감성숍, 기타하마 강변 카페, 후쿠시마 맛집골목, 아베노 등 현지인 추천 동네 산책 코스 총정리.',
    isFavorite: true,
    createdAt: '2026-08-14',
    sharedBy: '인스타저장함'
  },
  {
    id: 'reel-sightseeing-2',
    title: '교토 4박 5일 완벽 여행 코스 총정리 ⛩️',
    url: 'https://www.instagram.com/reel/Dbp-4P3Jxpn/',
    primaryCategory: 'sightseeing',
    subCategory: 'spot',
    region: '교토',
    rating: 5,
    memo: '직접 여행하면서 찾은 교토 필수 명소부터 감성 스팟까지 4박 5일 알짜배기 동선 및 꿀팁 정리.',
    isFavorite: true,
    createdAt: '2026-08-14',
    sharedBy: '인스타저장함'
  },
  {
    id: 'reel-sightseeing-3',
    title: '오사카 3박 4일 동선 낭비 없는 알찬 코스 🌟',
    url: 'https://www.instagram.com/reel/DYo5Hb7TaeT/',
    primaryCategory: 'sightseeing',
    subCategory: 'spot',
    region: '도톤보리',
    rating: 5,
    memo: '현지인 맛집 + 동선 낭비 없는 최적 이동 동선 + 감성 관광지까지 꾹꾹 눌러 담은 3박 4일 핵심 일정.',
    isFavorite: false,
    createdAt: '2026-08-14',
    sharedBy: '인스타저장함'
  },
  {
    id: 'reel-sightseeing-4',
    title: '교토 숨은 힐링 사찰 단풍뷰 명소 ⛩️',
    url: 'https://www.instagram.com/reel/DYewnpnBzGO/',
    primaryCategory: 'sightseeing',
    subCategory: 'spot',
    region: '교토',
    rating: 5,
    memo: '창문 가득 채우는 초록빛 풍경과 바닥에 거울처럼 반사되는 뷰가 예술인 고즈넉한 교토 힐링 사찰 스팟.',
    isFavorite: false,
    createdAt: '2026-08-14',
    sharedBy: '인스타저장함'
  },

  // --- 🍽️ 맛집/카페 (7개) ---
  {
    id: 'reel-dining-1',
    title: '오사카 85년 노포 전설의 장어덮밥 (우오토요) 🍱',
    url: 'https://www.instagram.com/reel/DbSokSxyWiB/',
    primaryCategory: 'dining',
    subCategory: 'meal',
    region: '난바',
    rating: 5,
    memo: '구로몬시장 80대 할머니 운영 85년 노포! 9시 오픈 1시간 전 웨이팅 필수, 포장 전용 무조건 1마리 추천.',
    isFavorite: true,
    createdAt: '2026-08-14',
    sharedBy: '인스타저장함'
  },
  {
    id: 'reel-dining-2',
    title: '오사카 현지인 맛집 족보 (중화소바 쓰지 & 로바타 하나) 🍜',
    url: 'https://www.instagram.com/reel/DYLeIatztr-/',
    primaryCategory: 'dining',
    subCategory: 'meal',
    region: '신사이바시',
    rating: 5,
    memo: '1. 츄오구 중화소바 쓰지 (라멘)  2. 후쿠시마구 로바타 스시 하나 등 현지인 추천 찐맛집 리스트.',
    isFavorite: true,
    createdAt: '2026-08-14',
    sharedBy: '인스타저장함'
  },
  {
    id: 'reel-dining-3',
    title: '오사카 아침식사 반찬 골라 담는 로컬 식당 🍚',
    url: 'https://www.instagram.com/reel/DaxMPG_y0EA/',
    primaryCategory: 'dining',
    subCategory: 'meal',
    region: '난바',
    rating: 5,
    memo: '오전 9시 오픈 아침식사 맛집! 원하는 반찬을 직접 골라 담아 먹는 푸근한 로컬 분위기 (현금 결제 전용).',
    isFavorite: false,
    createdAt: '2026-08-14',
    sharedBy: '인스타저장함'
  },
  {
    id: 'reel-dining-4',
    title: '오사카 스시 사카바 사시스 난바점 코스 🍣',
    url: 'https://www.instagram.com/reel/DYO_ve8J0QZ/',
    primaryCategory: 'dining',
    subCategory: 'meal',
    region: '난바',
    rating: 5,
    memo: '가성비 최고 참치김밥으로 유명한 스시 사카바 사시스 난바점 및 주변 먹방 데이트 코스.',
    isFavorite: false,
    createdAt: '2026-08-14',
    sharedBy: '인스타저장함'
  },
  {
    id: 'reel-dining-5',
    title: '간사이공항 도착 시 551호라이 만두 꿀팁 🥟',
    url: 'https://www.instagram.com/reel/DaIVaJQhu3I/',
    primaryCategory: 'dining',
    subCategory: 'meal',
    region: '간사이공항',
    rating: 5,
    memo: '시내 매장은 웨이팅이 길어 힘드니, 간사이공항 도착하자마자 공항 매장에서 551호라이 육즙 만두 먼저 맛보기 추천!',
    isFavorite: false,
    createdAt: '2026-08-14',
    sharedBy: '인스타저장함'
  },
  {
    id: 'reel-dining-6',
    title: '오사카 지역별 심야 야식 마트 영업시간 총정리 🛒',
    url: 'https://www.instagram.com/reel/DZcP5acTPwu/',
    primaryCategory: 'dining',
    subCategory: 'meal',
    region: '난바',
    rating: 5,
    memo: '늦은 밤 야식 사기 좋은 오사카 지역별(난바/우메다/신사이바시) 대형 마트 위치, 주소, 영업시간 총정리.',
    isFavorite: false,
    createdAt: '2026-08-14',
    sharedBy: '인스타저장함'
  },
  {
    id: 'reel-dining-7',
    title: '일본 세븐일레븐 몽고탄멘 + 금돼지장조림 편의점 꿀조합 🍜',
    url: 'https://www.instagram.com/reel/DZPirmizsH3/',
    primaryCategory: 'dining',
    subCategory: 'snack',
    region: '오사카 전체',
    rating: 5,
    memo: '세븐일레븐 몽고탄멘 컵라면 + 금돼지장조림 + 반숙계란 조합! 얼큰하고 진한 육수의 극상 편의점 레시피.',
    isFavorite: false,
    createdAt: '2026-08-14',
    sharedBy: '인스타저장함'
  },

  // --- 🛍️ 쇼핑 (6개) ---
  {
    id: 'reel-shopping-1',
    title: '현지인이 알려준 일본 마트 추천템 & 초밥/해산물 🛒',
    url: 'https://www.instagram.com/reel/DbcEwYOlIaG/',
    primaryCategory: 'shopping',
    subCategory: 'shoplist',
    region: '오사카 전체',
    rating: 5,
    memo: '라이프, 오케이스토어 등 일본 현지 마트에서 꼭 사야 할 가성비 모둠 초밥, 해산물, 밥도둑 꿀템 정리.',
    isFavorite: true,
    createdAt: '2026-08-14',
    sharedBy: '인스타저장함'
  },
  {
    id: 'reel-shopping-2',
    title: '오사카 린쿠 아울렛 폴로 랄프로렌 70% 할인매장 🛍️',
    url: 'https://www.instagram.com/reel/DazC_GYpMoy/',
    primaryCategory: 'shopping',
    subCategory: 'fashion',
    region: '간사이공항',
    rating: 5,
    memo: '린쿠 프리미엄 아울렛 폴로 팩토리 스토어! 25~70% 기본 할인 + 외국인 5% 추가 할인 QR + 면세 혜택.',
    isFavorite: true,
    createdAt: '2026-08-14',
    sharedBy: '인스타저장함'
  },
  {
    id: 'reel-shopping-3',
    title: '약사가 알려주는 일본 드럭스토어 필수 외용제 5가지 💊',
    url: 'https://www.instagram.com/reel/Db0fdd4gLl5/',
    primaryCategory: 'shopping',
    subCategory: 'shoplist',
    region: '오사카 전체',
    rating: 5,
    memo: '일본 여행 시 돈키호테/드럭스토어에서 털어와야 할 효과 좋은 상비 외용제 및 연고 꿀템 5종.',
    isFavorite: false,
    createdAt: '2026-08-14',
    sharedBy: '인스타저장함'
  },
  {
    id: 'reel-shopping-4',
    title: '오사카 난바 에디온 본점 신상 쇼핑 성지 17% 할인 🛍️',
    url: 'https://www.instagram.com/reel/DbnuQZEoU4m/',
    primaryCategory: 'shopping',
    subCategory: 'shoplist',
    region: '난바',
    rating: 5,
    memo: '에디온 난바 본점 네버랜드! 전자제품부터 의약품, 주류, 과자, 기념품까지 최대 17% 면세/할인 혜택.',
    isFavorite: false,
    createdAt: '2026-08-14',
    sharedBy: '인스타저장함'
  },
  {
    id: 'reel-shopping-5',
    title: '일본 코스트코 애플 정품 최대 30% 저렴한 비교표 🍎',
    url: 'https://www.instagram.com/p/Db7bitsyYen/',
    primaryCategory: 'shopping',
    subCategory: 'shoplist',
    region: '오사카 전체',
    rating: 5,
    memo: '일본 코스트코 매장에서 애플 공식몰 정가 대비 최대 30% 저렴하게 판매 중인 인기 제품 가격 비교표.',
    isFavorite: false,
    createdAt: '2026-08-14',
    sharedBy: '인스타저장함'
  },
  {
    id: 'reel-shopping-6',
    title: '일본 가면 한국보다 훨씬 저렴한 패션/뷰티 브랜드 모음 👗',
    url: 'https://www.instagram.com/p/DbVKyvKEgey/',
    primaryCategory: 'shopping',
    subCategory: 'fashion',
    region: '오사카 전체',
    rating: 5,
    memo: '엔저 혜택으로 일본 현지에서 구매 시 훨씬 저렴한 인기 패션, 의류, 뷰티 브랜드 쇼핑리스트 모음.',
    isFavorite: false,
    createdAt: '2026-08-14',
    sharedBy: '인스타저장함'
  },

  // --- 🚌 교통/통신 (2개) ---
  {
    id: 'reel-transit-1',
    title: '일본 여행 동전 폭탄 해결법 (편의점/마트 자동정산기) 🪙',
    url: 'https://www.instagram.com/reel/DWlVHMvgT8z/',
    primaryCategory: 'transit',
    subCategory: 'comm',
    region: '오사카 전체',
    rating: 5,
    memo: '지갑에 쌓인 1엔/5엔/10엔 등 무거운 잔돈들을 편의점/마트 무인 현금 투입기에 한 번에 털어 넣어 계산하는 꿀팁!',
    isFavorite: true,
    createdAt: '2026-08-14',
    sharedBy: '인스타저장함'
  },
  {
    id: 'reel-transit-2',
    title: '오사카 주유패스 & 쇼핑 할인 쿠폰 알뜰 활용법 🎟️',
    url: 'https://www.instagram.com/p/Da9P-mqCsBL/',
    primaryCategory: 'transit',
    subCategory: 'pass',
    region: '오사카 전체',
    rating: 5,
    memo: '오사카 어메이징 패스(주유패스) 200% 뽕뽑는 사용법 및 쇼핑몰 할인 쿠폰 최소 결제 조건 안내.',
    isFavorite: false,
    createdAt: '2026-08-14',
    sharedBy: '인스타저장함'
  },

  // --- 🛫 항공/준비 (1개) ---
  {
    id: 'reel-aviation-1',
    title: '기내 반입 보조배터리 & 전자제품 변경 규정 안내 ✈️',
    url: 'https://www.instagram.com/reel/DXX0KzzkmYW/',
    primaryCategory: 'aviation',
    subCategory: 'luggage',
    region: '간사이공항',
    rating: 5,
    memo: '공항에서 당황하지 않게 출국 전 꼭 확인해야 할 리튬 보조배터리 Wh 용량별 기내 반입 및 위탁 수하물 규정.',
    isFavorite: false,
    createdAt: '2026-08-14',
    sharedBy: '인스타저장함'
  },

  // --- 💡 여행 꿀팁 (1개) ---
  {
    id: 'reel-tips-1',
    title: '오사카 첫날 절대 하지 말아야 할 실수 5가지 ⚠️',
    url: 'https://www.instagram.com/reel/DY3pElohqjC/',
    primaryCategory: 'tips',
    subCategory: 'tip',
    region: '난바',
    rating: 5,
    memo: '공항 IC카드 미충전, 주유패스로 USJ/공항 가려는 실수, 첫날 무리한 풀코스, 캐리어 끌고 관광 방지 꿀팁 5가지.',
    isFavorite: true,
    createdAt: '2026-08-14',
    sharedBy: '인스타저장함'
  }
];

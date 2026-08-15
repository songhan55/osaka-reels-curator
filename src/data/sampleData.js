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

export const DEFAULT_GROUPS = [
  {
    id: 'osaka-main',
    slug: 'osaka-main',
    name: '🇯🇵 2026 오사카 먹방 & 쇼핑 여행',
    destination: '오사카/간사이',
    membersCount: 4,
    badge: '인스타 단톡방 연동됨',
    reels: [
      {
        id: 'reel-sightseeing-1',
        title: '오사카 현지인 추천 로컬 동네 8곳 🏙️',
        url: 'https://www.instagram.com/p/DcBLOQIE6PB/',
        primaryCategory: 'sightseeing',
        subCategory: 'spot',
        region: '우메다',
        lat: 34.7065,
        lng: 135.5030,
        votes: 4,
        memo: '나카자키초 카페거리, 호리에 감성숍, 기타하마 강변 카페, 후쿠시마 맛집골목 등 현지인 추천 동네 산책 코스 총정리.',
        isFavorite: true,
        createdAt: '2026-08-15',
        sharedBy: '민수'
      },
      {
        id: 'reel-dining-1',
        title: '오사카 85년 노포 전설의 장어덮밥 (우오토요) 🍱',
        url: 'https://www.instagram.com/reel/DbSokSxyWiB/',
        primaryCategory: 'dining',
        subCategory: 'meal',
        region: '난바',
        lat: 34.6655,
        lng: 135.5070,
        votes: 3,
        memo: '구로몬시장 80대 할머니 운영 85년 노포! 9시 오픈 1시간 전 웨이팅 필수, 포장 전용 무조건 1마리 추천.',
        isFavorite: true,
        createdAt: '2026-08-15',
        sharedBy: '지은'
      },
      {
        id: 'reel-dining-2',
        title: '오사카 3번 갔는데 이 초밥집만 5번 감 🍣',
        url: 'https://www.instagram.com/reel/DWIeHhxkf41/',
        primaryCategory: 'dining',
        subCategory: 'meal',
        region: '난바',
        lat: 34.6660,
        lng: 135.5000,
        votes: 4,
        memo: '도착하는 날 저녁 고정 메뉴! 현지인과 관광객 모두 사랑하는 가성비 최고 찐초밥 맛집.',
        isFavorite: true,
        createdAt: '2026-08-15',
        sharedBy: '수현'
      },
      {
        id: 'reel-dining-3',
        title: '오사카 필수 디저트 쿠크다스 아이스크림 🍦',
        url: 'https://www.instagram.com/reel/DahHCsCxva5/',
        primaryCategory: 'dining',
        subCategory: 'snack',
        region: '신사이바시',
        lat: 34.6750,
        lng: 135.5005,
        votes: 2,
        memo: '단거 안 좋아하는 사람도 반하는 프리미엄 쿠크다스 콘 소프트 아이스크림 맛집.',
        isFavorite: false,
        createdAt: '2026-08-15',
        sharedBy: '하은'
      },
      {
        id: 'reel-dining-4',
        title: '우메다 타코야키 현지인 찐맛집 (네기마요) 🐙',
        url: 'https://www.instagram.com/reel/DZmaJQHxjVE/',
        primaryCategory: 'dining',
        subCategory: 'snack',
        region: '우메다',
        lat: 34.7020,
        lng: 135.4960,
        votes: 3,
        memo: '파가 듬뿍 올라간 네기마요 타코야키가 대표 메뉴! 현금 결제 전용, 오픈/마감 시간대 방문 추천.',
        isFavorite: true,
        createdAt: '2026-08-15',
        sharedBy: '민수'
      },
      {
        id: 'reel-dining-5',
        title: '오사카 소울푸드 두툼한 돈테키 맛집 (사루쇼쿠도) 🥩',
        url: 'https://www.instagram.com/reel/DaHUi95zsqH/',
        primaryCategory: 'dining',
        subCategory: 'meal',
        region: '난바',
        lat: 34.6850,
        lng: 135.5010,
        votes: 2,
        memo: '특제 간장 소스에 푹 졸여낸 두툼한 돼지고기 스테이크 돈테키 정식 찐맛집.',
        isFavorite: false,
        createdAt: '2026-08-15',
        sharedBy: '지은'
      },
      {
        id: 'reel-shopping-1',
        title: '오사카 린쿠 아울렛 폴로 랄프로렌 70% 할인매장 🛍️',
        url: 'https://www.instagram.com/reel/DazC_GYpMoy/',
        primaryCategory: 'shopping',
        subCategory: 'fashion',
        region: '간사이공항',
        lat: 34.4065,
        lng: 135.3080,
        votes: 4,
        memo: '린쿠 프리미엄 아울렛 폴로 팩토리 스토어! 25~70% 기본 할인 + 외국인 5% 추가 할인 QR + 면세 혜택.',
        isFavorite: true,
        createdAt: '2026-08-15',
        sharedBy: '하은'
      },
      {
        id: 'reel-shopping-2',
        title: '도톤보리 드럭스토어 면세 10% + 카카오페이 10% 할인 🛍️',
        url: 'https://www.instagram.com/reel/DZuJbh7xu6i/',
        primaryCategory: 'shopping',
        subCategory: 'shoplist',
        region: '도톤보리',
        lat: 34.6687,
        lng: 135.5015,
        votes: 3,
        memo: '돈키호테 뒷골목 위치! 현지 가격도 저렴하고 면세에 카카오페이 추가 할인까지 적용되는 알짜 쇼핑 성지.',
        isFavorite: true,
        createdAt: '2026-08-15',
        sharedBy: '수현'
      },
      {
        id: 'reel-shopping-3',
        title: '현지인이 알려준 일본 마트 추천템 & 초밥/해산물 🛒',
        url: 'https://www.instagram.com/reel/DbcEwYOlIaG/',
        primaryCategory: 'shopping',
        subCategory: 'shoplist',
        region: '난바',
        lat: 34.6640,
        lng: 135.4980,
        votes: 2,
        memo: '라이프, 오케이스토어 등 일본 현지 마트에서 꼭 사야 할 가성비 모둠 초밥, 해산물, 밥도둑 꿀템 정리.',
        isFavorite: true,
        createdAt: '2026-08-15',
        sharedBy: '지은'
      },
      {
        id: 'reel-transit-1',
        title: '일본 여행 동전 폭탄 해결법 (편의점/마트 자동정산기) 🪙',
        url: 'https://www.instagram.com/reel/DWlVHMvgT8z/',
        primaryCategory: 'transit',
        subCategory: 'comm',
        region: '오사카 전체',
        lat: 34.6937,
        lng: 135.5022,
        votes: 4,
        memo: '지갑에 쌓인 1엔/5엔/10엔 등 무거운 잔돈들을 편의점/마트 무인 현금 투입기에 한 번에 털어 넣어 계산하는 꿀팁!',
        isFavorite: true,
        createdAt: '2026-08-15',
        sharedBy: '민수'
      },
      {
        id: 'reel-tips-1',
        title: '오사카 첫날 절대 하지 말아야 할 실수 5가지 ⚠️',
        url: 'https://www.instagram.com/reel/DY3pElohqjC/',
        primaryCategory: 'tips',
        subCategory: 'tip',
        region: '난바',
        lat: 34.6670,
        lng: 135.5020,
        votes: 4,
        memo: '공항 IC카드 미충전, 주유패스로 USJ/공항 가려는 실수, 첫날 무리한 풀코스, 캐리어 끌고 관광 방지 꿀팁 5가지.',
        isFavorite: true,
        createdAt: '2026-08-15',
        sharedBy: '수현'
      }
    ]
  },
  {
    id: 'kyoto-chill',
    slug: 'kyoto-chill',
    name: '⛩️ 교토 감성 힐링 4박 5일',
    destination: '교토/아라시야마',
    membersCount: 2,
    badge: '인스타 단톡방 연동됨',
    reels: [
      {
        id: 'kyoto-reel-1',
        title: '교토 4박 5일 완벽 여행 코스 총정리 ⛩️',
        url: 'https://www.instagram.com/reel/Dbp-4P3Jxpn/',
        primaryCategory: 'sightseeing',
        subCategory: 'spot',
        region: '교토',
        lat: 35.0037,
        lng: 135.7770,
        votes: 2,
        memo: '직접 여행하면서 찾은 교토 필수 명소부터 감성 스팟까지 4박 5일 알짜배기 동선 및 꿀팁 정리.',
        isFavorite: true,
        createdAt: '2026-08-15',
        sharedBy: '수현'
      },
      {
        id: 'kyoto-reel-2',
        title: '교토 숨은 힐링 사찰 단풍뷰 명소 ⛩️',
        url: 'https://www.instagram.com/reel/DYewnpnBzGO/',
        primaryCategory: 'sightseeing',
        subCategory: 'spot',
        region: '교토',
        lat: 35.0160,
        lng: 135.7980,
        votes: 2,
        memo: '창문 가득 채우는 초록빛 풍경과 바닥에 거울처럼 반사되는 뷰가 예술인 고즈넉한 교토 힐링 사찰 스팟.',
        isFavorite: true,
        createdAt: '2026-08-15',
        sharedBy: '지은'
      }
    ]
  }
];

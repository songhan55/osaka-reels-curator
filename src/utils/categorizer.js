/**
 * Smart Auto-Categorization Utility for Instagram Reels & Travel Notes
 */

const KEYWORD_RULES = [
  // Aviation / Flight
  { primary: 'aviation', sub: 'ticket', keywords: ['항공', '비행기', '항공권', '티웨이', '진에어', '제주항공', '피치항공', '대한항공', '아시아나', '에어부산', '에어서울', '특가', '탑승권', '마일리지', '체크인', '터미널'] },
  { primary: 'aviation', sub: 'luggage', keywords: ['수하물', '위탁', '기내', '캐리어', '짐', '무게', '공항팁', '액체류', '면세품'] },
  // Dining - Meal
  { primary: 'dining', sub: 'meal', keywords: ['라멘', '스시', '초밥', '야키니쿠', '고기', '오코노미야키', '돈카츠', '돈까스', '우동', '소바', '맛집', '식당', '점심', '저녁', '식사', '샤브샤브', '스키야키', '카레', '이자카야', '맥주', '하이볼', '덮밥', '규동', '장어'] },
  
  // Dining - Snack / Dessert
  { primary: 'dining', sub: 'snack', keywords: ['간식', '디저트', '카페', '파르페', '타코야키', '푸딩', '빵', '베이커리', '아이스크림', '편의점', '세븐일레븐', '로손', '패밀리마트', '당고', '차', '말차', '커피', '케이크', '샌드위치', '타르트'] },

  // Shopping - List
  { primary: 'shopping', sub: 'shoplist', keywords: ['돈키호테', '쇼핑', '드럭스토어', '화장품', '의약품', '과자', '면세', '택스리프', '선물', '기념품', '빅카메라', '요도바시'] },
  
  // Shopping - Fashion / Vintage
  { primary: 'shopping', sub: 'fashion', keywords: ['옷', '패션', '빈티지', '스트릿', '슈프림', '스투시', '신발', '스니커즈', '잡화', '오렌지스트리트', '아메리카무라', '백화점', '한큐', '다카시마야', '쇼핑몰'] },

  // Transit - Pass / Ticket
  { primary: 'transit', sub: 'pass', keywords: ['교통', '패스', '주유패스', '라피트', '이코카', '지하철', '버스', '기차', '신칸센', '간사이', '티켓', '승차권', '특급', '공항철도', '환승'] },

  // Transit - Comm / Tips / Money
  { primary: 'transit', sub: 'comm', keywords: ['유심', 'esim', '이심', '와이파이', '포켓', '통신', '환전', '트래블로그', '트래블월렛', '카드', '엔화', 'atm', '수수료', '데이터'] },

  // Sightseeing - Spot
  { primary: 'sightseeing', sub: 'spot', keywords: ['관광', '명소', '유니버설', 'usj', '닌텐도', '해리포터', '오사카성', '도톤보리', '신세카이', '츠텐카쿠', '신사', '절', '교토', '청수사', '키요미즈데라', '후시미이나리', '고베', '아쿠아리움', '가이유칸', '전망대'] },

  // Sightseeing - Photo / Experience
  { primary: 'sightseeing', sub: 'photo', keywords: ['포토', '사진', '인생샷', '야경', '야경스팟', '크루즈', '유람선', '온천', '체험', '유카타', '기모노', '일몰', '스카이빌딩', '관람차', '헵파이브'] },

  // Lodging
  { primary: 'lodging', sub: 'hotel', keywords: ['숙소', '호텔', '료칸', '에어비앤비', '게스트하우스', '체크인', '대목욕탕', '온천호텔', '난바숙소', '우메다숙소'] },

  // Travel Tips
  { primary: 'tips', sub: 'tip', keywords: ['꿀팁', '팁', '주의', '필수', '준비물', 'vjw', '입국', '수속', '예약', '환불', '취소', '어플', '앱', '날씨', '옷차림', '짐보관', '코인락커'] }
];

export function autoCategorizeText(text) {
  const lowerText = text.toLowerCase();
  
  for (const rule of KEYWORD_RULES) {
    for (const kw of rule.keywords) {
      if (lowerText.includes(kw)) {
        return { primary: rule.primary, sub: rule.sub, matchedKeyword: kw };
      }
    }
  }
  
  return { primary: 'dining', sub: 'meal', matchedKeyword: null };
}

export function extractRegion(text) {
  const regions = ['난바', '도톤보리', '우메다', '교토', '고베', '신사이바시', 'USJ', '유니버설', '간사이공항', '신세카이', '아라시야마', '기온'];
  for (const reg of regions) {
    if (text.includes(reg)) {
      return reg === '유니버설' ? 'USJ' : reg;
    }
  }
  return '오사카 전체';
}

export function parseBulkInput(rawInput) {
  const lines = rawInput.split('\n').filter(line => line.trim().length > 0);
  const results = [];
  
  let currentReel = {
    title: '',
    url: '',
    memo: '',
    sharedBy: '일행'
  };

  const urlRegex = /(https?:\/\/(?:www\.)?instagram\.com\/(?:reel|p)\/[A-Za-z0-9_-]+(?:\/\S*)?)/gi;

  for (const line of lines) {
    const trimmed = line.trim();
    const matchUrl = trimmed.match(urlRegex);

    if (matchUrl) {
      const url = matchUrl[0];
      const textWithoutUrl = trimmed.replace(url, '').trim();

      const catInfo = autoCategorizeText(trimmed);
      const region = extractRegion(trimmed);

      results.push({
        id: `reel-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        title: textWithoutUrl || '인스타그램 릴스 수집건',
        url: url,
        primaryCategory: catInfo.primary,
        subCategory: catInfo.sub,
        region: region,
        rating: 4,
        memo: textWithoutUrl ? `[자동 추출 메모] ${textWithoutUrl}` : '공유받은 릴스 링크',
        isFavorite: false,
        createdAt: new Date().toISOString().split('T')[0],
        sharedBy: '일행'
      });
    } else if (trimmed.length > 5) {
      // Standalone text note without URL
      const catInfo = autoCategorizeText(trimmed);
      const region = extractRegion(trimmed);

      results.push({
        id: `reel-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        title: trimmed,
        url: 'https://www.instagram.com/',
        primaryCategory: catInfo.primary,
        subCategory: catInfo.sub,
        region: region,
        rating: 4,
        memo: '메모로 등록된 릴스 정보',
        isFavorite: false,
        createdAt: new Date().toISOString().split('T')[0],
        sharedBy: '일행'
      });
    }
  }

  return results;
}

export function parseInstagramExportJSON(jsonObj) {
  const results = [];
  
  // Instagram exported saved media structure handler
  let savedItems = [];
  if (Array.isArray(jsonObj)) {
    savedItems = jsonObj;
  } else if (jsonObj.saved_saved_media && Array.isArray(jsonObj.saved_saved_media)) {
    savedItems = jsonObj.saved_saved_media;
  } else if (jsonObj.saved_collections && Array.isArray(jsonObj.saved_collections)) {
    savedItems = jsonObj.saved_collections;
  }

  for (const item of savedItems) {
    let url = '';
    let title = '';

    if (typeof item === 'string' && item.includes('instagram.com')) {
      url = item;
    } else if (item.string_map_data) {
      for (const key in item.string_map_data) {
        if (item.string_map_data[key].href) {
          url = item.string_map_data[key].href;
        }
        if (item.string_map_data[key].value) {
          title = item.string_map_data[key].value;
        }
      }
    } else if (item.title || item.name || item.url || item.href) {
      title = item.title || item.name || '';
      url = item.url || item.href || '';
    }

    if (url) {
      const combinedText = (title + ' ' + url).trim();
      const catInfo = autoCategorizeText(combinedText);
      const region = extractRegion(combinedText);

      results.push({
        id: `reel-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        title: title || '인스타 컬렉션 수집 릴스',
        url: url,
        primaryCategory: catInfo.primary,
        subCategory: catInfo.sub,
        region: region,
        rating: 5,
        memo: '📸 인스타그램 저장 컬렉션 자동 동기화건',
        isFavorite: true,
        createdAt: new Date().toISOString().split('T')[0],
        sharedBy: '인스타컬렉션'
      });
    }
  }

  return results;
}


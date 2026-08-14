import zipfile
import json
import re
import datetime
import os
import sys

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

DATA_FILE = r"C:\project\Osaka\src\data\sampleData.js"
ZIP_PATH = r"c:\project\Osaka\instagram-sshan__gg-2026-08-14-pc8n0q4C.zip"

JAPAN_TRAVEL_KEYWORDS = [
    '오사카', '간사이', '교토', '고베', '나라', '난바', '도톤보리', '우메다', '신사이바시', 'usj', '유니버설',
    '간사이공항', '구로몬', '신세카이', '츠텐카쿠', '나카자키초', '호리에', '기타하마', '아베노', '텐노지',
    '린쿠', '아라시야마', '기온', '후시미이나리', '청수사', '키요미즈데라', '일본여행', '일본 맛집', '일본 쇼핑',
    '일본 마트', '일본 편의점', '일본 드럭스토어', '돈키호테', '라피트', '주유패스', '이코카', 'icoca', 'vjw',
    '엔화', '트래블로그', '트래블월렛', '이치란', '장어덮밥', '우오토요', '피치항공', '라멘', '타코야키'
]

EXCLUDE_KEYWORDS = ['petg', '3d프린터', '조선소', '거미 로봇', '자석 흡착', '출력물', 'vla ai']

KEYWORD_RULES = [
  {"primary": 'aviation', "sub": 'ticket', "keywords": ['항공', '비행기', '항공권', '티웨이', '진에어', '제주항공', '피치항공', '대한항공', '아시아나', '특가', '탑승권', '체크인', '터미널', '출국', '입국']},
  {"primary": 'aviation', "sub": 'luggage', "keywords": ['수하물', '위탁', '기내', '캐리어', '짐', '무게', '공항팁', '배터리 규정', '보조배터리']},
  {"primary": 'dining', "sub": 'meal', "keywords": ['라멘', '스시', '초밥', '야키니쿠', '고기', '장어', '장어덮밥', '우오토요', '오코노미야키', '돈카츠', '우동', '소바', '맛집', '식당', '점심', '저녁', '식사', '이자카야', '맥주', '하이볼', '덮밥', '노포', '아침 식사', '야식']},
  {"primary": 'dining', "sub": 'snack', "keywords": ['간식', '디저트', '카페', '파르페', '타코야키', '푸딩', '빵', '베이커리', '아이스크림', '편의점', '세븐일레븐', '로손', '패밀리마트', '당고', '차', '말차', '커피', '케이크', '샌드위치', '타르트', '과자']},
  {"primary": 'shopping', "sub": 'fashion', "keywords": ['폴로', '옷', '패션', '빈티지', '스트릿', '슈프림', '스투시', '신발', '스니커즈', '잡화', '오렌지스트리트', '아메리카무라', '백화점', '한큐', '다카시마야', '쇼핑몰', '아울렛', '린쿠', '할인매장', '베이프', '브랜드 모음']},
  {"primary": 'shopping', "sub": 'shoplist', "keywords": ['돈키호테', '마트', '슈퍼', '쇼핑', '드럭스토어', '화장품', '의약품', '면세', '택스리프', '선물', '기념품', '빅카메라', '요도바시', '추천템', '라이프', '오케이', '이온몰', '다이소', '코스트코', '에디온']},
  {"primary": 'transit', "sub": 'pass', "keywords": ['교통', '패스', '주유패스', '어메이징 패스', '라피트', '이코카', 'icoca', '지하철', '버스', '기차', '신칸센', '간사이', '티켓', '승차권', '특급', '공항철도', '환승']},
  {"primary": 'transit', "sub": 'comm', "keywords": ['유심', 'esim', '이심', '와이파이', '포켓', '통신', '환전', '트래블로그', '트래블월렛', '카드', '엔화', '동전', 'atm', '수수료', '데이터', '결제', '현금']},
  {"primary": 'sightseeing', "sub": 'spot', "keywords": ['관광', '명소', '유니버설', 'usj', '닌텐도', '해리포터', '오사카성', '도톤보리', '신세카이', '츠텐카쿠', '신사', '절', '교토', '청수사', '동네', '나카자키초', '호리에', '기타하마', '아베노', '힐링 스팟', '사찰']},
  {"primary": 'sightseeing', "sub": 'photo', "keywords": ['포토', '사진', '인생샷', '야경', '야경스팟', '크루즈', '유람선', '온천', '체험', '유카타', '기모노', '일몰', '스카이빌딩', '관람차', '헵파이브']},
  {"primary": 'lodging', "sub": 'hotel', "keywords": ['숙소', '호텔', '료칸', '에어비앤비', '게스트하우스', '체크인', '대목욕탕', '온천호텔', '난바숙소', '우메다숙소']},
  {"primary": 'tips', "sub": 'tip', "keywords": ['꿀팁', '팁', '주의', '필수', '준비물', 'vjw', '입국', '수속', '예약', '환불', '취소', '어플', '앱', '날씨', '옷차림', '짐보관', '코인락커', '실수', '주의사항', '동선']}
]

def fix_encoding(text):
    if not isinstance(text, str):
        return text
    try:
        return text.encode('latin1').decode('utf-8')
    except:
        return text

def is_pure_japan_travel(caption, url):
    full = (caption + " " + url).lower()
    for ex in EXCLUDE_KEYWORDS:
        if ex in full:
            return False
    for kw in JAPAN_TRAVEL_KEYWORDS:
        if kw in full:
            return True
    return False

def auto_categorize(text):
    lower = text.lower()
    for rule in KEYWORD_RULES:
        for kw in rule['keywords']:
            if kw in lower:
                return rule['primary'], rule['sub']
    return 'sightseeing', 'spot'

def extract_region(text):
    regions = ['구로몬', '린쿠', '나카자키초', '호리에', '기타하마', '난바', '도톤보리', '우메다', '교토', '고베', '신사이바시', 'USJ', '유니버설', '간사이공항', '신세카이', '아라시야마', '기온']
    for reg in regions:
        if reg in text:
            if reg == '유니버설': return 'USJ'
            if reg == '구로몬': return '난바'
            if reg == '린쿠': return '간사이공항'
            if reg in ['나카자키초', '기타하마']: return '우메다'
            if reg == '호리에': return '난바'
            return reg
    return '오사카 전체'

def clean_caption(caption):
    lines = [re.sub(r'#\S+', '', l).strip() for l in caption.split('\n')]
    lines = [l for l in lines if len(l) > 1 and not l.startswith('댓글') and not l.startswith('http') and not l.startswith('📷') and not l.startswith('@')]

    if not lines:
        return "오사카 여행 릴스", "오사카 여행 꿀팁 정보"

    title = lines[0]
    title = re.sub(r'[\(（].*?[\)）]', '', title).strip(' "“’\':,.-_!~')
    if len(title) < 6 and len(lines) > 1:
        title = (lines[0] + " " + lines[1])[:42]
    else:
        title = title[:42]

    body_candidates = lines[1:6] if len(lines) > 1 else [lines[0]]
    memo = " ".join(body_candidates)
    memo = re.sub(r'\s+', ' ', memo).strip()
    memo = memo[:135]

    return title if title else "오사카 여행 릴스", memo if memo else "오사카 여행 꿀팁 정보"

def filter_and_deploy():
    with zipfile.ZipFile(ZIP_PATH, 'r') as z:
        with z.open('your_instagram_activity/saved/saved_posts.json') as f:
            posts = json.loads(f.read().decode('utf-8'))

    filtered_reels = []
    seen_urls = set()

    for idx, p in enumerate(posts):
        labels = {}
        for lv in p.get('label_values', []):
            k = fix_encoding(lv.get('label', ''))
            v = fix_encoding(lv.get('value', ''))
            labels[k] = v

        url = labels.get('URL', '')
        caption = labels.get('캡션', '')
        ts = p.get('timestamp', int(datetime.datetime.now().timestamp()))
        date_str = datetime.datetime.fromtimestamp(ts).strftime("%Y-%m-%d")

        if url and url not in seen_urls:
            if is_pure_japan_travel(caption, url):
                seen_urls.add(url)
                title, memo = clean_caption(caption)
                combined = (title + " " + memo + " " + caption).strip()
                primary, sub = auto_categorize(combined)
                region = extract_region(combined)

                filtered_reels.append({
                    "id": f"ig-reel-{idx}-{ts}",
                    "title": title,
                    "url": url,
                    "primaryCategory": primary,
                    "subCategory": sub,
                    "region": region,
                    "rating": 5,
                    "memo": memo,
                    "isFavorite": False,
                    "createdAt": date_str,
                    "sharedBy": "인스타저장함"
                })

    print(f"🎯 Total posts in JSON: {len(posts)}")
    print(f"✅ Filtered Pure Osaka/Japan Travel reels: {len(filtered_reels)} (Deleted {len(posts) - len(filtered_reels)} unrelated reels!)")

    # Read existing sampleData.js
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        content = f.read()

    prefix = content.split("export const INITIAL_REELS = [")[0]
    updated_file_content = f"{prefix}export const INITIAL_REELS = {json.dumps(filtered_reels, indent=2, ensure_ascii=False)};\n"

    with open(DATA_FILE, "w", encoding="utf-8") as f:
        f.write(updated_file_content)

    print("🚀 Rebuilding app and deploying to GitHub / Vercel...")
    os.system("npm run build")
    os.system(f'git add . && git commit -m "Filter: Pure {len(filtered_reels)} Osaka and Japan travel reels only" && git push origin main')
    print("🎉 Deployed pure Osaka travel dataset to Vercel!")

if __name__ == "__main__":
    filter_and_deploy()

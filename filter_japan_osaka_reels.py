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

JAPAN_OSAKA_KEYWORDS = [
    '오사카', '간사이', '교토', '고베', '나라', '난바', '도톤보리', '우메다', '신사이바시', 'usj', '유니버설',
    '간사이공항', '구로몬', '신세카이', '츠텐카쿠', '나카자키초', '호리에', '기타하마', '아베노', '텐노지',
    '린쿠', '아라시야마', '기온', '후시미이나리', '청수사', '키요미즈데라', '일본', 'japan', 'osaka', 'kyoto', 'kobe',
    '돈키호테', '라피트', '주유패스', '이코카', 'icoca', '스이카', 'vjw', 'visit japan', '엔화', '트래블로그',
    '트래블월렛', '면세', '택스리프', '빅카메라', '요도바시', '한큐', '다카시마야', '로손', '세븐일레븐',
    '패밀리마트', '이온몰', '라이프', '오케이스토어', '드럭스토어', '라멘', '이치란', '스시', '초밥',
    '야키니쿠', '오코노미야키', '타코야키', '우동', '소바', '돈카츠', '규카츠', '장어덮밥', '우오토요',
    '야키토리', '이자카야', '하이볼', '말차', '푸딩', '당고', '료칸', '온천', '항공', '피치항공',
    '진에어', '제주항공', '티웨이', '대한항공', '아시아나', '에어부산', '에어서울', '수하물', '비행기'
]

KEYWORD_RULES = [
  {"primary": 'aviation', "sub": 'ticket', "keywords": ['항공', '비행기', '항공권', '티웨이', '진에어', '제주항공', '피치항공', '대한항공', '아시아나', '에어부산', '에어서울', '특가', '탑승권', '마일리지', '체크인', '터미널', '출국', '입국심사']},
  {"primary": 'aviation', "sub": 'luggage', "keywords": ['수하물', '위탁', '기내', '캐리어', '짐', '무게', '공항팁', '액체류', '면세품']},
  {"primary": 'dining', "sub": 'snack', "keywords": ['간식', '디저트', '카페', '파르페', '타코야키', '푸딩', '빵', '베이커리', '아이스크림', '편의점', '세븐일레븐', '로손', '패밀리마트', '당고', '차', '말차', '커피', '케이크', '샌드위치', '타르트', '과자', '도넛']},
  {"primary": 'dining', "sub": 'meal', "keywords": ['라멘', '스시', '초밥', '야키니쿠', '고기', '장어', '장어덮밥', '우오토요', '오코노미야키', '돈카츠', '돈까스', '우동', '소바', '맛집', '식당', '점심', '저녁', '식사', '샤브샤브', '스키야키', '카레', '이자카야', '맥주', '하이볼', '덮밥', '규동', '노포', '꼬치', '야키토리', '해산물']},
  {"primary": 'shopping', "sub": 'fashion', "keywords": ['폴로', '옷', '패션', '빈티지', '스트릿', '슈프림', '스투시', '신발', '스니커즈', '잡화', '오렌지스트리트', '아메리카무라', '백화점', '한큐', '다카시마야', '쇼핑몰', '아울렛', '린쿠', '할인매장', '구제', '명품']},
  {"primary": 'shopping', "sub": 'shoplist', "keywords": ['돈키호테', '마트', '슈퍼', '쇼핑', '드럭스토어', '화장품', '의약품', '면세', '택스리프', '선물', '기념품', '빅카메라', '요도바시', '추천템', '라이프', '오케이', '이온몰', '다이소']},
  {"primary": 'transit', "sub": 'pass', "keywords": ['교통', '패스', '주유패스', '라피트', '이코카', 'icoca', '지하철', '버스', '기차', '신칸센', '간사이', '티켓', '승차권', '특급', '공항철도', '환승', '전철', '메트로']},
  {"primary": 'transit', "sub": 'comm', "keywords": ['유심', 'esim', '이심', '와이파이', '포켓', '통신', '환전', '트래블로그', '트래블월렛', '카드', '엔화', '동전', 'atm', '수수료', '데이터', '결제', '현금']},
  {"primary": 'sightseeing', "sub": 'spot', "keywords": ['관광', '명소', '유니버설', 'usj', '닌텐도', '해리포터', '익스프레스', '오사카성', '도톤보리', '신세카이', '츠텐카쿠', '신사', '절', '교토', '청수사', '키요미즈데라', '후시미이나리', '고베', '아쿠아리움', '가이유칸', '전망대', '동네', '거리', '나카자키초', '호리에', '기타하마', '후쿠시마']},
  {"primary": 'sightseeing', "sub": 'photo', "keywords": ['포토', '사진', '인생샷', '야경', '야경스팟', '크루즈', '유람선', '온천', '체험', '유카타', '기모노', '일몰', '스카이빌딩', '관람차', '헵파이브', '포토존']},
  {"primary": 'lodging', "sub": 'hotel', "keywords": ['숙소', '호텔', '료칸', '에어비앤비', '게스트하우스', '체크인', '대목욕탕', '온천호텔', '난바숙소', '우메다숙소', '조식']},
  {"primary": 'tips', "sub": 'tip', "keywords": ['꿀팁', '팁', '주의', '필수', '준비물', 'vjw', '입국', '수속', '예약', '환불', '취소', '어플', '앱', '날씨', '옷차림', '짐보관', '코인락커', '실수', '주의사항']}
]

def fix_encoding(text):
    if not isinstance(text, str):
        return text
    try:
        return text.encode('latin1').decode('utf-8')
    except:
        return text

def is_japan_osaka_related(text):
    lower = text.lower()
    for kw in JAPAN_OSAKA_KEYWORDS:
        if kw in lower:
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
            # Check if related to Osaka / Japan
            if is_japan_osaka_related(caption) or is_japan_osaka_related(url):
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
    print(f"✅ Filtered Osaka/Japan-only reels: {len(filtered_reels)} (Deleted {len(posts) - len(filtered_reels)} unrelated reels!)")

    # Read existing sampleData.js
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        content = f.read()

    prefix = content.split("export const INITIAL_REELS = [")[0]
    updated_file_content = f"{prefix}export const INITIAL_REELS = {json.dumps(filtered_reels, indent=2, ensure_ascii=False)};\n"

    with open(DATA_FILE, "w", encoding="utf-8") as f:
        f.write(updated_file_content)

    print("🚀 Rebuilding app and deploying to GitHub / Vercel...")
    os.system("npm run build")
    os.system(f'git add . && git commit -m "Filter: Retain only {len(filtered_reels)} pure Osaka and Japan travel reels" && git push origin main')
    print("🎉 Deployed clean Osaka travel dataset to Vercel!")

if __name__ == "__main__":
    filter_and_deploy()

import os
import sys
import time
import json
import re
import datetime
import html as html_lib
import urllib.request
import urllib.parse
import instaloader

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

DATA_FILE = r"C:\project\Osaka\src\data\sampleData.js"

KEYWORD_RULES = [
  {"primary": 'sightseeing', "sub": 'spot', "keywords": ['관광', '명소', '동네', '거리', '나카자키초', '호리에', '기타하마', '아베노', '힐링', '사찰', '절', '신사', '교토', '청수사', '키요미즈데라', '후시미이나리', '아라시야마', '오사카성', '도톤보리', '신세카이', '츠텐카쿠', '코스', '일정', '3박4일', '가볼만한곳']},
  {"primary": 'sightseeing', "sub": 'theme', "keywords": ['유니버설', 'usj', '닌텐도', '해리포터', '익스프레스', '테마파크', '놀이공원']},
  {"primary": 'dining', "sub": 'meal', "keywords": ['라멘', '스시', '초밥', '야키니쿠', '고기', '장어', '장어덮밥', '우오토요', '오코노미야키', '돈카츠', '우동', '소바', '맛집', '식당', '점심', '저녁', '식사', '이자카야', '맥주', '하이볼', '덮밥', '노포', '아침식사', '야식', '먹방', '중화소바', '만두']},
  {"primary": 'dining', "sub": 'snack', "keywords": ['간식', '디저트', '카페', '파르페', '타코야키', '푸딩', '빵', '베이커리', '아이스크림', '편의점', '세븐일레븐', '로손', '패밀리마트', '당고', '말차', '커피', '케이크']},
  {"primary": 'shopping', "sub": 'fashion', "keywords": ['폴로', '옷', '패션', '빈티지', '스트릿', '슈프림', '스투시', '신발', '스니커즈', '잡화', '오렌지스트리트', '아메리카무라', '백화점', '한큐', '다카시마야', '쇼핑몰', '아울렛', '린쿠', '할인매장', '베이프', '브랜드 모음']},
  {"primary": 'shopping', "sub": 'shoplist', "keywords": ['돈키호테', '마트', '슈퍼', '쇼핑', '드럭스토어', '화장품', '의약품', '면세', '택스리프', '선물', '기념품', '빅카메라', '요도바시', '추천템', '라이프', '오케이', '이온몰', '다이소', '코스트코', '에디온']},
  {"primary": 'transit', "sub": 'pass', "keywords": ['교통', '패스', '주유패스', '어메이징 패스', '라피트', '이코카', 'icoca', '지하철', '버스', '기차', '신칸센', '간사이', '티켓', '승차권', '특급', '공항철도', '환승']},
  {"primary": 'transit', "sub": 'comm', "keywords": ['유심', 'esim', '이심', '와이파이', '포켓', '통신', '환전', '트래블로그', '트래블월렛', '카드', '엔화', '동전', 'atm', '수수료', '데이터', '결제', '현금']},
  {"primary": 'aviation', "sub": 'ticket', "keywords": ['항공', '비행기', '항공권', '티웨이', '진에어', '제주항공', '피치항공', '대한항공', '아시아나', '특가', '탑승권', '체크인', '터미널', '출국', '입국']},
  {"primary": 'aviation', "sub": 'luggage', "keywords": ['수하물', '위탁', '기내', '캐리어', '짐', '무게', '공항팁', '배터리 규정', '보조배터리']},
  {"primary": 'lodging', "sub": 'hotel', "keywords": ['숙소', '호텔', '료칸', '에어비앤비', '게스트하우스', '체크인', '대목욕탕', '온천호텔', '난바숙소', '우메다숙소']},
  {"primary": 'tips', "sub": 'tip', "keywords": ['꿀팁', '팁', '주의', '필수', '준비물', 'vjw', '입국', '수속', '예약', '환불', '취소', '어플', '앱', '날씨', '옷차림', '짐보관', '코인락커', '실수', '주의사항']}
]

loader = instaloader.Instaloader()

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

def fetch_real_instagram_info(url, user_text=""):
    title = ""
    summary = ""
    caption = ""

    match = re.search(r'/(?:reel|p)/([A-Za-z0-9_-]+)', url)
    if match:
        shortcode = match.group(1)
        try:
            post = instaloader.Post.from_shortcode(loader.context, shortcode)
            caption = post.caption if post.caption else ""
        except Exception as e:
            print(f"Instaloader fetch notice ({shortcode}): {e}")

    if caption:
        lines = [re.sub(r'#\S+', '', l).strip() for l in caption.split('\n')]
        lines = [l for l in lines if len(l) > 1 and not l.startswith('댓글') and not l.startswith('http') and not l.startswith('📷') and not l.startswith('@')]

        if lines:
            title = lines[0][:40]
            if len(title) < 8 and len(lines) > 1:
                title = (lines[0] + " " + lines[1])[:40]
            
            clean_body = " ".join(lines[1:5])
            clean_body = re.sub(r'\s+', ' ', clean_body).strip()
            summary = clean_body[:120] if clean_body else lines[0]

    if not title:
        title = user_text[:35] if user_text else "오사카 여행 추천 릴스"
    if not summary:
        summary = f"💬 {user_text}" if user_text else "인스타그램 릴스에서 공유된 오사카 여행 꿀팁 정보"

    return title, summary, caption

def add_reel_and_deploy(url, text):
    title, summary, full_caption = fetch_real_instagram_info(url, text)
    
    combined_for_cat = (title + " " + summary + " " + full_caption + " " + text).strip()
    primary, sub = auto_categorize(combined_for_cat)
    region = extract_region(combined_for_cat)

    new_entry = {
        "id": f"tg-reel-{int(datetime.datetime.now().timestamp())}",
        "title": title,
        "url": url,
        "primaryCategory": primary,
        "subCategory": sub,
        "region": region,
        "rating": 5,
        "memo": summary,
        "isFavorite": True,
        "createdAt": datetime.datetime.now().strftime("%Y-%m-%d"),
        "sharedBy": "텔레그램봇"
    }

    with open(DATA_FILE, "r", encoding="utf-8") as f:
        content = f.read()

    prefix = content.split("export const INITIAL_REELS = [")[0]
    raw_array = content.split("export const INITIAL_REELS = ")[1].rstrip(";\n ")
    
    try:
        current_reels = json.loads(raw_array)
    except:
        current_reels = []

    current_reels.insert(0, new_entry)
    updated_file_content = f"{prefix}export const INITIAL_REELS = {json.dumps(current_reels, indent=2, ensure_ascii=False)};\n"

    with open(DATA_FILE, "w", encoding="utf-8") as f:
        f.write(updated_file_content)

    print(f"✅ 새 릴스 등록: [{primary} > {sub}] {title}")
    
    os.system("npm run build")
    os.system('git add . && git commit -m "Auto sync: Added accurate categorized reel from Telegram bot" && git push origin main')
    return new_entry

def start_telegram_listener(bot_token):
    offset = 0
    url_pattern = re.compile(r'(https?://(?:www\.)?instagram\.com/(?:reel|p)/[A-Za-z0-9_-]+(?:/\S*)?)', re.IGNORECASE)

    while True:
        try:
            req_url = f"https://api.telegram.org/bot{bot_token}/getUpdates?offset={offset}&timeout=30"
            req = urllib.request.Request(req_url)
            with urllib.request.urlopen(req, timeout=35) as resp:
                data = json.loads(resp.read().decode('utf-8'))

            for result in data.get("result", []):
                offset = result["update_id"] + 1
                message = result.get("message", {})
                chat_id = message.get("chat", {}).get("id")
                text = message.get("text", "") or message.get("caption", "")

                match = url_pattern.search(text)
                if match and chat_id:
                    reel_url = match.group(1)
                    memo_text = text.replace(reel_url, "").strip()
                    
                    entry = add_reel_and_deploy(reel_url, memo_text)

                    reply_text = (
                        f"✨ [오사카 릴스 자동 요약 & 배포 완료!]\n\n"
                        f"📌 제목: {entry['title']}\n"
                        f"💬 요약: {entry['memo']}\n"
                        f"📁 카테고리: {entry['primaryCategory']} > {entry['subCategory']}\n"
                        f"📍 지역: {entry['region']}\n\n"
                        f"🚀 Vercel 모바일 사이트에 3초 만에 배포되었습니다!"
                    )
                    send_url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
                    send_payload = json.dumps({"chat_id": chat_id, "text": reply_text}).encode('utf-8')
                    send_req = urllib.request.Request(send_url, data=send_payload, headers={'Content-Type': 'application/json'})
                    urllib.request.urlopen(send_req)

            time.sleep(1)
        except Exception as e:
            time.sleep(2)

if __name__ == "__main__":
    token = os.environ.get("TELEGRAM_BOT_TOKEN", "")
    if len(sys.argv) > 1:
        token = sys.argv[1]
    
    if not token:
        print("⚠️ 사용법: python telegram_bot_sync.py <YOUR_TELEGRAM_BOT_TOKEN>")
    else:
        start_telegram_listener(token)

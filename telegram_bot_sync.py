import os
import sys
import time
import json
import re
import datetime
import urllib.request
import urllib.parse

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

DATA_FILE = r"C:\project\Osaka\src\data\sampleData.js"

KEYWORD_RULES = [
  {"primary": 'aviation', "sub": 'ticket', "keywords": ['항공', '비행기', '항공권', '티웨이', '진에어', '제주항공', '피치항공', '대한항공', '아시아나', '에어부산', '에어서울', '특가', '탑승권', '마일리지', '체크인', '터미널']},
  {"primary": 'aviation', "sub": 'luggage', "keywords": ['수하물', '위탁', '기내', '캐리어', '짐', '무게', '공항팁', '액체류', '면세품']},
  {"primary": 'dining', "sub": 'meal', "keywords": ['라멘', '스시', '초밥', '야키니쿠', '고기', '오코노미야키', '돈카츠', '돈까스', '우동', '소바', '맛집', '식당', '점심', '저녁', '식사', '샤브샤브', '스키야키', '카레', '이자카야', '맥주', '하이볼', '덮밥', '규동', '장어']},
  {"primary": 'dining', "sub": 'snack', "keywords": ['간식', '디저트', '카페', '파르페', '타코야키', '푸딩', '빵', '베이커리', '아이스크림', '편의점', '세븐일레븐', '로손', '패밀리마트', '당고', '차', '말차', '커피', '케이크', '샌드위치', '타르트']},
  {"primary": 'shopping', "sub": 'shoplist', "keywords": ['돈키호테', '쇼핑', '드럭스토어', '화장품', '의약품', '과자', '면세', '택스리프', '선물', '기념품', '빅카메라', '요도바시']},
  {"primary": 'shopping', "sub": 'fashion', "keywords": ['옷', '패션', '빈티지', '스트릿', '슈프림', '스투시', '신발', '스니커즈', '잡화', '오렌지스트리트', '아메리카무라', '백화점', '한큐', '다카시마야', '쇼핑몰']},
  {"primary": 'transit', "sub": 'pass', "keywords": ['교통', '패스', '주유패스', '라피트', '이코카', '지하철', '버스', '기차', '신칸센', '간사이', '티켓', '승차권', '특급', '공항철도', '환승']},
  {"primary": 'transit', "sub": 'comm', "keywords": ['유심', 'esim', '이심', '와이파이', '포켓', '통신', '환전', '트래블로그', '트래블월렛', '카드', '엔화', 'atm', '수수료', '데이터']},
  {"primary": 'sightseeing', "sub": 'spot', "keywords": ['관광', '명소', '유니버설', 'usj', '닌텐도', '해리포터', '오사카성', '도톤보리', '신세카이', '츠텐카쿠', '신사', '절', '교토', '청수사', '키요미즈데라', '후시미이나리', '고베', '아쿠아리움', '가이유칸', '전망대']},
  {"primary": 'sightseeing', "sub": 'photo', "keywords": ['포토', '사진', '인생샷', '야경', '야경스팟', '크루즈', '유람선', '온천', '체험', '유카타', '기모노', '일몰', '스카이빌딩', '관람차', '헵파이브']},
  {"primary": 'lodging', "sub": 'hotel', "keywords": ['숙소', '호텔', '료칸', '에어비앤비', '게스트하우스', '체크인', '대목욕탕', '온천호텔', '난바숙소', '우메다숙소']},
  {"primary": 'tips', "sub": 'tip', "keywords": ['꿀팁', '팁', '주의', '필수', '준비물', 'vjw', '입국', '수속', '예약', '환불', '취소', '어플', '앱', '날씨', '옷차림', '짐보관', '코인락커']}
]

def auto_categorize(text):
    lower = text.lower()
    for rule in KEYWORD_RULES:
        for kw in rule['keywords']:
            if kw in lower:
                return rule['primary'], rule['sub']
    return 'dining', 'meal'

def extract_region(text):
    regions = ['난바', '도톤보리', '우메다', '교토', '고베', '신사이바시', 'USJ', '유니버설', '간사이공항', '신세카이', '아라시야마', '기온']
    for reg in regions:
        if reg in text:
            return 'USJ' if reg == '유니버설' else reg
    return '난바'

def add_reel_and_deploy(url, text):
    primary, sub = auto_categorize(text + " " + url)
    region = extract_region(text + " " + url)
    title = text if text and len(text) > 2 else "오사카 수집 릴스"

    new_entry = {
        "id": f"tg-reel-{int(datetime.datetime.now().timestamp())}",
        "title": title,
        "url": url,
        "primaryCategory": primary,
        "subCategory": sub,
        "region": region,
        "rating": 5,
        "memo": text if text else "텔레그램 봇으로 전송된 릴스",
        "isFavorite": True,
        "createdAt": datetime.datetime.now().strftime("%Y-%m-%d"),
        "sharedBy": "텔레그램봇"
    }

    # Read existing sampleData.js
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

    print(f"✅ 새 릴스 자동 분류 완료: [{primary} > {sub}] {title}")
    
    # Auto build and push to GitHub (triggers Vercel auto-deployment in 3 seconds!)
    os.system("npm run build")
    os.system('git add . && git commit -m "Auto sync: Added reel from Telegram bot" && git push origin main')
    return new_entry

def start_telegram_listener(bot_token):
    print("==========================================================")
    print("🤖 [Telegram Bot Sync] 텔레그램 릴스 수신기가 가동되었습니다.")
    print("👉 인스타에서 텔레그램 봇으로 릴스를 보내면 즉시 자동 배포됩니다!")
    print("==========================================================")

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

                    # Send reply back to Telegram
                    reply_text = f"✨ [오사카 릴스 자동 등록 완료!]\n📁 카테고리: {entry['primaryCategory']} > {entry['subCategory']}\n📍 지역: {entry['region']}\n📝 제목: {entry['title']}\n🚀 모바일 웹사이트에 즉시 자동 배포되었습니다!"
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

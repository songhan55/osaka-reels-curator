# 📸 메타(Meta) 인스타그램 공식 챗봇 런칭 가이드 (Official Bot Setup)

이 가이드는 실제 인스타그램 단톡방에서 작동하는 **공식 챗봇(@TripReels_Bot)**을 메타 개발자 센터에 연결하는 **4단계 실전 매뉴얼**입니다.

---

## 🛠️ 준비물
1. **인스타그램 계정** (본인 계정 또는 서비스 전용 부계정)
2. **페이스북/메타 계정** (개발자 등록용)
3. **우리 서버리스 웹훅 엔드포인트 URL**:
   - `https://<내-Vercel-주소>/api/webhook`
4. **웹훅 검증 토큰 (Verify Token)**:
   - `tripreels_secure_verify_token_2026`

---

## 🚀 1단계: 인스타그램 계정 '프로페셔널' 전환 & 메시지 권한 허용 (스마트폰 1분)

1. **스마트폰에서 인스타그램 앱 실행**
2. 오른쪽 아래 **내 프로필 ➔ 오른쪽 상단 햄버거 메뉴(≡) ➔ [설정 및 개인정보]**
3. **[계정 유형 및 도구] ➔ [프로페셔널 계정으로 전환]** (카테고리: `크리에이터` 또는 `여행사/블로그` 선택 ➔ 무료 완료)
4. 다시 설정에서 **[메시지 및 스토리 답장] ➔ [메시지 제어] ➔ [메시지에 대한 액세스 허용]을 '켜기(ON)'** (⭐ 매우 중요! 봇이 DM을 읽기 위한 필수 설정)

---

## 🌐 2단계: 메타 개발자 센터(Meta Developers)에서 앱 만들기 (PC 2분)

1. **[developers.facebook.com](https://developers.facebook.com)** 접속 및 페이스북 로그인
2. 오른쪽 상단 **[내 앱] ➔ [앱 만들기(Create App)]** 클릭
3. 사용 사례 선택: **[기타(Other)] ➔ [비즈니스(Business)]** 선택 후 [다음]
4. 앱 세부정보:
   - **앱 이름**: `TripReels` (원하는 이름 입력)
   - **앱 연락처 이메일**: 본인 이메일
   - **[앱 만들기]** 클릭 (비밀번호 입력)

---

## 🔌 3단계: 인스타그램 제품 추가 & Webhook 연결 (PC 2분)

1. 생성된 앱 대시보드 왼쪽 메뉴의 **[제품 추가(Add Product)]** 클릭
2. **[Instagram]** (또는 `Messenger API for Instagram`) 제품 옆의 **[설정(Set Up)]** 클릭
3. 왼쪽 메뉴에서 **[Instagram] ➔ [기본 설정(Basic Settings)] 또는 [Webhooks]** 이동
4. **[콜백 URL 수정(Edit Callback URL)]** 클릭 후 아래 정보 입력:
   - **콜백 URL (Callback URL)**: `https://<내-Vercel-주소>/api/webhook`
   - **확인 토큰 (Verify Token)**: `tripreels_secure_verify_token_2026`
   - **[확인 및 저장(Verify and Save)]** 클릭! ➔ 초록색 체크가 뜨면 메타와 우리 서버가 악수(Handshake) 성공!
5. **웹훅 구독 필드(Webhook Subscriptions)**:
   - `messages`, `messaging_postbacks`, `message_reactions` 항목의 **[구독(Subscribe)]** 버튼 클릭!

---

## 🔑 4단계: 인스타그램 계정 연결 & 액세스 토큰 발급 (PC 1분)

1. **Instagram ➔ API 설정(Settings)** 화면에서 **[Instagram 계정 연결]** 클릭
2. 1단계에서 만든 인스타그램 계정으로 로그인하여 권한 승인
3. 발급된 **`Page Access Token` (액세스 토큰)**을 복사하여 Vercel 환경변수(`META_PAGE_ACCESS_TOKEN`)에 넣어주면, 챗봇이 단톡방에 자동으로 등록 완료 답장을 보낼 수 있게 됩니다!

---

## 🎉 이제 인스타 단톡방에서 테스트해 보세요!

1. 인스타그램 앱에서 친구들과의 단톡방에 **방금 연동한 내 인스타 계정을 초대**합니다.
2. 단톡방에 오사카/교토 맛집 릴스를 공유하면, **우리 웹사이트 지도에 1초 만에 자동 등록**됩니다!

// Meta Instagram Messaging API Serverless Webhook Endpoint for Vercel
// Ultra-Resilient Webhook: Handles text links, IG Share button attachments, story shares, and dev-mode payloads

import { createClient } from '@supabase/supabase-js';

const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN || 'tripreels_secure_verify_token_2026';
const META_PAGE_ACCESS_TOKEN = process.env.META_PAGE_ACCESS_TOKEN || 'IGAAWHG9LvNTtBZAGJReWY4QUxWY2c0MUk0SmdMeUIyX3BhNkp2eGg3QklycEJFZAEdrWFBjWnhISEs1T1daZAWYxcTQ0ZAkVKRXJZAdjRxYjQwaVFMVXBOWUZACYzE3ZA3VIMXRKeE9sbFBSclQ4eno4aTdfdFlRR2dJNnNNc3drOGVVOAZDZD';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://jirlvspexbsrgegqkqev.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imppcmx2c3BleGJzcmdlZ3FrcWV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY3OTYxNzMsImV4cCI6MjEwMjM3MjE3M30.TofLERVODNIKrW5WTN3foZ5JZVqCUpWAAYkSWPGfOe4';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const KEYWORD_RULES = [
  { primary: 'sightseeing', sub: 'spot', keywords: ['관광', '명소', '동네', '거리', '나카자키초', '호리에', '기타하마', '사찰', '절', '신사', '교토', '청수사', '아라시야마', '오사카성', '도톤보리', '코스', '가볼만한곳'] },
  { primary: 'sightseeing', sub: 'theme', keywords: ['유니버설', 'usj', '닌텐도', '해리포터', '익스프레스', '테마파크'] },
  { primary: 'dining', sub: 'meal', keywords: ['라멘', '스시', '초밥', '야키니쿠', '고기', '장어', '장어덮밥', '오코노미야키', '돈카츠', '우동', '소바', '맛집', '식당', '점심', '저녁', '식사', '이자카야', '맥주', '하이볼', '돈테키', '중화소바'] },
  { primary: 'dining', sub: 'snack', keywords: ['간식', '디저트', '카페', '파르페', '타코야키', '푸딩', '빵', '베이커리', '아이스크림', '편의점', '세븐일레븐', '로손', '당고', '말차', '커피'] },
  { primary: 'shopping', sub: 'fashion', keywords: ['폴로', '옷', '패션', '빈티지', '스트릿', '슈프림', '스투시', '신발', '스니커즈', '아울렛', '린쿠', '베이프', '브랜드'] },
  { primary: 'shopping', sub: 'shoplist', keywords: ['돈키호테', '마트', '슈퍼', '쇼핑', '드럭스토어', '화장품', '의약품', '면세', '빅카메라', '요도바시', '추천템', '라이프', '코스트코', '에디온'] },
  { primary: 'transit', sub: 'pass', keywords: ['교통', '패스', '주유패스', '라피트', '이코카', 'icoca', '지하철', '버스', '기차', '신칸센', '간사이', '승차권'] },
  { primary: 'transit', sub: 'comm', keywords: ['유심', 'esim', '이심', '와이파이', '통신', '환전', '트래블로그', '트래블월렛', '동전', '자동정산기', '엔화'] },
  { primary: 'tips', sub: 'tip', keywords: ['꿀팁', '팁', '주의', '필수', '준비물', '입국', '수속', '예약', '실수', '주의사항'] }
];

function autoCategorize(text) {
  const lower = text.toLowerCase();
  for (const rule of KEYWORD_RULES) {
    for (const kw of rule.keywords) {
      if (lower.includes(kw)) return { primary: rule.primary, sub: rule.sub };
    }
  }
  return { primary: 'dining', sub: 'meal' };
}

function extractRegion(text) {
  const regions = ['난바', '도톤보리', '우메다', '신사이바시', 'USJ', '교토', '간사이공항', '신세카이', '아라시야마', '기온'];
  for (const reg of regions) {
    if (text.includes(reg)) return reg;
  }
  return '난바';
}

async function sendInstagramReply(recipientId, text) {
  if (!META_PAGE_ACCESS_TOKEN) return;
  try {
    const url = `https://graph.instagram.com/v19.0/me/messages?access_token=${META_PAGE_ACCESS_TOKEN}`;
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipient: { id: recipientId },
        message: { text: text }
      })
    });
  } catch (e) {
    console.error('Failed to send IG DM reply:', e);
  }
}

export default async function handler(req, res) {
  // 1. Meta Webhook Verification (GET)
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('✅ Meta Webhook successfully verified!');
      return res.status(200).send(challenge);
    } else {
      console.error('❌ Meta Webhook verification failed. Token mismatch.');
      return res.status(403).json({ error: 'Verification failed' });
    }
  }

  // 2. Incoming Instagram Event Handler (POST)
  if (req.method === 'POST') {
    try {
      const body = req.body;
      console.log('📥 [Meta Webhook Payload Received]:', JSON.stringify(body));

      if (body.object === 'instagram' || body.object === 'page') {
        const entries = body.entry || [];

        for (const entry of entries) {
          const messaging = entry.messaging || [];

          for (const event of messaging) {
            const senderId = event.sender?.id;
            const message = event.message;

            if (message) {
              const text = message.text || '';
              const attachments = message.attachments || [];

              console.log(`📩 [Instagram Message Event] From: ${senderId}, Text: "${text}", Attachments: ${attachments.length}`);

              // Extract Reel URL from text OR attachment share
              const reelRegex = /https?:\/\/(?:www\.)?instagram\.com\/(?:reel|p|stories)\/[A-Za-z0-9_-]+/i;
              let matchedUrl = null;
              let titleCandidate = '';

              if (reelRegex.test(text)) {
                matchedUrl = text.match(reelRegex)[0];
                titleCandidate = text.replace(matchedUrl, '').trim();
              } else if (attachments.length > 0) {
                for (const att of attachments) {
                  if (att.payload?.url) {
                    matchedUrl = att.payload.url;
                  } else if (att.payload?.title) {
                    titleCandidate = att.payload.title;
                  } else if (att.type === 'share' || att.type === 'ig_reel' || att.type === 'video') {
                    // Instagram direct share
                    matchedUrl = att.payload?.url || `https://www.instagram.com/reel/share_${Date.now()}`;
                  }
                }
              }

              // Fallback: If message contains any URL
              if (!matchedUrl && text.startsWith('http')) {
                matchedUrl = text.split(/\s+/)[0];
              }

              if (matchedUrl) {
                const combinedText = `${text} ${titleCandidate}`.trim();
                const cat = autoCategorize(combinedText || '오사카 여행 맛집 관광');
                const region = extractRegion(combinedText || '난바');
                const cleanTitle = titleCandidate || (text ? text.slice(0, 40) : '인스타 공유 여행 릴스');

                // Get first active group in DB
                const { data: groups } = await supabase
                  .from('group_threads')
                  .select('id, group_slug, name')
                  .limit(1);

                const activeGroupId = groups && groups.length > 0 ? groups[0].id : null;

                if (activeGroupId) {
                  // Insert Reel into DB
                  const { error: insertError } = await supabase.from('reels').insert({
                    group_id: activeGroupId,
                    url: matchedUrl,
                    title: cleanTitle || '인스타 단톡방 공유 릴스 🎬',
                    memo: combinedText || '인스타그램 단톡방에서 새로 공유된 여행 릴스',
                    primary_category: cat.primary,
                    sub_category: cat.sub,
                    region: region,
                    votes: 1,
                    rating: 5,
                    shared_by: '동행자',
                    is_favorite: false
                  });

                  if (insertError) {
                    console.error('❌ Supabase Insert Error:', insertError);
                  } else {
                    console.log(`✅ [Supabase Insert Success] ${cleanTitle} (${region})`);
                  }

                  // Send Confirmation DM to User / Group
                  const replyText = `✨ [${cat.primary.toUpperCase()}] 등록 완료!\n📍 지역: ${region}\n🎬 ${cleanTitle}\n\n📱 우리 단톡방 여행 지도에 실시간 반영되었습니다!`;
                  await sendInstagramReply(senderId, replyText);
                }
              }
            }
          }
        }

        return res.status(200).send('EVENT_RECEIVED');
      }

      return res.status(404).send('Not Found');
    } catch (err) {
      console.error('❌ Webhook error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

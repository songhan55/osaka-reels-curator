// Telegram Travel Group Bot Serverless Webhook Endpoint for Vercel
// 100% Zero-Touch: Ingests reels shared in Telegram Travel Group Chats automatically!

import { createClient } from '@supabase/supabase-js';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8921786541:AAELbriXLKLZnSrMDrB8ue9KG5DUZlbceZI';

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

async function sendTelegramMessage(chatId, text) {
  if (!TELEGRAM_BOT_TOKEN) return;
  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML'
      })
    });
  } catch (e) {
    console.error('Failed to send Telegram message:', e);
  }
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const update = req.body;
      console.log('📥 [Telegram Webhook Received]:', JSON.stringify(update));

      const message = update.message || update.channel_post || update.edited_message;
      if (!message) return res.status(200).send('OK');

      const chatId = message.chat?.id;
      const text = message.text || message.caption || '';
      const senderName = message.from?.first_name || message.from?.username || '동행자';

      // Check if message contains an Instagram / Shorts / TikTok link
      const reelRegex = /https?:\/\/(?:www\.)?instagram\.com\/(?:reel|p)\/[A-Za-z0-9_-]+/i;
      
      if (reelRegex.test(text) || text.includes('instagram.com') || text.includes('youtube.com/shorts')) {
        const matched = text.match(reelRegex);
        const reelUrl = matched ? matched[0] : text.split(/\s+/)[0];
        const memo = text.replace(reelUrl, '').trim();

        const cat = autoCategorize(text || '오사카 여행 맛집');
        const region = extractRegion(text || '난바');
        const cleanTitle = memo.slice(0, 35) || '단톡방 공유 여행 릴스 🎬';

        // Get first active group in DB
        const { data: groups } = await supabase
          .from('group_threads')
          .select('id, group_slug, name')
          .limit(1);

        const activeGroupId = groups && groups.length > 0 ? groups[0].id : null;

        if (activeGroupId) {
          await supabase.from('reels').insert({
            group_id: activeGroupId,
            url: reelUrl,
            title: cleanTitle,
            memo: memo || '단톡방에서 공유된 여행 릴스',
            primary_category: cat.primary,
            sub_category: cat.sub,
            region: region,
            votes: 1,
            rating: 5,
            shared_by: senderName,
            is_favorite: false
          });

          // Send cute bot confirmation in the group chat
          const replyText = `✨ <b>[${cat.primary.toUpperCase()}] ${region} 등록 완료!</b>\n🎬 <b>${cleanTitle}</b>\n👤 공유자: ${senderName}\n\n📱 <a href="https://osaka-reels-curator.vercel.app">오사카 여행 지도 바로보기</a>`;
          await sendTelegramMessage(chatId, replyText);
        }
      }

      return res.status(200).send('OK');
    } catch (err) {
      console.error('Telegram Webhook error:', err);
      return res.status(500).json({ error: 'Internal error' });
    }
  }

  return res.status(200).json({ status: 'Telegram Webhook Live', bot: 'Osaka_trip555_bot' });
}

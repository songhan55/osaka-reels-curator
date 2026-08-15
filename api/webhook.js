// Meta Instagram Messaging API Serverless Webhook Endpoint for Vercel
// GET: Meta Webhook Verification
// POST: Incoming Instagram Message / Reel Event Handler

const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN || 'tripreels_secure_verify_token_2026';

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

      if (body.object === 'instagram') {
        const entries = body.entry || [];

        for (const entry of entries) {
          const messaging = entry.messaging || [];

          for (const event of messaging) {
            const senderId = event.sender?.id;
            const recipientId = event.recipient?.id;
            const message = event.message;

            if (message) {
              const text = message.text || '';
              const attachments = message.attachments || [];

              console.log(`📩 [Instagram Message Received] From: ${senderId}, Text: ${text}`);

              // Check for reel URL in text or share attachments
              const reelRegex = /https?:\/\/(?:www\.)?instagram\.com\/(?:reel|p)\/[A-Za-z0-9_-]+/i;
              let matchedUrl = null;

              if (reelRegex.test(text)) {
                matchedUrl = text.match(reelRegex)[0];
              } else if (attachments.length > 0 && attachments[0].payload?.url) {
                matchedUrl = attachments[0].payload.url;
              }

              if (matchedUrl) {
                console.log(`🎬 Found Reel URL: ${matchedUrl}`);
                // In production, this persists to Supabase/PostgreSQL database
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

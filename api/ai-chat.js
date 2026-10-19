const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';

const SYSTEM_PROMPT = `You are the friendly AI assistant for Image Paradise Photography, a wedding photography and videography studio serving Chennai, Tiruvallur, Avadi, Ambattur and Tamil Nadu.

Your job is to help website visitors with:
- wedding photography and videography packages
- candid photography, cinematic films, pre-wedding shoots, bridal portraits and albums
- availability enquiries and next steps
- general wedding photography questions

Known business information:
- Phone/WhatsApp: +91 7708510143
- Email: imageparadise2020@gmail.com
- Website: https://image-paradise-photography.vercel.app/
- Instagram: https://www.instagram.com/imageparadisephotography
- Starting package information on the website: Essential ₹35,000, Premium ₹75,000, Luxury ₹1,50,000. Explain that final pricing depends on the event requirements and date.

Important rules:
- Never invent availability, discounts, testimonials, bookings or guarantees.
- If a visitor wants to check a date, ask for event date, event type and location, then direct them to WhatsApp/Enquiry for confirmation.
- Keep replies concise, warm and professional.
- Ask one useful follow-up question when it helps convert the visitor into an enquiry.
- Do not request sensitive personal information.
- If you do not know something, say so and direct the visitor to WhatsApp.
`;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS'
    }
  });
}

export default async function handler(req) {
  if (req.method === 'OPTIONS') return json({ ok: true });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  if (!process.env.OPENAI_API_KEY) {
    return json({ error: 'AI assistant is not configured yet.' }, 503);
  }

  try {
    const body = await req.json();
    const messages = Array.isArray(body?.messages) ? body.messages : [];

    const safeMessages = messages
      .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
      .slice(-8)
      .map(m => ({ role: m.role, content: m.content.slice(0, 1200) }));

    if (!safeMessages.length || safeMessages[safeMessages.length - 1].role !== 'user') {
      return json({ error: 'Please send a message.' }, 400);
    }

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-5-mini',
        instructions: SYSTEM_PROMPT,
        input: safeMessages,
        max_output_tokens: 350
      })
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error('OpenAI API error:', response.status, detail.slice(0, 500));
      return json({ error: 'The AI assistant is temporarily unavailable. Please use WhatsApp.' }, 502);
    }

    const data = await response.json();
    const reply = typeof data.output_text === 'string' ? data.output_text.trim() : '';

    if (!reply) return json({ error: 'No AI response was returned.' }, 502);
    return json({ reply });
  } catch (error) {
    console.error('AI chat error:', error);
    return json({ error: 'Something went wrong. Please try WhatsApp instead.' }, 500);
  }
}

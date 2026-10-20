import React, { useState, useRef, useEffect } from 'react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export const AiChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      role: 'assistant',
      content:
        'Hi! 👋 I can help you compare wedding packages, understand pricing and delivery timelines, plan a pre-wedding shoot, or prepare a date enquiry for your celebration. What are you planning?'
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const getKnowledgeResponse = (userText: string): string => {
    const q = userText.toLowerCase();

    if (q.includes('package') || q.includes('tier') || q.includes('plan')) {
      return (
        'We offer three crafted wedding packages:\n\n' +
        '1. Essential (₹35,000): 4 hours coverage, 1 photographer, 1 videographer, 200+ photos with printed album, private online gallery.\n\n' +
        '2. Premium (₹75,000): 8 hours coverage, 2 photographers, 1 videographer, 400+ photos, 2 premium printed albums, 3-minute highlight film.\n\n' +
        '3. Luxury (₹1,50,000): Full day coverage, 2 photographers + assistant, 2 videographers, unlimited photos, pre & post-wedding shoots, cinematic highlight film.\n\n' +
        'Would you like help preparing a date enquiry for one of these?'
      );
    }

    if (q.includes('price') || q.includes('cost') || q.includes('rate') || q.includes('budget') || q.includes('how much')) {
      return (
        'Our wedding packages start from ₹35,000 for intimate functions, ₹75,000 for full wedding day coverage, and ₹1,50,000 for luxury multi-event coverage with pre-wedding shoots. Final pricing depends on your date, venue, hours, and whether you need both photo and cinematic video.'
      );
    }

    if (q.includes('book') || q.includes('how do i book') || q.includes('reserve') || q.includes('process')) {
      return (
        'Booking with Image Paradise is simple:\n' +
        '1. Share your event date, venue, and functions.\n' +
        '2. We verify calendar availability and suggest the right team setup.\n' +
        '3. Review and confirm your customized quote.\n' +
        '4. Reserve your date with our studio.\n\n' +
        'You can also message us directly on WhatsApp at +91 7708510143.'
      );
    }

    if (q.includes('delivery') || q.includes('timeline') || q.includes('when') || q.includes('album') || q.includes('receive')) {
      return (
        'Here are our typical delivery timelines:\n' +
        '• Typically 24–48 hours: Preview selection target; confirm the timeline in your quotation.\n' +
        '• 4–6 weeks: Complete edited high-resolution gallery.\n' +
        '• Albums: Design and printing may require additional time; confirm the expected timeline in your quotation.'
      );
    }

    if (q.includes('date') || q.includes('available') || q.includes('check')) {
      return (
        'This chat does not check a live booking calendar. To request an availability check, share your event date, venue or city, and functions to be covered, then contact the studio through the enquiry form or WhatsApp at +91 7708510143.'
      );
    }

    if (q.includes('pre-wedding') || q.includes('couple') || q.includes('outdoor') || q.includes('shoot')) {
      return (
        'Yes! We craft bespoke pre-wedding shoots across Chennai (ECR beach sunrises, botanical gardens, Mahabalipuram heritage ruins, or aesthetic indoor studios). Our pre-wedding sessions include concept styling, location advice, relaxed candid pacing, and optional cinematic couple films.'
      );
    }

    if (q.includes('refer') || q.includes('earn') || q.includes('reward')) {
      return (
        'Our Refer & Earn program accepts referrals for eligible wedding and event enquiries. The studio confirms eligibility, any commission amount and the payout milestone in writing before accepting a referral. No fixed reward or client discount is promised on the public page. Visit the Refer & Earn page or WhatsApp us at +91 7708510143 for the written terms.'
      );
    }

    if (q.includes('director') || q.includes('hariharan') || q.includes('owner') || q.includes('address') || q.includes('where')) {
      return (
        'IMAGE PARADISE is directed by Creative Director Hariharan R. Our studio is located at No. 2/670, Kudiyanvur Street 87, Veppampattu – 602024, Tamil Nadu (Helpline: +91 7708510143). We serve Chennai, Tiruvallur, Avadi, Ambattur, Kanchipuram and nearby Tamil Nadu locations. Ask us about travel for events farther away.'
      );
    }

    return (
      'Thank you for reaching out! Image Paradise Photography (Creative Director: Hariharan R) specializes in candid wedding photography, cinematic films, and pre-wedding shoots across Chennai, Veppampattu, and Tamil Nadu. Would you like details on packages, checking your wedding date, or our Refer & Earn program?'
    );
  };

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: text
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      // Attempt backend proxy route if server is running, or respond with built-in assistant knowledge
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, content: m.content }))
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.reply) {
          setMessages((prev) => [
            ...prev,
            { id: `b-${Date.now()}`, role: 'assistant', content: data.reply }
          ]);
          setIsTyping(false);
          return;
        }
      }
    } catch (e) {
      // Offline or direct client fallback
    }

    // Intelligent simulated response
    setTimeout(() => {
      const reply = getKnowledgeResponse(text);
      setMessages((prev) => [
        ...prev,
        { id: `b-${Date.now()}`, role: 'assistant', content: reply }
      ]);
      setIsTyping(false);
    }, 600);
  };

  const suggestions = [
    'Wedding packages',
    'What is the price?',
    'How do I book?',
    'Delivery timeline',
    'Check my date',
    'Pre-wedding shoot'
  ];

  return (
    <>
      <button
        className="ai-chat-launcher"
        id="aiChatLauncher"
        aria-label="Open Image Paradise AI assistant"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="ai-chat-spark">✦</span>
        <span>Ask AI</span>
      </button>

      {isOpen && (
        <section
          className="ai-chat-panel"
          id="aiChatPanel"
          aria-label="Image Paradise AI assistant"
        >
          <header className="ai-chat-header">
            <div>
              <strong>Image Paradise AI</strong>
              <small>Wedding photography assistant</small>
            </div>
            <button
              id="aiChatClose"
              className="ai-chat-close"
              aria-label="Close"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </header>

          <div className="ai-chat-messages" id="aiChatMessages" aria-live="polite">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`ai-msg ${m.role === 'assistant' ? 'ai-msg-bot' : 'ai-msg-user'}`}
              >
                {m.content}
              </div>
            ))}
            {isTyping && (
              <div className="ai-msg ai-msg-bot ai-msg-typing">
                Thinking…
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="ai-chat-suggestions" id="aiChatSuggestions">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(s)}
              >
                {s}
              </button>
            ))}
          </div>

          <form
            className="ai-chat-form"
            id="aiChatForm"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              id="aiChatInput"
              maxLength={1200}
              autoComplete="off"
              placeholder="Ask about your wedding…"
              aria-label="Message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" aria-label="Send">
              ➤
            </button>
          </form>

          <p className="ai-chat-privacy">
            Please do not share passwords, payment credentials or other sensitive details. Chat messages may be processed by an AI provider to generate replies. See our <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Notice</a>.
          </p>

          <a
            className="ai-chat-whatsapp"
            href="https://wa.me/917708510143?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20wedding%20photography"
            target="_blank"
            rel="noopener noreferrer"
          >
            Prefer WhatsApp? Chat with us →
          </a>
        </section>
      )}
    </>
  );
};

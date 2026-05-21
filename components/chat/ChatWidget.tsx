'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { AdinkraIcon } from '@/components/shared/AdinkraIcon';
import { useT } from '@/lib/i18n';
import type { DictKey } from '@/lib/i18n/dictionaries';

type Msg = { role: 'user' | 'assistant' | 'admin'; content: string; sources?: string[] };

const SUGGESTED_KEYS: DictKey[] = [
  'chat.suggested.rooms',
  'chat.suggested.directions',
  'chat.suggested.spa',
  'chat.suggested.included',
];

function getSessionId() {
  if (typeof window === 'undefined') return '';
  let id = localStorage.getItem('kosa_chat_session');
  if (!id) {
    id = 'sess_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem('kosa_chat_session', id);
  }
  return id;
}

export function ChatWidget() {
  const pathname = usePathname();
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'assistant', content: '' }, // greeting set on mount via useEffect below
  ]);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const scroller = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSessionId(getSessionId());
  }, []);

  // Localize greeting (and re-localize if user switches language before chatting)
  useEffect(() => {
    setMessages((m) => {
      if (m.length !== 1 || m[0].role !== 'assistant') return m;
      const greeting = t('chat.greeting');
      if (m[0].content === greeting) return m;
      return [{ role: 'assistant', content: greeting }];
    });
  }, [t]);

  useEffect(() => {
    if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight;
  }, [messages, loading]);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    // Ensure sessionId is valid (≥4 chars) before sending — getSessionId() runs
    // in a useEffect after mount, so it can briefly be '' if the user is fast.
    const sid = sessionId || getSessionId();
    if (!sid || sid.length < 4) {
      console.warn('[chat] no sessionId — aborting send');
      return;
    }

    const userMsg: Msg = { role: 'user', content: text };
    setMessages((m) => [...m, userMsg, { role: 'assistant', content: '' }]);
    setInput('');
    setLoading(true);

    // Abort safety net so we never hang forever
    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort('chat-timeout'), 60_000);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, sessionId: sid }),
        signal: ctrl.signal,
      });
      if (!res.ok || !res.body) {
        const errBody = await res.text().catch(() => '');
        throw new Error(`Chat unavailable (${res.status}) ${errBody.slice(0, 120)}`);
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assembled = '';
      let chunks = 0;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks += 1;
        assembled += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: 'assistant', content: assembled };
          return copy;
        });
      }
      // Empty stream = surface a friendly message instead of a blank bubble
      if (chunks === 0 || !assembled.trim()) {
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = {
            role: 'assistant',
            content:
              "Akwaaba I'm here, but my concierge brain returned a moment of silence. Try again, or WhatsApp +233 24 437 5432.",
          };
          return copy;
        });
      }
    } catch (e) {
      const reason = (e as Error)?.message || String(e);
      console.error('[chat] send failed:', reason);
      setMessages((m) => {
        const copy = [...m];
        const isAbort = reason.includes('chat-timeout') || (e as DOMException)?.name === 'AbortError';
        copy[copy.length - 1] = {
          role: 'assistant',
          content: isAbort
            ? 'That took longer than expected — please try again, or WhatsApp +233 24 437 5432.'
            : "I'm having trouble reaching the resort knowledge right now. Please WhatsApp us at +233 24 437 5432 — we'll respond shortly.",
        };
        return copy;
      });
    } finally {
      clearTimeout(timeout);
      setLoading(false);
    }
  }

  if (pathname?.startsWith('/admin')) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label={t('chat.cta')}
        className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-3 bg-umber text-cream rounded-full pl-3 pr-5 py-3 shadow-2xl hover:bg-primary hover:text-umber transition-all hover:-translate-y-1"
      >
        <span className="grid place-items-center h-8 w-8 rounded-full bg-primary/30">
          <AdinkraIcon name="knonsonkonson" size={20} className="text-primary" />
        </span>
        <span className="font-poppins text-xs uppercase tracking-tracked">{t('chat.cta')}</span>
      </button>

      <button
        onClick={() => setOpen(true)}
        aria-label={t('chat.cta')}
        className="md:hidden fixed bottom-5 right-5 z-40 grid place-items-center h-14 w-14 rounded-full bg-umber text-cream shadow-2xl"
      >
        <MessageCircle size={22} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 md:inset-auto md:bottom-6 md:right-6 z-50 md:w-[420px] md:h-[640px] bg-cream md:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-umber/10"
            role="dialog"
            aria-label="Resort chat"
          >
            <header className="flex items-center justify-between bg-umber text-cream px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="grid place-items-center h-10 w-10 rounded-full bg-primary/25">
                  <AdinkraIcon name="palm" size={22} className="text-primary" />
                </span>
                <div>
                  <p className="font-belleza text-lg leading-none">{t('chat.title')}</p>
                  <p className="font-poppins text-[10px] uppercase tracking-tracked text-cream/70">
                    {t('chat.subtitle')}
                  </p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} aria-label={t('chat.close')} className="hover:text-primary">
                <X size={22} />
              </button>
            </header>

            <div ref={scroller} className="flex-1 overflow-y-auto px-4 py-5 space-y-3 bg-bg-orange">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  aria-live="polite"
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      m.role === 'user'
                        ? 'bg-primary text-umber rounded-br-sm'
                        : m.role === 'admin'
                        ? 'bg-umber text-cream rounded-bl-sm'
                        : 'bg-cream text-umber border border-umber/10 rounded-bl-sm'
                    }`}
                  >
                    {m.content || (loading && i === messages.length - 1 ? <Typing /> : null)}
                  </div>
                </div>
              ))}
            </div>

            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2 bg-bg-orange">
                {SUGGESTED_KEYS.map((key) => {
                  const q = t(key);
                  return (
                    <button
                      key={key}
                      onClick={() => send(q)}
                      className="text-xs px-3 py-1.5 rounded-full bg-cream border border-umber/15 hover:bg-primary hover:text-umber hover:border-primary transition-colors"
                    >
                      {q}
                    </button>
                  );
                })}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 p-3 border-t border-umber/10 bg-cream"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('chat.placeholder')}
                className="flex-1 bg-bg-orange rounded-full px-4 py-2.5 text-sm focus:outline-none border border-transparent focus:border-primary"
              />
              <button
                disabled={loading || !input.trim()}
                type="submit"
                aria-label={t('chat.send')}
                className="grid place-items-center h-10 w-10 rounded-full bg-umber text-cream disabled:opacity-50 hover:bg-primary hover:text-umber transition-colors"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Typing() {
  return (
    <span className="inline-flex gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.15 }}
          className="block h-1.5 w-1.5 rounded-full bg-primary"
        />
      ))}
    </span>
  );
}

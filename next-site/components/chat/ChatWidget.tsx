'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  ArrowUp,
  ExternalLink,
  LifeBuoy,
  LoaderCircle,
  MessageCircle,
  RotateCcw,
  Send,
  TicketCheck,
  X,
} from 'lucide-react';

type LinkItem = { label: string; url: string };
type Message = { role: 'user' | 'assistant'; text: string; links?: LinkItem[]; suggestTicket?: boolean };
type SavedChat = { token: string; messages: Message[]; limitReached?: boolean };
type ApiError = Error & { data?: { limitReached?: boolean }; status?: number };

const STORAGE_KEY = 'frenchify_chat_v2';
const HIDDEN_PREFIXES = ['/admin', '/student-support', '/writingsubmissions', '/examprep1writingsubmissions'];
const CATEGORIES = [
  'Course access or login',
  'Payment or invoice',
  'Live class or schedule',
  'Course content or material',
  'Certificate or exam',
  'Technical problem',
  'Something else',
] as const;

const QUICK_STARTS = [
  'Which course should I start with?',
  'What meetings can I book?',
  'I need help as a current student',
];

async function postJson(path: string, body: unknown) {
  const response = await fetch(path, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.error || 'Something went wrong.') as ApiError;
    error.data = data;
    error.status = response.status;
    throw error;
  }
  return data;
}

export default function ChatWidget() {
  const pathname = usePathname() || '';
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [ticketOpen, setTicketOpen] = useState(false);
  const [ticketReason, setTicketReason] = useState('');
  const [ticketRequestId, setTicketRequestId] = useState('');
  const [ticketCategory, setTicketCategory] = useState<(typeof CATEGORIES)[number]>('Something else');
  const [ticketRef, setTicketRef] = useState('');
  const [limitReached, setLimitReached] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as SavedChat;
      if (parsed.token && Array.isArray(parsed.messages)) {
        setToken(parsed.token);
        setMessages(parsed.messages.slice(-20));
        setLimitReached(Boolean(parsed.limitReached));
      }
    } catch {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ token, messages: messages.slice(-20), limitReached })
    );
  }, [token, messages, limitReached]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (open && !token) requestAnimationFrame(() => nameRef.current?.focus());
  }, [open, token]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages, busy, ticketOpen]);

  if (HIDDEN_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return null;

  const startChat = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    const form = new FormData(event.currentTarget);
    try {
      const data = await postJson('/api/chat/session', {
        name: form.get('name'),
        email: form.get('email'),
      });
      setToken(data.sessionToken);
      setMessages([{ role: 'assistant', text: data.greeting }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not start the chat.');
    } finally {
      setBusy(false);
    }
  };

  const sendMessage = async (text = message) => {
    const clean = text.replace(/\s+/g, ' ').trim();
    if (!clean || busy || !token) return;
    setMessage('');
    setError('');
    setTicketOpen(false);
    setMessages((current) => [...current, { role: 'user', text: clean }]);
    setBusy(true);
    try {
      const data = await postJson('/api/chat/message', { sessionToken: token, message: clean });
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          text: data.reply,
          links: data.links,
          suggestTicket: data.suggestTicket,
        },
      ]);
      setLimitReached(Boolean(data.limitReached));
      if (data.suggestTicket) setTicketOpen(true);
    } catch (err) {
      const apiError = err as ApiError;
      if (apiError.data?.limitReached) {
        setLimitReached(true);
      } else {
        setError(err instanceof Error ? err.message : 'Could not send that message.');
      }
    } finally {
      setBusy(false);
    }
  };

  const raiseTicket = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!ticketReason.trim() || busy) return;
    setBusy(true);
    setError('');
    const requestId = ticketRequestId || crypto.randomUUID();
    if (!ticketRequestId) setTicketRequestId(requestId);
    try {
      const data = await postJson('/api/chat/ticket', {
        sessionToken: token,
        requestId,
        category: ticketCategory,
        reason: ticketReason,
      });
      setTicketRef(data.ref);
      setTicketRequestId('');
      setTicketOpen(false);
      setMessages((current) => [
        ...current,
        { role: 'assistant', text: `Your support ticket is ${data.ref}. Keep this number for follow-up.` },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not create the ticket.');
    } finally {
      setBusy(false);
    }
  };

  const resetChat = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setToken('');
    setMessages([]);
    setMessage('');
    setError('');
    setTicketOpen(false);
    setTicketReason('');
    setTicketRequestId('');
    setTicketRef('');
    setLimitReached(false);
  };

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-[100] inline-flex min-h-12 items-center gap-2 rounded-full bg-brand-blue px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_36px_-12px_rgba(37,99,235,0.7)] transition hover:-translate-y-0.5 hover:bg-brand-blue-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue sm:bottom-6 sm:right-6"
          aria-label="Open Frenchify chat"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          Ask Frenchify
        </button>
      )}

      <section
        role="dialog"
        aria-label="Frenchify chat"
        aria-hidden={!open}
        inert={!open}
        className={`fixed z-[110] flex overflow-hidden border border-blue-100 bg-[#fbfcff] shadow-[0_24px_80px_-24px_rgba(15,23,42,0.45)] transition-[opacity,transform] duration-200 ease-out max-sm:inset-0 sm:bottom-6 sm:right-6 sm:w-[390px] sm:rounded-[22px] ${
          token ? 'sm:h-[min(680px,calc(100vh-48px))]' : 'sm:h-auto sm:max-h-[calc(100vh-48px)]'
        } ${
          open ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
        }`}
      >
        <div className="flex min-h-0 w-full flex-col">
          <header className="flex shrink-0 items-center gap-3 border-b border-blue-100 bg-white px-4 py-3.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-brand-blue">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="font-display text-[15px] font-bold text-gray-950">Chat with Frenchify</h2>
              <p className="text-xs text-gray-500">Courses, meetings, and student support</p>
            </div>
            {token && (
              <button
                type="button"
                onClick={resetChat}
                className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
                aria-label="Start a new chat"
                title="Start a new chat"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </header>

          {!token ? (
            <div className="flex-1 overflow-y-auto px-5 py-6">
              <p className="font-display text-2xl font-bold tracking-tight text-gray-950">Hey, how can I help?</p>
              <p className="mt-2 text-[15px] leading-6 text-gray-600">
                Tell me what you&apos;re looking for. I can help you choose a course, find the right meeting, or sort out a student issue.
              </p>
              <form className="mt-6 space-y-4" onSubmit={startChat}>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-gray-700">Name</span>
                  <input
                    ref={nameRef}
                    name="name"
                    autoComplete="name"
                    required
                    maxLength={80}
                    className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-3 text-[16px] text-gray-950 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-gray-700">Email</span>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={180}
                    className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-3 text-[16px] text-gray-950 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
                  />
                </label>
                <p className="text-xs leading-5 text-gray-500">
                  I use these details to continue the conversation and create a ticket only when you ask.
                </p>
                <button
                  type="submit"
                  disabled={busy}
                  className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-blue px-4 text-[15px] font-semibold text-white transition hover:bg-brand-blue-deep disabled:cursor-wait disabled:opacity-65"
                >
                  {busy ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  Start chat
                </button>
              </form>
              {error && <ErrorMessage text={error} />}
            </div>
          ) : (
            <>
              <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4" aria-live="polite">
                <div className="space-y-3">
                  {messages.map((item, index) => (
                    <div key={`${item.role}-${index}`} className={item.role === 'user' ? 'ml-10' : 'mr-8'}>
                      <div
                        className={`rounded-2xl px-3.5 py-2.5 text-[14px] leading-5 ${
                          item.role === 'user'
                            ? 'rounded-br-md bg-brand-blue text-white'
                            : 'rounded-bl-md border border-gray-200 bg-white text-gray-800'
                        }`}
                      >
                        {item.text}
                      </div>
                      {item.links && item.links.length > 0 && (
                        <div className="mt-2 flex flex-col items-start gap-1.5">
                          {item.links.map((link) => (
                            <a
                              key={link.url}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-blue-200 bg-white px-3 text-[13px] font-semibold text-brand-blue transition hover:border-brand-blue hover:bg-blue-50"
                            >
                              {link.label}
                              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {messages.length === 1 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {QUICK_STARTS.map((text) => (
                        <button
                          key={text}
                          type="button"
                          onClick={() => sendMessage(text)}
                          className="min-h-10 rounded-full border border-blue-200 bg-white px-3 text-left text-[13px] font-medium text-gray-700 transition hover:border-brand-blue hover:text-brand-blue"
                        >
                          {text}
                        </button>
                      ))}
                    </div>
                  )}

                  {busy && (
                    <div className="mr-20 inline-flex items-center gap-2 rounded-2xl rounded-bl-md border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-500">
                      <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                      Let me find the right answer for you
                    </div>
                  )}

                  {ticketOpen && !ticketRef && (
                    <form onSubmit={raiseTicket} className="border-t border-gray-200 pt-4">
                      <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                        <LifeBuoy className="h-4 w-4 text-brand-blue" aria-hidden="true" />
                        Raise a support ticket
                      </div>
                      <label className="mt-3 block">
                        <span className="mb-1 block text-xs font-semibold text-gray-600">Issue type</span>
                        <select
                          value={ticketCategory}
                          onChange={(event) => setTicketCategory(event.target.value as (typeof CATEGORIES)[number])}
                          className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-[16px] text-gray-900 outline-none focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
                        >
                          {CATEGORIES.map((category) => (
                            <option key={category}>{category}</option>
                          ))}
                        </select>
                      </label>
                      <label className="mt-3 block">
                        <span className="mb-1 block text-xs font-semibold text-gray-600">What should the team handle?</span>
                        <textarea
                          value={ticketReason}
                          onChange={(event) => setTicketReason(event.target.value)}
                          required
                          maxLength={2000}
                          rows={3}
                          className="w-full resize-none rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-[16px] text-gray-900 outline-none focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
                        />
                      </label>
                      <div className="mt-3 flex gap-2">
                        <button
                          type="submit"
                          disabled={busy || !ticketReason.trim()}
                          className="min-h-11 flex-1 rounded-xl bg-brand-blue px-4 text-sm font-semibold text-white transition hover:bg-brand-blue-deep disabled:opacity-60"
                        >
                          Create ticket
                        </button>
                        <button
                          type="button"
                          onClick={() => setTicketOpen(false)}
                          className="min-h-11 rounded-xl border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}

                  {error && <ErrorMessage text={error} />}
                  <div ref={endRef} />
                </div>
              </div>

              <footer className="shrink-0 border-t border-gray-200 bg-white p-3">
                {!limitReached && !ticketOpen && messages.some((item) => item.role === 'user') && !ticketRef && (
                  <button
                    type="button"
                    onClick={() => setTicketOpen(true)}
                    className="mb-2 inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2 text-xs font-semibold text-gray-600 transition hover:bg-gray-100 hover:text-brand-blue"
                  >
                    <LifeBuoy className="h-3.5 w-3.5" aria-hidden="true" />
                    Raise a ticket
                  </button>
                )}
                {ticketRef && (
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-green-700">
                    <TicketCheck className="h-4 w-4" aria-hidden="true" /> Ticket {ticketRef} created
                  </p>
                )}
                {limitReached && !ticketOpen ? (
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Need more help?</p>
                    <p className="mt-0.5 text-xs leading-5 text-gray-500">
                      I can pass this to the team or help you book a consultation.
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setTicketOpen(true)}
                        className="flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-brand-blue px-3 text-sm font-semibold text-white transition hover:bg-brand-blue-deep"
                      >
                        <LifeBuoy className="h-4 w-4" aria-hidden="true" />
                        Raise a ticket
                      </button>
                      <a
                        href="/contact/"
                        className="flex min-h-11 items-center justify-center rounded-xl border border-blue-200 bg-white px-3 text-center text-sm font-semibold text-brand-blue transition hover:border-brand-blue hover:bg-blue-50"
                      >
                        Book a consultation
                      </a>
                    </div>
                  </div>
                ) : !limitReached ? (
                  <form
                    className="flex items-end gap-2"
                    onSubmit={(event) => {
                      event.preventDefault();
                      sendMessage();
                    }}
                  >
                    <label className="sr-only" htmlFor="frenchify-chat-message">
                      Message
                    </label>
                    <textarea
                      id="frenchify-chat-message"
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' && !event.shiftKey) {
                          event.preventDefault();
                          sendMessage();
                        }
                      }}
                      disabled={busy}
                      maxLength={1200}
                      rows={1}
                      placeholder="Ask about a course, meeting, or issue"
                      className="max-h-28 min-h-11 flex-1 resize-none rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-[16px] leading-5 text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-brand-blue focus:ring-2 focus:ring-blue-100 disabled:bg-gray-50"
                    />
                    <button
                      type="submit"
                      disabled={busy || !message.trim()}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-blue text-white transition hover:bg-brand-blue-deep disabled:cursor-not-allowed disabled:bg-gray-300"
                      aria-label="Send message"
                    >
                      <ArrowUp className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </form>
                ) : null}
              </footer>
            </>
          )}
        </div>
      </section>
    </>
  );
}

function ErrorMessage({ text }: { text: string }) {
  return (
    <p role="alert" className="mt-3 rounded-xl bg-red-50 px-3 py-2.5 text-sm text-red-800">
      {text}{' '}
      <a href="/student-support/" className="font-semibold underline">
        Open support
      </a>
    </p>
  );
}

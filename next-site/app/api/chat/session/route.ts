import { NextRequest } from 'next/server';
import { proxyChat } from '@/lib/chat-proxy';

export async function POST(request: NextRequest) {
  return proxyChat(request, 'sessions');
}

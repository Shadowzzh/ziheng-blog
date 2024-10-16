import type { NextRequest } from 'next/server';
import { agentMiddleware } from '@/middlewares/agent';

export function middleware(request: NextRequest) {
  return agentMiddleware(request);
}

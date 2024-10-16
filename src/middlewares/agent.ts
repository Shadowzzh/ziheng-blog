import type { NextRequest } from 'next/server';
import { NextResponse, userAgent } from 'next/server';
import { AGENT } from '@/middlewares/constant';

/**
 * 设备类型中间件
 * @param request
 * @returns
 */
export const agentMiddleware = (request: NextRequest) => {
  const url = request.nextUrl;
  const { device } = userAgent(request);

  const viewport = device.type === 'mobile' ? AGENT.MOBILE : AGENT.DESKTOP;

  url.searchParams.set('viewport', viewport);
  return NextResponse.rewrite(url);
};

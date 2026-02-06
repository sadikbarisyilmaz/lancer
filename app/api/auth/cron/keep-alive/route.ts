import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  // 1. Security check
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }


  try {
   
      // --- PING MONGODB ---
      await prisma.$runCommandRaw({ ping: 1 });
      return NextResponse.json({ service: 'MongoDB', status: 'ok' });
    
  } catch (error) {
    console.error('Cron failed:', error);
    return NextResponse.json({ error: 'Ping failed' }, { status: 500 });
  }
}
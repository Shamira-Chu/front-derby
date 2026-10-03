import { NextResponse } from 'next/server';
import { getCategoriesFromStore } from '@/data/seedContent';

const RENDER_BACKEND = 'https://syntheticabackend.onrender.com';

export async function GET() {
  try {
    const res = await fetch(`${RENDER_BACKEND}/categorias`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }
  } catch {
    // Fallback
  }

  return NextResponse.json(getCategoriesFromStore());
}

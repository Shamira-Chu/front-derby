import { NextRequest, NextResponse } from 'next/server';
import { getContentBySlugFromStore } from '@/data/seedContent';

const RENDER_BACKEND = 'https://syntheticabackend.onrender.com';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const res = await fetch(`${RENDER_BACKEND}/conteudos/slug/${encodeURIComponent(slug)}`, {
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

  const content = getContentBySlugFromStore(slug);
  if (!content) {
    return NextResponse.json({ detail: 'Ensaio não encontrado.' }, { status: 404 });
  }

  return NextResponse.json(content);
}

import { NextRequest, NextResponse } from 'next/server';
import { getContentsFromStore, createContentInStore } from '@/data/seedContent';

const RENDER_BACKEND = 'https://syntheticabackend.onrender.com';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const queryString = searchParams.toString();

  try {
    const res = await fetch(`${RENDER_BACKEND}/conteudos${queryString ? `?${queryString}` : ''}`, {
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }
  } catch {
    // Render waking up or offline fallback
  }

  // Fail-safe Fallback to Seed Store
  const trilha = searchParams.get('trilha') || undefined;
  const categoria_id = searchParams.get('categoria_id')
    ? Number(searchParams.get('categoria_id'))
    : undefined;
  const busca = searchParams.get('busca') || undefined;

  const contents = getContentsFromStore({ trilha, categoria_id, busca });
  return NextResponse.json(contents);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Try posting to Render backend first
    try {
      const res = await fetch(`${RENDER_BACKEND}/conteudos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        cache: 'no-store',
      });

      if (res.ok) {
        const data = await res.json();
        return NextResponse.json(data, { status: 201 });
      }
    } catch {
      // Fallback
    }

    if (!body.titulo || !body.slug) {
      return NextResponse.json({ detail: 'Título e slug são obrigatórios.' }, { status: 422 });
    }
    const created = createContentInStore(body);
    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json({ detail: 'Corpo da requisição inválido.' }, { status: 400 });
  }
}

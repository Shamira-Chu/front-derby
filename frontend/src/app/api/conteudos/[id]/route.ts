import { NextRequest, NextResponse } from 'next/server';
import { updateContentInStore, deleteContentFromStore } from '@/data/seedContent';

const RENDER_BACKEND = 'https://syntheticabackend.onrender.com';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numId = Number(id);

  try {
    const body = await request.json();

    try {
      const res = await fetch(`${RENDER_BACKEND}/conteudos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        cache: 'no-store',
      });

      if (res.ok) {
        const data = await res.json();
        return NextResponse.json(data);
      }
    } catch {
      // Fallback
    }

    const updated = updateContentInStore(numId, body);
    if (!updated) {
      return NextResponse.json({ detail: 'Ensaio não encontrado.' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ detail: 'Corpo da requisição inválido.' }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numId = Number(id);

  try {
    const res = await fetch(`${RENDER_BACKEND}/conteudos/${id}`, {
      method: 'DELETE',
      cache: 'no-store',
    });

    if (res.ok || res.status === 204) {
      return new NextResponse(null, { status: 204 });
    }
  } catch {
    // Fallback
  }

  deleteContentFromStore(numId);
  return new NextResponse(null, { status: 204 });
}

'use client';

import React from 'react';
import Link from 'next/link';
import { Content } from '@/types';

const NOME_DA_TRILHA: Record<string, string> = {
  velocidade: 'Velocidade',
  expressao: 'Expressão',
};

interface ListaConteudosProps {
  conteudos: Content[];
  onEditar: (conteudo: Content) => void;
  onExcluir: (conteudo: Content) => void;
  filtrado?: boolean;
  onLimparFiltro?: () => void;
  idOcupado?: string | null;
}

const Coluna: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <th
    scope="col"
    className={`sw-label sw-label-bare pb-3 text-left font-normal whitespace-nowrap ${className}`}
  >
    {children}
  </th>
);

export const ListaConteudos: React.FC<ListaConteudosProps> = ({
  conteudos,
  onEditar,
  onExcluir,
  filtrado = false,
  onLimparFiltro,
  idOcupado = null,
}) => {
  if (conteudos.length === 0) {
    return (
      <div className="border-t border-accent/16 py-20 space-y-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
          Pista vazia
        </p>

        <p className="text-ink/45 text-[13px] leading-relaxed max-w-sm">
          {filtrado
            ? 'Nenhum ensaio assinado nesta trilha ainda. Troque a pista ou abra o acervo inteiro.'
            : 'O acervo está sem ensaios. Escreva o primeiro para o portal ter o que publicar.'}
        </p>

        {filtrado && onLimparFiltro && (
          <button type="button" onClick={onLimparFiltro} className="sw-btn px-6 py-2.5">
            Ver todas as pistas
          </button>
        )}
      </div>
    );
  }

  return (
    <div>
      {/* VISÃO MOBILE: Cards Touch-Friendly */}
      <div className="md:hidden space-y-4">
        {conteudos.map((conteudo, indice) => {
          const ocupado = conteudo.id === idOcupado;

          return (
            <div
              key={conteudo.id}
              className={`p-5 rounded-lg border border-slate-800 bg-slate-950/70 space-y-4 transition-all ${
                ocupado ? 'opacity-40 pointer-events-none' : 'hover:border-cyan-500/40'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs text-pink-500 font-bold">
                  #{String(indice + 1).padStart(2, '0')}
                </span>
                <span className="sw-tag text-[10px]">
                  {NOME_DA_TRILHA[conteudo.trilha] ?? conteudo.trilha}
                </span>
              </div>

              <div>
                <Link
                  href={`/conteudo/${conteudo.slug}`}
                  className="font-sans font-bold text-base text-white hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <span>{conteudo.title}</span>
                  <svg className="w-3.5 h-3.5 text-slate-500 inline shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
                <p className="font-mono text-[11px] text-slate-400 mt-1">
                  {conteudo.categoryName} • {conteudo.author}
                </p>
                <p className="font-mono text-[10px] text-slate-500 mt-0.5">
                  Publicado em: {conteudo.date}
                </p>
              </div>

              {/* Botões Touch-Friendly para Mobile */}
              <div className="pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => onEditar(conteudo)}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded bg-slate-900 border border-slate-700/70 hover:border-cyan-400 text-xs font-mono tracking-wider text-slate-200 active:scale-95 transition-all"
                >
                  <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Editar
                </button>

                <button
                  type="button"
                  onClick={() => onExcluir(conteudo)}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded bg-slate-900 border border-slate-700/70 hover:border-pink-500 text-xs font-mono tracking-wider text-pink-400 active:scale-95 transition-all"
                >
                  <svg className="w-3.5 h-3.5 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Excluir
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* VISÃO DESKTOP: Tabela Tradicional do Sistema TERMINAL */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[52rem] border-collapse">
          <caption className="sr-only">
            Ensaios do acervo, com as ações de editar e excluir
          </caption>

          <thead>
            <tr className="border-b border-accent/30">
              <Coluna className="w-10">Nº</Coluna>
              <Coluna>Título</Coluna>
              <Coluna>Categoria</Coluna>
              <Coluna>Trilha</Coluna>
              <Coluna>Autor</Coluna>
              <Coluna>Data</Coluna>
              <Coluna className="text-right">Ações</Coluna>
            </tr>
          </thead>

          <tbody>
            {conteudos.map((conteudo, indice) => {
              const ocupado = conteudo.id === idOcupado;

              return (
                <tr
                  key={conteudo.id}
                  className={`group border-b border-accent/16 transition-colors hover:bg-accent/4 ${
                    ocupado ? 'opacity-40 pointer-events-none' : ''
                  }`}
                >
                  <td className="sw-idx text-[11px] py-4 pr-4 align-top">
                    {String(indice + 1).padStart(2, '0')}
                  </td>

                  <td className="py-4 pr-6 align-top">
                    <Link
                      href={`/conteudo/${conteudo.slug}`}
                      className="text-[13px] text-ink/85 hover:text-white transition-colors"
                    >
                      {conteudo.title}
                    </Link>

                    <span className="block mt-1 font-mono text-[10px] tracking-[0.08em] text-ink/25">
                      /{conteudo.slug}
                    </span>
                  </td>

                  <td className="py-4 pr-6 align-top font-mono text-[11px] text-ink/55 whitespace-nowrap">
                    {conteudo.categoryName}
                  </td>

                  <td className="py-4 pr-6 align-top whitespace-nowrap">
                    <span className="sw-tag">
                      {NOME_DA_TRILHA[conteudo.trilha] ?? conteudo.trilha}
                    </span>
                  </td>

                  <td className="py-4 pr-6 align-top font-mono text-[11px] text-ink/55 whitespace-nowrap">
                    {conteudo.author}
                  </td>

                  <td className="py-4 pr-6 align-top font-mono text-[11px] text-ink/40 whitespace-nowrap">
                    {conteudo.date}
                  </td>

                  <td className="py-4 align-top text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => onEditar(conteudo)}
                        className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/50 hover:text-white transition-colors"
                      >
                        <span aria-hidden="true">Editar</span>
                        <span className="sr-only">Editar {conteudo.title}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onExcluir(conteudo)}
                        className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/50 hover:text-accent transition-colors"
                      >
                        <span aria-hidden="true">Excluir</span>
                        <span className="sr-only">Excluir {conteudo.title}</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

'use client';

import React, { useEffect } from 'react';

export interface ToastProps {
  mensagem: string;
  tom: 'ok' | 'falha';
  onFechar: () => void;
  duracaoMs?: number;
}

export const Toast: React.FC<ToastProps> = ({
  mensagem,
  tom,
  onFechar,
  duracaoMs = 4000,
}) => {
  useEffect(() => {
    const timer = setTimeout(onFechar, duracaoMs);
    return () => clearTimeout(timer);
  }, [onFechar, duracaoMs]);

  const isOk = tom === 'ok';

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 max-w-md w-full px-4 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div
        className={`flex items-start gap-3 p-4 rounded-lg border backdrop-blur-md shadow-2xl transition-all ${
          isOk
            ? 'bg-black/90 border-cyan-500/50 shadow-[0_0_25px_rgba(0,240,255,0.25)] text-cyan-200'
            : 'bg-black/90 border-pink-500/50 shadow-[0_0_25px_rgba(255,46,151,0.25)] text-pink-200'
        }`}
      >
        <div className="shrink-0 mt-0.5">
          {isOk ? (
            <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>

        <div className="flex-1 space-y-0.5">
          <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
            {isOk ? 'Operação concluída' : 'Aviso do sistema'}
          </p>
          <p className="font-sans text-xs sm:text-sm text-white font-medium leading-relaxed">
            {mensagem}
          </p>
        </div>

        <button
          type="button"
          onClick={onFechar}
          className="shrink-0 p-1 text-slate-400 hover:text-white transition-colors"
          aria-label="Fechar notificação"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

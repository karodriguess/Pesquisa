import { useState } from "react";
import Button from "./Button.jsx";

const SHARE_TEXT =
  "Estou participando de uma pesquisa rápida sobre criação de conteúdo. Responde também? Leva menos de 2 minutos 💜";

function getShareUrl() {
  return window.location.origin + window.location.pathname;
}

export default function ShareButton() {
  const [showOptions, setShowOptions] = useState(false);
  const [copied, setCopied] = useState(false);

  // No celular abre a folha de compartilhamento nativa (WhatsApp, Instagram etc.).
  // Onde não houver suporte, mostra as opções manuais.
  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({ text: SHARE_TEXT, url: getShareUrl() });
        return;
      } catch (error) {
        if (error.name === "AbortError") return;
      }
    }
    setShowOptions(true);
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(`${SHARE_TEXT}\n${getShareUrl()}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt("Copie o link:", getShareUrl());
    }
  }

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    `${SHARE_TEXT}\n${getShareUrl()}`,
  )}`;

  return (
    <div>
      <Button onClick={handleShare} className="w-full sm:w-auto">
        <svg
          viewBox="0 0 20 20"
          fill="none"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path
            d="M10 12.5V3m0 0L6.5 6.5M10 3l3.5 3.5M4 10.5v4A2.5 2.5 0 0 0 6.5 17h7a2.5 2.5 0 0 0 2.5-2.5v-4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Compartilhar com um amigo
      </Button>

      {showOptions && (
        <div className="animate-fade-up mt-3 flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 flex-1 items-center justify-center rounded-2xl bg-white px-6 text-base font-semibold text-ink shadow-soft transition-all hover:text-brand active:scale-[0.98]"
          >
            Enviar no WhatsApp
          </a>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex h-14 flex-1 items-center justify-center rounded-2xl bg-white px-6 text-base font-semibold text-ink shadow-soft transition-all hover:text-brand active:scale-[0.98]"
          >
            {copied ? "Link copiado ✓" : "Copiar link (Instagram)"}
          </button>
        </div>
      )}
    </div>
  );
}

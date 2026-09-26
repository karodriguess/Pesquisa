import { useState } from "react";
import Button from "./Button.jsx";
import ShareButton from "./ShareButton.jsx";
import { saveLead } from "../lib/supabase.js";

const INSTAGRAM_HANDLE = /^[a-zA-Z0-9._]{1,30}$/;

export default function ThankYouScreen({ responseId }) {
  const [handle, setHandle] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const instagram = handle.trim().replace(/^@/, "");

    if (!INSTAGRAM_HANDLE.test(instagram)) {
      setError("Digite um @ válido do Instagram.");
      return;
    }

    setError("");
    setStatus("sending");
    try {
      await saveLead({ instagram, responseId });
      setStatus("sent");
    } catch (error) {
      console.error("Erro ao salvar Instagram:", error);
      setStatus("error");
      setError("Não foi possível enviar agora. Tente novamente.");
    }
  }

  return (
    <div className="flex flex-1 flex-col justify-center">
      <div className="animate-fade-up">
        <span className="mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-brand">
          <svg
            viewBox="0 0 20 20"
            fill="none"
            className="h-6 w-6"
            aria-hidden="true"
          >
            <path
              d="M5 10.5l3 3 7-7"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        <h1 className="text-[28px] font-semibold leading-tight tracking-tight text-ink sm:text-[36px]">
          Obrigado por dedicar seu tempo para compartilhar sua experiência.
        </h1>
      </div>

      <div
        className="animate-fade-up mt-8 rounded-2xl bg-surface p-5"
        style={{ animationDelay: "120ms" }}
      >
        {status === "sent" ? (
          <p className="animate-fade-up text-sm font-medium text-ink">
            Anotado seu interesse!
          </p>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <label
              htmlFor="instagram"
              className="mb-3 block text-sm font-medium text-ink"
            >
              Gostaria de ser informado de projetos como esse?
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-muted">
                  @
                </span>
                <input
                  id="instagram"
                  type="text"
                  autoComplete="off"
                  autoCapitalize="none"
                  autoCorrect="off"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  placeholder="seu instagram"
                  aria-invalid={Boolean(error)}
                  className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-9 pr-3 text-base text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15"
                />
              </div>
              <Button
                type="submit"
                size="sm"
                disabled={status === "sending" || !handle.trim()}
              >
                {status === "sending" ? "Enviando…" : "Enviar"}
              </Button>
            </div>
            {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
          </form>
        )}
      </div>

      <div
        className="animate-fade-up mt-4 rounded-3xl bg-surface p-6 sm:p-8"
        style={{ animationDelay: "200ms" }}
      >
        <p className="mb-5 text-base font-medium text-ink">
          Sua indicação ajuda muito a pesquisa.
        </p>
        <ShareButton />
      </div>
    </div>
  );
}

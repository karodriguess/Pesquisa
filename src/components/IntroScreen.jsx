import Button from "./Button.jsx";

export default function IntroScreen({ onStart }) {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <div className="animate-fade-up">
        <span className="relative mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-light text-brand">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-7 w-7"
            aria-hidden="true"
          >
            <rect
              x="4.5"
              y="4"
              width="15"
              height="17"
              rx="3"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <rect x="8.5" y="2.5" width="7" height="3.5" rx="1.5" fill="currentColor" />
            <path
              d="M8 11.5l1.4 1.4L12 10.3M8 16.5l1.4 1.4 2.6-2.6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 11.5h2M14 16.5h2"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-brand" />
        </span>
        <h1 className="text-[32px] font-semibold leading-tight tracking-tight text-ink sm:text-[40px]">
          Queremos entender sua experiência com criação de conteúdo hoje
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          Responda algumas perguntas rápidas para nos ajudar a entender quais
          são os maiores desafios desse processo.
        </p>
        <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm font-medium text-muted">
          <svg
            viewBox="0 0 20 20"
            fill="none"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <circle
              cx="10"
              cy="10"
              r="7.5"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <path
              d="M10 6v4l2.5 2"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
          Leva menos de 2 minutos
        </span>
      </div>

      <Button
        onClick={onStart}
        className="animate-fade-up mt-12 w-full sm:w-auto sm:self-start sm:px-10"
        style={{ animationDelay: "120ms" }}
      >
        Começar pesquisa
      </Button>
    </div>
  );
}

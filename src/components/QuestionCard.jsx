function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <path
        d="M5 10.5l3 3 7-7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function QuestionCard({ question, selected, onSelect }) {
  return (
    <fieldset>
      <legend className="mb-6 text-2xl font-semibold leading-snug tracking-tight text-ink sm:text-[28px]">
        {question.title}
      </legend>

      <div className="flex flex-col gap-3">
        {question.options.map((option, index) => {
          const isSelected = selected === option

          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(option)}
              style={{ animationDelay: `${index * 45}ms` }}
              className={`animate-fade-up flex min-h-14 w-full items-center gap-4 rounded-2xl border px-5 py-4 text-left text-[15px] font-medium transition-all duration-200 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                isSelected
                  ? 'border-brand bg-brand text-white shadow-brand'
                  : 'border-transparent bg-surface text-ink hover:border-brand/30 hover:bg-brand-light'
              }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  isSelected ? 'border-white bg-white text-brand' : 'border-gray-300 bg-white'
                }`}
              >
                {isSelected && <CheckIcon />}
              </span>
              {option}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

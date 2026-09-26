import { useEffect, useRef, useState } from 'react'
import IntroScreen from '../components/IntroScreen.jsx'
import PrivacyNote from '../components/PrivacyNote.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import QuestionCard from '../components/QuestionCard.jsx'
import ThankYouScreen from '../components/ThankYouScreen.jsx'
import { questions } from '../data/questions.js'
import { saveResponse } from '../lib/supabase.js'

const ADVANCE_DELAY_MS = 350

export default function Survey() {
  const [stage, setStage] = useState('intro') // intro | questions | done
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState('next')
  const [answers, setAnswers] = useState({})
  const [responseId, setResponseId] = useState(null)
  const advanceTimer = useRef(null)

  useEffect(() => () => clearTimeout(advanceTimer.current), [])

  const question = questions[currentIndex]
  const selected = answers[question.id]
  const isLast = currentIndex === questions.length - 1

  function goTo(index, dir) {
    setDirection(dir)
    setCurrentIndex(index)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Pequena pausa para o usuário ver a opção marcada antes de avançar.
  function handleSelect(option) {
    if (advanceTimer.current) return
    const nextAnswers = { ...answers, [question.id]: option }
    setAnswers(nextAnswers)

    advanceTimer.current = setTimeout(() => {
      advanceTimer.current = null
      if (isLast) {
        finish(nextAnswers)
      } else {
        goTo(currentIndex + 1, 'next')
      }
    }, ADVANCE_DELAY_MS)
  }

  function handleBack() {
    clearTimeout(advanceTimer.current)
    advanceTimer.current = null
    if (currentIndex === 0) {
      setStage('intro')
    } else {
      goTo(currentIndex - 1, 'prev')
    }
  }

  // A tela de agradecimento aparece imediatamente; o envio acontece em segundo plano.
  function finish(finalAnswers) {
    setStage('done')
    window.scrollTo({ top: 0 })
    saveResponse(finalAnswers)
      .then(setResponseId)
      .catch((error) => console.error('Erro ao salvar respostas:', error))
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-xl flex-col px-5 pt-[max(1.5rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-8 sm:pt-12">
      {stage === 'intro' && <IntroScreen onStart={() => setStage('questions')} />}

      {stage === 'questions' && (
        <>
          <div className="flex items-end gap-2">
            <button
              type="button"
              onClick={handleBack}
              aria-label="Voltar"
              className="-ml-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-muted transition-colors hover:bg-surface hover:text-ink focus-visible:outline-2 focus-visible:outline-brand"
            >
              <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
                <path
                  d="M12.5 15l-5-5 5-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <ProgressBar current={currentIndex + 1} total={questions.length} />
          </div>

          <div
            key={question.id}
            className={`flex-1 pt-10 pb-8 sm:pt-14 ${
              direction === 'next' ? 'animate-enter-next' : 'animate-enter-prev'
            }`}
          >
            <QuestionCard question={question} selected={selected} onSelect={handleSelect} />
          </div>
        </>
      )}

      {stage === 'done' && <ThankYouScreen responseId={responseId} />}

      {stage !== 'questions' && (
        <footer className="pt-10">
          <PrivacyNote />
        </footer>
      )}
    </main>
  )
}

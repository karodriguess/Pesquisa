import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = url && anonKey ? createClient(url, anonKey) : null

if (!supabase) {
  console.warn('Supabase não configurado: defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no .env')
}

// O id é gerado no cliente para que o lead possa referenciar a resposta
// sem precisar de permissão de leitura na tabela.
export async function saveResponse(answers) {
  const id = crypto.randomUUID()
  if (!supabase) return id

  const { error } = await supabase.from('survey_responses').insert({ id, ...answers })
  if (error) throw error
  return id
}

export async function saveLead({ instagram, responseId }) {
  if (!supabase) return

  const { error } = await supabase
    .from('interested_leads')
    .insert({ instagram, response_id: responseId })
  if (error) throw error
}

// Servidor estático para produção (Render Web Service): entrega a pasta dist/.
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

const DIST_DIR = fileURLToPath(new URL('./dist', import.meta.url))
const PORT = process.env.PORT || 3000

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
}

async function sendFile(res, filePath) {
  const body = await readFile(filePath)
  const isAsset = filePath.includes(`${join(DIST_DIR, 'assets')}`)
  res.writeHead(200, {
    'Content-Type': MIME_TYPES[extname(filePath)] || 'application/octet-stream',
    // Arquivos em assets/ têm hash no nome, então podem ficar em cache para sempre.
    'Cache-Control': isAsset ? 'public, max-age=31536000, immutable' : 'no-cache',
  })
  res.end(body)
}

createServer(async (req, res) => {
  const { pathname } = new URL(req.url, 'http://localhost')
  const filePath = normalize(join(DIST_DIR, decodeURIComponent(pathname)))

  if (!filePath.startsWith(DIST_DIR)) {
    res.writeHead(403).end()
    return
  }

  try {
    await sendFile(res, filePath)
  } catch {
    // Qualquer rota desconhecida cai na página da pesquisa.
    await sendFile(res, join(DIST_DIR, 'index.html'))
  }
}).listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})

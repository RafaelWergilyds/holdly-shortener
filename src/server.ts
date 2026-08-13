import app from './app.ts'
import 'dotenv/config'
import { syncClicks } from './jobs/syncClicks.ts'


const PORT = process.env.PORT || 3000

app
  .listen({
    port: Number(PORT),
    host: '0.0.0.0',
  })
  .then(() => {
    console.log(`Server is running on port ${PORT}`)
  })

setInterval(() => {
  syncClicks().catch((err: Error) => console.error('Error synchronizing clicks:', err))
}, 60_000)

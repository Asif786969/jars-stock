import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/alarms':'http://localhost:9041',
      '/refresh':'http://localhost:9131',
      '/symbol':'http://localhost:9131',
      '/stocks':'http://localhost:3000'
    }
  }
})

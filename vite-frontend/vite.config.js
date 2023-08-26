import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      '/alarms':'http://localhost:9041',
      '/refresh':'http://localhost:9131',
      '/stocks':'http://localhost:3000',
      '/symbol':'http://localhost:9131',
      '/highbuy':'http://localhost:9041',
      '/crossrsi':'http://localhost:9041',
      

      
    }
  }
})

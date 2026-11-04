import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages project site: https://tuankiet161027-art.github.io/kevinn-workbench-/
// The trailing "-" is part of the repo name. If the repo is renamed, change REPO
// (or build with VITE_BASE=/new-name/). For a custom domain (CNAME), use '/'.
const REPO = 'kevinn-workbench-'

export default defineConfig({
  base: process.env.VITE_BASE ?? `/${REPO}/`,
  plugins: [react(), tailwindcss()],
})

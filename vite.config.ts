import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const ROUTES = ['/', '/about', '/services', '/how-it-works', '/track', '/contact']

// Emits sitemap.xml and robots.txt into dist using VITE_SITE_URL.
function seoFiles(siteUrl: string): Plugin {
  return {
    name: 'royaljet-seo-files',
    apply: 'build',
    closeBundle() {
      const base = siteUrl.replace(/\/$/, '')
      const today = new Date().toISOString().slice(0, 10)
      const urls = ROUTES.map(
        (r) => `  <url><loc>${base}${r}</loc><lastmod>${today}</lastmod><priority>${r === '/' ? '1.0' : '0.8'}</priority></url>`,
      ).join('\n')
      writeFileSync(
        resolve('dist/sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      )
      writeFileSync(resolve('dist/robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`)
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = env.VITE_SITE_URL || 'https://royaljetshipping.com'
  return {
    plugins: [
      react(),
      tailwindcss(),
      seoFiles(siteUrl),
      {
        name: 'royaljet-site-url',
        transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', siteUrl.replace(/\/$/, '')),
      },
    ],
    build: {
      target: 'es2020',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/framer-motion') || id.includes('node_modules/motion')) return 'motion'
          },
        },
      },
    },
  }
})

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

/**
 * Inline the built stylesheet into index.html so the first paint doesn't wait on a
 * separate render-blocking CSS request. The .css file is still emitted as a fallback.
 */
function inlineCss(): Plugin {
  return {
    name: 'inline-css',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.bundle) return html;
        let out = html;
        for (const file of Object.values(ctx.bundle)) {
          if (file.type !== 'asset' || !file.fileName.endsWith('.css')) continue;
          const escaped = file.fileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const tag = new RegExp(`<link[^>]*rel="stylesheet"[^>]*href="[^"]*${escaped}"[^>]*>`);
          const css = typeof file.source === 'string' ? file.source : new TextDecoder().decode(file.source);
          out = out.replace(tag, () => `<style>${css}</style>`);
        }
        return out;
      },
    },
  };
}

/**
 * The Site chunk is loaded with a dynamic import, which Vite doesn't preload. Add
 * <link rel="modulepreload"> tags for it (and its imports) so it downloads in parallel
 * with the entry script instead of after it.
 */
function preloadSiteChunk(): Plugin {
  return {
    name: 'preload-site-chunk',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.bundle) return html;
        const chunks = Object.values(ctx.bundle).filter((f) => f.type === 'chunk');
        const site = chunks.find((c) => c.type === 'chunk' && c.facadeModuleId?.endsWith('/src/Site.tsx'));
        if (!site || site.type !== 'chunk') return html;
        const entry = chunks.find((c) => c.type === 'chunk' && c.isEntry);
        const already = new Set(entry && entry.type === 'chunk' ? [entry.fileName, ...entry.imports] : []);
        const files = [site.fileName, ...site.imports].filter((f) => !already.has(f));
        const tags = files.map((f) => `<link rel="modulepreload" crossorigin href="/${f}">`).join('');
        return html.replace('</head>', `${tags}</head>`);
      },
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), inlineCss(), preloadSiteChunk()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify — file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

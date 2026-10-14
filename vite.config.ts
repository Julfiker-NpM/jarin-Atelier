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

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), inlineCss()],
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

// @ts-check
import { defineConfig } from 'astro/config';
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Build URL → lastmod map from blog post frontmatter
const blogDir = join(__dirname, 'src/content/blog');
const urlLastmod = {};
for (const file of readdirSync(blogDir).filter(f => f.endsWith('.md'))) {
  const content = readFileSync(join(blogDir, file), 'utf-8');
  const fm = content.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) continue;
  const slugMatch = fm[1].match(/^slug:\s*["']?([^"'\n]+)["']?$/m);
  const dateMatch = fm[1].match(/^pubDate:\s*(\d{4}-\d{2}-\d{2})/m);
  if (slugMatch && dateMatch) {
    const url = `https://celestea.xyz/blog/${slugMatch[1].trim()}/`;
    urlLastmod[url] = new Date(dateMatch[1]).toISOString();
  }
}

// https://astro.build/config
export default defineConfig({
  site: 'https://celestea.xyz',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    sitemap({
      serialize(item) {
        item.lastmod = urlLastmod[item.url] ?? new Date().toISOString();
        return item;
      }
    })
  ]
});
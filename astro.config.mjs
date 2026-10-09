import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
export default defineConfig({site:'https://angidalat.pages.dev',output:'static',trailingSlash:'always',integrations:[sitemap()]});

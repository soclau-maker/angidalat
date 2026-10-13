import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
test('display typography ships a Vietnamese font instead of relying on system fonts',()=>{
 const css=readFileSync(new URL('../src/styles/global.css',import.meta.url),'utf8');
 const layout=readFileSync(new URL('../src/layouts/Layout.astro',import.meta.url),'utf8');
 assert.match(css,/--display:'Lora'/);
 for(const variant of ['400','500','400-italic']) assert.ok(layout.includes(`@fontsource/lora/${variant}.css`),`Missing ${variant}`);
});

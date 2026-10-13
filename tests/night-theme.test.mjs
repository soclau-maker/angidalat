import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
test('night theme covers page, cards and form controls',()=>{
 const css=readFileSync('src/styles/night.css','utf8');
 assert.match(css,/color-scheme:dark/);
 assert.match(css,/\.dish-card/);
 assert.match(css,/\.search input/);
 assert.match(readFileSync('src/layouts/Layout.astro','utf8'),/night\.css/);
});

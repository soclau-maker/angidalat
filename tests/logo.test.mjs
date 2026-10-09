import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
test('header uses a named SVG logo with accessible home link',()=>{
 const p='public/images/logo-angidalat.svg';
 assert.ok(existsSync(p),'Brand logo SVG missing');
 const svg=readFileSync(p,'utf8');
 assert.match(svg,/viewBox="0 0 280 72"/);
 assert.match(svg,/Ăn gì ở Đà Lạt/);
 const layout=readFileSync('src/layouts/Layout.astro','utf8');
 assert.match(layout,/src="\/images\/logo-angidalat.svg"/);
 assert.match(layout,/aria-label="Ăn gì ở Đà Lạt — Trang chủ"/);
});

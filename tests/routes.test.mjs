import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
const routes=['','mon/nem-nuong/','mon/mi-quang/','mon/bun-bo/','quan/nem-nuong-ba-hung/','quan/mi-quang-xi/','quan/bun-bo-hong/'];
for(const route of routes) test(`static route /${route}`,()=>{
 const path=`dist/${route}index.html`;
 assert.ok(existsSync(path), `Missing generated route: ${path}`);
 const html=readFileSync(path,'utf8');
 assert.match(html,/<html lang="vi"/);
 assert.ok(html.includes(`https://angidalat.pages.dev/${route}`));
 assert.match(html,/minh họa/);
 assert.match(html,/Chưa xác minh/);
});
test('SEO files and custom 404 exist',()=>{
 for(const path of ['dist/404.html','dist/robots.txt','dist/sitemap-index.xml','dist/sitemap-0.xml']) assert.ok(existsSync(path),`Missing ${path}`);
});

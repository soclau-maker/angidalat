import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
test('pages omit provenance blocks and homepage image/Maps disclaimer',()=>{
 for(const path of ['src/pages/index.astro','src/pages/mon/[slug].astro','src/pages/quan/[slug].astro']) assert.ok(!readFileSync(path,'utf8').includes('<Provenance/>'));
 assert.ok(!readFileSync('src/pages/index.astro','utf8').includes('Hình ảnh được tạo bằng AI để minh họa món ăn;'));
});


import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
test('photos and background do not display illustration captions',()=>{
 const source=readFileSync(new URL('../src/components/FoodImage.astro',import.meta.url),'utf8');
 const home=readFileSync(new URL('../src/pages/index.astro',import.meta.url),'utf8');
 assert.ok(!source.includes('<figcaption>'));
 assert.ok(!home.includes('class="background-credit"'));
});

import test from 'node:test';
import assert from 'node:assert/strict';
const catalog = await import('../src/data/catalog.mjs').catch(() => ({}));
test('catalog contains the three requested dishes', () => {
 assert.deepEqual(catalog.dishes?.map(d=>d.slug), ['nem-nuong','mi-quang','bun-bo']);
});
test('search ignores Vietnamese accents, case and surrounding spaces', () => {
 assert.equal(typeof catalog.searchDishes, 'function');
 assert.deepEqual(catalog.searchDishes('  MI QUANG ').map(d=>d.slug), ['mi-quang']);
 assert.deepEqual(catalog.searchDishes('ĐÀ LẠT').map(d=>d.slug), ['nem-nuong','mi-quang','bun-bo']);
});
test('search matches restaurant and address and empty query', () => {
 assert.equal(typeof catalog.searchDishes, 'function');
 assert.deepEqual(catalog.searchDishes('ba hung').map(d=>d.slug), ['nem-nuong']);
 assert.deepEqual(catalog.searchDishes('mac dinh chi').map(d=>d.slug), ['mi-quang']);
 assert.equal(catalog.searchDishes('').length, 3);
 assert.equal(catalog.searchDishes('pizza').length, 0);
});
test('category filtering combines with search', () => {
 assert.equal(typeof catalog.searchDishes, 'function');
 assert.equal(catalog.searchDishes('', 'mon-nuoc').length, 2);
 assert.equal(catalog.searchDishes('nem', 'mon-nuoc').length, 0);
});
test('restaurants preserve unknown facts and encode Maps search, not a pin', () => {
 assert.equal(catalog.restaurants?.length, 3);
 for (const r of catalog.restaurants) {
  assert.equal(r.verified, false);
  assert.equal(r.hours, null); assert.equal(r.price, null);
  const url = new URL(catalog.mapsSearchUrl(r));
  assert.equal(url.pathname, '/maps/search/');
  assert.equal(url.searchParams.get('query'), `${r.name}, ${r.address}, Đà Lạt`);
 }
 assert.equal(catalog.restaurants[0].address,'328 Phan Đình Phùng');
 assert.equal(catalog.restaurants[1].houseNumber, null);
 assert.equal(catalog.restaurants[2].houseNumber, null);
});

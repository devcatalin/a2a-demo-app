const request = require('supertest');
const app = require('../src/app');

const total = body => request(app).post('/cart/total').send(body);

describe('discounts', () => {
  test('a sale item is 10% off', async () => {
    const res = await total({ items: [{ price: 10000, qty: 1, onSale: true }] });
    expect(res.body.total).toBe(9000);
  });

  test('coupon SAVE10 takes 10% off a full-price item', async () => {
    const res = await total({ items: [{ price: 10000, qty: 1 }], coupon: 'SAVE10' });
    expect(res.body.total).toBe(9000);
  });

  test('coupon codes are not case sensitive', async () => {
    const res = await total({ items: [{ price: 10000, qty: 1 }], coupon: 'save20' });
    expect(res.body.total).toBe(8000);
  });

  test('an unknown coupon is refused', async () => {
    const res = await total({ items: [{ price: 10000, qty: 1 }], coupon: 'FREESTUFF' });
    expect(res.status).toBe(400);
  });

  test('a coupon on a sale item does not stack: the larger discount wins', async () => {
    const res = await total({ items: [{ price: 10000, qty: 1, onSale: true }], coupon: 'SAVE10' });
    expect(res.body.total).toBe(9000);
  });

  test('SAVE20 beats the sale on a sale item', async () => {
    const res = await total({ items: [{ price: 10000, qty: 1, onSale: true }], coupon: 'SAVE20' });
    expect(res.body.total).toBe(8000);
  });

  test('a mixed cart with a coupon', async () => {
    const res = await total({
      items: [{ price: 10000, qty: 1, onSale: true }, { price: 5000, qty: 2 }],
      coupon: 'SAVE10',
    });
    expect(res.body.total).toBe(18000);
  });
});

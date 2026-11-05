const request = require('supertest');
const app = require('../src/app');

const total = body => request(app).post('/cart/total').send(body);

describe('cart totals', () => {
  test('health check answers', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });

  test('a single item at full price', async () => {
    const res = await total({ items: [{ price: 2500, qty: 1 }] });
    expect(res.body.total).toBe(2500);
  });

  test('quantities multiply', async () => {
    const res = await total({ items: [{ price: 1200, qty: 3 }] });
    expect(res.body.total).toBe(3600);
  });

  test('several items add up', async () => {
    const res = await total({ items: [{ price: 1000, qty: 2 }, { price: 499, qty: 1 }] });
    expect(res.body.total).toBe(2499);
  });

  test('an empty cart is refused', async () => {
    const res = await total({ items: [] });
    expect(res.status).toBe(400);
  });

  test('a quantity of zero is refused', async () => {
    const res = await total({ items: [{ price: 1000, qty: 0 }] });
    expect(res.status).toBe(400);
  });

  test('a negative price is refused', async () => {
    const res = await total({ items: [{ price: -5, qty: 1 }] });
    expect(res.status).toBe(400);
  });
});

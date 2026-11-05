const express = require('express');
const { cartTotal } = require('./pricing');

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));

app.post('/cart/total', (req, res) => {
  try {
    res.json(cartTotal(req.body.items, { coupon: req.body.coupon }));
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

module.exports = app;

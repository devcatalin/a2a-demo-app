// Prices are in cents to avoid floating-point rounding.
const SALE_RATE = 0.1;

const COUPONS = {
  SAVE10: 0.1,
  SAVE20: 0.2,
};

/**
 * The price of one line: a sale and a coupon never stack on the same item;
 * the item gets whichever discount is larger.
 */
function linePrice(item, couponRate) {
  const base = item.price * item.qty;
  const saleRate = item.onSale ? SALE_RATE : 0;
  const rate = Math.max(saleRate, couponRate);
  return Math.round(base * (1 - rate));
}

function couponRate(code) {
  if (!code) return 0;
  const rate = COUPONS[code.toUpperCase()];
  if (rate === undefined) {
    const err = new Error(`Unknown coupon: ${code}`);
    err.status = 400;
    throw err;
  }
  return rate;
}

function cartTotal(items, { coupon } = {}) {
  if (!Array.isArray(items) || items.length === 0) {
    const err = new Error('The cart is empty');
    err.status = 400;
    throw err;
  }
  for (const item of items) {
    if (!Number.isInteger(item.price) || item.price < 0 || !Number.isInteger(item.qty) || item.qty < 1) {
      const err = new Error('Each item needs a price (cents) and a quantity of at least 1');
      err.status = 400;
      throw err;
    }
  }
  const rate = couponRate(coupon);
  const total = items.reduce((sum, item) => sum + linePrice(item, rate), 0);
  return { total };
}

module.exports = { cartTotal, linePrice, couponRate, SALE_RATE, COUPONS };

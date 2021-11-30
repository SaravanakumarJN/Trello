const Decimal = require("decimal.js");

function getMean(prev_position, next_poistion) {
  const x = new Decimal(prev_position);
  const y = new Decimal(next_poistion);

  const sum = x.plus(y);
  const avg = sum.dividedBy(2);

  return avg;
}

function getFirst(next_poistion) {
  const x = new Decimal(next_poistion);
  const y = new Decimal(1);

  const first = x.minus(y);
  return first;
}

function getLast(prev_position) {
  const x = new Decimal(prev_position);
  const y = new Decimal(1);

  const last = x.plus(y);
  return last;
}

module.exports = { getMean, getFirst, getLast };

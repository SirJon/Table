const { faker } = require("@faker-js/faker");

function createRandomData() {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    quantity: faker.finance.amount(0, 1000, 0),
    deliveryDate: faker.date.anytime(),
    price: faker.commerce.price({ min: 20, max: 100000, dec: 0 }),
    currency: Math.random() > 0.5 ? "USD" : "RUS",
  };
}

module.exports = () => {
  const documents1 = faker.helpers.multiple(createRandomData, {
    count: 10,
  });
  const documents2 = faker.helpers.multiple(createRandomData, {
    count: 10,
  });
  return { documents1, documents2 };
};

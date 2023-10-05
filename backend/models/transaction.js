let {connection: db} = require('../db');
let Fruits = require('./fruits');

module.exports = {
  async getTransactions() {
    const transactionsQuery = `SELECT * FROM transactions`;

    return Promise.all([
      db.promise()
        .query(transactionsQuery)
        .then(([rows]) => rows),
    ]);
  },
  async storeTransaction(order) {
    let total = 0;
    let itemsBought = [];

    const [fruitsList] = await Fruits.getFruits();
    const items = order.split('and ');
    for (let item of items) {
      let [fruit, quantity] = item.split(' ');
      quantity = parseFloat(quantity.replace(/\D/g, ''));
      let [{price, remaining_quantity}] = fruitsList.filter(x => x.fruit.toLowerCase() === fruit.toLowerCase());
      total += quantity * price;

      remaining_quantity -= quantity;
      if (remaining_quantity < 0) throw new Error("Not enough quantity available for the selected fruit: " + fruit);

      if (quantity > 0) {
        await Fruits.updateFruits(remaining_quantity, fruit);
        itemsBought.push({ fruit, quantity, price })
      }
    }

    const transactionQuery = `INSERT INTO transactions (items_bought, total) VALUES ('${JSON.stringify(itemsBought)}', ${total})`;

    return Promise.all([
      db.promise()
        .query(transactionQuery)
        .then(([rows]) => rows),
    ]);
  },
}
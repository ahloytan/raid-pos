let {connection: db} = require('../db');


module.exports = {
  async getFruits() {
    const fruitsQuery = `SELECT * FROM fruits`;

    return Promise.all([
      db.promise()
        .query(fruitsQuery)
        .then(([rows]) => rows),
    ]);
  },
  async updateFruits(quantity, fruit) {
    const fruitsQuery = `UPDATE fruits SET remaining_quantity=? WHERE fruit=?`;
    return Promise.all([
      db.promise()
        .query(fruitsQuery, [quantity, fruit])
        .then(([rows]) => rows),
    ]);
  },
}
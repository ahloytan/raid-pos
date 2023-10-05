let express = require('express');
let Transaction = require('../../models/transaction');
let router = express.Router();

router.get('/list', async function (req, res, next) {
  try {
    let [transactions] = await Transaction.getTransactions();
    res.json({ transactions });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post('/buy', async function (req, res, next) {
  try {
    const {order} = req.body;
    console.log('WTF ', req.body)
    let [transactions] = await Transaction.storeTransaction(order);
    res.json({ transactions });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

  
module.exports = router;
let express = require('express');
let Fruits = require('../../models/fruits');
let router = express.Router();

router.get('/list', async function (req, res, next) {
    try {
      let [fruits] = await Fruits.getFruits();
      res.json({ fruits });
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

  
module.exports = router;
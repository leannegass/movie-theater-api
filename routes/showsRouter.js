const express = require("express");
const { Router} = require("express");
const { Show, User } = require('../models/index');
const {check, validationResult } = require('express-validator');


const router = Router();

// define middleware 
router.use(express.json());
router.use(express.urlencoded({extended : true}));
// Get all shows

// async function findUser(id) {
//     // Write queries here
//     const user = await User.findByPk(id);
//     // const payments = await order.getPayments();
//     return user;  
// }
// console.log(findUser(1))

router.get('/', async (req, res, next) => {
    try {
      const shows = await Show.findAll();
      res.json(shows);
    } catch (error) {
      next(error);
    }
  });

// Get one show
router.get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;

      const show = await Show.findByPk(id);
      if (!show) {
        return res.status(404).json({ error: 'Show not found' });
      }

      res.json(show);
    } catch (error) {
      next(error);
    }
  });


router.get('/genres/:genre', async(req, res, next) => { 
    try {
        const { genre } = req.params;
        const showsAtGenre = await Show.findAll({where: {genre: genre}});
        if (showsAtGenre.length > 0) {
            res.json(showsAtGenre);
        } else {
            res.status(404);
        }
    } catch (error) {
        next(error);
    }
});

router.put('/:id/rating', [check('rating').not().isEmpty()
  .withMessage(`Rating should not be empty`)],
  async(req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
          res.status(400).json({ errors : errors.array()})
        }
        const { id } = req.params;
        const { rating } = req.body;
        const show = await Show.findByPk(id);
        if (!show) {
            return res.status(404).json({ error: 'Show not found' });
        }
        show.rating = rating;
        await show.save();
        res.json(show);
    } catch (error) {
        next(error);
    }
});

router.put('/:id/status', [check('status').isLength({min : 5, max : 25})
  .withMessage(`Status should be 5 to 25 characters`)], 
  async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      res.status(400).json({ errors : errors.array()})
    }
    const { id } = req.params;
    const { status } = req.body;
    // console.log(status)
    const show = await Show.findByPk(id);
    if (!show) {
      return res.status(404).json({ error: 'Show not found' });
    }

    show.status = status;
    await show.save();

    res.json(show);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;

      const show = await Show.findByPk(id);
      if (!show) {
        return res.status(404).json({ error: 'Show not found' });
      }

      await show.destroy();

      res.json({ message: 'Show deleted successfully' });
    } catch (error) {
      next(error);
    }
  });

//exports
module.exports = router;
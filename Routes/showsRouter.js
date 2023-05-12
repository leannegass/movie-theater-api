// code to get all shows
router.get('/shows', async (req, res, next) => {
    try {
      const shows = await Show.findAll();
      res.json(shows);
    } catch (error) {
      next(error);
    }
  });
  
// Get one show
router.get('/shows/:id', async (req, res, next) => {
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
  

router.get('/shows/genre/:genre', async(req, res, next) => { 
    try {
        const { genre } = req.params;
        const showsAtGenre = await Show.findAll({where: {genre: genre}});
        if (showsAtGenre.length > 0) {
            res.json(showsAtGenre);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        next(error);
    }
});

router.put('/shows/:id/rating', async(req, res, next) => {
    try {
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

router.put('/shows/:id/status', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

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

router.delete('/shows/:id', async (req, res, next) => {
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

  module.exports = router;
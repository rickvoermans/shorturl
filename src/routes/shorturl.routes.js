const router = require('express').Router();
const { nanoid } = require('nanoid');
const ShortUrl = require('../models/url-entry.model');

// Get all the shortened urls:
router.get('/', (req, res, next) => {
    ShortUrl.find({})
        .then((urls) => {
            res.status(200).json(urls);
        })
        .catch((error) => {
            next(error);
        });
});

// Get specific shorturl and redirect to page:
router.get('/:id', (req, res, next) => {
    ShortUrl.findOne({ slug: req.params.id })
        .then((url) => {
            res.redirect(url.url);
        })
        .catch((error) => {
            next(error);
        });
});

// Create shorturl:
router.post('/', (req, res, next) => {
    if (req.body.slug === undefined) {
        req.body.slug = nanoid(5);
    }    

    const shorturl = new ShortUrl(req.body);

    shorturl.save()
        .then((url) => {
            res.status(200).send(url);
        })
        .catch((error) => {
            if (error.code === 11000) {
                res.status(409);
            }
            
            next(error);
        });
});

// Delete all shorturls:
router.delete('/', (req, res, next) => {

});

// Delete specific shorturl:
router.delete('/{id}', (req, res, next) => {

});

module.exports = router;
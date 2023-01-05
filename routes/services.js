const router = require('express').Router();
const Service = require('../models/Service');
const User = require('../models/User');

// Create a Service
router.post('/', async (req, res) => {
    const newService = new Service(req.body);
    try {
        const savedService = await newService.save();
        res.status(200).json(savedService);
    }
    catch (err) {
        res.status(500).json(err);
    }
});


// Update a Service

router.put('/:slug', async (req, res) => {
    try {  
        const service = await Service.findOne({ slug: req.params.slug });
        if (service.userId === req.body.userId) {
            await service.updateOne ({ $set: req.body });
            res.status(200).json("The Service has been updated");
        }
        else {
            res.status(403).json("You can update only your Service");
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
} );




// Delete a Service

router.delete('/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (service.userId === req.body.userId) {
            await service.deleteOne();
            res.status(200).json("The Service has been deleted");
        }
        else {
            res.status(403).json("You can delete only your Service");
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
} );

// Get a Service by slug

router.get('/:slug', async (req, res) => {
    try {
        const service = await Service.findOne({ slug: req.params.slug });
        res.status(200).json(service);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

// Get all Services

router.get('/', async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let services;
        if (username) {
            services = await Service.find({ username });
        }
        else if (catName) {
            services = await Service.find({ categories: { $in: [catName] } });
        }
        else {
            services = await Service.find();
        }
        res.status(200).json(services);
    }
    catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
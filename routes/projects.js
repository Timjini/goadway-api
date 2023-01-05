const router = require('express').Router();
const Project = require('../models/Project');

router.post('/', async (req, res) => {
    const newProject = new Project(req.body);
    try {
        const savedProject = await newProject.save();
        res.status(200).json(savedProject);
    }
    catch (err) {
        res.status(500).json(err);
    }
} );

router.get ('/', async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    }
    catch (err) {
        res.status(500).json(err);
    }
} );

router.get('/:slug', async (req, res) => {
    try {
        const project = await Project.findOne({ slug: req.params.slug });
        res.status(200).json(project);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
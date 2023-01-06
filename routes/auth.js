const router = require('express').Router();
const bcrypt = require('bcrypt');

const User = require('../models/User');

router.post('/register', async (req, res) => {
    
        // Check if user already exists
        const emailExists = await User .findOne({
            email: req.body.email
        });
        if (emailExists) return res.status(400).send('Email already exists');
    
        // Create new user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User ({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        try {
            const user = await newUser.save();
            res.status(200).json("User created");
            res.status(500).json(err);
        }
        catch (err) {
            res.status(400).send(err);
        }
    });

router.post('/login', async (req, res) => {
    // Check if user exists
    const user
        = await User .findOne({
            username: req.body.username
        });
    if (!user) return res.status(400).send('username or password is wrong');

    // Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');

    res.send(user);

});



module.exports = router;
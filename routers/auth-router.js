const router = require('express').Router();
const Users = require('../db-config.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/register', (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;
    Users.add(user)
        .then(us => {
            res.status(201).json(us);
        })
        .catch(err => {
            res.status(500).json({  message:'Failed to register the user' })
        });
})


router.post('/login', (req, res) => {
    let { username, password } = req.body;
    
    Users.findBy({ username })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)){
                const token = generateToken(user);

                res.status(200).json({ 
                    message:`welcome ${user.username}`,
                    token
                });
            }else {
                res.status(401).json({ message: 'Invalid Credentials'});
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});



function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
    };
    const secret = 'audslkesodklgosa;w/ee.sdisitjserk';
    const options = {
        expiresIn: '8h'
    };
    return jwt.sign(payload, secret, options)
}



module.exports = router;
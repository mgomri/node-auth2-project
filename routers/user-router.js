const router = require('express').Router();
const Users = require('../db-config');
const restricted = require('../middleware/restricted.js');


router.get('/', restricted, (req, res) => {
    Users.find()
        .then(us => {
            res.status(200).json(us);
        })
        .catch(err => {
            res.status(500).json({
                message: 'Failed to retrieve the user list'
            })
        });
});

router.delete('/:id', (req, res) => {
    let { id } = req.params
    Users.remove(id)
    .then(del => {
        if(del){
            res.json({ removed: del })
        }else{
            res.status(404).json({ message: 'NO such user is found'})
        };
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to delete the user'})
    });
});


module.exports = router;
const express = require('express')
const router = express.Router()

/*
- get all
- get one (id)
- update (id)
- add (task)
- delete (id)
*/

//get all
router.get('/', (req, res) => {
    res.send("Hello Hello!")
})

//get one
router.get('/:id', (req, res) => {
    
})

//update
router.patch('/:id', (req, res) => {
    
})

//create
router.post('/', (req, res) => {
    
})

//create
router.delete('/:id', (req, res) => {
    
})
module.exports = router
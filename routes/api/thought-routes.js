const router = require('express').Router();

const {
    getAllThought,
    getThoughtById,
    addThought,
    updateThought,
    deleteThought
} = require('../../controllers/thought-controller');

// set up GET all at api/Thoughts
router
    .route('/')
    .get(getAllThought);

// set up GET one, and PUT at /api/Thoughts/:id
router  
    .route('/:id')
    .put(updateThought)
    .get(getThoughtById);

// set up DELETE at api/thoughts/:userId/:thoughtId
router
    .route('/:userId/:thoughtId')
    .delete(deleteThought);

// set up POST at api/Thoughts/:userId
router
    .route('/:userId')
    .post(addThought);


module.exports = router;
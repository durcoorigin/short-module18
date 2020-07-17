const router = require('express').Router();

const {
    getAllThought,
    getThoughtById,
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
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

// set up DELETE comments and PUT (add) reaction at api/thoughts/:userId/:thoughtId
router
    .route('/:userId/:thoughtId')
    .put(addReaction)
    .delete(deleteThought);

// set up POST at api/thoughts/:userId
router
    .route('/:userId')
    .post(addThought);

// set up DELETE for reactions
router
    .route('/:userId/:thoughtId/:reactionId')
    .delete(removeReaction);P

module.exports = router;
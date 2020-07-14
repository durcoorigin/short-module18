const { Thoughts } = require('../models');

const thoughtController = {
    // get a thought
    getAllThought(req, res) {
        Thoughts.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // get one Thought by id
    getThoughtById({ params }, res) {
    Thoughts.findOne({ _id:params.id })
    .then(dbThoughtData => {
        // if no Thought is found, send 404
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thoughts found with this id!'});
            return;
        }
        res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        });
    },

    // Create Thought
    addThought({ params, body }, res) {
        console.log(body);
        Thoughts.create(body)
          .then(({ _id }) => {
            return User.findOneAndUpdate(
              { _id: params.userId },
              { $push: { thoughts: _id } },
              { new: true }
            );
          })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
    },

    // update Thought by id
    updateThought({ params, body }, res) {
        Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true})
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thoughts found with this id!'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    // Delete Thought
    deleteThought({ params }, res) {
        thoughts.findOneAndDelete({ _id: params.thoughtId })
        .then(deletedThought => {
          if (!deletedThought) {
            return res.status(404).json({ message: 'No thought with this id!' });
          }
          return User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { Thoughts: params.thoughtId } },
            { new: true }
          );
        })
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController;
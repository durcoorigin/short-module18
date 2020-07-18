const { User } = require('../models');

const userController = {
    // get all da users
    getAllUser(req, res) {
        User.find({})
        .populate({
            path: 'Thought',
            select: '-_v'
        })
        .select('-_v')
        .sort(({ _id: -1 }))
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // get one user by id
    getUserById({ params }, res) {
    User.findOne({ _id:params.id })
    .populate({
        path: 'thought',
        select: '-_v'
    })
    .select('-_v')
    .then(dbUserData => {
        // if no user is found, send 404
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!'});
            return;
        }
        res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        });
    },

    // Create user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    // add friends
    addFriend({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    // update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true})
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // Delete User
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then (dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with that id!'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));            
    },

    // delete friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },
};

module.exports = userController;
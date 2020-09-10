const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((data) => res.status(200).send(data))
    .catch((error) => {
      if (error.message) {
        res.status(400).send({ message: error.message });
        return;
      }
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const getProfile = (req, res) => {
  User.findById(req.params.id)
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((error) => {
      if (error.message === 'NotValidId') {
        res.status(404).send({ message: 'Пользователя нет в базе' });
      }
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const createProfile = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((error) => {
      if (error.message) {
        res.status(400).send({ message: error.message });
        return;
      }
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      }
      res.status(404).send({ message: 'Нет пользователя с таким id' });
    })
    .catch((error) => {
      if (error.message) {
        res.status(400).send({ message: error.message });
        return;
      }
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const updateAvatarProfile = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      }
      res.status(404).send({ message: 'Нет пользователя с таким id' });
    })
    .catch((error) => {
      if (error.message) {
        res.status(400).send({ message: error.message });
        return;
      }
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports = {
  getUsers, getProfile, createProfile, updateProfile, updateAvatarProfile,
};

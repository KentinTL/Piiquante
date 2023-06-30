const User = require('../models/User')
const bcrypt = require('bcrypt')

exports.signup = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User ({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ mesage: 'Utilisateur créé (°o°)'}))
        .catch(error => res.status(400).json({ error: error }))
    })
    .catch(error => res.status(500).json({error: error}))
};

exports.login = (req, res) => {
  User.findOne({email: req.body.email})
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: 'Paire identifiant/mot de passe incorrect' });
      } else {
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ message: 'Paire identifiant/mot de passe incorrect' });
            } else {
              return res.status(200).json({
                userId: user._id,
                token: 'TOKEN'
              });
            }
          })
          .catch(error => {
            res.status(500).json({ error: error });
          })
      }
    })
    .catch(error => {
      res.status(500).json({ error: error });
    })
};
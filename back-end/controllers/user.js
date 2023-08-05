const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// On créer un nouvel utilisateur
exports.signup = (req, res) => {
  // Ici on crypte le mot de passe grasse à l'addon bcrypt de mongoose
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      // on récupère le mail et le mots de passe hash dans une variable 
      const user = new User ({
        email: req.body.email,
        password: hash
      });
      // Ici on sauvegarde le nouvel utilisateur dans la base de données
      user.save()
        .then(() => res.status(201).json({ mesage: 'Utilisateur créé (°o°)'}))
        .catch(error => res.status(400).json({ error: error }))
    })
    .catch(error => res.status(500).json({error: error}))
};

// On créer la fonction login
exports.login = (req, res) => {
  // On vient rechercher a l'aide de FindOne si l'email entré existe bien
  User.findOne({email: req.body.email})
    .then(user => {
      if (!user) {
        // Si pas de résultat on renvoie un message volontairement flou pour ne pas donner d'informations à un éventuel pirate
        return res.status(401).json({ message: 'Paire identifiant/mot de passe incorrect' });
      } else {
        // Si email reconnu alors on compare le hash du mot de passe que l'utilisateur a rentré a celui correspondant dans notre BDD
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
            // Si pas de résultat on renvoie un message volontairement flou pour ne pas donner d'informations à un éventuel pirate
              return res.status(401).json({ message: 'Paire identifiant/mot de passe incorrect' });
            } else {
              // Si informations sont correctement entrées alors on créer un Token d'identification de 24h en rapport avec l'id de l'utilisateur
              return res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                  {userId: user._id},
                  'RANDOM_TOKEN_SECRET',
                  {expiresIn: '24h'}
                )
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
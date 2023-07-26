const Sauce = require('../models/Sauce');
const fs = require('fs');

// Création d'une nouvelle Sauce
exports.createSauce =  (req, res) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject._userId;
    const sauce = new Sauce({
      ...sauceObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
      .then(() => res.status(201).json({ message: "Sauce bien ajoutée"}))
      .catch(error => res.status(400).json({ error: error }));
};

// Modification d'une sauce
exports.modifySauce =  (req, res) => {
  const sauceObject = req.file ? {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };

  delete sauceObject._userId;
  Sauce.findOne({_id: req.params.id})
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {//Si l'id de l'utilisateur n'est pas celui qui a créé la sauce il n'est pas autorisé
          res.status(401).json({ message : 'Not authorized'});
      } else {//Sinon on autorise la modification de la sauce ainsi que l'image qui lui est liée
          Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
          .then(() => res.status(200).json({message : 'Objet modifié!'}))
          .catch(error => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// Supprimer une Sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id})
    .then(sauce => {
        if (sauce.userId != req.auth.userId) { //Si l'id de l'utilisateur n'est pas celui qui a créé la sauce il n'est pas autorisé
          res.status(401).json({message: 'Not authorized'});
        } else {//Sinon on supprime la sauce ainsi que l'image qui lui est liée
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
              Sauce.deleteOne({_id: req.params.id})
                .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                .catch(error => res.status(401).json({ error }));
            });
        }
    })
    .catch( error => {
      res.status(500).json({ error });
    });
};

// Adffichage d'une seule sauce avec son détail
exports.displayOneSauce =  (req, res) => {
  Sauce.findOne({_id: req.params.id})
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(404).json({ error: error }));
};

// Affichage des Sauces 
exports.displayAllSauces =  (req, res) => {
  Sauce.find() //Query recherché
    .then(sauces => res.status(200).json(sauces)) //Promise
    .catch(error => res.status(400).json({ error: error }));
};

// Liké, disliké et les usersId de like et dislike
exports.likeSauce = (req, res, next) => {
  const userId = req.body.userId;
  const like = req.body.like;
  const sauceId = req.params.id;
  Sauce.findOne({ _id: sauceId })
     .then(sauce => {
        // nouvelles valeurs à Modifier
        const newValues = {
           usersLiked: sauce.usersLiked,
           usersDisliked: sauce.usersDisliked,
           likes: 0,
           dislikes: 0
        }
        // Suivant les cas :
        switch (like) {
           // Lorsque bière est "liké"
           case 1:
              newValues.usersLiked.push(userId);
              break;
           // Lorsque bière "disliké"
           case -1:
              newValues.usersDisliked.push(userId);
              break;
           // lorsque pas d'avis ou annulation du like ou dislike
           case 0:
              if(newValues.usersLiked.includes(userId)) {
                 // Si annulation du like
                 const index = newValues.usersLiked.indexOf(userId);
                 newValues.usersLiked.splice(index, 1);
              } else {
                 // Si annulation du Dislike
                 const index = newValues.usersDisliked.indexOf(userId);
                 newValues.usersDisliked.splice(index, 1);
              }
              break;
        };
        // Calcul du nombre de likes et de dislikes
        newValues.likes = newValues.usersLiked.length;
        newValues.dislikes = newValues.usersDisliked.length;
        // Mise à jour des nouvelles valeurs de la bière
        Sauce.updateOne({ _id: sauceId }, newValues )
           .then(() => res.status(200).json({ message: 'Nombre de like mit à jour !' }))
           .catch(error => res.status(500).json({ error }))
     })
     .catch(error => res.status(500).json({ error }));
};
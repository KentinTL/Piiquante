const Sauce = require('../models/Sauce');

exports.createSauce =  (req, res) => {
  const sauce = new Sauce ({
    ...req.body
  });
  sauce.save()
    .then(() => res.status(201).json({ message: "Sauce bien ajoutée"}))
    .catch(error => res.status(400).json({ error: error }));
};

exports.modifySauce =  (req, res) => {
  Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifié'}))
    .catch(error => res.status(400).json({ error: error }));
};

exports.deleteSauce =  (req, res) => {
  Sauce.deleteOne({ _id: req.params.id })
  .then(() => res.status(200).json({ message: 'Sauce supprimé'}))
  .catch(error => res.status(400).json({ error: error }));
};

exports.displayOneSauce =  (req, res) => {
  Sauce.findOne({_id: req.params.id})
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(404).json({ error: error }));
};

exports.displayAllSauces =  (req, res) => {
  Sauce.find() //Query recherché
    .then(sauces => res.status(200).json(sauces)) //Promise
    .catch(error => res.status(400).json({ error: error }));
};
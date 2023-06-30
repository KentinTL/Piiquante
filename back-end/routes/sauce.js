const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');

// Envoie d'une nouvelle sauce via le formulaire
router.post('/', sauceCtrl.createSauce);

// Utilisation de PUT afin de modifié une sauce en fonction de son id
router.put('/:id', sauceCtrl.modifySauce);

// Delete pour supprimer une sauce selon son id
router.delete('/:id', sauceCtrl.deleteSauce);

// Get pour révupérer seulement une sauce via son id dans notre de base de données
router.get('/:id', sauceCtrl.displayOneSauce);

// get pour récupérer la liste complete de sauces dans notre base de donnée
router.get('/', sauceCtrl.displayAllSauces);

module.exports = router;
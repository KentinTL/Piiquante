const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');

// Envoie d'une nouvelle sauce via le formulaire
router.post('/', auth, sauceCtrl.createSauce);

// Utilisation de PUT afin de modifié une sauce en fonction de son id
router.put('/:id', auth, sauceCtrl.modifySauce);

// Delete pour supprimer une sauce selon son id
router.delete('/:id', auth, sauceCtrl.deleteSauce);

// Get pour révupérer seulement une sauce via son id dans notre de base de données
router.get('/:id', auth, sauceCtrl.displayOneSauce);

// get pour récupérer la liste complete de sauces dans notre base de donnée
router.get('/', auth, sauceCtrl.displayAllSauces);

module.exports = router;
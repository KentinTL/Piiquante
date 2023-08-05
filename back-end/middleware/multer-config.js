const multer = require('multer');
// On liste les différents formats d'images accepté par notre formulaire.
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};
// Ici on enregistre dans la variable storage l'images qui sera mise dans notre dossier images à la racine de notre projet
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  // On défini le nom qu'aura l'image dans notre base de données avec sont chemin
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    // On ajoute une date de création
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');
// Éléments et extensions requises
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const Sauce = require('./models/Sauce');

// Connection à mongoDB via Mongoose
mongoose.connect('mongodb+srv://oc-qtl-piiquante:SYCfr3EIS32e7IAz@cluster0.4ertzs0.mongodb.net/test?retryWrites=true&w=majority',
{ 
  useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  
  app.use(express.json());

  next();
});

// Envoie d'une nouvelle sauce via le formulaire
app.post('/api/sauces', (req, res) => {
  const sauce = new Sauce ({
    ...req.body
  });
  sauce.save()
    .then(() => res.status(201).json({ message: "Sauce bien ajoutée"}))
    .catch(error => res.status(400).json({ error: error }));
});

// Sauce piquante exemple mis en dur
app.get('/api/sauces', (req, res) => {
  Sauce.find() //Query recherché
    .then(sauces => res.status(200).json(sauces)) //Promise
    .catch(error => res.status(400).json({ error: error }));
  // const sauce = [
  //   {
  //     userId : '123helo',
  //     name : 'Super Hot',
  //     manufacturer : 'HotPoyo',
  //     description : 'Sauce qui te fait voir l\'enfer',
  //     mainPepper : 'Piment oiseau',
  //     imageUrl : 'https://www.sauce-piquante.fr/modules/prestatemplatev2/page-builder/wp-content/uploads/tears.png',
  //     heat : 8,
  //     likes : 1,
  //     dislikes : 1,
  //     usersLiked : '123godby',
  //     usersDisliked : '123yoloy'
  //   },
  // ];
  // res.status(200).json(sauce);
});

// Réponse de la base lorsque tout se passe bien
app.use((req, res) => {
  res.json({message: 'Votre requête est reçu (°o°)'})
});

module.exports = app;
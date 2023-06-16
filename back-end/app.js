const express = require("express");
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use((req, res, next) => {
  console.log('Requête envoyée ! (°o°)');
  next();
});

// app.use('/api/sauces', (req, res, next) => {
//   const stuff = [
//     {
//       email : 'String',
//       password : 'String',
//     },
//   ];
//   res.status(200).json(stuff);
//   next();
// });

// app.use('/api/sauces', (req, res, next) => {
//   const stuff = [
//     {
//       userId : 'String',
//       name : 'String',
//       manufacturer : 'String',
//       description : 'String',
//       mainPepper : 'String',
//       imageUrl : 'String',
//       heat : 8,
//       likes : 12,
//       dislikes : 1,
//       usersLiked : 'String',
//       usersDisliked : 'String'
//     },
//   ];
//   res.status(200).json(stuff);
//   next();
// });


app.use((req, res, next) => {
  console.log('Requête reçu ! (°o°)');
  next();
});

app.use((req, res, next) => {
  res.json({message: 'Votre requête est reçu (°o°)'})
  next();
});

app.use((req, res, next) => {
  console.log('La réponse à été envoyé avec succès (°o°)');
});



module.exports = app;
// Éléments et extensions requises
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');


const saucesRoutes = require('./routes/sauce')
const userRoutes = require('./routes/user');

// Connection à mongoDB via Mongoose
mongoose.connect('mongodb+srv://oc-qtl-piiquante:SYCfr3EIS32e7IAz@cluster0.4ertzs0.mongodb.net/test?retryWrites=true&w=majority',
{ 
  useNewUrlParser: true,
  useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  const app = express();
  
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  
    
    next();
  });
  
app.use(cors());
app.use(express.json());

app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
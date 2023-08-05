const http = require('http');
const app = require('./app');

// Ici on renvoit un port valide soit en Number soit en Chaine de charactère
const normalizePort = val => {
  const port = parseInt(val, 10);
// Si Chaine de charactère
  if (isNaN(port)) {
    return val;
  }
// Si Number
  if (port >= 0) {
    return port;
  }
  return false;
};
// On rétabli le port dans une constante, soit 3000 soit un autre si le 3000 est déjà pris
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// Ici on vient rechercher les éventuelles erreurs
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

// Si erreur alors ou renvoit l'erreur
server.on('error', errorHandler);
// Si pas d'erreur on renvoit l'addresse sur laquelle le serveur tourne
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);

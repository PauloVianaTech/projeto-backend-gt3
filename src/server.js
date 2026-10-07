const app = require('./app');
const database = require('./database');

const PORT = process.env.PORT || 3001;
const syncOptions = process.env.NODE_ENV === 'production' ? {} : { alter: true };

database.connection.sync(syncOptions).then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log('Banco de dados sincronizado com sucesso.');
  });
}).catch((error) => {
  console.error('Não foi possível sincronizar o banco de dados:', error);
});
